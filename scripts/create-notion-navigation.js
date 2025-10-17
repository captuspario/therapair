#!/usr/bin/env node

/**
 * Create Interactive Notion Website Navigation
 * 
 * This script adds navigation links between all pages to create
 * a website-like browsing experience in Notion.
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function createNavigation() {
  console.log('\n🔗 Creating interactive navigation structure...\n');
  
  try {
    // Get all pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    console.log(`📄 Found ${pages.length} pages\n`);
    
    // Map page names to IDs
    const pageMap = {};
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      pageMap[title] = page.id;
      console.log(`  📌 ${title}`);
    }
    
    console.log('\n🔄 Adding navigation to each page...\n');
    
    // Define navigation structure (using exact titles with emojis)
    const navStructure = {
      '📚 Therapair Strategy Hub - Table of Contents': {
        sections: [
          {
            title: '📊 Core Strategy',
            pages: ['📊 Master Strategy Document']
          },
          {
            title: '📚 Project Retrospective',
            pages: [
              '💡 01 - Vision & Origin',
              '🧪 02 - First Widget (Typebot)',
              '🎨 03 - Landing Page & Forms',
              '🔒 04 - Email & Privacy',
              '🌐 05 - Git & Deployment',
              '⚙️ 06 - Strategy Prompt Framework',
              '📖 07 - Documentation & Onboarding',
              '🎓 08 - Lessons & Principles',
              '📈 09 - Presentation Summary'
            ]
          },
          {
            title: '💼 Case Studies',
            pages: [
              '💼 Case Study - Therapair Website',
              '💼 Case Study - Consultancy Portfolio',
              '🎨 Visual Assets Specification'
            ]
          },
          {
            title: '🎬 Process Documentation',
            pages: [
              '🎬 Documentary Session Log',
              '✅ Case Study Completion Summary',
              '✅ Retrospective Completion Summary'
            ]
          }
        ]
      }
    };
    
    // Update Hub page with navigation
    const hubTitle = '📚 Therapair Strategy Hub - Table of Contents';
    const hubId = pageMap[hubTitle];
    
    if (hubId) {
      console.log(`✅ Creating navigation for: ${hubTitle}`);
      
      // Clear existing content
      const existingBlocks = await notion.blocks.children.list({
        block_id: hubId
      });
      
      for (const block of existingBlocks.results) {
        try {
          await notion.blocks.delete({ block_id: block.id });
        } catch (e) {
          // Continue if delete fails
        }
      }
      
      // Create new navigation structure
      const navigationBlocks = [
        {
          type: 'heading_1',
          heading_1: {
            rich_text: [{ type: 'text', text: { content: 'Therapair Strategy Hub' } }]
          }
        },
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [{ 
              type: 'text', 
              text: { content: 'Welcome to the comprehensive Therapair strategy and documentation. Navigate through the sections below or use the sidebar.' } 
            }]
          }
        },
        {
          type: 'divider',
          divider: {}
        }
      ];
      
      // Add each section
      for (const section of navStructure[hubTitle].sections) {
        // Section header
        navigationBlocks.push({
          type: 'heading_2',
          heading_2: {
            rich_text: [{ type: 'text', text: { content: section.title } }]
          }
        });
        
        // Add links to pages
        for (const pageName of section.pages) {
          const pageId = pageMap[pageName];
          if (pageId) {
            navigationBlocks.push({
              type: 'paragraph',
              paragraph: {
                rich_text: [
                  { type: 'text', text: { content: '→ ' } },
                  { 
                    type: 'mention',
                    mention: {
                      type: 'page',
                      page: { id: pageId }
                    }
                  }
                ]
              }
            });
          }
        }
        
        // Add spacing
        navigationBlocks.push({
          type: 'paragraph',
          paragraph: { rich_text: [] }
        });
      }
      
      // Add footer
      navigationBlocks.push(
        {
          type: 'divider',
          divider: {}
        },
        {
          type: 'callout',
          callout: {
            rich_text: [{ 
              type: 'text', 
              text: { content: '💡 Tip: Use the sidebar to quickly navigate between pages, or click the links above to explore each section.' } 
            }],
            icon: { emoji: '💡' }
          }
        }
      );
      
      // Add navigation blocks in batches
      const chunkSize = 100;
      for (let i = 0; i < navigationBlocks.length; i += chunkSize) {
        const chunk = navigationBlocks.slice(i, i + chunkSize);
        await notion.blocks.children.append({
          block_id: hubId,
          children: chunk
        });
      }
      
      console.log(`   ↳ Added ${navigationBlocks.length} navigation blocks`);
    }
    
    // Add "Back to Hub" and navigation to all other pages
    for (const [pageName, pageId] of Object.entries(pageMap)) {
      if (pageName === hubTitle) continue; // Skip the hub itself
      
      console.log(`✅ Adding navigation to: ${pageName}`);
      
      // Get existing blocks
      const existingBlocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 10
      });
      
      // Create navigation bar
      const navBlocks = [
        {
          type: 'callout',
          callout: {
            rich_text: [
              { type: 'text', text: { content: '← Back to ' } },
              { 
                type: 'mention',
                mention: {
                  type: 'page',
                  page: { id: hubId }
                }
              },
              { type: 'text', text: { content: ' | Navigate using sidebar →' } }
            ],
            icon: { emoji: '🧭' },
            color: 'gray_background'
          }
        },
        {
          type: 'divider',
          divider: {}
        }
      ];
      
      // Add navigation at the top
      // Note: Notion API doesn't support inserting at beginning, so we'll add at end
      // Users can manually move it or we create a new page with proper order
      await notion.blocks.children.append({
        block_id: pageId,
        children: navBlocks
      });
      
      console.log(`   ↳ Added navigation bar`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n✅ Navigation structure created!\n');
    console.log('🌐 Your Notion pages are now interconnected like a website!');
    console.log(`📍 Start here: https://notion.so/${PARENT_PAGE_ID.replace(/-/g, '')}\n`);
    
    console.log('💡 To make it a public website:');
    console.log('   1. Open the parent page in Notion');
    console.log('   2. Click "Share" in the top right');
    console.log('   3. Toggle "Share to web"');
    console.log('   4. Copy the public link\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createNavigation();

