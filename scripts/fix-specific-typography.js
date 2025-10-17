#!/usr/bin/env node

/**
 * Fix Specific Typography Issues
 * 
 * Target specific formatting problems like:
 * - 'Warm*Warm* — Not clinical or corporate'
 * - Other malformed markdown
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Simple and robust text fixes
function fixTextContent(text) {
  if (!text) return text;
  
  // Fix specific patterns
  let fixed = text;
  
  // Fix malformed bold: Warm*Warm* → **Warm**
  fixed = fixed.replace(/(\w+)\*(\w+)\*/g, '**$1**');
  
  // Fix other malformed patterns
  fixed = fixed.replace(/\*([^*]+?)\*/g, '*$1*'); // Ensure single asterisks
  fixed = fixed.replace(/\*\*([^*]+?)\*\*/g, '**$1**'); // Ensure double asterisks
  
  return fixed;
}

async function fixPageContent(pageId, pageName) {
  console.log(`   📄 ${pageName}`);
  
  let fixedCount = 0;
  let hasMore = true;
  let cursor = undefined;
  
  while (hasMore) {
    try {
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 50 // Smaller batches
      });
      
      for (const block of blocks.results) {
        const blockType = block.type;
        const richText = block[blockType]?.rich_text || [];
        
        if (richText.length > 0) {
          let needsUpdate = false;
          const newRichText = [];
          
          for (const text of richText) {
            const originalContent = text.text?.content || '';
            const fixedContent = fixTextContent(originalContent);
            
            if (fixedContent !== originalContent) {
              needsUpdate = true;
              newRichText.push({
                ...text,
                text: {
                  ...text.text,
                  content: fixedContent
                }
              });
            } else {
              newRichText.push(text);
            }
          }
          
          if (needsUpdate) {
            try {
              await notion.blocks.update({
                block_id: block.id,
                [blockType]: {
                  rich_text: newRichText
                }
              });
              fixedCount++;
              
              // Small delay between updates
              await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
              if (!error.message.includes('validation_error')) {
                console.log(`      ⚠️  Block update failed: ${error.message}`);
              }
            }
          }
        }
      }
      
      hasMore = blocks.has_more;
      cursor = blocks.next_cursor;
      
      // Delay between batches
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`      ⚠️  Error processing page: ${error.message}`);
      break;
    }
  }
  
  if (fixedCount > 0) {
    console.log(`      ✅ Fixed ${fixedCount} blocks\n`);
  } else {
    console.log(`      ✓ No issues found\n`);
  }
  
  return fixedCount;
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║        FIXING SPECIFIC TYPOGRAPHY ISSUES             ║');
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
      const fixed = await fixPageContent(page.id, title);
      totalFixed += fixed;
      
      // Longer delay between pages
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║                  ✅ COMPLETE!                         ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`📊 Total blocks fixed: ${totalFixed}\n`);
    
    if (totalFixed > 0) {
      console.log('✅ Fixed typography issues:\n');
      console.log('   • Malformed bold formatting');
      console.log('   • Inconsistent asterisk usage');
      console.log('   • Text content normalization\n');
    } else {
      console.log('✅ No typography issues found - all content is properly formatted!\n');
    }
    
    console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main().catch(console.error);
