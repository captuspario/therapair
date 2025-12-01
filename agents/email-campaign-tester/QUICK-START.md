# 🚀 Quick Start Guide - Email Campaign Tester

## Step 1: Create Johnny Testmail Persona

```bash
cd agents/email-campaign-tester
node index.js create-persona \
  --name "Johnny Testmail" \
  --email "ibenizer@me.com" \
  --profession "Therapist" \
  --region "Victoria"
```

**Expected Output:**
```
[timestamp] ℹ️ Creating persona: Johnny Testmail (ibenizer@me.com)
[timestamp] ✅ Persona created in Notion: [page-id]
[timestamp] ✅ Persona created: Johnny Testmail (ibenizer@me.com)
[timestamp] ℹ️ Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 2: List Available Scenarios

```bash
node index.js list-scenarios
```

**Expected Output:**
```
Available Journey Scenarios:

  happy-path: Happy Path
    User opens Email 1, clicks survey link, completes survey
    Expected: Survey completed, thank you email sent

  non-responder: Non-Responder
    User does not open Email 1, receives Email 2 follow-up
    Expected: Email 2 triggered, user engages

  ...
```

## Step 3: Start a Test Journey (Mock Mode)

```bash
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "happy-path" \
  --timing "accelerated" \
  --mock
```

**What Happens:**
1. Email 1 is "sent" (mock mode - no real email)
2. Links are tested automatically
3. Email open/click events are simulated
4. Tracking is verified (if webhook is configured)
5. Email 5 (thank you) is sent after survey completion
6. Report is generated

**Expected Output:**
```
[timestamp] ℹ️ Starting journey journey-1234567890-abc123 for Johnny Testmail (happy-path)
[timestamp] ℹ️ 
📧 Processing Email 1...
[timestamp] ℹ️ Sending email 1...
[timestamp] [MOCK] Would send email 1 to ibenizer@me.com
[timestamp] ℹ️ Testing links in email 1...
[timestamp] ℹ️ Found 2 links in email 1
[timestamp] ✅ Link working: https://therapair.com.au/research/survey/...
[timestamp] ✅ Link working: https://therapair.com.au/documentation.html...
[timestamp] ✅ Simulated email open
[timestamp] ✅ Simulated link click
[timestamp] ✅ Journey completed: journey-1234567890-abc123
```

## Step 4: Verify Tracking

```bash
node index.js verify-tracking \
  --persona "ibenizer@me.com" \
  --email-number 1
```

**Expected Output:**
```json
{
  "emailOpened": {
    "verified": true,
    "researchStatus": "Opened (email 1)",
    "verifiedAt": "2025-01-30T..."
  },
  "emailClicked": {
    "verified": true,
    "researchStatus": "Clicked (email 1)",
    "verifiedAt": "2025-01-30T..."
  }
}
```

## Step 5: Test Links

```bash
node index.js test-links \
  --persona "ibenizer@me.com" \
  --email-number 1
```

**Expected Output:**
```
Link Test Results:
Total: 2
Working: 2
With UTM: 2
```

## Step 6: Check Generated Report

Reports are automatically saved to `agents/email-campaign-tester/reports/`:

```bash
ls -la reports/
```

You'll find a markdown file like:
- `journey-journey-1234567890-abc123-1234567890.md`

## 🎯 Next Steps

### Test Real Emails

Remove `--mock` flag to send real emails:

```bash
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "happy-path" \
  --timing "accelerated"
```

**Note:** Requires `RESEND_API_KEY` in `.env` file.

### Test Different Scenarios

```bash
# Non-responder scenario
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "non-responder" \
  --timing "accelerated" \
  --mock

# Unsubscriber scenario
node index.js start-journey \
  --persona "ibenizer@me.com" \
  --scenario "unsubscriber" \
  --timing "accelerated" \
  --mock
```

### Test All Scenarios

```bash
# List all scenarios first
node index.js list-scenarios

# Then test each one
for scenario in happy-path non-responder clicker-non-completer unsubscriber multiple-clicks; do
  node index.js start-journey \
    --persona "ibenizer@me.com" \
    --scenario "$scenario" \
    --timing "accelerated" \
    --mock
done
```

## 🔍 Troubleshooting

### Error: "NOTION_TOKEN not configured"
```bash
# Add to .env file in project root
echo "NOTION_TOKEN=your_token_here" >> ../../.env
```

### Error: "THERAPIST_DIRECTORY_DATABASE_ID not configured"
```bash
# Add to .env file
echo "THERAPIST_DIRECTORY_DATABASE_ID=your_database_id" >> ../../.env
```

### Error: "Persona not found"
- Check that persona exists in Notion database
- Verify email address is correct
- Ensure `Test Persona` checkbox is enabled

### Links Not Working
- Check internet connection
- Verify URLs are correct in email templates
- Check if UTM parameters are being added correctly

## 📊 Understanding Reports

### Console Report
Shows real-time progress and summary:
- Emails sent/opened/clicked
- Links tested/working
- Tracking verification status

### Markdown Report
Detailed report with:
- Full journey timeline
- Link test results
- Tracking verification details
- Error logs (if any)

## 🎉 Success Criteria

A successful test journey should show:
- ✅ All emails sent successfully
- ✅ All links working and have UTM parameters
- ✅ Tracking verified in Notion
- ✅ Report generated successfully

If any of these fail, check the error messages and verify your configuration.

