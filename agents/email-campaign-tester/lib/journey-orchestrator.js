import { getScenario } from '../config/journey-scenarios.js';
import { getTimingInMs } from '../config/timing-presets.js';
import { sendEmail } from './email-sender.js';
import { testPersonaEmailLinks } from './link-tester.js';
import { verifyAllTracking } from './tracking-verifier.js';
import { generateId, log, sleep } from './utils.js';

/**
 * Execute a journey scenario for a persona
 */
export async function executeJourney(persona, scenarioName, timing = 'accelerated', mockMode = false) {
  const scenario = getScenario(scenarioName);
  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioName}`);
  }

  const journeyId = generateId('journey');
  log(`Starting journey ${journeyId} for ${persona.name} (${scenarioName})`, 'info');

  const journey = {
    id: journeyId,
    personaId: persona.id || persona.email,
    persona,
    scenario: scenarioName,
    timing,
    mockMode,
    emails: [],
    status: 'in-progress',
    startedAt: new Date(),
    results: {
      emailsSent: 0,
      emailsOpened: 0,
      linksClicked: 0,
      linksTested: 0,
      linksWorking: 0,
      trackingVerified: false
    }
  };

  try {
    // Execute emails in sequence
    for (const emailNumber of scenario.emails) {
      log(`\n📧 Processing Email ${emailNumber}...`, 'info');

      const emailResult = {
        number: emailNumber,
        sentAt: null,
        openedAt: null,
        clickedAt: null,
        links: [],
        tracking: null,
        errors: []
      };

      try {
        // Send email
        log(`Sending email ${emailNumber}...`, 'info');
        const sendResult = await sendEmail(persona, emailNumber, mockMode);
        emailResult.sentAt = new Date();
        emailResult.sendResult = sendResult;
        journey.results.emailsSent++;

        // Test links
        log(`Testing links in email ${emailNumber}...`, 'info');
        const linkTestResult = await testPersonaEmailLinks(persona, emailNumber);
        emailResult.links = linkTestResult.results;
        emailResult.linkTestResult = linkTestResult;
        journey.results.linksTested += linkTestResult.total;
        journey.results.linksWorking += linkTestResult.working;

        // Simulate actions if in mock mode or if actions are defined
        const actions = scenario.actions[emailNumber] || [];
        if (actions.includes('open')) {
          emailResult.openedAt = new Date();
          journey.results.emailsOpened++;
          log(`✅ Simulated email open`, 'success');
        }

        if (actions.includes('click-survey') || actions.includes('click-learn-more') || actions.includes('click-sandbox')) {
          emailResult.clickedAt = new Date();
          journey.results.linksClicked++;
          log(`✅ Simulated link click`, 'success');
        }

        // Wait for tracking (if not mock mode)
        if (!mockMode && (actions.includes('open') || actions.includes('click-survey'))) {
          log(`Waiting for tracking to update...`, 'info');
          await sleep(3000); // Wait 3 seconds for webhook

          // Verify tracking
          const trackingResult = await verifyAllTracking(persona, emailNumber);
          emailResult.tracking = trackingResult;
          
          if (trackingResult.allVerified) {
            journey.results.trackingVerified = true;
            log(`✅ Tracking verified`, 'success');
          } else {
            log(`⚠️ Some tracking not verified`, 'warning');
          }
        }

        journey.emails.push(emailResult);

        // Calculate delay for next email
        const nextEmailNumber = scenario.emails[scenario.emails.indexOf(emailNumber) + 1];
        if (nextEmailNumber) {
          const isRealistic = timing === 'realistic';
          const delayMs = getTimingInMs(timing, nextEmailNumber, isRealistic);
          
          if (delayMs === null) {
            // Manual approval needed
            log(`⏸️ Waiting for manual approval before sending email ${nextEmailNumber}...`, 'info');
            // In a real implementation, you might want to prompt the user here
            await sleep(5000); // Wait 5 seconds as placeholder
          } else if (delayMs > 0) {
            const delaySeconds = Math.floor(delayMs / 1000);
            log(`⏳ Waiting ${delaySeconds} seconds before next email...`, 'info');
            await sleep(delayMs);
          }
        }

      } catch (error) {
        log(`❌ Error processing email ${emailNumber}: ${error.message}`, 'error');
        emailResult.errors.push(error.message);
        journey.emails.push(emailResult);
      }
    }

    journey.status = 'completed';
    journey.completedAt = new Date();
    log(`\n✅ Journey completed: ${journeyId}`, 'success');

    return journey;
  } catch (error) {
    journey.status = 'failed';
    journey.error = error.message;
    log(`❌ Journey failed: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Get journey status
 */
export function getJourneyStatus(journey) {
  return {
    id: journey.id,
    status: journey.status,
    scenario: journey.scenario,
    emailsSent: journey.results.emailsSent,
    emailsOpened: journey.results.emailsOpened,
    linksTested: journey.results.linksTested,
    linksWorking: journey.results.linksWorking,
    trackingVerified: journey.results.trackingVerified,
    startedAt: journey.startedAt,
    completedAt: journey.completedAt
  };
}

