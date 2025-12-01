import 'dotenv/config'; // Requires node -r dotenv/config or manual config
import https from 'https';
import path from 'path';
import fs from 'fs';

// Load .env manually if not loaded
if (!process.env.NOTION_TOKEN) {
    const envPath = path.resolve(process.cwd(), '../.env');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    }
}

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DB_USER_TESTING = process.env.NOTION_DB_USER_TESTING;
const DB_EOI = process.env.NOTION_DB_EOI;
const DB_SANDBOX = process.env.NOTION_DB_SANDBOX;
const DB_SURVEY = process.env.NOTION_DB_SURVEY;

if (!NOTION_TOKEN || !DB_USER_TESTING) {
    console.error('❌ Missing required credentials (NOTION_TOKEN or NOTION_DB_USER_TESTING)');
    process.exit(1);
}

// Helper to make Notion requests
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
                    resolve(JSON.parse(responseBody));
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

// Fetch all pages from a database
async function fetchDatabase(dbId) {
    const pages = [];
    let cursor = undefined;

    do {
        const response = await notionRequest(`/databases/${dbId}/query`, 'POST', {
            start_cursor: cursor
        });
        pages.push(...response.results);
        cursor = response.next_cursor;
    } while (cursor);

    return pages;
}

// Extract email and name from a page
function extractUser(page, emailField = 'Email', nameField = 'Name') {
    const props = page.properties;

    let email = '';
    if (props[emailField] && props[emailField].email) {
        email = props[emailField].email;
    }

    let name = '';
    if (props[nameField] && props[nameField].title && props[nameField].title.length > 0) {
        name = props[nameField].title[0].plain_text;
    }

    return { email, name, id: page.id };
}

// Main Orchestrator Logic
async function main() {
    console.log('🤖 Orchestrator Agent Starting...');

    // 1. Fetch Master List (User Testing)
    console.log('📥 Fetching User Testing Group...');
    const userTestingPages = await fetchDatabase(DB_USER_TESTING);
    console.log(`ℹ️ Fetched ${userTestingPages.length} pages from User Testing.`);
    const existingEmails = new Set();

    userTestingPages.forEach(page => {
        const user = extractUser(page, 'Email Address', 'Fullname');
        if (user.email) {
            existingEmails.add(user.email.toLowerCase());
        } else {
            // console.log('⚠️ User missing email in User Testing:', page.id);
        }
    });

    console.log(`ℹ️ Found ${existingEmails.size} unique emails in User Testing.`);
    // console.log('Emails:', [...existingEmails]);

    const newUsers = [];

    // 2. Process EOI
    if (DB_EOI) {
        console.log('📥 Fetching EOI...');
        const eoiPages = await fetchDatabase(DB_EOI);
        console.log(`ℹ️ Fetched ${eoiPages.length} pages from EOI.`);
        eoiPages.forEach(page => {
            const user = extractUser(page, 'Email', 'Name');
            if (user.email) {
                if (!existingEmails.has(user.email.toLowerCase())) {
                    console.log(`Found new user in EOI: ${user.email}`);
                    newUsers.push({ ...user, source: 'EOI' });
                    existingEmails.add(user.email.toLowerCase()); // Prevent duplicates in this run
                }
            }
        });
    }

    // 3. Process Sandbox
    if (DB_SANDBOX) {
        console.log('📥 Fetching Sandbox...');
        const sandboxPages = await fetchDatabase(DB_SANDBOX);
        console.log(`ℹ️ Fetched ${sandboxPages.length} pages from Sandbox.`);
        sandboxPages.forEach(page => {
            const user = extractUser(page, 'Email', 'Name');
            if (user.email) {
                if (!existingEmails.has(user.email.toLowerCase())) {
                    console.log(`Found new user in Sandbox: ${user.email}`);
                    newUsers.push({ ...user, source: 'Sandbox' });
                    existingEmails.add(user.email.toLowerCase());
                } else {
                    console.log(`User already exists (Sandbox): ${user.email}`);
                }
            } else {
                console.log('⚠️ Sandbox entry missing email:', page.id);
            }
        });
    }

    // 4. Process Survey
    if (DB_SURVEY) {
        console.log('📥 Fetching Survey...');
        const surveyPages = await fetchDatabase(DB_SURVEY);
        surveyPages.forEach(page => {
            const user = extractUser(page, 'Email', 'Name');
            if (user.email && !existingEmails.has(user.email.toLowerCase())) {
                newUsers.push({ ...user, source: 'Survey' });
                existingEmails.add(user.email.toLowerCase());
            }
        });
    }

    console.log(`🆕 Found ${newUsers.length} new users to add.`);

    // 5. Add New Users
    for (const user of newUsers) {
        console.log(`➕ Adding ${user.name} (${user.email}) from ${user.source}...`);

        // Split Name
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const properties = {
            "Email Address": { "email": user.email },
            "Fullname": { "rich_text": [{ "text": { "content": user.name } }] },
            "Last Name": { "rich_text": [{ "text": { "content": lastName } }] },
            "Source": { "select": { "name": user.source } },
            "Status": { "select": { "name": "New" } },
            "Import Date": { "date": { "start": new Date().toISOString() } },
            "First Name": {
                "title": [{ "text": { "content": firstName || user.name } }]
            }
        };

        try {
            await notionRequest('/pages', 'POST', {
                parent: { database_id: DB_USER_TESTING },
                properties: properties
            });
            console.log('✅ Added.');
        } catch (err) {
            console.error(`❌ Failed to add ${user.email}:`, err.message);
        }
    }

    console.log('🎉 Orchestration Complete.');
}

main().catch(console.error);
