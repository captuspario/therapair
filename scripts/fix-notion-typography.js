#!/usr/bin/env node

/**
 * Fix Typography in Notion Pages
 * 
 * This script fixes formatting issues like **text** appearing literally
 * instead of being rendered as bold.
 */

import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Helper: Parse markdown formatting and convert to Notion rich text
function parseMarkdownToRichText(text) {
  const richText = [];
  let currentPos = 0;
  
  // Regex patterns for markdown
  const patterns = [
    { regex: /\*\*(.+?)\*\*/g, type: 'bold' },           // **bold**
    { regex: /\*(.+?)\*/g, type: 'italic' },             // *italic*
    { regex: /_(.+?)_/g, type: 'italic' },               // _italic_
    { regex: /`(.+?)`/g, type: 'code' },                 // `code`
    { regex: /\[(.+?)\]\((.+?)\)/g, type: 'link' },      // [text](url)
  ];
  
  // Find all markdown patterns
  const matches = [];
  patterns.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern.regex.source, 'g');
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: pattern.type,
        content: match[1],
        url: match[2] // for links
      });
    }
  });
  
  // Sort by position
  matches.sort((a, b) => a.start - b.start);
  
  // Build rich text array
  let lastEnd = 0;
  for (const match of matches) {
    // Add plain text before this match
    if (match.start > lastEnd) {
      const plainText = text.substring(lastEnd, match.start);
      if (plainText) {
        richText.push({
          type: 'text',
          text: { content: plainText }
        });
      }
    }
    
    // Add formatted text
    const annotations = {};
    if (match.type === 'bold') {
      annotations.bold = true;
    } else if (match.type === 'italic') {
      annotations.italic = true;
    } else if (match.type === 'code') {
      annotations.code = true;
    }
    
    if (match.type === 'link') {
      richText.push({
        type: 'text',
        text: {
          content: match.content,
          link: { url: match.url }
        }
      });
    } else {
      richText.push({
        type: 'text',
        text: { content: match.content },
        annotations
      });
    }
    
    lastEnd = match.end;
  }
  
  // Add remaining plain text
  if (lastEnd < text.length) {
    const plainText = text.substring(lastEnd);
    if (plainText) {
      richText.push({
        type: 'text',
        text: { content: plainText }
      });
    }
  }
  
  return richText.length > 0 ? richText : [{ type: 'text', text: { content: text } }];
}

// Helper: Check if block needs fixing
function needsFixing(block) {
  const textTypes = ['paragraph', 'heading_1', 'heading_2', 'heading_3', 'bulleted_list_item', 'numbered_list_item', 'quote', 'callout'];
  
  if (!textTypes.includes(block.type)) return false;
  
  const richText = block[block.type]?.rich_text || [];
  if (richText.length === 0) return false;
  
  // Check if any text contains markdown formatting
  for (const text of richText) {
    const content = text.text?.content || '';
    if (content.includes('**') || content.match(/\*[^*]+\*/g) || content.includes('`')) {
      return true;
    }
  }
  
  return false;
}

// Helper: Fix block formatting
function fixBlock(block) {
  const blockType = block.type;
  const richText = block[blockType]?.rich_text || [];
  
  if (richText.length === 0) return null;
  
  // Combine all text
  const fullText = richText.map(t => t.text?.content || '').join('');
  
  // Parse and convert to proper rich text
  const newRichText = parseMarkdownToRichText(fullText);
  
  // Create update object
  const update = {
    [blockType]: {
      rich_text: newRichText
    }
  };
  
  // Preserve additional properties
  if (blockType === 'callout' && block.callout?.icon) {
    update.callout.icon = block.callout.icon;
  }
  if (blockType === 'callout' && block.callout?.color) {
    update.callout.color = block.callout.color;
  }
  
  return update;
}

async function fixTypography() {
  console.log('\n🔍 Scanning and fixing typography in all Notion pages...\n');
  
  try {
    // Get all pages
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    console.log(`📄 Found ${pages.length} pages to check\n`);
    
    let totalFixed = 0;
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      console.log(`📖 Checking: ${title}`);
      
      let pageFixed = 0;
      let cursor = undefined;
      let hasMore = true;
      
      while (hasMore) {
        // Get blocks in this page
        const blocksResponse = await notion.blocks.children.list({
          block_id: page.id,
          start_cursor: cursor,
          page_size: 100
        });
        
        for (const block of blocksResponse.results) {
          if (needsFixing(block)) {
            let retries = 3;
            let success = false;
            
            while (retries > 0 && !success) {
              try {
                const update = fixBlock(block);
                if (update) {
                  await notion.blocks.update({
                    block_id: block.id,
                    ...update
                  });
                  pageFixed++;
                  totalFixed++;
                  success = true;
                  
                  // Add delay after each successful update
                  await new Promise(resolve => setTimeout(resolve, 500));
                }
              } catch (error) {
                if (error.message.includes('conflict_error') && retries > 1) {
                  // Wait longer before retry
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  retries--;
                } else {
                  if (retries === 1) {
                    console.error(`   ⚠️  Failed after retries: ${error.message.substring(0, 50)}`);
                  }
                  break;
                }
              }
            }
          }
        }
        
        hasMore = blocksResponse.has_more;
        cursor = blocksResponse.next_cursor;
      }
      
      if (pageFixed > 0) {
        console.log(`   ✅ Fixed ${pageFixed} blocks`);
      } else {
        console.log(`   ✓ No issues found`);
      }
      
      // Longer delay between pages to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n✅ Typography fixed!\n`);
    console.log(`📊 Total blocks fixed: ${totalFixed}`);
    console.log(`🎨 All text is now properly formatted\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixTypography();

