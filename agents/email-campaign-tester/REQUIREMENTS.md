# 📧 Email Campaign User Testing Agent - Requirements & Clarifications

**Purpose:** Automated testing agent for email campaigns that creates test personas, sends emails, verifies tracking, and generates test reports.

**Status:** Requirements & Clarifications  
**Date:** 2025-01-30

---

## 🎯 Core Objectives

1. **Create Test Personas** - Generate fictitious therapist profiles for testing
2. **Execute Email Journeys** - Send emails in sequence with proper timing
3. **Verify Email Delivery** - Confirm emails are sent and received
4. **Test Tracking Links** - Verify all links work and include correct UTM parameters
5. **Validate Webhook Events** - Confirm email events (opens, clicks) are tracked in Notion
6. **Generate Test Reports** - Provide comprehensive test results

---

## ❓ Clarifying Questions

### **1. Test Persona Management**

**Question:** Where should test personas be stored?
- **Option A:** Separate Notion database for test users (recommended - keeps production data clean)
- **Option B:** Same therapist directory database with a "Test" flag
- **Option C:** Local JSON file (simpler, but no persistence)

**Recommendation:** Option A - Separate test database allows:
- Easy cleanup after testing
- No risk of polluting production data
- Clear separation of test vs. real users

**Your Preference:** [Please specify]

---

### **2. Email Sending Method**

**Question:** How should emails be sent during testing?
- **Option A:** Use Resend MCP (via Cursor) - Real emails to test addresses
- **Option B:** Mock/simulate email sending - Faster, no actual emails
- **Option C:** Both - Mock for rapid testing, real emails for final validation

**Recommendation:** Option C - Hybrid approach:
- Mock mode for rapid iteration and link validation
- Real email mode for final end-to-end testing

**Your Preference:** [Please specify]

---

### **3. Journey Execution Timing**

**Question:** How should email sequence timing work?
- **Option A:** Real-time delays (Day 0, Day 3, Day 7, Day 14) - Most realistic
- **Option B:** Accelerated timing (1 min, 3 min, 7 min, 14 min) - Faster testing
- **Option C:** Manual approval between emails - Full control
- **Option D:** Configurable timing - Flexible for different test scenarios

**Recommendation:** Option D - Configurable with presets:
- `realistic`: Actual campaign timing
- `accelerated`: Minutes instead of days
- `instant`: All emails immediately
- `manual`: Wait for approval between emails

**Your Preference:** [Please specify]

---

### **4. Link Testing Strategy**

**Question:** How should links be tested?
- **Option A:** Automated HTTP requests - Verify links are reachable
- **Option B:** Browser automation (Playwright) - Full end-to-end testing
- **Option C:** Manual verification checklist - You click and verify
- **Option D:** Combination - Automated + manual verification

**Recommendation:** Option D - Multi-layer testing:
- Automated: Verify links are reachable, UTM parameters present
- Browser automation: Test actual user flows (survey, sandbox)
- Manual: Final verification checklist

**Your Preference:** [Please specify]

---

### **5. Tracking Verification**

**Question:** How should webhook events be verified?
- **Option A:** Poll Notion database - Check if events were recorded
- **Option B:** Monitor webhook endpoint logs - Verify events were received
- **Option C:** Both - Verify webhook received AND Notion updated
- **Option D:** Simulate webhook events - Test without actual email clicks

**Recommendation:** Option C - Full verification:
- Verify webhook endpoint receives events
- Verify Notion database is updated correctly
- Verify UTM parameters are captured accurately

**Your Preference:** [Please specify]

---

### **6. Test Email Addresses**

**Question:** What email addresses should be used for testing?
- **Option A:** Real email addresses you control (e.g., ibenizer@me.com)
- **Option B:** Test email service (e.g., Mailtrap, Mailinator)
- **Option C:** Both - Real for final testing, test service for development

**Recommendation:** Option C - Use test service for development, real emails for final validation

**Your Preference:** [Please specify]

---

### **7. Test Report Format**

**Question:** What format should test reports use?
- **Option A:** Console output (terminal) - Quick feedback
- **Option B:** Markdown file - Detailed documentation
- **Option C:** Notion page - Integrated with your workflow
- **Option D:** All of the above - Multiple formats

**Recommendation:** Option D - Multiple formats:
- Console: Real-time feedback during testing
- Markdown: Detailed test reports for documentation
- Notion: Integrated test results database

**Your Preference:** [Please specify]

---

### **8. Persona Attributes**

**Question:** What attributes should test personas have?
- **Minimum:** Name, Email, Profession, Region
- **Extended:** Years in practice, Modalities, Client types, etc.
- **Custom:** Any specific attributes you want to test?

**Recommendation:** Start with minimum, extend as needed

**Your Preference:** [Please specify]

---

### **9. Journey Scenarios**

**Question:** What journey scenarios should be tested?
- **Scenario A:** Happy path - User opens, clicks, completes survey
- **Scenario B:** Non-responder - User doesn't open Email 1, receives Email 2
- **Scenario C:** Clicker but non-completer - Opens, clicks, but doesn't complete
- **Scenario D:** Unsubscriber - User unsubscribes after Email 1
- **Scenario E:** All scenarios - Comprehensive testing

**Recommendation:** Option E - Test all scenarios for complete coverage

**Your Preference:** [Please specify]

---

### **10. Integration Points**

**Question:** Which systems need to be integrated?
- **Confirmed:** Resend MCP (email sending), Notion API (tracking)
- **Question:** Do you need Typebot integration testing (survey completion)?
- **Question:** Do you need sandbox demo testing?
- **Question:** Any other systems to test?

**Your Preference:** [Please specify]

---

## 🏗️ Proposed Architecture

### **Agent Components:**

1. **Persona Manager** (`persona-manager.js`)
   - Create test personas
   - Store in Notion test database
   - Generate unique tokens

2. **Journey Orchestrator** (`journey-orchestrator.js`)
   - Execute email sequences
   - Handle timing and delays
   - Track journey state

3. **Email Sender** (`email-sender.js`)
   - Send emails via Resend MCP
   - Personalize email content
   - Add UTM parameters

4. **Link Tester** (`link-tester.js`)
   - Verify links are reachable
   - Check UTM parameters
   - Test browser automation flows

5. **Tracking Verifier** (`tracking-verifier.js`)
   - Monitor webhook events
   - Verify Notion updates
   - Validate UTM capture

6. **Report Generator** (`report-generator.js`)
   - Generate test reports
   - Export to multiple formats
   - Create Notion test results

---

## 📋 Implementation Plan

### **Phase 1: Core Infrastructure** (2-3 hours)
- [ ] Persona Manager
- [ ] Journey Orchestrator
- [ ] Email Sender (Resend MCP integration)
- [ ] Basic reporting

### **Phase 2: Testing & Verification** (2-3 hours)
- [ ] Link Tester
- [ ] Tracking Verifier
- [ ] Notion integration
- [ ] Webhook monitoring

### **Phase 3: Advanced Features** (1-2 hours)
- [ ] Browser automation
- [ ] Multiple journey scenarios
- [ ] Advanced reporting
- [ ] Cleanup utilities

---

## 🚀 Quick Start (After Clarifications)

Once you answer the questions above, I'll implement:

```bash
# Create test persona
node agents/email-campaign-tester/index.js create-persona \
  --name "Johnny Testmail" \
  --email "ibenizer@me.com" \
  --profession "Therapist" \
  --region "Victoria"

# Start journey
node agents/email-campaign-tester/index.js start-journey \
  --persona "Johnny Testmail" \
  --scenario "happy-path" \
  --timing "accelerated"

# Verify tracking
node agents/email-campaign-tester/index.js verify-tracking \
  --persona "Johnny Testmail" \
  --email-number 1

# Generate report
node agents/email-campaign-tester/index.js generate-report \
  --persona "Johnny Testmail" \
  --format "markdown,notion"
```

---

## 📝 Next Steps

1. **Answer clarifying questions** (above)
2. **Review proposed architecture**
3. **Approve implementation plan**
4. **Begin implementation**

---

**Ready to proceed?** Please answer the questions above, and I'll implement the agent system based on your preferences.


