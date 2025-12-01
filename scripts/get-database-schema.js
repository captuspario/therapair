/**
 * Get Notion Database Schema
 * Retrieves the database structure even if empty
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const notion = new Client({ auth: NOTION_TOKEN });

async function main() {
    console.log('\n🔍 Retrieving database schema...\n');
    
    try {
        const database = await notion.databases.retrieve({
            database_id: DATABASE_ID
        });
        
        console.log('✅ Database Found!\n');
        console.log('📊 Database Information:');
        console.log('='.repeat(60));
        console.log(`  Title: ${database.title[0]?.plain_text || 'Untitled'}`);
        console.log(`  ID: ${DATABASE_ID}`);
        console.log(`  URL: ${database.url}`);
        console.log(`  Created: ${database.created_time}`);
        console.log(`  Last Edited: ${database.last_edited_time}\n`);
        
        console.log('📋 Properties:');
        console.log('='.repeat(60));
        
        const properties = database.properties || {};
        
        if (Object.keys(properties).length === 0) {
            console.log('⚠️  No properties defined in database');
            console.log('   This is a new/empty database\n');
            
            console.log('💡 Recommended Properties to Add in Notion:');
            console.log('   1. Name (Title)');
            console.log('   2. Email (Email)');
            console.log('   3. Profession (Select or Text)');
            console.log('   4. Specialisations (Text or Multi-select)');
            console.log('   5. Location (Text)');
            console.log('   6. Organisation (Text)\n');
            
        } else {
            Object.entries(properties).forEach(([name, prop]) => {
                console.log(`  "${name}"`.padEnd(35) + `[${prop.type}]`);
            });
        }
        
        console.log('\n' + '='.repeat(60) + '\n');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'object_not_found') {
            console.log('\n💡 The database wasn\'t found or isn\'t shared with the integration');
            console.log('   Make sure to share the database with your Notion integration!');
        }
    }
}

main();




