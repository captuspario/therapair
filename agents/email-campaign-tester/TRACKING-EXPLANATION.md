# Email Campaign Tracking - Complete Explanation

## 📊 How We Know a User Clicked the Survey Link

### Email Click Tracking (Resend Webhook)

**How it works:**
1. **Email sent** → Resend sends email with tracking links
2. **User clicks link** → Resend detects the click event
3. **Webhook triggered** → Resend sends POST to `/api/research/resend-webhook.php`
4. **Signature verified** → PHP verifies Resend's webhook signature
5. **Database updated** → Notion database updated automatically

**What gets tracked:**
- **Event type:** `email.clicked`
- **Email address:** Extracted from webhook payload
- **URL clicked:** Full URL with UTM parameters
- **Timestamp:** When the click occurred

**Where it's saved:**
- **Database:** VIC Therapists Inclusive (DEMO) - `28c5c25944da80a48d85fd43119f4ec1`
- **Property:** `Research Status` → Set to "Clicked (email 1)", "Clicked (email 2)", etc.
- **Property:** `Latest Survey Date` → Updated to current timestamp
- **Property:** `Research Source Notes` → UTM parameters and tracking data

**Example:**
```
User clicks: https://therapair.com.au/research/survey/index.html?token=...&utm_email=1&utm_content=survey
→ Resend webhook fires
→ email-event.php processes event
→ Updates Notion: Research Status = "Clicked (email 1)"
```

---

## 📍 Where All Tracking is Saved

### 1. Email Engagement Tracking

**Database:** VIC Therapists Inclusive (DEMO)  
**Properties:**
- `Research Status` (Select) - "Opened (email 1)", "Clicked (email 1)", "Unsubscribed", etc.
- `Latest Survey Date` (Date) - Last engagement timestamp
- `Research Follow-up` (Rich Text) - Engagement notes
- `Research Source Notes` (Rich Text) - UTM parameters and source data

**Updated by:** `/api/research/email-event.php` (Resend webhook handler)

**Events tracked:**
- `email.opened` → "Opened (email X)"
- `email.clicked` → "Clicked (email X)"
- Unsubscribe → "Unsubscribed"

---

### 2. Survey Response Tracking

**Database:** Therapist Research Survey Responses (separate database)  
**Properties:**
- All survey answers (profession, years, client types, modalities, etc.)
- `Engagement Source` (Multi-select) - UTM tags like "utm_source:email", "utm_medium:research"
- `Source Notes` (Rich Text) - Full UTM parameters, referrer, landing path
- `Session ID` (Rich Text) - Unique session identifier
- `IP Hash` (Rich Text) - Hashed IP address for privacy

**Updated by:** `/api/research/response.php` (Survey submission handler)

**When tracked:**
- User completes survey and clicks "Submit"
- All answers + metadata saved to research database
- Also updates VIC Therapists database with completion status

---

### 3. Survey Completion Actions

**New tracking added:**
- **Sandbox Demo Click** → Tracked via:
  - UTM parameters in URL
  - SessionStorage flag (`therapair_sandbox_visit`)
  - Optional beacon API call

**Documentation Link Click** → Tracked via:
  - UTM parameters preserved in URL
  - Can be tracked via webhook if link is clicked from email

---

## 🔄 Complete Tracking Flow

### Email → Survey → Sandbox Journey

```
1. Email Sent
   ↓
2. User Opens Email
   → Resend webhook: email.opened
   → Notion: Research Status = "Opened (email 1)"
   ↓
3. User Clicks Survey Link
   → Resend webhook: email.clicked
   → Notion: Research Status = "Clicked (email 1)"
   → Notion: Latest Survey Date = [timestamp]
   ↓
4. User Completes Survey
   → Survey submission to /api/research/response.php
   → Research DB: Full survey responses saved
   → VIC Therapists DB: Research Status = "Survey Completed"
   → VIC Therapists DB: Latest Survey Date = [timestamp]
   ↓
5. User Clicks "Check out sandbox demo"
   → URL includes UTM parameters from survey
   → SessionStorage: therapair_sandbox_visit = 1
   → SessionStorage: therapair_survey_completed = 1
   → Sandbox page can detect completion and track accordingly
```

---

## 🎯 What's Tracked at Each Step

### Email Engagement (Resend Webhook)
- ✅ Email opens
- ✅ Link clicks (with full URL)
- ✅ UTM parameters extracted
- ✅ Timestamp
- ✅ Email number (1-5)

### Survey Completion
- ✅ All survey answers
- ✅ UTM parameters (preserved from email link)
- ✅ Session ID
- ✅ Referrer
- ✅ Landing path
- ✅ IP hash (privacy-safe)
- ✅ User agent
- ✅ Sandbox visit flag (if visited before)

### Post-Survey Actions
- ✅ Sandbox demo click (with UTM tracking)
- ✅ Documentation link click (with UTM tracking)
- ✅ SessionStorage flags for cross-page tracking

---

## 📋 Tracking Properties Summary

### VIC Therapists Database (Email Engagement)
| Property | Type | Purpose |
|----------|------|---------|
| Research Status | Select | "Opened (email 1)", "Clicked (email 1)", "Survey Completed", "Unsubscribed" |
| Latest Survey Date | Date | Last engagement timestamp |
| Research Follow-up | Rich Text | Engagement notes |
| Research Source Notes | Rich Text | UTM parameters and source data |

### Research Survey Database (Survey Responses)
| Property | Type | Purpose |
|----------|------|---------|
| Engagement Source | Multi-select | UTM tags (utm_source:email, utm_medium:research, etc.) |
| Source Notes | Rich Text | Full tracking metadata (UTM, referrer, landing path, etc.) |
| Session ID | Rich Text | Unique session identifier |
| IP Hash | Rich Text | Privacy-safe IP tracking |

---

## ✅ Changes Made

1. **Removed:** "Download my responses" button
2. **Added:** "Check out the sandbox demo prototype" button
3. **Added:** UTM parameter preservation in sandbox demo link
4. **Added:** SessionStorage tracking flags
5. **Added:** Optional beacon API tracking for sandbox clicks

---

## 🧪 Testing Tracking

### Test Email Click Tracking
1. Send test email
2. Click survey link
3. Check Resend dashboard → Should show "clicked" event
4. Check Notion VIC Therapists DB → Research Status should update

### Test Survey Completion Tracking
1. Complete survey
2. Check Research Survey DB → Should have new entry
3. Check VIC Therapists DB → Research Status = "Survey Completed"

### Test Sandbox Demo Click Tracking
1. Complete survey
2. Click "Check out sandbox demo"
3. Check URL → Should have UTM parameters
4. Check SessionStorage → Should have flags set
5. Sandbox page can detect completion via SessionStorage

---

**Last Updated:** 2025-11-26  
**Status:** ✅ All tracking implemented and documented

