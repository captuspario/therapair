#!/usr/bin/env node

/**
 * Fix Found Formatting Issues
 * 
 * Fix the 6 specific issues found:
 * 1. CSS comments with malformed asterisks
 * 2. Code examples with malformed asterisks  
 * 3. Mixed formatting syntax
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Specific fixes for found issues
function fixContentIssues(text) {
  if (!text) return text;
  
  let fixed = text;
  
  // Fix CSS comment asterisks: * Primary brand color */ → /* Primary brand color */
  fixed = fixed.replace(/\* Primary brand color \*\//g, '/* Primary brand color */');
  fixed = fixed.replace(/\* Mobile: Default \*\//g, '/* Mobile: Default */');
  
  // Fix code comment asterisks: * 30; → // 30;
  fixed = fixed.replace(/\* 30;/g, '// 30;');
  
  // Fix mixed formatting: **Example:** → **Example:**
  fixed = fixed.replace(/\*\*Example:\*\*/g, '**Example:**');
  
  // Fix code backticks: `.md` prompts → `.md` prompts
  fixed = fixed.replace(/`\.md` prompts/g, '`.md` prompts');
  
  return fixed;
}

async function fixPageIssues(pageId, pageName) {
  console.log(`   📄 ${pageName}`);
  
  let fixedCount = 0;
  let hasMore = true;
  let cursor = undefined;
  
  while (hasMore) {
    try {
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100
      });
      
      for (const block of blocks.results) {
        const blockType = block.type;
        const richText = block[blockType]?.rich_text || [];
        
        if (richText.length > 0) {
          let needsUpdate = false;
          const newRichText = [];
          
          for (const text of richText) {
            const originalContent = text.text?.content || '';
            const fixedContent = fixContentIssues(originalContent);
            
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
              console.log(`      ✅ Fixed: "${newRichText[0].text.content.substring(0, 50)}..."`);
              
              // Small delay between updates
              await new Promise(resolve => setTimeout(resolve, 300));
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
      
    } catch (error) {
      console.log(`      ⚠️  Error: ${error.message}`);
      break;
    }
  }
  
  if (fixedCount > 0) {
    console.log(`      📊 Total fixed: ${fixedCount} blocks\n`);
  } else {
    console.log(`      ✓ No issues found\n`);
  }
  
  return fixedCount;
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║            FIXING FOUND FORMATTING ISSUES             ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    // Target the specific pages with issues
    const targetPages = [
      '🎨 03 - Landing Page & Forms',
      '📖 07 - Documentation & Onboarding', 
      '💼 Case Study - Therapair Website',
      '💼 Case Study - Consultancy Portfolio'
    ];
    
    const pagesToFix = pages.filter(page => 
      targetPages.some(target => page.child_page?.title?.includes(target))
    );
    
    console.log(`📄 Fixing ${pagesToFix.length} pages with issues...\n`);
    
    let totalFixed = 0;
    
    for (const page of pagesToFix) {
      const title = page.child_page?.title || 'Untitled';
      const fixed = await fixPageIssues(page.id, title);
      totalFixed += fixed;
      
      // Delay between pages
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║                  ✅ COMPLETE!                         ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`📊 Total blocks fixed: ${totalFixed}\n`);
    
    if (totalFixed > 0) {
      console.log('✅ Fixed specific issues:\n');
      console.log('   • CSS comment formatting');
      console.log('   • Code comment syntax');
      console.log('   • Mixed markdown formatting');
      console.log('   • Code backtick spacing\n');
    } else {
      console.log('✅ No issues found to fix!\n');
    }
    
    console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main().catch(console.error);
