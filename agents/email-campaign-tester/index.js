#!/usr/bin/env node

import { parseArgs, log } from './lib/utils.js';
import { createPersona, getPersona, listPersonas } from './lib/persona-manager.js';
import { executeJourney } from './lib/journey-orchestrator.js';
import { testPersonaEmailLinks } from './lib/link-tester.js';
import { verifyAllTracking } from './lib/tracking-verifier.js';
import { generateReports } from './lib/report-generator.js';
import { listScenarios } from './config/journey-scenarios.js';

/**
 * Show help message
 */
function showHelp() {
  console.log(`
🧪 Email Campaign User Testing Agent

USAGE:
  node index.js <command> [options]

COMMANDS:
  create-persona          Create a new test persona
  send-test-email         Send a test email (auto-creates tester if needed)
  list-personas           List all test personas
  start-journey           Start a journey for a persona
  verify-tracking         Verify tracking for a persona
  test-links              Test links in an email
  generate-report         Generate test report
  list-scenarios          List available journey scenarios
  help                    Show this help message

EXAMPLES:
  # Send a test email (auto-creates tester entry if needed)
  node index.js send-test-email \\
    --email "test@example.com" \\
    --email-number 1

  # Create a test persona
  node index.js create-persona \\
    --name "Johnny Testmail" \\
    --email "ibenizer@me.com" \\
    --profession "Therapist" \\
    --region "Victoria"

  # Start a journey
  node index.js start-journey \\
    --persona "ibenizer@me.com" \\
    --scenario "happy-path" \\
    --timing "accelerated" \\
    --mock

  # Verify tracking
  node index.js verify-tracking \\
    --persona "ibenizer@me.com" \\
    --email-number 1

  # Test links
  node index.js test-links \\
    --persona "ibenizer@me.com" \\
    --email-number 1

  # Generate report
  node index.js generate-report \\
    --journey "journey-id" \\
    --formats "console,markdown"

OPTIONS:
  --name <name>           Persona name
  --email <email>         Persona email
  --profession <prof>     Persona profession
  --region <region>       Persona region
  --persona <id|email>     Persona identifier
  --scenario <name>       Journey scenario name
  --timing <preset>       Timing preset (realistic, accelerated, instant, manual)
  --mock                   Use mock email mode
  --email-number <num>    Email number (1-5)
  --journey <id>          Journey ID
  --formats <list>        Report formats (console,markdown,notion)
`);
}

/**
 * Main CLI handler
 */
async function main() {
  const args = parseArgs();

  if (!args.command || args.command === 'help') {
    showHelp();
    return;
  }

  try {
    switch (args.command) {
      case 'create-persona': {
        const name = args.options.name;
        const email = args.options.email;
        const profession = args.options.profession || 'Therapist';
        const region = args.options.region || 'Victoria';

        if (!name || !email) {
          log('Name and email are required', 'error');
          showHelp();
          process.exit(1);
        }

        const persona = await createPersona({ name, email, profession, region });
        log(`Persona created: ${persona.name} (${persona.email})`, 'success');
        log(`Token: ${persona.token.substring(0, 50)}...`, 'info');
        break;
      }

      case 'list-personas': {
        const personas = await listPersonas();
        log(`Found ${personas.length} test personas`, 'info');
        personas.forEach(p => {
          console.log(`  - ${p.name} (${p.email})`);
        });
        break;
      }

      case 'send-test-email': {
        const email = args.options.email;
        const emailNumber = parseInt(args.options['email-number'] || '1');
        const mockMode = args.flags.mock || false;

        if (!email) {
          log('Email address is required', 'error');
          showHelp();
          process.exit(1);
        }

        // Import sendTestEmail which auto-creates persona
        const { sendTestEmail } = await import('./lib/send-test-email.js');
        const result = await sendTestEmail(email, emailNumber, {}, mockMode);
        
        log(`Test email sent: ${result.id}`, 'success');
        log(`A tester entry has been created/found in the database for tracking`, 'info');
        break;
      }

      case 'start-journey': {
        const personaId = args.options.persona;
        const scenario = args.options.scenario || 'happy-path';
        const timing = args.options.timing || 'accelerated';
        const mockMode = args.flags.mock || false;

        if (!personaId) {
          log('Persona is required', 'error');
          showHelp();
          process.exit(1);
        }

        // If personaId is an email, getPersona will find or create it
        const persona = await getPersona(personaId);
        if (!persona) {
          // If not found and it's an email, try to create it
          if (personaId.includes('@')) {
            log(`Creating tester entry for ${personaId}...`, 'info');
            const newPersona = await createPersona({
              name: personaId.split('@')[0],
              email: personaId,
              profession: 'Therapist',
              region: 'Victoria'
            });
            const journey = await executeJourney(newPersona, scenario, timing, mockMode);
            await generateReports(journey, ['console', 'markdown']);
            log(`Journey completed: ${journey.id}`, 'success');
            break;
          } else {
            log(`Persona not found: ${personaId}`, 'error');
            process.exit(1);
          }
        }

        const journey = await executeJourney(persona, scenario, timing, mockMode);
        
        // Generate report
        await generateReports(journey, ['console', 'markdown']);
        
        log(`Journey completed: ${journey.id}`, 'success');
        break;
      }

      case 'verify-tracking': {
        const personaId = args.options.persona;
        const emailNumber = parseInt(args.options['email-number'] || '1');

        if (!personaId) {
          log('Persona is required', 'error');
          showHelp();
          process.exit(1);
        }

        const persona = await getPersona(personaId);
        if (!persona) {
          log(`Persona not found: ${personaId}`, 'error');
          process.exit(1);
        }

        const result = await verifyAllTracking(persona, emailNumber);
        console.log('\nTracking Verification Results:');
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'test-links': {
        const personaId = args.options.persona;
        const emailNumber = parseInt(args.options['email-number'] || '1');

        if (!personaId) {
          log('Persona is required', 'error');
          showHelp();
          process.exit(1);
        }

        const persona = await getPersona(personaId);
        if (!persona) {
          log(`Persona not found: ${personaId}`, 'error');
          process.exit(1);
        }

        const result = await testPersonaEmailLinks(persona, emailNumber);
        console.log('\nLink Test Results:');
        console.log(`Total: ${result.total}`);
        console.log(`Working: ${result.working}`);
        console.log(`With UTM: ${result.withUtm}`);
        break;
      }

      case 'generate-report': {
        log('Report generation from journey ID not yet implemented', 'warning');
        log('Reports are automatically generated after journey completion', 'info');
        break;
      }

      case 'list-scenarios': {
        const scenarios = listScenarios();
        console.log('\nAvailable Journey Scenarios:\n');
        scenarios.forEach(s => {
          console.log(`  ${s.key}: ${s.name}`);
          console.log(`    ${s.description}`);
          console.log(`    Expected: ${s.expectedOutcome}\n`);
        });
        break;
      }

      default:
        log(`Unknown command: ${args.command}`, 'error');
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    log(`Error: ${error.message}`, 'error');
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
});

