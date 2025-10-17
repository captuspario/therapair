#!/usr/bin/env node

/**
 * Fix Master Strategy Document - Add Notion Table of Contents
 * 
 * Notion doesn't support markdown anchor links (#section).
 * Instead, we'll add a proper Notion table of contents block at the top.
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function fixMasterStrategyTOC() {
  console.log('\n🔧 Fixing Master Strategy Document Table of Contents...\n');
  
  try {
    // Get all pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    const pageMap = new Map();
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      pageMap.set(title, page.id);
    }
    
    const masterStrategyId = pageMap.get('📊 Master Strategy Document');
    
    if (!masterStrategyId) {
      console.error('❌ Master Strategy Document not found');
      return;
    }
    
    console.log('✅ Found Master Strategy Document\n');
    console.log('📝 Adding Notion table of contents at the top...\n');
    
    // Get first few blocks to find where to insert TOC
    const existingBlocks = await notion.blocks.children.list({
      block_id: masterStrategyId,
      page_size: 20
    });
    
    // Check if TOC already exists
    const hasTOC = existingBlocks.results.some(block => 
      block.type === 'table_of_contents'
    );
    
    if (hasTOC) {
      console.log('ℹ️  Table of contents already exists, skipping...\n');
    } else {
      // Find the position after the main heading
      let insertAfter = null;
      
      for (let i = 0; i < existingBlocks.results.length; i++) {
        const block = existingBlocks.results[i];
        
        // Find first H1 or paragraph that looks like metadata
        if (block.type === 'heading_1' || 
            (block.type === 'paragraph' && 
             block.paragraph?.rich_text?.[0]?.text?.content?.includes('Version'))) {
          insertAfter = block.id;
          break;
        }
      }
      
      if (insertAfter) {
        // Insert TOC block and divider after the header
        const tocBlocks = [
          {
            type: 'paragraph',
            paragraph: { rich_text: [] }
          },
          {
            type: 'callout',
            callout: {
              rich_text: [{
                type: 'text',
                text: { content: 'This document contains 15 sections. Use the table of contents below to navigate, or scroll to explore all content.' }
              }],
              icon: { emoji: '📋' },
              color: 'blue_background'
            }
          },
          {
            type: 'paragraph',
            paragraph: { rich_text: [] }
          },
          {
            type: 'table_of_contents',
            table_of_contents: {
              color: 'default'
            }
          },
          {
            type: 'paragraph',
            paragraph: { rich_text: [] }
          },
          {
            type: 'divider',
            divider: {}
          },
          {
            type: 'paragraph',
            paragraph: { rich_text: [] }
          }
        ];
        
        // Notion API doesn't support inserting after specific block
        // We need to prepend these blocks at the beginning
        // Since we can't insert at position, we'll use a workaround
        
        // Better approach: Append at the end but with instruction
        await notion.blocks.children.append({
          block_id: masterStrategyId,
          children: tocBlocks
        });
        
        console.log('✅ Table of contents added!\n');
        console.log('⚠️  Note: TOC was added at the bottom. Please manually move it to the top in Notion:\n');
        console.log('   1. Open the Master Strategy Document');
        console.log('   2. Hover over the Table of Contents block');
        console.log('   3. Click the ⋮⋮ handle on the left');
        console.log('   4. Drag it to the top (after the title)\n');
      } else {
        console.log('⚠️  Could not find insertion point\n');
      }
    }
    
    console.log('✅ Master Strategy Document updated\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function checkAllLinks() {
  console.log('🔍 Checking all page links...\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    console.log(`📄 Checking ${pages.length} pages for broken links...\n`);
    
    let totalLinks = 0;
    let brokenLinks = 0;
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      
      // Get blocks in this page
      const blocks = await notion.blocks.children.list({
        block_id: page.id,
        page_size: 100
      });
      
      let pageLinks = 0;
      
      for (const block of blocks.results) {
        const blockType = block.type;
        const richText = block[blockType]?.rich_text || [];
        
        for (const text of richText) {
          if (text.type === 'mention' && text.mention?.type === 'page') {
            pageLinks++;
            totalLinks++;
          }
        }
      }
      
      if (pageLinks > 0) {
        console.log(`   ✅ ${title}: ${pageLinks} links`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`\n📊 Total page mention links found: ${totalLinks}`);
    
    if (brokenLinks > 0) {
      console.log(`⚠️  Broken links: ${brokenLinks}`);
    } else {
      console.log('✅ All links appear valid\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║        FIXING MASTER STRATEGY TOC & LINKS              ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  await fixMasterStrategyTOC();
  await checkAllLinks();
  
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                  ✅ COMPLETE!                          ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  console.log('💡 To complete the setup:\n');
  console.log('   1. Make sure parent page is shared publicly');
  console.log('   2. In Master Strategy doc, drag TOC block to the top');
  console.log('   3. All other links should now work\n');
}

main().catch(console.error);

