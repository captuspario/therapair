require('dotenv').config();
const { Client } = require('@notionhq/client');
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Initialize clients
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const resend = new Resend(process.env.RESEND_API_KEY);

const DB_ID = process.env.NOTION_DB_USER_TESTING;
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

async function main() {
    console.log('🚀 Starting Campaign Manager...');

    if (!DB_ID) {
        console.error('❌ Error: NOTION_DB_USER_TESTING is not defined in .env');
        process.exit(1);
    }

    // 1. Fetch users from Notion who are "Ready to Send" and not "Sent"
    console.log('📋 Fetching users from Notion...');
    const response = await notion.databases.query({
        database_id: DB_ID,
        filter: {
            and: [
                {
                    property: 'Status',
                    status: {
                        equals: 'Ready to Send'
                    }
                }
            ]
        }
    });

    const users = response.results;
    console.log(`Found ${users.length} users ready to receive emails.`);

    if (users.length === 0) {
        console.log('No emails to send. Exiting.');
        return;
    }

    // 2. Iterate and send emails
    for (const user of users) {
        const email = user.properties.Email?.email;
        const name = user.properties.Name?.title[0]?.plain_text || 'there';
        const pageId = user.id;

        if (!email) {
            console.warn(`⚠️ User ${name} (ID: ${pageId}) has no email. Skipping.`);
            continue;
        }

        console.log(`📧 Sending email to ${name} (${email})...`);

        try {
            // Read email template (simple example, can be expanded)
            // In a real scenario, we might load specific templates based on user properties
            const subject = "Welcome to Therapair Research";
            const html = `
                <h1>Hi ${name},</h1>
                <p>Thanks for being part of our research group.</p>
                <p>We'd love for you to try our <a href="https://unisonmentalhealth.com/find-a-therapist-who-is-right-for-you/">Sandbox Demo</a> and give us your feedback.</p>
                <p>Best,<br>Therapair Team</p>
            `;

            const { data, error } = await resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject: subject,
                html: html
            });

            if (error) {
                console.error(`❌ Failed to send to ${email}:`, error);
                // Update Notion with Error
                await updateNotionStatus(pageId, 'Error');
            } else {
                console.log(`✅ Email sent to ${email}! ID: ${data.id}`);
                // Update Notion with Success
                await updateNotionStatus(pageId, 'Sent');
            }

        } catch (err) {
            console.error(`❌ Unexpected error for ${email}:`, err);
        }
    }

    console.log('🏁 Campaign run complete.');
}

async function updateNotionStatus(pageId, status) {
    try {
        await notion.pages.update({
            page_id: pageId,
            properties: {
                'Status': {
                    status: {
                        name: status
                    }
                },
                'Last Contacted': {
                    date: {
                        start: new Date().toISOString()
                    }
                }
            }
        });
        console.log(`   ↳ Notion status updated to '${status}'`);
    } catch (error) {
        console.error(`   ↳ Failed to update Notion status:`, error.body || error);
    }
}

main();
