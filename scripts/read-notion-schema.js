import https from 'https';

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const options = {
    hostname: 'api.notion.com',
    path: `/v1/databases/${DATABASE_ID}`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28'
    }
};

console.log(`Reading Notion Database Schema: ${DATABASE_ID}...`);

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
            console.log('Status Property Details:', JSON.stringify(db.properties['Status'], null, 2));
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
