#!/usr/bin/env node

/**
 * Upload Therapair Strategy Documents to Notion
 * 
 * Creates a beautifully structured Notion workspace with all strategy,
 * retrospective, and case study documents.
 */

import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = '28b5c25944da800aad7bd26073cac726';

if (!NOTION_TOKEN) {
  console.error('❌ Error: NOTION_TOKEN not found in environment');
  console.error('Please set: export NOTION_TOKEN="secret_..."');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Icons for different sections
const ICONS = {
  home: '🏠',
  strategy: '📊',
  retrospective: '📚',
  caseStudy: '💼',
  process: '🎬',
  vision: '💡',
  product: '🚀',
  design: '🎨',
  tech: '⚙️',
  lessons: '🎓',
  presentation: '📈',
  privacy: '🔒',
  deployment: '🌐',
  documentation: '📖'
};

// Helper: Convert Markdown to Notion blocks
function markdownToNotionBlocks(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }
    
    // H1 (# Title)
    if (line.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ type: 'text', text: { content: line.substring(2) } }]
        }
      });
      i++;
      continue;
    }
    
    // H2 (## Title)
    if (line.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: line.substring(3) } }]
        }
      });
      i++;
      continue;
    }
    
    // H3 (### Title)
    if (line.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: line.substring(4) } }]
        }
      });
      i++;
      continue;
    }
    
    // Bullet list (- item or * item)
    if (line.match(/^[\s]*[-*]\s+/)) {
      const content = line.replace(/^[\s]*[-*]\s+/, '');
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content } }]
        }
      });
      i++;
      continue;
    }
    
    // Numbered list (1. item)
    if (line.match(/^[\s]*\d+\.\s+/)) {
      const content = line.replace(/^[\s]*\d+\.\s+/, '');
      blocks.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: {
          rich_text: [{ type: 'text', text: { content } }]
        }
      });
      i++;
      continue;
    }
    
    // Blockquote (> text)
    if (line.startsWith('> ')) {
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: [{ type: 'text', text: { content: line.substring(2) } }]
        }
      });
      i++;
      continue;
    }
    
    // Code block (```language ... ```)
    if (line.startsWith('```')) {
      const language = line.substring(3).trim() || 'plain text';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        object: 'block',
        type: 'code',
        code: {
          rich_text: [{ type: 'text', text: { content: codeLines.join('\n') } }],
          language: language === 'bash' ? 'shell' : language
        }
      });
      i++;
      continue;
    }
    
    // Horizontal rule (---)
    if (line.match(/^[-*_]{3,}$/)) {
      blocks.push({
        object: 'block',
        type: 'divider',
        divider: {}
      });
      i++;
      continue;
    }
    
    // Callout (special handling for > "Quote")
    if (line.startsWith('> "') || line.includes('**Note:**') || line.includes('**Important:**')) {
      blocks.push({
        object: 'block',
        type: 'callout',
        callout: {
          rich_text: [{ type: 'text', text: { content: line.replace(/^>\s*/, '') } }],
          icon: { emoji: '💡' }
        }
      });
      i++;
      continue;
    }
    
    // Regular paragraph
    // Limit to 2000 chars (Notion limit)
    const content = line.substring(0, 2000);
    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content } }]
      }
    });
    i++;
  }
  
  return blocks;
}

// Helper: Create a page with content
async function createNotionPage(title, content, parentId, icon = null) {
  try {
    console.log(`📄 Creating page: ${title}`);
    
    // Create the page first
    const page = await notion.pages.create({
      parent: { page_id: parentId },
      properties: {
        title: [{ text: { content: title } }]
      }
    });
    
    console.log(`✅ Created: ${title} (${page.id})`);
    
    // Convert markdown to blocks
    const blocks = markdownToNotionBlocks(content);
    
    // Notion has a limit of 100 blocks per request
    // Split into chunks
    const chunkSize = 100;
    for (let i = 0; i < blocks.length; i += chunkSize) {
      const chunk = blocks.slice(i, i + chunkSize);
      
      try {
        await notion.blocks.children.append({
          block_id: page.id,
          children: chunk
        });
        console.log(`   ↳ Added ${chunk.length} blocks (batch ${Math.floor(i / chunkSize) + 1})`);
      } catch (blockError) {
        console.error(`   ⚠️  Error adding blocks: ${blockError.message}`);
        // Continue with next chunk
      }
    }
    
    return page.id;
  } catch (error) {
    console.error(`❌ Error creating page "${title}":`, error.message);
    return null;
  }
}

// Main execution
async function main() {
  console.log('\n🚀 Starting Notion Upload...\n');
  console.log(`📍 Parent Page ID: ${PARENT_PAGE_ID}\n`);
  
  const projectRoot = path.join(__dirname, '..');
  
  // Documents to upload
  const documents = [
    // Main Hub Page (Table of Contents)
    {
      title: '📚 Therapair Strategy Hub - Table of Contents',
      file: null, // Will create manually
      icon: ICONS.home,
      isHub: true
    },
    
    // Core Strategy
    {
      title: '📊 Master Strategy Document',
      file: 'therapair-strategy/MASTER_COMPILATION/THERAPAIR_STRATEGY_v1.0.md',
      icon: ICONS.strategy
    },
    
    // Project Retrospective
    {
      title: '💡 01 - Vision & Origin',
      file: 'project-retrospective/01_vision_and_origin.md',
      icon: ICONS.vision
    },
    {
      title: '🧪 02 - First Widget (Typebot)',
      file: 'project-retrospective/02_first_widget_typebot.md',
      icon: ICONS.product
    },
    {
      title: '🎨 03 - Landing Page & Forms',
      file: 'project-retrospective/03_landing_page_and_forms.md',
      icon: ICONS.design
    },
    {
      title: '🔒 04 - Email & Privacy',
      file: 'project-retrospective/04_email_hosting_and_privacy.md',
      icon: ICONS.privacy
    },
    {
      title: '🌐 05 - Git & Deployment',
      file: 'project-retrospective/05_git_and_deployment.md',
      icon: ICONS.deployment
    },
    {
      title: '⚙️ 06 - Strategy Prompt Framework',
      file: 'project-retrospective/06_strategy_prompt_framework.md',
      icon: ICONS.tech
    },
    {
      title: '📖 07 - Documentation & Onboarding',
      file: 'project-retrospective/07_documentation_and_onboarding.md',
      icon: ICONS.documentation
    },
    {
      title: '🎓 08 - Lessons & Principles',
      file: 'project-retrospective/08_lessons_and_principles.md',
      icon: ICONS.lessons
    },
    {
      title: '📈 09 - Presentation Summary',
      file: 'project-retrospective/09_presentation_summary.md',
      icon: ICONS.presentation
    },
    
    // Case Studies
    {
      title: '💼 Case Study - Therapair Website',
      file: 'case-studies/CASE-STUDY-THERAPAIR-WEBSITE.md',
      icon: ICONS.caseStudy
    },
    {
      title: '💼 Case Study - Consultancy Portfolio',
      file: 'case-studies/CASE-STUDY-CONSULTANCY-PORTFOLIO.md',
      icon: ICONS.caseStudy
    },
    {
      title: '🎨 Visual Assets Specification',
      file: 'portfolio-assets/VISUAL-ASSETS-SPECIFICATION.md',
      icon: ICONS.design
    },
    
    // Process Documentation
    {
      title: '🎬 Documentary Session Log',
      file: 'documentary/SESSION-LOG.md',
      icon: ICONS.process
    },
    {
      title: '✅ Case Study Completion Summary',
      file: 'case-studies/COMPLETION-SUMMARY.md',
      icon: ICONS.process
    },
    {
      title: '✅ Retrospective Completion Summary',
      file: 'project-retrospective/COMPLETION-SUMMARY.md',
      icon: ICONS.process
    }
  ];
  
  const createdPages = {};
  
  // Create all pages
  for (const doc of documents) {
    if (doc.isHub) {
      // Create hub page with table of contents
      const hubContent = `# Therapair Strategy Hub

Welcome to the comprehensive Therapair strategy and documentation hub.

## 📊 Core Strategy
- Master Strategy Document (comprehensive strategic plan)

## 📚 Project Retrospective
Complete journey from vision to production:
1. Vision & Origin - Genesis story and founding principles
2. First Widget (Typebot) - MVP implementation
3. Landing Page & Forms - Website architecture
4. Email & Privacy - Privacy-first infrastructure  
5. Git & Deployment - Development workflow
6. Strategy Prompt Framework - Agentic methodology
7. Documentation & Onboarding - Knowledge systems
8. Lessons & Principles - Philosophy and learnings
9. Presentation Summary - External pitch and timeline

## 💼 Case Studies
Professional portfolio materials:
- Therapair Website Version (for stakeholders, investors, clients)
- Consultancy Portfolio Version (for employers, clients, partners)
- Visual Assets Specification (design assets guide)

## 🎬 Process Documentation
Behind-the-scenes:
- Documentary Session Log (real-time decision tracking)
- Case Study Completion Summary
- Retrospective Completion Summary

---

**Project:** Therapair - Inclusive Mental Health Matching  
**Timeline:** 6 weeks (October 2025)  
**Status:** Production-ready, growing  
**Innovation:** AI-native development, privacy-first, community-centered

---

*Navigate through the pages below to explore each section in detail.*`;
      
      const pageId = await createNotionPage(
        doc.title,
        hubContent,
        PARENT_PAGE_ID,
        doc.icon
      );
      
      if (pageId) {
        createdPages['hub'] = pageId;
      }
      
      continue;
    }
    
    const filePath = path.join(projectRoot, doc.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${doc.title} (file not found)`);
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const pageId = await createNotionPage(
      doc.title,
      content,
      PARENT_PAGE_ID,
      doc.icon
    );
    
    if (pageId) {
      createdPages[doc.file] = pageId;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n✅ Upload Complete!\n');
  console.log(`📊 Created ${Object.keys(createdPages).length} pages`);
  console.log(`📍 View at: https://notion.so/${PARENT_PAGE_ID.replace(/-/g, '')}`);
  console.log('\n🎉 Your Therapair strategy is now beautifully organized in Notion!\n');
}

main().catch(console.error);

