# 🧪 Email Campaign User Testing Agent - Implementation Prompt

**Purpose:** Create an autonomous agent system for testing email campaigns with different user personas and journey scenarios.

**Best Practices Applied:**
- Persona-based testing
- Journey orchestration
- Automated verification
- Comprehensive reporting
- Multi-scenario coverage

---

## 🎯 System Requirements

### **Core Functionality**

Build an email campaign testing agent that:

1. **Creates Test Personas**
   - Generate fictitious therapist profiles with configurable attributes
   - Store personas in a dedicated Notion test database
   - Support multiple personas for A/B testing and scenario coverage

2. **Orchestrates Email Journeys**
   - Execute email sequences (5 emails: Day 0, 3, 7, 14, Thank You)
   - Support configurable timing (realistic, accelerated, instant, manual)
   - Handle different journey scenarios (happy path, non-responder, etc.)

3. **Sends Test Emails**
   - Integrate with Resend MCP for email sending
   - Personalize email content with persona attributes
   - Add UTM tracking parameters to all links
   - Support both mock and real email modes

4. **Verifies Email Tracking**
   - Monitor webhook events (opens, clicks)
   - Verify Notion database updates
   - Validate UTM parameter capture
   - Check link functionality

5. **Generates Test Reports**
   - Console output for real-time feedback
   - Markdown files for documentation
   - Notion pages for integrated results
   - Comprehensive test coverage metrics

---

## 🏗️ Architecture Specifications

### **Component Structure**

```
agents/email-campaign-tester/
├── index.js                    # Main CLI entry point
├── lib/
│   ├── persona-manager.js      # Persona creation & management
│   ├── journey-orchestrator.js # Journey execution & timing
│   ├── email-sender.js         # Email sending via Resend MCP
│   ├── link-tester.js          # Link validation & testing
│   ├── tracking-verifier.js    # Webhook & Notion verification
│   ├── report-generator.js     # Test report generation
│   └── utils.js                # Shared utilities
├── config/
│   ├── email-templates.js      # Email template loading
│   ├── journey-scenarios.js    # Predefined journey scenarios
│   └── timing-presets.js       # Timing configuration presets
├── tests/
│   └── sample-personas.json    # Sample test personas
└── reports/                    # Generated test reports
```

### **Data Models**

#### **Persona**
```javascript
{
  id: string,                    // Unique persona ID
  name: string,                  // Full name
  email: string,                 // Test email address
  profession: string,            // Therapist profession
  region: string,                // Geographic region
  attributes: {                  // Extended attributes
    yearsInPractice?: number,
    modalities?: string[],
    clientTypes?: string[]
  },
  token: string,                 // Unique survey token
  notionPageId?: string,         // Notion database page ID
  createdAt: Date,
  status: 'active' | 'completed' | 'archived'
}
```

#### **Journey**
```javascript
{
  id: string,                    // Unique journey ID
  personaId: string,             // Associated persona
  scenario: string,              // Journey scenario name
  timing: 'realistic' | 'accelerated' | 'instant' | 'manual',
  emails: [                      // Email sequence
    {
      number: number,             // Email number (1-5)
      sentAt?: Date,              // When sent
      openedAt?: Date,            // When opened
      clickedAt?: Date,            // When clicked
      links: [                    // Links in email
        {
          url: string,
          utmParams: object,
          tested: boolean,
          working: boolean
        }
      ]
    }
  ],
  status: 'pending' | 'in-progress' | 'completed' | 'failed',
  startedAt: Date,
  completedAt?: Date
}
```

#### **Test Report**
```javascript
{
  journeyId: string,
  personaId: string,
  scenario: string,
  summary: {
    totalEmails: number,
    emailsSent: number,
    emailsOpened: number,
    linksClicked: number,
    linksTested: number,
    linksWorking: number,
    trackingVerified: boolean,
    notionUpdated: boolean
  },
  details: {
    emailDelivery: object[],
    linkTesting: object[],
    trackingVerification: object[],
    issues: string[]
  },
  generatedAt: Date
}
```

---

## 🔧 Implementation Details

### **1. Persona Manager**

**Responsibilities:**
- Create test personas with unique attributes
- Generate secure survey tokens
- Store personas in Notion test database
- Retrieve and update persona data

**Key Functions:**
```javascript
// Create a new test persona
async function createPersona(attributes) {
  // Generate unique token
  // Create Notion page
  // Return persona object
}

// Retrieve persona by email or ID
async function getPersona(identifier) {
  // Query Notion database
  // Return persona object
}

// List all personas
async function listPersonas(status = 'active') {
  // Query Notion database
  // Return persona array
}
```

### **2. Journey Orchestrator**

**Responsibilities:**
- Execute email sequences based on scenarios
- Handle timing and delays
- Track journey state
- Coordinate with email sender and verifiers

**Key Functions:**
```javascript
// Start a new journey
async function startJourney(personaId, scenario, timing) {
  // Load scenario configuration
  // Initialize journey state
  // Begin email sequence
}

// Execute next email in sequence
async function executeNextEmail(journeyId) {
  // Determine which email to send
  // Send email via email sender
  // Schedule next email based on timing
}

// Complete journey
async function completeJourney(journeyId) {
  // Generate final report
  // Update journey status
  // Cleanup if needed
}
```

### **3. Email Sender**

**Responsibilities:**
- Send emails via Resend MCP
- Personalize email content
- Add UTM parameters to links
- Support mock mode for testing

**Key Functions:**
```javascript
// Send email
async function sendEmail(persona, emailNumber, mockMode = false) {
  // Load email template
  // Personalize content
  // Add UTM parameters
  // Send via Resend MCP (or mock)
  // Return email details
}

// Personalize email content
function personalizeEmail(template, persona, emailNumber) {
  // Replace variables: {{first_name}}, {{token}}, etc.
  // Add UTM parameters to links
  // Return personalized content
}
```

### **4. Link Tester**

**Responsibilities:**
- Verify links are reachable
- Check UTM parameters are present
- Test browser automation flows (optional)
- Validate link functionality

**Key Functions:**
```javascript
// Test a single link
async function testLink(url, expectedUtmParams) {
  // Make HTTP request
  // Verify status code
  // Extract and verify UTM parameters
  // Return test results
}

// Test all links in email
async function testEmailLinks(emailNumber, persona) {
  // Extract all links from email template
  // Test each link
  // Return comprehensive results
}
```

### **5. Tracking Verifier**

**Responsibilities:**
- Monitor webhook events
- Verify Notion database updates
- Validate UTM parameter capture
- Check tracking accuracy

**Key Functions:**
```javascript
// Verify email event was tracked
async function verifyEmailEvent(persona, emailNumber, eventType) {
  // Query Notion database
  // Check Research Status property
  // Verify UTM parameters captured
  // Return verification results
}

// Monitor webhook endpoint
async function monitorWebhook(timeout = 30000) {
  // Poll webhook logs or Notion
  // Wait for expected events
  // Return events received
}
```

### **6. Report Generator**

**Responsibilities:**
- Generate comprehensive test reports
- Export to multiple formats
- Create Notion test results pages
- Provide actionable insights

**Key Functions:**
```javascript
// Generate test report
async function generateReport(journeyId, formats = ['console', 'markdown']) {
  // Collect all test data
  // Generate report content
  // Export to requested formats
  // Create Notion page if requested
}

// Format report for console
function formatConsoleReport(report) {
  // Format for terminal output
}

// Format report for markdown
function formatMarkdownReport(report) {
  // Format for markdown file
}
```

---

## 📋 Journey Scenarios

### **Scenario 1: Happy Path**
- Email 1: Sent → Opened → Clicked (survey link) → Survey completed
- Email 5: Thank you email sent
- **Expected:** All emails delivered, tracking verified, survey completed

### **Scenario 2: Non-Responder**
- Email 1: Sent → Not opened
- Email 2: Sent (Day 3) → Opened → Clicked
- **Expected:** Email 2 triggered correctly, tracking updated

### **Scenario 3: Clicker but Non-Completer**
- Email 1: Sent → Opened → Clicked (survey link) → Survey started but not completed
- Email 4: Sent (Day 14) → Completion reminder
- **Expected:** Email 4 triggered for incomplete survey

### **Scenario 4: Unsubscriber**
- Email 1: Sent → Opened → Unsubscribed
- **Expected:** No further emails sent, status updated in Notion

### **Scenario 5: Multiple Clicks**
- Email 1: Sent → Opened → Clicked (survey) → Clicked (learn more) → Clicked (sandbox)
- **Expected:** All clicks tracked, UTM parameters captured correctly

---

## 🚀 CLI Interface

### **Commands**

```bash
# Create a test persona
node agents/email-campaign-tester/index.js create-persona \
  --name "Johnny Testmail" \
  --email "ibenizer@me.com" \
  --profession "Therapist" \
  --region "Victoria" \
  --attributes '{"yearsInPractice": 5, "modalities": ["CBT", "DBT"]}'

# List all personas
node agents/email-campaign-tester/index.js list-personas

# Start a journey
node agents/email-campaign-tester/index.js start-journey \
  --persona "Johnny Testmail" \
  --scenario "happy-path" \
  --timing "accelerated" \
  --mock false

# Verify tracking for a persona
node agents/email-campaign-tester/index.js verify-tracking \
  --persona "Johnny Testmail" \
  --email-number 1

# Test links in an email
node agents/email-campaign-tester/index.js test-links \
  --email-number 1 \
  --persona "Johnny Testmail"

# Generate test report
node agents/email-campaign-tester/index.js generate-report \
  --journey "journey-id" \
  --formats "console,markdown,notion"

# Run all scenarios
node agents/email-campaign-tester/index.js run-all-scenarios \
  --timing "accelerated" \
  --mock false
```

---

## 🔐 Configuration

### **Environment Variables**

```bash
# Notion Configuration
NOTION_TOKEN=your_notion_token
NOTION_DB_TEST_PERSONAS=database_id_for_test_personas
NOTION_DB_THERAPIST_DIRECTORY=database_id_for_therapist_directory

# Email Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_WEBHOOK_SECRET=your_webhook_secret

# Testing Configuration
TEST_EMAIL_DOMAIN=me.com  # Domain for test emails
MOCK_MODE=false            # Use mock email sending
```

### **Configuration Files**

```javascript
// config/journey-scenarios.js
export const scenarios = {
  'happy-path': {
    emails: [1, 5],
    actions: {
      1: ['open', 'click-survey', 'complete-survey']
    }
  },
  'non-responder': {
    emails: [1, 2],
    actions: {
      1: [],  // No action
      2: ['open', 'click-survey']
    }
  },
  // ... more scenarios
};

// config/timing-presets.js
export const timingPresets = {
  realistic: {
    1: 0,      // Day 0
    2: 3,      // Day 3
    3: 7,      // Day 7
    4: 14,     // Day 14
    5: 0       // Immediate after survey
  },
  accelerated: {
    1: 0,      // 0 minutes
    2: 3,      // 3 minutes
    3: 7,      // 7 minutes
    4: 14,     // 14 minutes
    5: 0       // Immediate
  },
  instant: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }
};
```

---

## ✅ Success Criteria

The agent is successful when:

1. ✅ Can create test personas and store in Notion
2. ✅ Can send emails via Resend MCP with proper personalization
3. ✅ Can execute journey scenarios with configurable timing
4. ✅ Can verify email tracking in Notion database
5. ✅ Can test all links and verify UTM parameters
6. ✅ Can generate comprehensive test reports
7. ✅ Can handle multiple personas and scenarios simultaneously
8. ✅ Provides clear error messages and debugging information

---

## 📝 Implementation Checklist

- [ ] Set up project structure
- [ ] Implement Persona Manager
- [ ] Implement Journey Orchestrator
- [ ] Integrate Resend MCP for email sending
- [ ] Implement Link Tester
- [ ] Implement Tracking Verifier
- [ ] Implement Report Generator
- [ ] Create CLI interface
- [ ] Add configuration management
- [ ] Write documentation
- [ ] Test with sample persona (Johnny Testmail)
- [ ] Test all journey scenarios
- [ ] Generate sample reports

---

## 🎯 Example Usage

```bash
# 1. Create test persona
node agents/email-campaign-tester/index.js create-persona \
  --name "Johnny Testmail" \
  --email "ibenizer@me.com" \
  --profession "Therapist" \
  --region "Victoria"

# 2. Start happy path journey
node agents/email-campaign-tester/index.js start-journey \
  --persona "Johnny Testmail" \
  --scenario "happy-path" \
  --timing "accelerated"

# 3. Verify tracking (after journey completes)
node agents/email-campaign-tester/index.js verify-tracking \
  --persona "Johnny Testmail"

# 4. Generate comprehensive report
node agents/email-campaign-tester/index.js generate-report \
  --persona "Johnny Testmail" \
  --formats "console,markdown,notion"
```

---

**This prompt follows industry best practices for:**
- ✅ Modular architecture
- ✅ Clear separation of concerns
- ✅ Comprehensive testing scenarios
- ✅ Multiple output formats
- ✅ Configurable behavior
- ✅ Error handling and reporting
- ✅ Documentation and usability


