/**
 * Read Existing Therapist Entry to See Property Structure
 * This will help us understand what properties exist in the database
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const notion = new Client({ auth: NOTION_TOKEN });

async function main() {
    console.log('\n🔍 Reading existing therapist entries to understand structure...\n');
    
    try {
        // Search for pages in the database
        const response = await notion.search({
            filter: {
                property: 'object',
                value: 'page'
            },
            page_size: 10
        });
        
        console.log(`📊 Found ${response.results.length} total pages\n`);
        
        // Find pages that belong to our database
        const pagesInDb = response.results.filter(page => 
            page.parent?.database_id === DATABASE_ID.replace(/-/g, '')
        );
        
        console.log(`📋 Pages in therapist database: ${pagesInDb.length}\n`);
        
        if (pagesInDb.length > 0) {
            const firstPage = pagesInDb[0];
            console.log('📄 Reading first therapist entry...\n');
            
            // Get detailed page information
            const pageDetails = await notion.pages.retrieve({
                page_id: firstPage.id
            });
            
            console.log('✅ Successfully retrieved page details!\n');
            console.log('📋 Available Properties:');
            console.log('='.repeat(60));
            
            Object.entries(pageDetails.properties).forEach(([name, prop]) => {
                console.log(`  "${name}"`.padEnd(35) + `[${prop.type}]`);
                
                // Show sample value for title and email
                if (prop.type === 'title' && prop.title?.[0]?.plain_text) {
                    console.log(`    Value: "${prop.title[0].plain_text}"`);
                }
                if (prop.type === 'email' && prop.email) {
                    console.log(`    Value: "${prop.email}"`);
                }
                if (prop.type === 'rich_text' && prop.rich_text?.[0]?.plain_text) {
                    console.log(`    Value: "${prop.rich_text[0].plain_text}"`);
                }
            });
            
            console.log('\n' + '='.repeat(60));
            console.log('✅ Now we know the exact property names!');
            console.log('='.repeat(60) + '\n');
            
        } else {
            console.log('⚠️  No pages found in the database');
            console.log('   This suggests the database might be empty or the integration doesn\'t have access');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Full error:', error);
    }
}

main();



