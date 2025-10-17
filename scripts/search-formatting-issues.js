#!/usr/bin/env node

/**
 * Search for Specific Formatting Issues
 * 
 * Look for patterns like:
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

// Search patterns
const ISSUE_PATTERNS = [
  /\w+\*\w+\*/g,           // Warm*Warm*
  /\*\*[^*]+\*\*[^*]/,     // **bold**text (missing space)
  /\*[^*]+\*[^*]/,         // *italic*text (missing space)
  /`[^`]+`[^`]/,           // `code`text (missing space)
  /\*\*[^*]*\*[^*]*\*\*/g, // Mixed bold/italic
  /\*[^*]*\*\*[^*]*\*/g,   // Mixed italic/bold
];

async function searchPageContent(pageId, pageName) {
  console.log(`   📄 ${pageName}`);
  
  let foundIssues = [];
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
        
        for (const text of richText) {
          const content = text.text?.content || '';
          
          // Check each pattern
          for (const pattern of ISSUE_PATTERNS) {
            const matches = content.match(pattern);
            if (matches) {
              foundIssues.push({
                blockId: block.id,
                content: content,
                matches: matches,
                pattern: pattern.toString()
              });
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
  
  if (foundIssues.length > 0) {
    console.log(`      🔍 Found ${foundIssues.length} issues:`);
    foundIssues.forEach((issue, index) => {
      console.log(`         ${index + 1}. "${issue.content.substring(0, 100)}..."`);
      console.log(`            Matches: ${issue.matches.join(', ')}`);
    });
    console.log('');
  } else {
    console.log(`      ✅ No formatting issues found\n`);
  }
  
  return foundIssues;
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║           SEARCHING FOR FORMATTING ISSUES             ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  try {
    const response = await notion.blocks.children.list({
      block_id: PARENT_PAGE_ID,
      page_size: 100
    });
    
    const pages = response.results.filter(block => block.type === 'child_page');
    
    console.log(`📄 Searching ${pages.length} pages...\n`);
    
    let totalIssues = 0;
    
    for (const page of pages) {
      const title = page.child_page?.title || 'Untitled';
      const issues = await searchPageContent(page.id, title);
      totalIssues += issues.length;
      
      // Small delay between pages
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║                  ✅ SEARCH COMPLETE!                  ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    
    if (totalIssues > 0) {
      console.log(`🔍 Found ${totalIssues} formatting issues across all pages\n`);
      console.log('📝 Issues to fix:\n');
      console.log('   • Malformed markdown patterns');
      console.log('   • Missing spaces after formatting');
      console.log('   • Mixed formatting syntax\n');
    } else {
      console.log('✅ No formatting issues found!\n');
      console.log('🎉 All typography is properly formatted:\n');
      console.log('   • **bold** text renders correctly');
      console.log('   • *italic* text renders correctly');
      console.log('   • `code` text renders correctly');
      console.log('   • Proper spacing maintained\n');
    }
    
    console.log('📍 View: https://notion.so/28b5c25944da800aad7bd26073cac726\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main().catch(console.error);
