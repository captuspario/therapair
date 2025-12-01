import https from 'https';

// Load from environment variable
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
// I need to find the User Testing DB ID. It was in .env or config.php
// Checking previous context... it was NOTION_DB_USER_TESTING
// I will read .env to get it dynamically in this script to be safe
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envConfig = fs.readFileSync(envPath, 'utf8');
const match = envConfig.match(/NOTION_DB_USER_TESTING=(.*)/);
const DATABASE_ID = match ? match[1].trim() : '';

if (!DATABASE_ID) {
    console.error('Could not find NOTION_DB_USER_TESTING in .env');
    process.exit(1);
}

const options = {
    hostname: 'api.notion.com',
    path: `/v1/databases/${DATABASE_ID}`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28'
    }
};

console.log(`Reading User Testing Database Schema: ${DATABASE_ID}...`);

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            const db = JSON.parse(responseBody);
            console.log('✅ Database schema retrieved.');
            console.log('Properties:', Object.keys(db.properties));
        } else {
            console.error(`❌ Error reading database (Status: ${res.statusCode})`);
            console.error('Response:', responseBody);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Request error:', error);
});

req.end();
