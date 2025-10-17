#!/usr/bin/env node

/**
 * Remove icons from all Notion pages
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function removeIcons() {
  console.log('\n🔄 Removing icons from Notion pages...\n');
  
  try {
    // Get all child pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    console.log(`📄 Found ${pages.length} pages\n`);
    
    for (const page of pages) {
      try {
        // Remove icon by setting it to null
        await notion.pages.update({
          page_id: page.id,
          icon: null
        });
        
        console.log(`✅ Removed icon from: ${page.child_page?.title || 'Untitled'}`);
      } catch (error) {
        console.error(`❌ Error removing icon: ${error.message}`);
      }
    }
    
    console.log('\n✅ All icons removed!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeIcons();

