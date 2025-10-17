#!/usr/bin/env node

/**
 * Make All Notion Pages Public
 * 
 * Unfortunately, the Notion API doesn't support setting pages to public.
 * This script provides instructions for manual setup.
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function listPages() {
  console.log('\n📋 NOTION PUBLIC SHARING GUIDE\n');
  console.log('═'.repeat(60) + '\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    console.log('⚠️  IMPORTANT: The Notion API cannot make pages public automatically.\n');
    console.log('You need to make the PARENT page public, which will share all child pages.\n');
    console.log('═'.repeat(60) + '\n');
    
    console.log('🔧 HOW TO FIX "NO ACCESS" ERROR:\n');
    console.log('METHOD 1: Share Parent Page (Recommended)\n');
    console.log('  1. Open: https://notion.so/28b5c25944da800aad7bd26073cac726');
    console.log('  2. Click "Share" button (top right corner)');
    console.log('  3. Toggle "Share to web" ON');
    console.log('  4. Check "Allow duplicate as template" (optional)');
    console.log('  5. Click "Copy link"\n');
    console.log('  ✅ This will make ALL child pages accessible!\n');
    console.log('═'.repeat(60) + '\n');
    
    console.log('METHOD 2: Share Individual Pages (If Method 1 Doesn\'t Work)\n');
    console.log('  You would need to manually share each of these pages:\n');
    
    pages.forEach((page, index) => {
      const title = page.child_page?.title || 'Untitled';
      const pageId = page.id.replace(/-/g, '');
      console.log(`  ${index + 1}. ${title}`);
      console.log(`     https://notion.so/${pageId}`);
    });
    
    console.log('\n═'.repeat(60) + '\n');
    console.log('💡 RECOMMENDED APPROACH:\n');
    console.log('  Just share the parent page with "Share to web"');
    console.log('  This automatically shares all child pages\n');
    console.log('═'.repeat(60) + '\n');
    
    console.log('🎯 ALTERNATIVE: Use Notion as Private Workspace\n');
    console.log('  If you want to keep it private:');
    console.log('  1. Don\'t enable "Share to web"');
    console.log('  2. Invite specific people via email');
    console.log('  3. They\'ll need Notion accounts to view\n');
    console.log('═'.repeat(60) + '\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listPages();

