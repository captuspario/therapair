import https from 'https';
import { getEnv, generateToken, getFirstName, log, isValidEmail } from './utils.js';

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
 * Create or update a test persona in VIC Therapists database
 */
export async function createPersona(attributes) {
  const { name, email, profession, region } = attributes;

  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (!THERAPIST_DIRECTORY_DB_ID) {
    throw new Error('THERAPIST_DIRECTORY_DATABASE_ID not configured');
  }

  log(`Creating persona: ${name} (${email})`, 'info');

  // Check if persona already exists
  const existing = await findPersonaByEmail(email);
  if (existing) {
    log(`Persona already exists: ${existing.id}`, 'warning');
    return existing;
  }

  const firstName = getFirstName(name);

  // Create Notion page - using actual database schema
  const lastName = name.split(' ').slice(1).join(' ') || '';
  
  const properties = {
    'First Name': {
      'title': [{ 'text': { 'content': firstName } }]
    },
    'Email Address': {
      'email': email
    }
  };

  // Add last name if provided
  if (lastName) {
    properties['Last Name'] = {
      'rich_text': [{ 'text': { 'content': lastName } }]
    };
  }

  // Add profession if provided
  if (profession) {
    properties['Profession/Key Qualification/s'] = {
      'rich_text': [{ 'text': { 'content': profession } }]
    };
  }

  // Add region if provided (it's a select property)
  if (region) {
    properties['Region'] = {
      'select': { 'name': region }
    };
  }

  // Mark as test persona in source
  properties['Source'] = {
    'select': { 'name': 'Test' }
  };

  try {
    const response = await notionRequest('/pages', 'POST', {
      parent: { database_id: THERAPIST_DIRECTORY_DB_ID },
      properties: properties
    });

    log(`Persona created in Notion: ${response.id}`, 'success');

    const pageId = response.id;
    const tokenPayload = {
      therapist_id: `TEST-${pageId.substring(0, 8)}`,
      therapist_name: name,
      first_name: firstName,
      email: email,
      profession: profession || 'Therapist',
      region: region || 'Victoria',
      directory_page_id: pageId,
      therapist_research_id: `test-${pageId.substring(0, 8)}-${Math.floor(Date.now() / 1000)}`,
      test_persona: true,
      exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
    };

    const token = generateToken(tokenPayload);

    return {
      id: pageId,
      name,
      email,
      firstName,
      profession: profession || 'Therapist',
      region: region || 'Victoria',
      token,
      notionPageId: pageId,
      directoryPageId: pageId,
      createdAt: new Date(),
      status: 'active',
      testPersona: true
    };
  } catch (error) {
    log(`Failed to create persona: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Find persona by email
 */
export async function findPersonaByEmail(email) {
  if (!THERAPIST_DIRECTORY_DB_ID) {
    return null;
  }

  try {
    const response = await notionRequest(`/databases/${THERAPIST_DIRECTORY_DB_ID}/query`, 'POST', {
      filter: {
        property: 'Email Address',
        email: {
          equals: email
        }
      }
    });

    if (response.results && response.results.length > 0) {
      const page = response.results[0];
      const props = page.properties;

      // Extract persona data using actual schema
      const firstName = props['First Name']?.title?.[0]?.plain_text || '';
      const lastName = props['Last Name']?.rich_text?.[0]?.plain_text || '';
      const name = `${firstName} ${lastName}`.trim() || firstName;
      const emailValue = props['Email Address']?.email || email;
      const profession = props['Profession/Key Qualification/s']?.rich_text?.[0]?.plain_text || 'Therapist';
      const region = props['Region']?.select?.name || 'Victoria';
      const testPersona = props['Source']?.select?.name === 'Test';

      // Generate token if needed (firstName already extracted above)
      const tokenPayload = {
        therapist_id: `TEST-${page.id.substring(0, 8)}`,
        therapist_name: name,
        first_name: firstName,
        email: emailValue,
        profession,
        region,
        directory_page_id: page.id,
        therapist_research_id: `test-${page.id.substring(0, 8)}`,
        test_persona: true,
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
      };
      const token = generateToken(tokenPayload);

      return {
        id: page.id,
        name,
        email: emailValue,
        firstName,
        profession,
        region,
        token,
        notionPageId: page.id,
        directoryPageId: page.id,
        status: 'active',
        testPersona
      };
    }

    return null;
  } catch (error) {
    log(`Error finding persona: ${error.message}`, 'error');
    return null;
  }
}

/**
 * Get persona by ID or email
 */
export async function getPersona(identifier) {
  if (identifier.includes('@')) {
    return await findPersonaByEmail(identifier);
  }

  // Try to get by ID
  try {
    const response = await notionRequest(`/pages/${identifier}`);
      const props = response.properties;

      const firstName = props['First Name']?.title?.[0]?.plain_text || '';
      const lastName = props['Last Name']?.rich_text?.[0]?.plain_text || '';
      const name = `${firstName} ${lastName}`.trim() || firstName;
      const email = props['Email Address']?.email || '';
      const profession = props['Profession/Key Qualification/s']?.rich_text?.[0]?.plain_text || 'Therapist';
      const region = props['Region']?.select?.name || 'Victoria';

      const tokenPayload = {
        therapist_id: `TEST-${identifier.substring(0, 8)}`,
        therapist_name: name,
        first_name: firstName,
        email,
        profession,
        region,
        directory_page_id: identifier,
        therapist_research_id: `test-${identifier.substring(0, 8)}`,
        test_persona: true,
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
      };
      const token = generateToken(tokenPayload);

    return {
      id: identifier,
      name,
      email,
      firstName,
      profession,
      region,
      token,
      notionPageId: identifier,
      directoryPageId: identifier,
      status: 'active',
      testPersona: true
    };
  } catch (error) {
    log(`Error getting persona: ${error.message}`, 'error');
    return null;
  }
}

/**
 * List all test personas
 */
export async function listPersonas(status = 'active') {
  if (!THERAPIST_DIRECTORY_DB_ID) {
    return [];
  }

  try {
    // Try to filter by test persona, but if property doesn't exist, just get all
    const filter = {
      property: 'Email Address',
      email: {
        is_not_empty: true
      }
    };

    const response = await notionRequest(`/databases/${THERAPIST_DIRECTORY_DB_ID}/query`, 'POST', {
      filter
    });

    return (response.results || []).map(page => {
      const props = page.properties;
      const name = props['Name']?.title?.[0]?.plain_text || '';
      const email = props['Email']?.email || '';

      return {
        id: page.id,
        name,
        email,
        notionPageId: page.id
      };
    });
  } catch (error) {
    log(`Error listing personas: ${error.message}`, 'error');
    return [];
  }
}

