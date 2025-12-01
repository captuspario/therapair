import https from 'https';

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const properties = {
    "Submission Status": {
        "select": {
            "options": [
                { "name": "New", "color": "blue" },
                { "name": "In Progress", "color": "yellow" },
                { "name": "Done", "color": "green" }
            ]
        }
    }
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

console.log(`Updating Notion Database: ${DATABASE_ID}...`);

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('✅ Database schema updated successfully!');
            console.log('Added properties:', Object.keys(properties).join(', '));
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
