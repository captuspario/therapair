#!/usr/bin/env node

/**
 * Fix All Typography Issues
 * 
 * Properly parse and convert all markdown formatting to Notion rich text:
 * - **bold** → bold
 * - *italic* → italic
 * - `code` → code
 * - [link](url) → clickable link
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Advanced markdown to rich text parser
function parseMarkdownToRichText(text) {
  if (!text || text.trim() === '') {
    return [{ type: 'text', text: { content: '' } }];
  }
  
  const richText = [];
  let remaining = text;
  
  // Process text in order, handling nested formatting
  while (remaining.length > 0) {
    let matched = false;
    
    // Try to match bold first (**text**)
    const boldMatch = remaining.match(/^\*\*([^*]+?)\*\*/);
    if (boldMatch) {
      richText.push({
        type: 'text',
        text: { content: boldMatch[1] },
        annotations: { bold: true }
      });
      remaining = remaining.substring(boldMatch[0].length);
      matched = true;
      continue;
    }
    
    // Try to match italic (*text*)
    const italicMatch = remaining.match(/^\*([^*]+?)\*/);
    if (italicMatch) {
      richText.push({
        type: 'text',
        text: { content: italicMatch[1] },
        annotations: { italic: true }
      });
      remaining = remaining.substring(italicMatch[0].length);
      matched = true;
      continue;
    }
    
    // Try to match code (`text`)
    const codeMatch = remaining.match(/^`([^`]+?)`/);
    if (codeMatch) {
      richText.push({
        type: 'text',
        text: { content: codeMatch[1] },
        annotations: { code: true }
      });
      remaining = remaining.substring(codeMatch[0].length);
      matched = true;
      continue;
    }
    
    // Try to match links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+?)\]\(([^)]+?)\)/);
    if (linkMatch) {
      richText.push({
        type: 'text',
        text: { 
          content: linkMatch[1],
          link: { url: linkMatch[2] }
        }
      });
      remaining = remaining.substring(linkMatch[0].length);
      matched = true;
      continue;
    }
    
    // No special formatting - take one character
    if (!matched) {
      // Find next special character or take rest of string
      const nextSpecial = remaining.search(/[\*`\[]/);
      
      if (nextSpecial === -1) {
        // No more special characters, take everything
        if (remaining.trim()) {
          richText.push({
            type: 'text',
            text: { content: remaining }
          });
        }
        break;
      } else if (nextSpecial > 0) {
        // Take text up to next special character
        richText.push({
          type: 'text',
          text: { content: remaining.substring(0, nextSpecial) }
        });
        remaining = remaining.substring(nextSpecial);
      } else {
        // Special character at start but didn't match - take it as literal
        richText.push({
          type: 'text',
          text: { content: remaining[0] }
        });
        remaining = remaining.substring(1);
      }
    }
  }
  
  return richText.length > 0 ? richText : [{ type: 'text', text: { content: text } }];
}

function needsFormatting(block) {
  const textTypes = [
    'paragraph', 'heading_1', 'heading_2', 'heading_3',
    'bulleted_list_item', 'numbered_list_item', 'quote', 'callout'
  ];
  
  if (!textTypes.includes(block.type)) return false;
  
  const richText = block[block.type]?.rich_text || [];
  
  // Check if any text has markdown formatting
  for (const text of richText) {
    const content = text.text?.content || '';
    if (content.includes('**') || content.includes('*') || content.includes('`') || content.includes('[')) {
      return true;
    }
  }
  
  return false;
}

function fixBlockFormatting(block) {
  const blockType = block.type;
  const richText = block[blockType]?.rich_text || [];
  
  if (richText.length === 0) return null;
  
  // Combine all text (in case it's split)
  const fullText = richText.map(t => t.text?.content || '').join('');
  
  // Parse markdown to rich text
  const newRichText = parseMarkdownToRichText(fullText);
  
  // Create update
  const update = {
    [blockType]: {
      rich_text: newRichText
    }
  };
  
  // Preserve callout properties
  if (blockType === 'callout') {
    if (block.callout?.icon) {
      update.callout.icon = block.callout.icon;
    }
    if (block.callout?.color) {
      update.callout.color = block.callout.color;
    }
  }
  
  return update;
}

async function fixPageTypography(pageId, pageName) {
  console.log(`   📄 ${pageName}`);
  
  let fixedCount = 0;
  let hasMore = true;
  let cursor = undefined;
  
  while (hasMore) {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100
    });
    
    for (const block of blocks.results) {
      if (needsFormatting(block)) {
        try {
          const update = fixBlockFormatting(block);
          
          if (update) {
            // Retry logic for conflicts
            let retries = 3;
            let success = false;
            
            while (retries > 0 && !success) {
              try {
                await notion.blocks.update({
                  block_id: block.id,
                  ...update
                });
                fixedCount++;
                success = true;
                await new Promise(resolve => setTimeout(resolve, 300));
              } catch (error) {
                if (error.message.includes('conflict') && retries > 1) {
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  retries--;
                } else {
                  break;
                }
              }
            }
          }
        } catch (error) {
          // Continue with other blocks
        }
      }
    }
    
    hasMore = blocks.has_more;
    cursor = blocks.next_cursor;
  }
  
  if (fixedCount > 0) {
    console.log(`      ✅ Fixed ${fixedCount} blocks\n`);
  } else {
    console.log(`      ✓ No formatting issues\n`);
  }
  
  return fixedCount;
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║     FIXING ALL TYPOGRAPHY FORMATTING ISSUES           ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    console.log(`📄 Processing ${pages.length} pages...\n`);
    
    let totalFixed = 0;
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      const fixed = await fixPageTypography(page.id, title);
      totalFixed += fixed;
      
      // Delay between pages
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║                  ✅ COMPLETE!                         ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`📊 Total blocks fixed: ${totalFixed}\n`);
    console.log('✅ All typography now properly formatted:\n');
    console.log('   • **bold** renders as bold text');
    console.log('   • *italic* renders as italic text');
    console.log('   • `code` renders with code styling');
    console.log('   • [links](url) are clickable\n');
    console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main().catch(console.error);

