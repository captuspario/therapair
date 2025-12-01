import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { getEnv, log, formatTimestamp } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_TOKEN = getEnv('NOTION_TOKEN');
const REPORTS_DIR = path.join(__dirname, '../../reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Generate console report
 */
export function generateConsoleReport(journey) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 EMAIL CAMPAIGN TEST REPORT');
  console.log('='.repeat(60));
  console.log(`\nJourney ID: ${journey.id}`);
  console.log(`Persona: ${journey.persona.name} (${journey.persona.email})`);
  console.log(`Scenario: ${journey.scenario}`);
  console.log(`Timing: ${journey.timing}`);
  console.log(`Mode: ${journey.mockMode ? 'MOCK' : 'REAL'}`);
  console.log(`Status: ${journey.status.toUpperCase()}`);
  console.log(`Started: ${formatTimestamp(journey.startedAt)}`);
  if (journey.completedAt) {
    console.log(`Completed: ${formatTimestamp(journey.completedAt)}`);
  }

  console.log('\n' + '-'.repeat(60));
  console.log('RESULTS SUMMARY');
  console.log('-'.repeat(60));
  console.log(`✅ Emails Sent: ${journey.results.emailsSent}`);
  console.log(`📧 Emails Opened: ${journey.results.emailsOpened}`);
  console.log(`🔗 Links Clicked: ${journey.results.linksClicked}`);
  console.log(`🧪 Links Tested: ${journey.results.linksTested}`);
  console.log(`✅ Links Working: ${journey.results.linksWorking}`);
  console.log(`📊 Tracking Verified: ${journey.results.trackingVerified ? 'YES' : 'NO'}`);

  console.log('\n' + '-'.repeat(60));
  console.log('EMAIL DETAILS');
  console.log('-'.repeat(60));

  journey.emails.forEach((email, index) => {
    console.log(`\n📧 Email ${email.number}:`);
    console.log(`   Sent: ${email.sentAt ? formatTimestamp(email.sentAt) : 'NOT SENT'}`);
    console.log(`   Opened: ${email.openedAt ? formatTimestamp(email.openedAt) : 'NOT OPENED'}`);
    console.log(`   Clicked: ${email.clickedAt ? formatTimestamp(email.clickedAt) : 'NOT CLICKED'}`);
    
    if (email.links && email.links.length > 0) {
      console.log(`   Links:`);
      email.links.forEach(link => {
        const status = link.working ? '✅' : '❌';
        const utm = link.hasUtm ? '✓' : '✗';
        console.log(`     ${status} ${link.url.substring(0, 60)}... (UTM: ${utm})`);
      });
    }

    if (email.tracking) {
      console.log(`   Tracking:`);
      console.log(`     Opened: ${email.tracking.emailOpened?.verified ? '✅' : '❌'}`);
      console.log(`     Clicked: ${email.tracking.emailClicked?.verified ? '✅' : '❌'}`);
    }

    if (email.errors && email.errors.length > 0) {
      console.log(`   Errors: ${email.errors.join(', ')}`);
    }
  });

  if (journey.error) {
    console.log('\n' + '-'.repeat(60));
    console.log('ERRORS');
    console.log('-'.repeat(60));
    console.log(`❌ ${journey.error}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Generate markdown report
 */
export function generateMarkdownReport(journey) {
  const timestamp = formatTimestamp();
  const filename = `journey-${journey.id}-${Date.now()}.md`;
  const filepath = path.join(REPORTS_DIR, filename);

  let markdown = `# Email Campaign Test Report\n\n`;
  markdown += `**Generated:** ${timestamp}\n`;
  markdown += `**Journey ID:** ${journey.id}\n`;
  markdown += `**Status:** ${journey.status.toUpperCase()}\n\n`;

  markdown += `## Persona Information\n\n`;
  markdown += `- **Name:** ${journey.persona.name}\n`;
  markdown += `- **Email:** ${journey.persona.email}\n`;
  markdown += `- **Profession:** ${journey.persona.profession}\n`;
  markdown += `- **Region:** ${journey.persona.region}\n\n`;

  markdown += `## Journey Configuration\n\n`;
  markdown += `- **Scenario:** ${journey.scenario}\n`;
  markdown += `- **Timing:** ${journey.timing}\n`;
  markdown += `- **Mode:** ${journey.mockMode ? 'MOCK' : 'REAL'}\n`;
  markdown += `- **Started:** ${formatTimestamp(journey.startedAt)}\n`;
  if (journey.completedAt) {
    markdown += `- **Completed:** ${formatTimestamp(journey.completedAt)}\n`;
  }
  markdown += `\n`;

  markdown += `## Results Summary\n\n`;
  markdown += `| Metric | Value |\n`;
  markdown += `|--------|-------|\n`;
  markdown += `| Emails Sent | ${journey.results.emailsSent} |\n`;
  markdown += `| Emails Opened | ${journey.results.emailsOpened} |\n`;
  markdown += `| Links Clicked | ${journey.results.linksClicked} |\n`;
  markdown += `| Links Tested | ${journey.results.linksTested} |\n`;
  markdown += `| Links Working | ${journey.results.linksWorking} |\n`;
  markdown += `| Tracking Verified | ${journey.results.trackingVerified ? 'YES' : 'NO'} |\n`;
  markdown += `\n`;

  markdown += `## Email Details\n\n`;
  journey.emails.forEach((email, index) => {
    markdown += `### Email ${email.number}\n\n`;
    markdown += `- **Sent:** ${email.sentAt ? formatTimestamp(email.sentAt) : 'NOT SENT'}\n`;
    markdown += `- **Opened:** ${email.openedAt ? formatTimestamp(email.openedAt) : 'NOT OPENED'}\n`;
    markdown += `- **Clicked:** ${email.clickedAt ? formatTimestamp(email.clickedAt) : 'NOT CLICKED'}\n\n`;

    if (email.links && email.links.length > 0) {
      markdown += `#### Links\n\n`;
      markdown += `| URL | Status | UTM |\n`;
      markdown += `|-----|--------|-----|\n`;
      email.links.forEach(link => {
        const status = link.working ? '✅ Working' : '❌ Failed';
        const utm = link.hasUtm ? '✅ Present' : '❌ Missing';
        markdown += `| ${link.url} | ${status} | ${utm} |\n`;
      });
      markdown += `\n`;
    }

    if (email.tracking) {
      markdown += `#### Tracking Verification\n\n`;
      markdown += `- **Email Opened:** ${email.tracking.emailOpened?.verified ? '✅ Verified' : '❌ Not Verified'}\n`;
      markdown += `- **Email Clicked:** ${email.tracking.emailClicked?.verified ? '✅ Verified' : '❌ Not Verified'}\n`;
      markdown += `- **Sandbox Tracking:** ${email.tracking.sandboxTracking?.verified ? '✅ Verified' : '❌ Not Verified'}\n`;
      markdown += `- **Feedback Widget:** ${email.tracking.feedbackWidget?.verified ? '✅ Verified' : '❌ Not Verified'}\n`;
      markdown += `\n`;
    }

    if (email.errors && email.errors.length > 0) {
      markdown += `#### Errors\n\n`;
      email.errors.forEach(error => {
        markdown += `- ❌ ${error}\n`;
      });
      markdown += `\n`;
    }
  });

  if (journey.error) {
    markdown += `## Errors\n\n`;
    markdown += `❌ ${journey.error}\n\n`;
  }

  fs.writeFileSync(filepath, markdown);
  log(`Markdown report saved: ${filepath}`, 'success');

  return filepath;
}

/**
 * Generate Notion report (placeholder - would create Notion page)
 */
export async function generateNotionReport(journey) {
  log(`Notion report generation not yet implemented`, 'warning');
  // TODO: Implement Notion page creation
  return null;
}

/**
 * Generate reports in requested formats
 */
export async function generateReports(journey, formats = ['console']) {
  const results = {};

  if (formats.includes('console')) {
    generateConsoleReport(journey);
    results.console = 'displayed';
  }

  if (formats.includes('markdown')) {
    const filepath = generateMarkdownReport(journey);
    results.markdown = filepath;
  }

  if (formats.includes('notion')) {
    const notionResult = await generateNotionReport(journey);
    results.notion = notionResult;
  }

  return results;
}

