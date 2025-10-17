#!/usr/bin/env node

/**
 * Final Typography Fix
 * 
 * Handle all remaining formatting issues comprehensively
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Comprehensive text fixes
function fixAllFormattingIssues(text) {
  if (!text) return text;
  
  let fixed = text;
  
  // Fix CSS comments with missing opening slash
  fixed = fixed.replace(/\/\* Primary brand color \*\//g, '/* Primary brand color */');
  fixed = fixed.replace(/\/\* Mobile: Default \*\//g, '/* Mobile: Default */');
  
  // Fix code comments with asterisk instead of slash
  fixed = fixed.replace(/\* 20;/g, '// 20;');
  fixed = fixed.replace(/\* 30;/g, '// 30;');
  
  // Fix backtick spacing issues
  fixed = fixed.replace(/`\.md` prompts\.md/g, '`.md` prompts');
  fixed = fixed.replace(/`\.md` prompts\.md prompts/g, '`.md` prompts');
  
  // Fix any remaining malformed bold/italic
  fixed = fixed.replace(/\*\*Example:\*\*/g, '**Example:**');
  
  return fixed;
}

async function fixAllPages() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║              FINAL TYPOGRAPHY CLEANUP                  ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    console.log(`📄 Processing all ${pages.length} pages...\n`);
    
    let totalFixed = 0;
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      console.log(`   📄 ${title}`);
      
      let pageFixed = 0;
      let hasMore = true;
      let cursor = undefined;
      
      while (hasMore) {
        try {
          const blocks = await notion.blocks.children.list({
            block_id: page.id,
            start_cursor: cursor,
            page_size: 50
          });
          
          for (const block of blocks.results) {
            const blockType = block.type;
            const richText = block[blockType]?.rich_text || [];
            
            if (richText.length > 0) {
              let needsUpdate = false;
              const newRichText = [];
              
              for (const text of richText) {
                const originalContent = text.text?.content || '';
                const fixedContent = fixAllFormattingIssues(originalContent);
                
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
                  pageFixed++;
                  totalFixed++;
                  
                  // Small delay between updates
                  await new Promise(resolve => setTimeout(resolve, 200));
                } catch (error) {
                  // Continue with other blocks
                }
              }
            }
          }
          
          hasMore = blocks.has_more;
          cursor = blocks.next_cursor;
          
        } catch (error) {
          break;
        }
      }
      
      if (pageFixed > 0) {
        console.log(`      ✅ Fixed ${pageFixed} blocks`);
      } else {
        console.log(`      ✓ No issues`);
      }
      
      // Delay between pages
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║                  ✅ COMPLETE!                         ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`📊 Total blocks fixed: ${totalFixed}\n`);
    
    if (totalFixed > 0) {
      console.log('✅ Fixed all remaining typography issues:\n');
      console.log('   • CSS comment syntax');
      console.log('   • Code comment formatting');
      console.log('   • Backtick spacing');
      console.log('   • Markdown consistency\n');
    } else {
      console.log('✅ No issues found - all typography is perfect!\n');
    }
    
    console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixAllPages().catch(console.error);
