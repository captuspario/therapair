# 🧪 Email Campaign User Testing Agent

Automated testing agent for Therapair email campaigns. Creates test personas, executes email journeys, verifies tracking, and generates comprehensive test reports.

## 🎯 Features

- ✅ **Persona Management** - Create and manage test personas in VIC Therapists Notion database
- ✅ **Journey Orchestration** - Execute email sequences with configurable timing
- ✅ **Email Sending** - Send emails via Resend (real) or mock mode
- ✅ **Link Testing** - Automatically test all links and verify UTM parameters
- ✅ **Tracking Verification** - Verify webhook events and Notion database updates
- ✅ **Comprehensive Reporting** - Generate reports in console, markdown, and Notion formats
- ✅ **Multiple Scenarios** - Test happy path, non-responder, unsubscriber, and more

## 🚀 Quick Start

### 1. Configure Environment

Add to your `.env` file:

```bash
# Notion Configuration
NOTION_TOKEN=your_notion_token
THERAPIST_DIRECTORY_DATABASE_ID=your_database_id

# Email Configuration (for real mode)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=contact@therapair.com.au

# Token Secret (for survey tokens)
RESEARCH_TOKEN_SECRET=your_token_secret
```

### 2. Create a Test Persona

```bash
cd agents/email-campaign-tester
node index.js create-persona \
  --name "Johnny Testmail" \
  --email "ibenizer@me.com" \
  --profession "Therapist" \
  --region "Victoria"
```

### 3. Start a Journey

```bash
# Mock mode (fast testing, no real emails)
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "happy-path" \
  --timing "accelerated" \
  --mock

# Real mode (sends actual emails)
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "happy-path" \
  --timing "accelerated"
```

## 📋 Commands

### Create Persona
```bash
node index.js create-persona \
  --name "Name" \
  --email "email@example.com" \
  --profession "Therapist" \
  --region "Victoria"
```

### List Personas
```bash
node index.js list-personas
```

### Start Journey
```bash
node index.js start-journey \
  --persona "email@example.com" \
  --scenario "happy-path" \
  --timing "accelerated" \
  --mock
```

### Verify Tracking
```bash
node index.js verify-tracking \
  --persona "email@example.com" \
  --email-number 1
```

### Test Links
```bash
node index.js test-links \
  --persona "email@example.com" \
  --email-number 1
```

### List Scenarios
```bash
node index.js list-scenarios
```

## 🎭 Journey Scenarios

- **happy-path** - User opens, clicks, and completes survey
- **non-responder** - User doesn't open Email 1, receives Email 2
- **clicker-non-completer** - Opens and clicks but doesn't complete
- **unsubscriber** - User unsubscribes after Email 1
- **multiple-clicks** - User clicks multiple links
- **no-click-opener** - Opens but doesn't click, receives Email 3
- **sandbox-explorer** - User explores sandbox demo
- **complete-journey** - Full journey through all emails

## ⏱️ Timing Presets

- **realistic** - Actual campaign timing (days)
- **accelerated** - Minutes instead of days (faster testing)
- **instant** - All emails sent immediately
- **manual** - Wait for approval between emails

## 📊 Report Formats

Reports are automatically generated after journey completion:

- **Console** - Real-time output during execution
- **Markdown** - Detailed report saved to `reports/` directory
- **Notion** - (Coming soon) Integrated test results page

## 🔧 Configuration

### Email Templates
Email templates are loaded from `campaigns/email-campaign/`:
- `EMAIL-1-RESEARCH-INVITATION-PLAIN.txt`
- `EMAIL-2-FOLLOWUP-NONRESPONDER-PLAIN.txt`
- `EMAIL-3-FOLLOWUP-NOCLICK-PLAIN.txt`
- `EMAIL-4-FOLLOWUP-INCOMPLETE-PLAIN.txt`
- `EMAIL-5-THANKYOU-SURVEY-COMPLETE-PLAIN.txt`

### Notion Database
Test personas are stored in the VIC Therapists Notion database with:
- `Test Persona` checkbox property (set to true)
- `Research Status` select property (tracks engagement)
- `Research Source Notes` rich text (UTM tracking data)

## 🧪 Testing Workflow

1. **Create Test Persona** - Add persona to Notion database
2. **Start Journey** - Execute email sequence with chosen scenario
3. **Verify Links** - All links tested automatically
4. **Verify Tracking** - Webhook events and Notion updates verified
5. **Generate Report** - Comprehensive test report generated

## 📝 Example: Testing Johnny Testmail

```bash
# 1. Create persona
node index.js create-persona \
  --name "Johnny Testmail" \
  --email "ibenizer@me.com" \
  --profession "Therapist" \
  --region "Victoria"

# 2. Test happy path journey (mock mode)
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "happy-path" \
  --timing "accelerated" \
  --mock

# 3. Verify tracking
node index.js verify-tracking \
  --persona "ibenizer@me.com" \
  --email-number 1

# 4. Test links
node index.js test-links \
  --persona "ibenizer@me.com" \
  --email-number 1
```

## 🐛 Troubleshooting

### "NOTION_TOKEN not configured"
Add `NOTION_TOKEN` to your `.env` file.

### "THERAPIST_DIRECTORY_DATABASE_ID not configured"
Add `THERAPIST_DIRECTORY_DATABASE_ID` to your `.env` file.

### "RESEND_API_KEY not configured"
Either add `RESEND_API_KEY` to `.env` for real emails, or use `--mock` flag for testing.

### "Persona not found"
Make sure the persona exists in the VIC Therapists Notion database with `Test Persona` checkbox enabled.

## 📚 Architecture

```
agents/email-campaign-tester/
├── index.js                    # CLI entry point
├── lib/
│   ├── persona-manager.js      # Persona CRUD operations
│   ├── journey-orchestrator.js # Journey execution
│   ├── email-sender.js         # Email sending (mock/real)
│   ├── link-tester.js          # Link validation
│   ├── tracking-verifier.js    # Tracking verification
│   ├── report-generator.js     # Report generation
│   └── utils.js                # Shared utilities
├── config/
│   ├── email-templates.js      # Email template loading
│   ├── journey-scenarios.js    # Journey scenarios
│   └── timing-presets.js       # Timing configurations
└── reports/                    # Generated reports
```

## 🔐 Security Notes

- Test personas are marked with `Test Persona` checkbox in Notion
- Mock mode doesn't send real emails
- Real mode requires valid Resend API key
- Survey tokens are signed with `RESEARCH_TOKEN_SECRET`

## 📖 See Also

- `REQUIREMENTS.md` - Detailed requirements and clarifications
- `USER-TESTING-AGENT-PROMPT.md` - Implementation prompt
- `campaigns/email-campaign/` - Email templates and campaign docs

