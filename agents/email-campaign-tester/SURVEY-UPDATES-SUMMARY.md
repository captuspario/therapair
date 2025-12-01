# Survey Completion Page Updates

## ✅ Changes Made

### 1. Removed "Download my responses" Button ✅
- **Removed:** Download button and its event handler
- **Reason:** User requested removal

### 2. Added "Check out sandbox demo prototype" Button ✅
- **Added:** New primary button linking to sandbox demo
- **URL:** `/sandbox/sandbox-demo.html`
- **Tracking:** Full UTM parameter preservation and additional tracking

### 3. Enhanced Tracking ✅
- **UTM Parameters:** Preserved from survey link (utm_source, utm_medium, utm_campaign, utm_email)
- **Additional Tracking:** 
  - `utm_content=sandbox_demo`
  - `utm_term=survey_completion`
  - `survey_completed=true`
  - `session_id=[unique session ID]`
- **SessionStorage:** Sets flags for sandbox page to detect completion
- **Beacon API:** Optional tracking event sent (non-blocking)

---

## 📊 Tracking Implementation

### Sandbox Demo Button Click Tracking

**What gets tracked:**
1. **URL Parameters:**
   - All UTM parameters from original email link
   - Additional tracking parameters
   - Session ID

2. **SessionStorage Flags:**
   - `therapair_sandbox_visit = 1`
   - `therapair_survey_completed = 1`
   - `therapair_session_id = [session ID]`

3. **Beacon API (Optional):**
   - Sends tracking event to `/api/research/track-event.php`
   - Non-blocking (doesn't delay navigation)
   - Includes: event type, session ID, UTM params, timestamp

**Example URL:**
```
https://therapair.com.au/sandbox/sandbox-demo.html?
  utm_source=email&
  utm_medium=research&
  utm_campaign=therapist_research&
  utm_email=1&
  utm_content=sandbox_demo&
  utm_term=survey_completion&
  survey_completed=true&
  session_id=abc123...
```

---

## 🔍 How Email Click Tracking Works

### Resend Webhook Flow

1. **Email sent** with tracking links
2. **User clicks link** in email
3. **Resend detects click** → Sends webhook event
4. **Webhook received** at `/api/research/resend-webhook.php`
5. **Signature verified** (Resend webhook secret)
6. **Email extracted** from webhook payload
7. **Notion database updated:**
   - `Research Status` → "Clicked (email 1)"
   - `Latest Survey Date` → Current timestamp
   - `Research Source Notes` → UTM parameters

**Database:** VIC Therapists Inclusive (DEMO)  
**Properties Updated:**
- Research Status (Select)
- Latest Survey Date (Date)
- Research Source Notes (Rich Text)

---

## 📍 Where All Tracking is Saved

### 1. Email Engagement (Resend Webhook)
**Database:** VIC Therapists Inclusive (DEMO)  
**Updated by:** `/api/research/email-event.php`

**Properties:**
- `Research Status` - "Opened (email X)", "Clicked (email X)", "Unsubscribed"
- `Latest Survey Date` - Engagement timestamp
- `Research Follow-up` - Engagement notes
- `Research Source Notes` - UTM parameters

### 2. Survey Responses
**Database:** Therapist Research Survey Responses  
**Updated by:** `/api/research/response.php`

**Properties:**
- All survey answers
- `Engagement Source` - UTM tags
- `Source Notes` - Full tracking metadata
- `Session ID` - Unique session identifier
- `IP Hash` - Privacy-safe IP tracking

### 3. Directory Updates (After Survey Completion)
**Database:** VIC Therapists Inclusive (DEMO)  
**Updated by:** `/api/research/response.php` (after survey submission)

**Properties:**
- `Research Status` → "Survey Completed"
- `Latest Survey Date` → Submission timestamp
- `Profile Intent` - From survey response
- `Profile Ready` - Mapped from profile intent
- `Research Follow-up` - Future contact preference

---

## 🎯 Complete User Journey Tracking

```
Email Sent
  ↓
User Opens Email
  → Resend: email.opened
  → Notion: Research Status = "Opened (email 1)"
  ↓
User Clicks Survey Link
  → Resend: email.clicked
  → Notion: Research Status = "Clicked (email 1)"
  → Notion: Latest Survey Date = [timestamp]
  ↓
User Completes Survey
  → Survey submission
  → Research DB: All answers saved
  → VIC Therapists DB: Research Status = "Survey Completed"
  → VIC Therapists DB: Latest Survey Date = [timestamp]
  ↓
User Clicks "Check out sandbox demo"
  → URL includes UTM parameters
  → SessionStorage flags set
  → Beacon API tracking (optional)
  → Navigate to sandbox demo
```

---

## ✅ Verification Checklist

- [x] Download button removed
- [x] Sandbox demo button added
- [x] UTM parameters preserved
- [x] SessionStorage tracking added
- [x] Beacon API tracking implemented
- [x] Documentation link tracking added
- [x] All tracking documented

---

**Files Modified:**
- `products/landing-page/research/survey/index.html` - Removed download button, added sandbox button
- `products/landing-page/research/survey/main.js` - Updated event handlers, added tracking

**Documentation Created:**
- `TRACKING-EXPLANATION.md` - Complete tracking explanation
- `SURVEY-UPDATES-SUMMARY.md` - This file

