#!/usr/bin/env node

/**
 * Rebuild Table of Contents (Homepage)
 * Fixes the broken hub page with proper navigation
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function rebuildTableOfContents() {
  console.log('\n🔧 Rebuilding Table of Contents...\n');
  
  try {
    // Get all pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    const pageMap = {};
    
    console.log('📄 Found pages:\n');
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      pageMap[title] = page.id;
      console.log(`  • ${title}`);
    }
    
    const hubTitle = '📚 Therapair Strategy Hub - Table of Contents';
    const hubId = pageMap[hubTitle];
    
    if (!hubId) {
      console.error('\n❌ Could not find hub page');
      return;
    }
    
    console.log(`\n✅ Found hub page: ${hubId}\n`);
    console.log('🧹 Clearing existing content...\n');
    
    // Delete existing blocks
    const existingBlocks = await notion.blocks.children.list({
      block_id: hubId,
      page_size: 100
    });
    
    for (const block of existingBlocks.results) {
      try {
        await notion.blocks.delete({ block_id: block.id });
      } catch (e) {
        // Continue
      }
    }
    
    console.log('✅ Content cleared\n');
    console.log('📝 Creating new content...\n');
    
    // Create new content
    const blocks = [];
    
    // Hero section
    blocks.push(
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'heading_1',
        heading_1: {
          rich_text: [{ type: 'text', text: { content: 'Therapair Strategy Hub' }, annotations: { bold: true } }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'callout',
        callout: {
          rich_text: [{
            type: 'text',
            text: { content: 'Your comprehensive guide to Therapair\'s strategy, development journey, and documentation. Navigate through sections below or use the sidebar.' }
          }],
          icon: { emoji: '🏠' },
          color: 'blue_background'
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Stats callout
    blocks.push(
      {
        type: 'callout',
        callout: {
          rich_text: [{
            type: 'text',
            text: { content: '📊 17 Documents | 📚 9 Retrospective Phases | 💼 2 Case Studies | 🎬 Process Documentation' }
          }],
          icon: { emoji: '📈' },
          color: 'gray_background'
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Core Strategy Section
    blocks.push(
      {
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { type: 'text', text: { content: '📊 ' } },
            { type: 'text', text: { content: 'Core Strategy' }, annotations: { bold: true } }
          ]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: 'Comprehensive strategic plan covering audience, value proposition, go-to-market, and business model.' },
            annotations: { italic: true }
          }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Add link to Master Strategy
    if (pageMap['📊 Master Strategy Document']) {
      blocks.push({
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '        → ' } },
            {
              type: 'mention',
              mention: { type: 'page', page: { id: pageMap['📊 Master Strategy Document'] } }
            }
          ]
        }
      });
    }
    
    blocks.push(
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Project Retrospective Section
    blocks.push(
      {
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { type: 'text', text: { content: '📚 ' } },
            { type: 'text', text: { content: 'Project Retrospective' }, annotations: { bold: true } }
          ]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: 'Complete journey from vision to production (6 weeks, October 2025)' },
            annotations: { italic: true }
          }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Add retrospective pages
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
      if (pageMap[page.id]) {
        blocks.push({
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: '        → ' } },
              {
                type: 'mention',
                mention: { type: 'page', page: { id: pageMap[page.id] } }
              },
              { type: 'text', text: { content: ' — ' + page.desc }, annotations: { color: 'gray' } }
            ]
          }
        });
      }
    });
    
    blocks.push(
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Case Studies Section
    blocks.push(
      {
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { type: 'text', text: { content: '💼 ' } },
            { type: 'text', text: { content: 'Case Studies & Portfolio' }, annotations: { bold: true } }
          ]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: 'Professional portfolio materials for stakeholders and potential clients' },
            annotations: { italic: true }
          }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Add case study links
    const caseStudies = [
      { id: '💼 Case Study - Therapair Website', desc: 'For stakeholders, investors, and clients' },
      { id: '💼 Case Study - Consultancy Portfolio', desc: 'For employers and partners' },
      { id: '🎨 Visual Assets Specification', desc: 'Design assets and guidelines' }
    ];
    
    caseStudies.forEach(page => {
      if (pageMap[page.id]) {
        blocks.push({
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: '        → ' } },
              {
                type: 'mention',
                mention: { type: 'page', page: { id: pageMap[page.id] } }
              },
              { type: 'text', text: { content: ' — ' + page.desc }, annotations: { color: 'gray' } }
            ]
          }
        });
      }
    });
    
    blocks.push(
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Process Documentation
    blocks.push(
      {
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { type: 'text', text: { content: '🎬 ' } },
            { type: 'text', text: { content: 'Process Documentation' }, annotations: { bold: true } }
          ]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: 'Behind-the-scenes documentation of the development process' },
            annotations: { italic: true }
          }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Add process doc links
    const processDocs = [
      { id: '🎬 Documentary Session Log', desc: 'Real-time decision tracking' },
      { id: '✅ Case Study Completion Summary', desc: 'Case study development summary' },
      { id: '✅ Retrospective Completion Summary', desc: 'Retrospective documentation summary' }
    ];
    
    processDocs.forEach(page => {
      if (pageMap[page.id]) {
        blocks.push({
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: '        → ' } },
              {
                type: 'mention',
                mention: { type: 'page', page: { id: pageMap[page.id] } }
              },
              { type: 'text', text: { content: ' — ' + page.desc }, annotations: { color: 'gray' } }
            ]
          }
        });
      }
    });
    
    blocks.push(
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } }
    );
    
    // Project highlights
    blocks.push(
      {
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: 'Project Highlights' }, annotations: { bold: true } }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'callout',
        callout: {
          rich_text: [{
            type: 'text',
            text: { content: '🚀 Timeline: 6 weeks from concept to production\n📊 Impact: 193 therapists, 70%+ completion rate\n💡 Innovation: AI-native development, 10x faster\n🔒 Privacy: Zero third-party tracking' }
          }],
          icon: { emoji: '✨' },
          color: 'yellow_background'
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'quote',
        quote: {
          rich_text: [{
            type: 'text',
            text: { content: 'Built with: Cursor + Claude (Agentic AI) | Privacy-first architecture | Community-centered design' }
          }]
        }
      },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      { type: 'divider', divider: {} },
      { type: 'paragraph', paragraph: { rich_text: [] } },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: 'Last updated: October 2025 | Status: Production-ready' },
            annotations: { color: 'gray', italic: true }
          }]
        }
      }
    );
    
    // Add blocks in batches
    console.log('📤 Uploading content...\n');
    const chunkSize = 100;
    for (let i = 0; i < blocks.length; i += chunkSize) {
      const chunk = blocks.slice(i, i + chunkSize);
      await notion.blocks.children.append({
        block_id: hubId,
        children: chunk
      });
      console.log(`   ✅ Added batch ${Math.floor(i / chunkSize) + 1} (${chunk.length} blocks)`);
    }
    
    console.log('\n✅ Table of Contents rebuilt successfully!\n');
    console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.body) {
      console.error('Details:', JSON.stringify(error.body, null, 2));
    }
  }
}

rebuildTableOfContents();

