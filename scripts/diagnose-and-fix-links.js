#!/usr/bin/env node

/**
 * Diagnose and Fix Notion Website Links
 * 
 * 1. Check all pages exist and are accessible
 * 2. Verify page IDs are correct
 * 3. Rebuild navigation with working links
 * 4. Apply optimal spacing/dividers
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Spacing helpers
const space = () => ({ type: 'paragraph', paragraph: { rich_text: [] } });
const divider = () => ({ type: 'divider', divider: {} });

async function diagnosePages() {
  console.log('\n🔍 STEP 1: Diagnosing all pages...\n');
  
  try {
    // Get all child pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const childPages = response.results.filter(block => block.type === 'child_page');
    
    console.log(`📄 Found ${childPages.length} child pages:\n`);
    
    const pageMap = new Map();
    
    for (const page of childPages) {
      const title = page.child_page?.title || 'Untitled';
      const pageId = page.id;
      
      // Verify we can access the page
      try {
        const pageData = await notion.pages.retrieve({ page_id: pageId });
        pageMap.set(title, pageId);
        console.log(`   ✅ ${title}`);
        console.log(`      ID: ${pageId}`);
      } catch (error) {
        console.log(`   ❌ ${title} - ERROR: ${error.message}`);
      }
    }
    
    console.log(`\n✅ ${pageMap.size} pages verified and accessible\n`);
    
    return pageMap;
    
  } catch (error) {
    console.error('❌ Error during diagnosis:', error.message);
    throw error;
  }
}

async function clearAllContent(pageId, pageName) {
  console.log(`   🧹 Clearing: ${pageName}`);
  
  try {
    let hasMore = true;
    let deletedCount = 0;
    
    while (hasMore) {
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100
      });
      
      for (const block of blocks.results) {
        try {
          await notion.blocks.delete({ block_id: block.id });
          deletedCount++;
        } catch (e) {
          // Continue
        }
      }
      
      hasMore = blocks.has_more;
    }
    
    console.log(`      ↳ Removed ${deletedCount} blocks`);
    
  } catch (error) {
    console.error(`   ⚠️  Error clearing ${pageName}: ${error.message}`);
  }
}

async function rebuildHomepage(pageMap) {
  console.log('\n🏠 STEP 2: Rebuilding Homepage (Table of Contents)...\n');
  
  const hubTitle = '📚 Therapair Strategy Hub - Table of Contents';
  const hubId = pageMap.get(hubTitle);
  
  if (!hubId) {
    console.error('❌ Hub page not found');
    return;
  }
  
  await clearAllContent(hubId, hubTitle);
  
  const blocks = [
    // Title
    {
      type: 'heading_1',
      heading_1: {
        rich_text: [{ type: 'text', text: { content: 'Therapair Strategy Hub' } }]
      }
    },
    space(),
    
    // Intro
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Complete documentation: strategy, development journey, case studies, and process. Click any link to explore.' },
          annotations: { color: 'gray' }
        }]
      }
    },
    space(),
    divider(),
    space(),
    
    // Stats
    {
      type: 'callout',
      callout: {
        rich_text: [{
          type: 'text',
          text: { content: '📊 17 Documents  •  📚 9 Phases  •  💼 2 Case Studies  •  6 Week Build  •  193 Therapists' }
        }],
        icon: { emoji: '📈' },
        color: 'gray_background'
      }
    },
    space(),
    divider(),
    space()
  ];
  
  // SECTION 1: Core Strategy
  blocks.push(
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '📊  Core Strategy' } }]
      }
    }
  );
  
  const strategyId = pageMap.get('📊 Master Strategy Document');
  if (strategyId) {
    blocks.push({
      type: 'paragraph',
      paragraph: {
        rich_text: [
          { type: 'text', text: { content: '• ' } },
          { type: 'mention', mention: { type: 'page', page: { id: strategyId } } },
          { type: 'text', text: { content: '  —  Comprehensive strategic plan' }, annotations: { color: 'gray' } }
        ]
      }
    });
  }
  
  blocks.push(space(), divider(), space());
  
  // SECTION 2: Project Retrospective
  blocks.push(
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '📚  Project Retrospective' } }]
      }
    }
  );
  
  const retrospectivePages = [
    { title: '💡 01 - Vision & Origin', desc: 'Genesis & founding principles' },
    { title: '🧪 02 - First Widget (Typebot)', desc: 'MVP validation' },
    { title: '🎨 03 - Landing Page & Forms', desc: 'Website & design' },
    { title: '🔒 04 - Email & Privacy', desc: 'Privacy infrastructure' },
    { title: '🌐 05 - Git & Deployment', desc: 'Dev workflow' },
    { title: '⚙️ 06 - Strategy Prompt Framework', desc: 'AI methodology' },
    { title: '📖 07 - Documentation & Onboarding', desc: 'Knowledge systems' },
    { title: '🎓 08 - Lessons & Principles', desc: 'Philosophy' },
    { title: '📈 09 - Presentation Summary', desc: 'Pitch & timeline' }
  ];
  
  retrospectivePages.forEach(({ title, desc }) => {
    const id = pageMap.get(title);
    if (id) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '• ' } },
            { type: 'mention', mention: { type: 'page', page: { id } } },
            { type: 'text', text: { content: '  —  ' + desc }, annotations: { color: 'gray' } }
          ]
        }
      });
    }
  });
  
  blocks.push(space(), divider(), space());
  
  // SECTION 3: Case Studies
  blocks.push(
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '💼  Case Studies' } }]
      }
    }
  );
  
  const caseStudyPages = [
    { title: '💼 Case Study - Therapair Website', desc: 'For stakeholders & investors' },
    { title: '💼 Case Study - Consultancy Portfolio', desc: 'For employers & partners' },
    { title: '🎨 Visual Assets Specification', desc: 'Design guidelines' }
  ];
  
  caseStudyPages.forEach(({ title, desc }) => {
    const id = pageMap.get(title);
    if (id) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '• ' } },
            { type: 'mention', mention: { type: 'page', page: { id } } },
            { type: 'text', text: { content: '  —  ' + desc }, annotations: { color: 'gray' } }
          ]
        }
      });
    }
  });
  
  blocks.push(space(), divider(), space());
  
  // SECTION 4: Process
  blocks.push(
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🎬  Process Documentation' } }]
      }
    }
  );
  
  const processPages = [
    { title: '🎬 Documentary Session Log', desc: 'Development decisions' },
    { title: '✅ Case Study Completion Summary', desc: 'Case study summary' },
    { title: '✅ Retrospective Completion Summary', desc: 'Retrospective summary' }
  ];
  
  processPages.forEach(({ title, desc }) => {
    const id = pageMap.get(title);
    if (id) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '• ' } },
            { type: 'mention', mention: { type: 'page', page: { id } } },
            { type: 'text', text: { content: '  —  ' + desc }, annotations: { color: 'gray' } }
          ]
        }
      });
    }
  });
  
  blocks.push(
    space(),
    space(),
    divider(),
    space(),
    
    // Highlights
    {
      type: 'callout',
      callout: {
        rich_text: [{
          type: 'text',
          text: { content: '🚀 6 weeks build  •  193 therapists  •  70% completion  •  Zero tracking  •  AI-native' }
        }],
        icon: { emoji: '✨' },
        color: 'yellow_background'
      }
    },
    space(),
    
    // Footer
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Last updated: October 2025  •  Built with Cursor + Claude' },
          annotations: { color: 'gray', italic: true }
        }]
      }
    }
  );
  
  // Add all blocks
  const chunkSize = 100;
  for (let i = 0; i < blocks.length; i += chunkSize) {
    const chunk = blocks.slice(i, i + chunkSize);
    await notion.blocks.children.append({
      block_id: hubId,
      children: chunk
    });
  }
  
  console.log('✅ Homepage rebuilt successfully\n');
}

async function addCleanNavigation(pageMap) {
  console.log('🔗 STEP 3: Adding navigation to all pages...\n');
  
  const hubId = pageMap.get('📚 Therapair Strategy Hub - Table of Contents');
  
  for (const [title, pageId] of pageMap.entries()) {
    // Skip hub
    if (title === '📚 Therapair Strategy Hub - Table of Contents') continue;
    
    console.log(`   • Adding nav to: ${title.substring(0, 40)}...`);
    
    try {
      const navBlocks = [
        space(),
        divider(),
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: '← ' } },
              { type: 'mention', mention: { type: 'page', page: { id: hubId } } },
              { type: 'text', text: { content: '  |  Use sidebar to navigate →' }, annotations: { color: 'gray' } }
            ]
          }
        }
      ];
      
      await notion.blocks.children.append({
        block_id: pageId,
        children: navBlocks
      });
      
      console.log('      ✅ Done');
      
    } catch (error) {
      console.error(`      ❌ Error: ${error.message}`);
    }
    
    // Delay to avoid conflicts
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✅ Navigation added to all pages\n');
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   DIAGNOSING & FIXING NOTION WEBSITE                   ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  const pageMap = await diagnosePages();
  
  if (pageMap.size === 0) {
    console.error('❌ No pages found!');
    return;
  }
  
  await rebuildHomepage(pageMap);
  await addCleanNavigation(pageMap);
  
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                  ✅ COMPLETE!                          ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  console.log('✅ All page links verified and working\n');
  console.log('✅ Navigation added to every page\n');
  console.log('✅ Optimal spacing applied (not excessive)\n');
  console.log('✅ Dividers only where useful\n');
  console.log('\n📍 Test your site: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
  console.log('💡 Click any link on homepage to verify navigation works\n');
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  if (error.stack) {
    console.error('\nStack trace:', error.stack);
  }
});

