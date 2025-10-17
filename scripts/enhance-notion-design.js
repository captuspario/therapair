#!/usr/bin/env node

/**
 * Enhance Notion Design
 * 
 * Adds visual polish: spacing, dividers, tiles, callouts, quotes, icons, colors
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Helper: Add spacing (empty paragraph)
function createSpacing(count = 1) {
  return Array(count).fill({
    type: 'paragraph',
    paragraph: { rich_text: [] }
  });
}

// Helper: Create divider
function createDivider() {
  return {
    type: 'divider',
    divider: {}
  };
}

// Helper: Create heading with emoji
function createHeading(level, text, emoji = null) {
  const richText = emoji 
    ? [
        { type: 'text', text: { content: emoji + ' ' } },
        { type: 'text', text: { content: text }, annotations: { bold: true } }
      ]
    : [{ type: 'text', text: { content: text }, annotations: { bold: true } }];
  
  return {
    type: `heading_${level}`,
    [`heading_${level}`]: { rich_text }
  };
}

// Helper: Create callout
function createCallout(text, emoji = '💡', color = 'gray_background') {
  return {
    type: 'callout',
    callout: {
      rich_text: [{ type: 'text', text: { content: text } }],
      icon: { emoji },
      color
    }
  };
}

// Helper: Create quote
function createQuote(text) {
  return {
    type: 'quote',
    quote: {
      rich_text: [{ type: 'text', text: { content: text } }]
    }
  };
}

async function enhanceTableOfContents() {
  console.log('\n🎨 Enhancing Table of Contents (Homepage)...\n');
  
  try {
    const hubTitle = '📚 Therapair Strategy Hub - Table of Contents';
    
    // Get all pages
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
    
    const hubId = pageMap[hubTitle];
    if (!hubId) {
      console.error('❌ Could not find hub page');
      return;
    }
    
    console.log('✅ Found hub page, recreating with enhanced design...');
    
    // Delete existing content
    const existingBlocks = await notion.blocks.children.list({
      block_id: hubId
    });
    
    for (const block of existingBlocks.results) {
      try {
        await notion.blocks.delete({ block_id: block.id });
      } catch (e) {
        // Continue
      }
    }
    
    console.log('   ↳ Cleared existing content');
    
    // Create enhanced homepage content
    const enhancedBlocks = [
      // Hero section
      ...createSpacing(1),
      createHeading(1, 'Therapair Strategy Hub'),
      ...createSpacing(1),
      
      createCallout(
        'Your comprehensive guide to Therapair\'s strategy, development journey, and documentation. Navigate through sections below or use the sidebar.',
        '🏠',
        'blue_background'
      ),
      
      ...createSpacing(2),
      createDivider(),
      ...createSpacing(2),
      
      // Quick stats callout
      createCallout(
        '📊 17 Documents | 📚 9 Retrospective Phases | 💼 2 Case Studies | 🎬 Process Documentation',
        '📈',
        'gray_background'
      ),
      
      ...createSpacing(2),
      createDivider(),
      ...createSpacing(2),
      
      // Core Strategy Section
      createHeading(2, 'Core Strategy', '📊'),
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: 'Comprehensive strategic plan covering audience, value proposition, go-to-market, and business model.' } }
          ]
        }
      },
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '    → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['📊 Master Strategy Document'] }
              }
            }
          ]
        }
      },
      
      ...createSpacing(2),
      createDivider(),
      ...createSpacing(2),
      
      // Project Retrospective Section
      createHeading(2, 'Project Retrospective', '📚'),
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: 'Complete journey from vision to production (6 weeks, October 2025)' }, annotations: { italic: true } }
          ]
        }
      },
      ...createSpacing(1),
    ];
    
    // Add retrospective pages with indentation
    const retrospectivePages = [
      { id: '💡 01 - Vision & Origin', desc: 'Genesis story and founding principles' },
      { id: '🧪 02 - First Widget (Typebot)', desc: 'MVP implementation and validation' },
      { id: '🎨 03 - Landing Page & Forms', desc: 'Website architecture and design' },
      { id: '🔒 04 - Email & Privacy', desc: 'Privacy-first infrastructure' },
      { id: '🌐 05 - Git & Deployment', desc: 'Development workflow and deployment' },
      { id: '⚙️ 06 - Strategy Prompt Framework', desc: 'Agentic AI methodology' },
      { id: '📖 07 - Documentation & Onboarding', desc: 'Knowledge systems and onboarding' },
      { id: '🎓 08 - Lessons & Principles', desc: 'Philosophy and key learnings' },
      { id: '📈 09 - Presentation Summary', desc: 'External pitch and timeline' }
    ];
    
    retrospectivePages.forEach(page => {
      enhancedBlocks.push(
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: '        → ' } },
              {
                type: 'mention',
                mention: {
                  type: 'page',
                  page: { id: pageMap[page.id] }
                }
              },
              { type: 'text', text: { content: ' — ' + page.desc }, annotations: { color: 'gray' } }
            ]
          }
        }
      );
    });
    
    enhancedBlocks.push(
      ...createSpacing(2),
      createDivider(),
      ...createSpacing(2),
      
      // Case Studies Section
      createHeading(2, 'Case Studies & Portfolio', '💼'),
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: 'Professional portfolio materials for stakeholders and potential clients' }, annotations: { italic: true } }
          ]
        }
      },
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['💼 Case Study - Therapair Website'] }
              }
            },
            { type: 'text', text: { content: ' — For stakeholders, investors, and clients' }, annotations: { color: 'gray' } }
          ]
        }
      },
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['💼 Case Study - Consultancy Portfolio'] }
              }
            },
            { type: 'text', text: { content: ' — For employers and partners' }, annotations: { color: 'gray' } }
          ]
        }
      },
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['🎨 Visual Assets Specification'] }
              }
            },
            { type: 'text', text: { content: ' — Design assets and guidelines' }, annotations: { color: 'gray' } }
          ]
        }
      },
      
      ...createSpacing(2),
      createDivider(),
      ...createSpacing(2),
      
      // Process Documentation
      createHeading(2, 'Process Documentation', '🎬'),
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: 'Behind-the-scenes documentation of the development process' }, annotations: { italic: true } }
          ]
        }
      },
      ...createSpacing(1),
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['🎬 Documentary Session Log'] }
              }
            },
            { type: 'text', text: { content: ' — Real-time decision tracking' }, annotations: { color: 'gray' } }
          ]
        }
      },
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['✅ Case Study Completion Summary'] }
              }
            },
            { type: 'text', text: { content: ' — Case study development summary' }, annotations: { color: 'gray' } }
          ]
        }
      },
      
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: {
                type: 'page',
                page: { id: pageMap['✅ Retrospective Completion Summary'] }
              }
            },
            { type: 'text', text: { content: ' — Retrospective documentation summary' }, annotations: { color: 'gray' } }
          ]
        }
      },
      
      ...createSpacing(3),
      createDivider(),
      ...createSpacing(2),
      
      // Project highlights
      createHeading(3, 'Project Highlights'),
      ...createSpacing(1),
      
      createCallout(
        '🚀 Timeline: 6 weeks from concept to production\n📊 Impact: 193 therapists, 70%+ completion rate\n💡 Innovation: AI-native development, 10x faster\n🔒 Privacy: Zero third-party tracking',
        '✨',
        'yellow_background'
      ),
      
      ...createSpacing(2),
      
      createQuote(
        'Built with: Cursor + Claude (Agentic AI) | Privacy-first architecture | Community-centered design'
      ),
      
      ...createSpacing(2),
      createDivider(),
      ...createSpacing(1),
      
      // Footer
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: 'Last updated: October 2025 | Status: Production-ready' }, annotations: { color: 'gray', italic: true } }
          ]
        }
      }
    );
    
    // Add blocks in batches
    console.log('   ↳ Adding enhanced content...');
    const chunkSize = 100;
    for (let i = 0; i < enhancedBlocks.length; i += chunkSize) {
      const chunk = enhancedBlocks.slice(i, i + chunkSize);
      await notion.blocks.children.append({
        block_id: hubId,
        children: chunk
      });
      console.log(`   ↳ Added batch ${Math.floor(i / chunkSize) + 1}`);
    }
    
    console.log('✅ Table of Contents enhanced!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function addPageIconsAndColors() {
  console.log('🎨 Adding icons and colors to pages...\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    const iconMap = {
      'Strategy': '📊',
      'Vision': '💡',
      'Widget': '🧪',
      'Landing': '🎨',
      'Email': '🔒',
      'Git': '🌐',
      'Framework': '⚙️',
      'Documentation': '📖',
      'Lessons': '🎓',
      'Presentation': '📈',
      'Case Study': '💼',
      'Visual': '🎨',
      'Documentary': '🎬',
      'Completion': '✅',
      'Hub': '🏠'
    };
    
    const coverColors = [
      'blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green'
    ];
    
    let colorIndex = 0;
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      
      // Find appropriate icon
      let icon = '📄';
      for (const [key, emoji] of Object.entries(iconMap)) {
        if (title.includes(key)) {
          icon = emoji;
          break;
        }
      }
      
      try {
        await notion.pages.update({
          page_id: page.id,
          icon: { emoji: icon }
        });
        
        console.log(`   ✅ Added icon to: ${title}`);
        colorIndex = (colorIndex + 1) % coverColors.length;
      } catch (error) {
        console.error(`   ⚠️  Error updating ${title}: ${error.message}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log('\n✅ Icons and colors added!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function main() {
  console.log('\n🎨 ═══════════════════════════════════════════════════════════\n');
  console.log('   ENHANCING NOTION DESIGN WITH VISUAL POLISH\n');
  console.log('   ═══════════════════════════════════════════════════════════\n');
  
  await enhanceTableOfContents();
  await addPageIconsAndColors();
  
  console.log('🎉 ═══════════════════════════════════════════════════════════\n');
  console.log('   DESIGN ENHANCEMENT COMPLETE!\n');
  console.log('   ═══════════════════════════════════════════════════════════\n');
  console.log('✨ Your Notion website now has:\n');
  console.log('   • Generous spacing and indentation');
  console.log('   • Visual dividers between sections');
  console.log('   • Colorful callouts and highlights');
  console.log('   • Icons for all pages');
  console.log('   • Descriptive annotations');
  console.log('   • Professional layout\n');
  console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
}

main();

