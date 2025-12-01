import https from 'https';
import { getEnv } from './utils.js';

const NOTION_TOKEN = getEnv('NOTION_TOKEN');
const THERAPIST_DIRECTORY_DB_ID = getEnv('THERAPIST_DIRECTORY_DATABASE_ID') || getEnv('NOTION_DB_THERAPIST_DIRECTORY');

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

async function checkSchema() {
  try {
    const db = await notionRequest(`/databases/${THERAPIST_DIRECTORY_DB_ID}`);
    console.log('\n📊 Database Properties:\n');
    Object.entries(db.properties).forEach(([name, prop]) => {
      console.log(`  ${name}: ${prop.type}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSchema();

