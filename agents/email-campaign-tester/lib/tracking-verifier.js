import https from 'https';
import { getEnv, log, sleep } from './utils.js';

const NOTION_TOKEN = getEnv('NOTION_TOKEN');
const THERAPIST_DIRECTORY_DB_ID = getEnv('THERAPIST_DIRECTORY_DATABASE_ID') || getEnv('NOTION_DB_THERAPIST_DIRECTORY');

/**
 * Make Notion API request
 */
function notionRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      path: `/v1${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseBody));
          } catch (e) {
            resolve(responseBody);
          }
        } else {
          reject(new Error(`Notion API Error ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

/**
 * Get persona's Notion page
 */
async function getPersonaPage(email) {
  if (!THERAPIST_DIRECTORY_DB_ID) {
    return null;
  }

  try {
    const response = await notionRequest(`/databases/${THERAPIST_DIRECTORY_DB_ID}/query`, 'POST', {
      filter: {
        property: 'Email',
        email: {
          equals: email
        }
      }
    });

    if (response.results && response.results.length > 0) {
      return response.results[0];
    }

    return null;
  } catch (error) {
    log(`Error getting persona page: ${error.message}`, 'error');
    return null;
  }
}

/**
 * Verify email event was tracked in Notion
 */
export async function verifyEmailEvent(persona, emailNumber, eventType = 'opened', maxWaitMs = 30000) {
  log(`Verifying ${eventType} event for email ${emailNumber}...`, 'info');

  const startTime = Date.now();
  const checkInterval = 2000; // Check every 2 seconds
  const maxChecks = Math.floor(maxWaitMs / checkInterval);

  for (let i = 0; i < maxChecks; i++) {
    const page = await getPersonaPage(persona.email);
    
    if (!page) {
      log(`Persona page not found for ${persona.email}`, 'warning');
      await sleep(checkInterval);
      continue;
    }

    const props = page.properties;
    const researchStatus = props['Research Status']?.select?.name || '';
    const researchSourceNotes = props['Research Source Notes']?.rich_text?.[0]?.plain_text || '';
    const latestSurveyDate = props['Latest Survey Date']?.date?.start;

    // Check if event is tracked
    const expectedStatus = `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} (email ${emailNumber})`;
    const statusMatches = researchStatus.toLowerCase().includes(eventType.toLowerCase()) && 
                         researchStatus.includes(`email ${emailNumber}`);

    if (statusMatches) {
      log(`✅ Event verified: ${researchStatus}`, 'success');
      return {
        verified: true,
        researchStatus,
        researchSourceNotes,
        latestSurveyDate,
        verifiedAt: new Date()
      };
    }

    // Wait before next check
    if (i < maxChecks - 1) {
      await sleep(checkInterval);
    }
  }

  log(`⚠️ Event not verified after ${maxWaitMs}ms`, 'warning');
  return {
    verified: false,
    message: 'Event not found in Notion after waiting',
    checkedAt: new Date()
  };
}

/**
 * Verify sandbox visit tracking
 */
export async function verifySandboxTracking(persona, maxWaitMs = 30000) {
  log(`Verifying sandbox tracking for ${persona.email}...`, 'info');

  const page = await getPersonaPage(persona.email);
  if (!page) {
    return {
      verified: false,
      message: 'Persona page not found'
    };
  }

  const props = page.properties;
  const researchSourceNotes = props['Research Source Notes']?.rich_text?.[0]?.plain_text || '';

  // Check if sandbox visit is mentioned in notes
  const hasSandbox = researchSourceNotes.toLowerCase().includes('sandbox') || 
                     researchSourceNotes.includes('utm_content=sandbox');

  if (hasSandbox) {
    log(`✅ Sandbox tracking verified`, 'success');
    return {
      verified: true,
      researchSourceNotes,
      verifiedAt: new Date()
    };
  }

  return {
    verified: false,
    message: 'Sandbox tracking not found',
    checkedAt: new Date()
  };
}

/**
 * Verify feedback widget interaction
 */
export async function verifyFeedbackWidget(persona, maxWaitMs = 30000) {
  log(`Verifying feedback widget interaction for ${persona.email}...`, 'info');

  // This would check a feedback database or tracking system
  // For now, we'll check if there's any feedback-related property
  const page = await getPersonaPage(persona.email);
  if (!page) {
    return {
      verified: false,
      message: 'Persona page not found'
    };
  }

  // Check for feedback-related properties (adjust based on your schema)
  const props = page.properties;
  
  // Look for any feedback-related data
  // This is a placeholder - adjust based on your actual schema
  const hasFeedback = false; // Implement based on your feedback tracking

  return {
    verified: hasFeedback,
    message: hasFeedback ? 'Feedback widget interaction found' : 'No feedback widget interaction found',
    checkedAt: new Date()
  };
}

/**
 * Verify all tracking for a persona
 */
export async function verifyAllTracking(persona, emailNumber) {
  log(`Verifying all tracking for email ${emailNumber}...`, 'info');

  const results = {
    emailOpened: await verifyEmailEvent(persona, emailNumber, 'opened'),
    emailClicked: await verifyEmailEvent(persona, emailNumber, 'clicked'),
    sandboxTracking: await verifySandboxTracking(persona),
    feedbackWidget: await verifyFeedbackWidget(persona)
  };

  const allVerified = Object.values(results).every(r => r.verified === true || r.verified === undefined);

  return {
    ...results,
    allVerified,
    verifiedAt: new Date()
  };
}

