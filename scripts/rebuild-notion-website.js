#!/usr/bin/env node

/**
 * Rebuild Notion as Professional Website
 * 
 * Applies global best practice UI/UX design:
 * - Optimal spacing (not too much, not too little)
 * - Clear visual hierarchy
 * - Proper navigation on all pages
 * - Professional layout
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Helper: Create spacing (1 empty line)
const space = () => ({ type: 'paragraph', paragraph: { rich_text: [] } });

// Helper: Create divider
const divider = () => ({ type: 'divider', divider: {} });

async function getAllPages() {
  const response = await notion.blocks.children.list({
    block_id: PARENT_PAGE_ID,
    page_size: 100
  });
  
  const pages = response.results.filter(block => block.type === 'child_page');
  const pageMap = {};
  
  for (const page of pages) {
    const title = page.child_page?.title || 'Untitled';
    pageMap[title] = page.id;
  }
  
  return pageMap;
}

async function clearPageContent(pageId) {
  let hasMore = true;
  
  while (hasMore) {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    });
    
    for (const block of blocks.results) {
      try {
        await notion.blocks.delete({ block_id: block.id });
      } catch (e) {
        // Continue
      }
    }
    
    hasMore = blocks.has_more;
  }
}

async function addBlocks(pageId, blocks) {
  const chunkSize = 100;
  for (let i = 0; i < blocks.length; i += chunkSize) {
    const chunk = blocks.slice(i, i + chunkSize);
    await notion.blocks.children.append({
      block_id: pageId,
      children: chunk
    });
  }
}

async function rebuildHomepage(pageMap) {
  console.log('\n🏠 Rebuilding Homepage (Table of Contents)...\n');
  
  const hubId = pageMap['📚 Therapair Strategy Hub - Table of Contents'];
  if (!hubId) {
    console.error('❌ Hub page not found');
    return;
  }
  
  await clearPageContent(hubId);
  
  const blocks = [
    // Header
    {
      type: 'heading_1',
      heading_1: {
        rich_text: [{ type: 'text', text: { content: 'Therapair Strategy Hub' }, annotations: { bold: true } }]
      }
    },
    space(),
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Complete documentation covering strategy, development journey, case studies, and process. Click any section below to explore.' },
          annotations: { color: 'gray' }
        }]
      }
    },
    space(),
    divider(),
    space(),
    
    // Quick overview callout
    {
      type: 'callout',
      callout: {
        rich_text: [{
          type: 'text',
          text: { content: '📊 17 Documents  •  📚 9 Phase Journey  •  💼 2 Case Studies  •  🎬 Process Docs' }
        }],
        icon: { emoji: '📈' },
        color: 'gray_background'
      }
    },
    space(),
    divider(),
    space(),
    
    // SECTION 1: Core Strategy
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '📊  Core Strategy' }, annotations: { bold: true } }]
      }
    },
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Comprehensive strategic plan covering audience, value proposition, and go-to-market.' },
          annotations: { italic: true }
        }]
      }
    },
    space()
  ];
  
  // Add Strategy link
  if (pageMap['📊 Master Strategy Document']) {
    blocks.push({
      type: 'paragraph',
      paragraph: {
        rich_text: [
          { type: 'text', text: { content: '    • ' } },
          { type: 'mention', mention: { type: 'page', page: { id: pageMap['📊 Master Strategy Document'] } } }
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
        rich_text: [{ type: 'text', text: { content: '📚  Project Retrospective' }, annotations: { bold: true } }]
      }
    },
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'The complete 6-week journey from concept to production.' },
          annotations: { italic: true }
        }]
      }
    },
    space()
  );
  
  // Add retrospective pages (2 columns effect with description)
  const retrospective = [
    { id: '💡 01 - Vision & Origin', desc: 'Genesis story & founding principles' },
    { id: '🧪 02 - First Widget (Typebot)', desc: 'MVP validation' },
    { id: '🎨 03 - Landing Page & Forms', desc: 'Website & design system' },
    { id: '🔒 04 - Email & Privacy', desc: 'Privacy-first infrastructure' },
    { id: '🌐 05 - Git & Deployment', desc: 'Development workflow' },
    { id: '⚙️ 06 - Strategy Prompt Framework', desc: 'Agentic AI methodology' },
    { id: '📖 07 - Documentation & Onboarding', desc: 'Knowledge systems' },
    { id: '🎓 08 - Lessons & Principles', desc: 'Philosophy & learnings' },
    { id: '📈 09 - Presentation Summary', desc: 'External pitch & timeline' }
  ];
  
  retrospective.forEach(page => {
    if (pageMap[page.id]) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '    • ' } },
            { type: 'mention', mention: { type: 'page', page: { id: pageMap[page.id] } } },
            { type: 'text', text: { content: '  —  ' + page.desc }, annotations: { color: 'gray' } }
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
        rich_text: [{ type: 'text', text: { content: '💼  Case Studies & Portfolio' }, annotations: { bold: true } }]
      }
    },
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Professional portfolio materials for multiple audiences.' },
          annotations: { italic: true }
        }]
      }
    },
    space()
  );
  
  const caseStudies = [
    { id: '💼 Case Study - Therapair Website', desc: 'For stakeholders & investors' },
    { id: '💼 Case Study - Consultancy Portfolio', desc: 'For employers & partners' },
    { id: '🎨 Visual Assets Specification', desc: 'Design guidelines' }
  ];
  
  caseStudies.forEach(page => {
    if (pageMap[page.id]) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '    • ' } },
            { type: 'mention', mention: { type: 'page', page: { id: pageMap[page.id] } } },
            { type: 'text', text: { content: '  —  ' + page.desc }, annotations: { color: 'gray' } }
          ]
        }
      });
    }
  });
  
  blocks.push(space(), divider(), space());
  
  // SECTION 4: Process Documentation
  blocks.push(
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🎬  Process Documentation' }, annotations: { bold: true } }]
      }
    },
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Behind-the-scenes development documentation.' },
          annotations: { italic: true }
        }]
      }
    },
    space()
  );
  
  const processDocs = [
    { id: '🎬 Documentary Session Log', desc: 'Real-time decision tracking' },
    { id: '✅ Case Study Completion Summary', desc: 'Case study summary' },
    { id: '✅ Retrospective Completion Summary', desc: 'Retrospective summary' }
  ];
  
  processDocs.forEach(page => {
    if (pageMap[page.id]) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '    • ' } },
            { type: 'mention', mention: { type: 'page', page: { id: pageMap[page.id] } } },
            { type: 'text', text: { content: '  —  ' + page.desc }, annotations: { color: 'gray' } }
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
          text: { content: '🚀 6 weeks development  •  193 therapists  •  70%+ completion rate  •  Zero tracking  •  AI-native development' },
          annotations: { bold: true }
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
          text: { content: 'Last updated: October 2025  •  Status: Production-ready  •  Built with Cursor + Claude' },
          annotations: { color: 'gray', italic: true }
        }]
      }
    }
  );
  
  await addBlocks(hubId, blocks);
  console.log('✅ Homepage rebuilt with professional design\n');
}

async function addNavigationToPages(pageMap) {
  console.log('🔗 Adding navigation to all pages...\n');
  
  const hubId = pageMap['📚 Therapair Strategy Hub - Table of Contents'];
  
  for (const [title, pageId] of Object.entries(pageMap)) {
    // Skip hub itself
    if (title === '📚 Therapair Strategy Hub - Table of Contents') continue;
    
    console.log(`   • ${title}`);
    
    // Add navigation at the bottom
    const navBlocks = [
      space(),
      divider(),
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '← ' } },
            { type: 'mention', mention: { type: 'page', page: { id: hubId } } },
            { type: 'text', text: { content: '  |  Use sidebar to navigate' }, annotations: { color: 'gray' } }
          ]
        }
      }
    ];
    
    await addBlocks(pageId, navBlocks);
    
    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  
  console.log('\n✅ Navigation added to all pages\n');
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   REBUILDING NOTION WEBSITE WITH BEST PRACTICES      ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');
  
  const pageMap = await getAllPages();
  console.log(`📄 Found ${Object.keys(pageMap).length} pages\n`);
  
  await rebuildHomepage(pageMap);
  await addNavigationToPages(pageMap);
  
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║               ✅ COMPLETE!                           ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');
  console.log('✨ Your Notion website now has:\n');
  console.log('   • Professional spacing (balanced, not excessive)');
  console.log('   • Clear visual hierarchy');
  console.log('   • Navigation on all pages');
  console.log('   • Clean, scannable layout');
  console.log('   • Website-like browsing\n');
  console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
}

main().catch(console.error);

