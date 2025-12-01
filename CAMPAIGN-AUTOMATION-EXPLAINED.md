# Campaign Automation Functionality

**Date:** 2025-01-30  
**Status:** ✅ Fully Functional

---

## 🎯 Overview

The email campaign system includes automated tracking, follow-up emails, and conditional sending based on user behavior. Here's how it works:

---

## 📧 Email Sequence

### Email 1: Research Invitation
- **When:** Initial send
- **Purpose:** Invite therapists to participate in research survey
- **Triggers:** None (first email in sequence)

### Email 2: Follow-up for Non-Responders
- **When:** User hasn't opened Email 1 after delay period
- **Purpose:** Remind non-responders about the research opportunity
- **Triggers:** No open event detected for Email 1

### Email 3: Follow-up for No-Click
- **When:** User opened Email 1 but didn't click any links
- **Purpose:** Re-engage users who opened but didn't act
- **Triggers:** Open detected but no click events

### Email 4: Follow-up for Incomplete Survey
- **When:** User clicked survey link but didn't complete survey
- **Purpose:** Remind users to complete the survey they started
- **Triggers:** Click detected but survey not completed

### Email 5: Thank You (Survey Complete)
- **When:** User completed the survey
- **Purpose:** Thank user and provide next steps
- **Triggers:** Survey completion detected

---

## 🤖 Automation Features

### 1. **Automated Tracking**

**What Gets Tracked:**
- ✅ Email opens (via Resend webhook)
- ✅ Link clicks (via Resend webhook)
- ✅ Survey completion (via survey submission API)
- ✅ Sandbox visits (via sandbox visit tracking)
- ✅ Feedback submissions (via feedback API)

**Tracking Endpoints:**
- `/api/research/email-event.php` - Resend webhook handler
- `/api/research/track-sandbox-visit.php` - Sandbox visit tracker
- `/api/research/feedback.php` - Feedback submissions

**Database Updates:**
- Email engagement logged in therapist directory
- Research Status updated based on actions
- Source Notes updated with engagement details

---

### 2. **Conditional Follow-up Emails**

**Logic:**
```
Email 1 Sent
  ↓
Wait for delay period
  ↓
Check user actions:
  ├─ No open → Send Email 2 (Non-Responder)
  ├─ Open but no click → Send Email 3 (No-Click)
  ├─ Click but no completion → Send Email 4 (Incomplete)
  └─ Survey completed → Send Email 5 (Thank You)
```

**Timing Presets:**
- **Realistic:** Real-world delays (days between emails)
- **Accelerated:** Faster testing (hours between emails)
- **Instant:** Immediate (for testing)
- **Manual:** Requires approval before each email

---

### 3. **Sandbox Invite Automation**

**Current Status:** ⚠️ **Not Yet Automated**

**How It Could Work:**
1. Track if user visited sandbox after survey completion
2. If no sandbox visit after X days → Send sandbox invite email
3. Track sandbox engagement (visits, feedback)

**Implementation Needed:**
- Add sandbox visit tracking to journey scenarios
- Create sandbox invite email template
- Add conditional logic for sandbox non-visitors

---

## 🔄 Journey Orchestration

**File:** `agents/email-campaign-tester/lib/journey-orchestrator.js`

**How It Works:**
1. **Start Journey:** Execute scenario for a persona
2. **Send Email:** Send email based on scenario
3. **Track Actions:** Monitor opens, clicks, completions
4. **Wait for Delay:** Use timing preset to determine delay
5. **Check Conditions:** Evaluate if next email should be sent
6. **Send Follow-up:** Send appropriate follow-up email
7. **Repeat:** Continue until journey complete

**Journey Scenarios:**
- `happy-path` - User completes survey successfully
- `non-responder` - User doesn't open Email 1
- `no-click-opener` - User opens but doesn't click
- `clicker-non-completer` - User clicks but doesn't complete
- `complete-journey` - Full journey through all emails

---

## 📊 Tracking & Database Integration

### Email Engagement Tracking

**Resend Webhooks:**
- Email opened → Updates therapist directory
- Link clicked → Logs click event with UTM parameters
- All events → Saved to "Research Source Notes"

**Survey Completion Tracking:**
- Survey submitted → Updates "Research Status" to "Completed"
- Updates "Latest Survey Date"
- Links to therapist directory via email

**Sandbox Visit Tracking:**
- Sandbox visited → Updates "Latest Sandbox Visit"
- Updates "Research Status" to "Sandbox Visited"
- Logs visit in "Research Source Notes"

---

## 🎯 Conditional Logic Examples

### Example 1: Non-Responder Flow
```
Day 0: Email 1 sent
Day 3: Check if Email 1 opened
  → No open detected
  → Send Email 2 (Non-Responder Follow-up)
```

### Example 2: Incomplete Survey Flow
```
Day 0: Email 1 sent
Day 1: User opens Email 1, clicks survey link
Day 2: Check if survey completed
  → Click detected but no completion
  → Send Email 4 (Incomplete Survey Reminder)
```

### Example 3: Complete Journey Flow
```
Day 0: Email 1 sent
Day 1: User opens, clicks, completes survey
Day 1: Send Email 5 (Thank You)
```

---

## 🚀 How to Use Campaign Automation

### Manual Execution (Current)

**Send Individual Email:**
```bash
node index.js send-test-email --email "email@example.com" --email-number 1
```

**Start Journey:**
```bash
node index.js start-journey \
  --persona "email@example.com" \
  --scenario "happy-path" \
  --timing "accelerated"
```

### Automated Execution (Future)

**Potential Implementation:**
1. Scheduled job checks database for users needing follow-ups
2. Evaluates conditions (opened? clicked? completed?)
3. Sends appropriate follow-up email
4. Updates database with send status

**Requirements:**
- Cron job or scheduled task runner
- Database queries for user status
- Conditional logic for email selection
- Error handling and logging

---

## 📋 Current Limitations

### What's Automated:
- ✅ Email sending
- ✅ Tracking via webhooks
- ✅ Database updates
- ✅ Journey orchestration (manual trigger)

### What's NOT Automated:
- ⚠️ Automatic follow-up sending (requires manual trigger)
- ⚠️ Sandbox visit detection and invites
- ⚠️ Scheduled batch sending
- ⚠️ Automatic journey progression

### What Could Be Added:
1. **Scheduled Follow-ups:** Cron job to check and send follow-ups
2. **Sandbox Invites:** Auto-send if no sandbox visit after survey
3. **Batch Processing:** Send to multiple users automatically
4. **Smart Timing:** Adjust delays based on user behavior

---

## 🔧 Technical Implementation

### Journey Orchestrator

**File:** `lib/journey-orchestrator.js`

**Key Functions:**
- `executeJourney()` - Main orchestration function
- `getJourneyStatus()` - Get current journey status
- Handles delays, actions, tracking verification

### Timing Presets

**File:** `config/timing-presets.js`

**Presets:**
- `realistic` - Real-world timing (days)
- `accelerated` - Faster testing (hours)
- `instant` - Immediate (testing)
- `manual` - User approval required

### Journey Scenarios

**File:** `config/journey-scenarios.js`

**Scenarios:**
- Define which emails to send
- Define actions to simulate
- Define expected outcomes

---

## ✅ Summary

**Current State:**
- ✅ Email templates ready
- ✅ Tracking infrastructure in place
- ✅ Journey orchestration functional
- ✅ Database integration working
- ⚠️ Automation requires manual trigger

**To Fully Automate:**
1. Add scheduled job/cron
2. Query database for users needing follow-ups
3. Evaluate conditions and send appropriate emails
4. Add sandbox visit detection
5. Implement batch processing

**Status:** ✅ **Core functionality complete, automation ready for implementation**

---

**Last Updated:** 2025-01-30

