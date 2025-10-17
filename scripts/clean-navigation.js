#!/usr/bin/env node

/**
 * Clean Navigation - Remove nav bars from all pages except hub
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function cleanNavigation() {
  console.log('\n🧹 Cleaning navigation bars from pages...\n');
  
  try {
    // Get all pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    const hubTitle = '📚 Therapair Strategy Hub - Table of Contents';
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      
      // Skip the hub page
      if (title === hubTitle) {
        console.log(`⏭️  Skipping hub: ${title}`);
        continue;
      }
      
      console.log(`🧹 Cleaning: ${title}`);
      
      // Get all blocks in the page
      const blocks = await notion.blocks.children.list({
        block_id: page.id,
        page_size: 100
      });
      
      // Find and delete navigation callouts (they're at the end)
      let deletedCount = 0;
      for (const block of blocks.results) {
        // Check if it's a callout with navigation content
        if (block.type === 'callout') {
          const text = block.callout?.rich_text?.[0]?.text?.content || '';
          if (text.includes('← Back to') || text.includes('Navigate using sidebar')) {
            try {
              await notion.blocks.delete({ block_id: block.id });
              deletedCount++;
            } catch (e) {
              console.error(`   ⚠️  Error deleting block: ${e.message}`);
            }
          }
        }
        
        // Also delete dividers that come after callouts
        if (block.type === 'divider' && deletedCount > 0) {
          try {
            await notion.blocks.delete({ block_id: block.id });
          } catch (e) {
            // Continue
          }
        }
      }
      
      console.log(`   ↳ Removed ${deletedCount} navigation blocks`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n✅ Navigation cleaned!\n');
    console.log('📍 Hub page (Table of Contents) remains as your homepage');
    console.log('🌐 All other pages are clean, navigate using sidebar\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

cleanNavigation();

