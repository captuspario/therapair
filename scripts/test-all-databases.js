#!/usr/bin/env node
/**
 * Test all Notion database connections
 * Tests all databases configured in the project
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Load configs
const landingPageConfig = path.join(__dirname, '../products/landing-page/config.php');
const widgetConfig = path.join(__dirname, '../products/widget/therapair-widget/config.php');

// Extract PHP constants
function extractPhpConstants(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const constants = {};
  
  // Extract NOTION_TOKEN
  const tokenMatch = content.match(/define\s*\(\s*['"]NOTION_TOKEN['"]\s*,\s*['"]([^'"]+)['"]/);
  if (tokenMatch) constants.NOTION_TOKEN = tokenMatch[1];
  
  // Extract all database IDs
  const dbMatches = content.matchAll(/define\s*\(\s*['"](NOTION_DB_\w+)['"]\s*,\s*['"]([^'"]+)['"]/g);
  for (const match of dbMatches) {
    constants[match[1]] = match[2];
  }
  
  // Extract legacy database IDs
  const legacyMatches = content.matchAll(/define\s*\(\s*['"](THERAPIST_\w+_DATABASE_ID)['"]\s*,\s*['"]([^'"]+)['"]/g);
  for (const match of legacyMatches) {
    constants[match[1]] = match[2];
  }
  
  return constants;
}

// Test database connection
async function testDatabase(token, databaseId, name) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.notion.com',
      path: `/v1/databases/${databaseId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            resolve({
              success: true,
              name,
              databaseId,
              title: result.title?.[0]?.plain_text || 'Unknown',
              properties: Object.keys(result.properties || {}).length,
            });
          } catch (e) {
            resolve({
              success: true,
              name,
              databaseId,
              title: 'Unknown',
              properties: 0,
            });
          }
        } else {
          resolve({
            success: false,
            name,
            databaseId,
            error: `HTTP ${res.statusCode}: ${data.substring(0, 100)}`,
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        name,
        databaseId,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        name,
        databaseId,
        error: 'Request timeout',
      });
    });

    req.end();
  });
}

// Main test function
async function main() {
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Therapair Database Connection Test${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

  // Load configurations
  console.log(`${colors.blue}Loading configurations...${colors.reset}`);
  const landingConfig = extractPhpConstants(landingPageConfig);
  const widgetConfigData = extractPhpConstants(widgetConfig);

  // Merge configs (landing page takes precedence)
  const config = { ...widgetConfigData, ...landingConfig };

  if (!config.NOTION_TOKEN) {
    console.log(`${colors.red}❌ NOTION_TOKEN not found in config files${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.green}✅ Token found${colors.reset}\n`);

  // Define databases to test
  const databases = [
    {
      name: 'VIC Therapist Directory',
      id: config.NOTION_DB_USER_TESTING || config.THERAPIST_DIRECTORY_DATABASE_ID,
      source: 'landing-page/config.php',
    },
    {
      name: 'Sandbox Feedback',
      id: config.NOTION_DB_SANDBOX,
      source: 'both configs',
    },
    {
      name: 'Survey Responses',
      id: config.NOTION_DB_SURVEY || config.THERAPIST_RESEARCH_DATABASE_ID,
      source: 'landing-page/config.php',
    },
    {
      name: 'Expression of Interest',
      id: config.NOTION_DB_EOI,
      source: 'landing-page/config.php',
    },
  ].filter(db => db.id); // Remove undefined databases

  console.log(`${colors.blue}Testing ${databases.length} database(s)...${colors.reset}\n`);

  // Test each database
  const results = [];
  for (const db of databases) {
    process.stdout.write(`Testing ${db.name}... `);
    const result = await testDatabase(config.NOTION_TOKEN, db.id, db.name);
    results.push({ ...result, source: db.source });
    
    if (result.success) {
      console.log(`${colors.green}✅${colors.reset}`);
    } else {
      console.log(`${colors.red}❌${colors.reset}`);
    }
  }

  // Print results
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Results${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

  let allSuccess = true;
  for (const result of results) {
    if (result.success) {
      console.log(`${colors.green}✅ ${result.name}${colors.reset}`);
      console.log(`   ID: ${result.databaseId}`);
      console.log(`   Title: ${result.title}`);
      console.log(`   Properties: ${result.properties}`);
      console.log(`   Source: ${result.source}\n`);
    } else {
      allSuccess = false;
      console.log(`${colors.red}❌ ${result.name}${colors.reset}`);
      console.log(`   ID: ${result.databaseId}`);
      console.log(`   Error: ${result.error}`);
      console.log(`   Source: ${result.source}\n`);
    }
  }

  // Summary
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;

  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Summary${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`Success: ${colors.green}${successCount}/${totalCount}${colors.reset} databases connected\n`);

  if (allSuccess) {
    console.log(`${colors.green}✅ All databases are connected and accessible!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.yellow}⚠️  Some databases failed. Check errors above.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run tests
main().catch((error) => {
  console.error(`${colors.red}❌ Fatal error:${colors.reset}`, error);
  process.exit(1);
});

