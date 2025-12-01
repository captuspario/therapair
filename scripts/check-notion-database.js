/**
 * Check Notion Database Structure
 * Fetches sample entries to see actual property names
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const notion = new Client({ auth: NOTION_TOKEN });

async function main() {
    console.log('\n🔍 Fetching database structure...\n');
    
    try {
        // Use search to find pages in the database
        const response = await notion.search({
            filter: {
                property: 'object',
                value: 'page'
            },
            page_size: 5
        });
        
        console.log(`Found ${response.results.length} pages\n`);
        
        // Filter for pages in our database
        const pagesInDb = response.results.filter(page => 
            page.parent?.database_id === DATABASE_ID.replace(/-/g, '')
        );
        
        console.log(`Pages in our database: ${pagesInDb.length}\n`);
        
        if (pagesInDb.length > 0) {
            const firstPage = pagesInDb[0];
            
            console.log('📋 Actual Property Names:');
            console.log('='.repeat(60));
            
            Object.entries(firstPage.properties).forEach(([name, prop]) => {
                console.log(`  "${name}"`.padEnd(35) + `[${prop.type}]`);
            });
            
            console.log('\n📄 Sample Entry:');
            console.log('='.repeat(60));
            
            Object.entries(firstPage.properties).forEach(([name, prop]) => {
                const value = extractValue(prop);
                if (value) {
                    console.log(`  ${name}: ${value}`);
                }
            });
            
        } else {
            console.log('⚠️  No pages found in this database');
            console.log('   The database might be empty or not shared with the integration');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function extractValue(prop) {
    switch (prop.type) {
        case 'title':
            return prop.title[0]?.plain_text || '';
        case 'rich_text':
            return prop.rich_text[0]?.plain_text || '';
        case 'email':
            return prop.email || '';
        case 'select':
            return prop.select?.name || '';
        case 'multi_select':
            return prop.multi_select.map(s => s.name).join(', ');
        case 'number':
            return prop.number || '';
        case 'url':
            return prop.url || '';
        case 'checkbox':
            return prop.checkbox ? 'Yes' : 'No';
        case 'date':
            return prop.date?.start || '';
        default:
            return '';
    }
}

main();




