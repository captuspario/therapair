import https from 'https';
import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = fs.readFileSync(envPath, 'utf8');
const tokenMatch = envConfig.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envConfig.match(/NOTION_DB_USER_TESTING=(.*)/);

const NOTION_TOKEN = tokenMatch ? tokenMatch[1].trim() : '';
const DATABASE_ID = dbMatch ? dbMatch[1].trim() : '';

if (!NOTION_TOKEN || !DATABASE_ID) {
    console.error('❌ Missing credentials in .env');
    process.exit(1);
}

// Get emails from CLI args
const emails = process.argv.slice(2);

if (emails.length === 0) {
    console.log('Usage: node scripts/seed-test-cohort.js email1@example.com email2@example.com ...');
    process.exit(0);
}

console.log(`🌱 Seeding ${emails.length} test users into Notion...`);

async function addUser(email) {
    const properties = {
        "Email Address": { "email": email },
        "Fullname": { "rich_text": [{ "text": { "content": "Test User" } }] },
        "First Name": { "title": [{ "text": { "content": "Test User" } }] },
        "Source": { "select": { "name": "Manual Test" } },
        "Status": { "select": { "name": "Ready to Test" } },
        "Import Date": { "date": { "start": new Date().toISOString() } }
    };

    const data = JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: properties
    });

    const options = {
        hostname: 'api.notion.com',
        path: '/v1/pages',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NOTION_TOKEN}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', chunk => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`✅ Added ${email}`);
                    resolve();
                } else {
                    console.error(`❌ Failed to add ${email}: ${responseBody}`);
                    resolve(); // Resolve anyway to continue
                }
            });
        });
        req.on('error', (err) => {
            console.error(`❌ Network error for ${email}:`, err);
            resolve();
        });
        req.write(data);
        req.end();
    });
}

async function main() {
    for (const email of emails) {
        await addUser(email);
    }
    console.log('✨ Seeding complete.');
}

main();
