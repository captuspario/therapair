import https from 'https';
import fs from 'fs';
import path from 'path';

// Read .env manually
const envPath = path.resolve(process.cwd(), '../.env');
const envConfig = fs.readFileSync(envPath, 'utf8');
const tokenMatch = envConfig.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envConfig.match(/NOTION_DB_USER_TESTING=(.*)/);

const NOTION_TOKEN = tokenMatch ? tokenMatch[1].trim() : '';
const DATABASE_ID = dbMatch ? dbMatch[1].trim() : '';

if (!NOTION_TOKEN || !DATABASE_ID) {
    console.error('❌ Missing credentials in .env');
    process.exit(1);
}

const properties = {
    "Link Clicked Date": { "date": {} },
    "EOI Submitted Date": { "date": {} },
    "Sandbox Feedback Date": { "date": {} },
    "Survey Submitted Date": { "date": {} }
};

const data = JSON.stringify({
    properties: properties
});

const options = {
    hostname: 'api.notion.com',
    path: `/v1/databases/${DATABASE_ID}`,
    method: 'PATCH',
    headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
        'Content-Length': data.length
    }
};

console.log(`Adding tracking properties to User Testing DB: ${DATABASE_ID}...`);

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('✅ Tracking properties added successfully!');
        } else {
            console.error(`❌ Error updating database (Status: ${res.statusCode})`);
            console.error('Response:', responseBody);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Request error:', error);
});

req.write(data);
req.end();
