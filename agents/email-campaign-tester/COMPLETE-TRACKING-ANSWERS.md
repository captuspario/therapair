# Complete Tracking Answers & Survey Updates

## ✅ All Questions Answered

### 1. How do we know a user clicked the survey link in the email?

**Answer:** Via Resend Webhook

**Process:**
1. Email sent with tracking links
2. User clicks survey link → Resend detects click
3. Resend sends webhook POST to `/api/research/resend-webhook.php`
4. Webhook handler (`email-event.php`) processes event:
   - Verifies Resend signature
   - Extracts email address from payload
   - Extracts UTM parameters from clicked URL
   - Updates Notion database

**What gets updated:**
- **Database:** VIC Therapists Inclusive (DEMO)
- **Property:** `Research Status` → Set to "Clicked (email 1)", "Clicked (email 2)", etc.
- **Property:** `Latest Survey Date` → Updated to current timestamp
- **Property:** `Research Source Notes` → UTM parameters and tracking data

**Example:**
```
User clicks: https://therapair.com.au/research/survey/index.html?token=...&utm_email=1&utm_content=survey
→ Resend webhook fires
→ email-event.php processes
→ Notion: Research Status = "Clicked (email 1)"
```

---

### 2. Where is all the tracking saved?

**Answer:** Two databases track different aspects

#### A. Email Engagement Tracking
**Database:** VIC Therapists Inclusive (DEMO) - `28c5c25944da80a48d85fd43119f4ec1`

**Properties:**
- `Research Status` (Select) - "Opened (email 1)", "Clicked (email 1)", "Survey Completed", "Unsubscribed"
- `Latest Survey Date` (Date) - Last engagement timestamp
- `Research Follow-up` (Rich Text) - Engagement notes
- `Research Source Notes` (Rich Text) - UTM parameters and source data

**Updated by:** `/api/research/email-event.php` (Resend webhook)

**Tracks:**
- Email opens
- Link clicks (with full URL and UTM params)
- Unsubscribes

---

#### B. Survey Response Tracking
**Database:** Therapist Research Survey Responses (separate database)

**Properties:**
- All survey answers (profession, years, client types, modalities, etc.)
- `Engagement Source` (Multi-select) - UTM tags like "utm_source:email", "utm_medium:research"
- `Source Notes` (Rich Text) - Full UTM parameters, referrer, landing path, IP hash
- `Session ID` (Rich Text) - Unique session identifier

**Updated by:** `/api/research/response.php` (Survey submission)

**Tracks:**
- Complete survey responses
- UTM parameters (preserved from email link)
- Session metadata
- Survey completion status

**Also updates:** VIC Therapists database with:
- `Research Status` → "Survey Completed"
- `Latest Survey Date` → Submission timestamp
- `Profile Intent` - From survey response
- `Profile Ready` - Mapped from profile intent

---

### 3. Survey Completion Page Updates ✅

**Removed:**
- ❌ "Download my responses" button

**Added:**
- ✅ "Check out the sandbox demo prototype" button
- ✅ UTM parameter preservation
- ✅ SessionStorage tracking flags
- ✅ Beacon API tracking (optional)

**Tracking on Sandbox Button:**
- Preserves all UTM parameters from email link
- Adds: `utm_content=sandbox_demo`, `utm_term=survey_completion`
- Sets SessionStorage flags for sandbox page
- Sends beacon API event (non-blocking)

---

## 🔄 Complete User Journey Tracking

```
1. Email Sent
   ↓
2. User Opens Email
   → Resend: email.opened
   → Notion VIC Therapists: Research Status = "Opened (email 1)"
   ↓
3. User Clicks Survey Link
   → Resend: email.clicked
   → Notion VIC Therapists: Research Status = "Clicked (email 1)"
   → Notion VIC Therapists: Latest Survey Date = [timestamp]
   → Notion VIC Therapists: Research Source Notes = UTM params
   ↓
4. User Completes Survey
   → Survey submission to /api/research/response.php
   → Research DB: All answers saved with UTM tracking
   → VIC Therapists DB: Research Status = "Survey Completed"
   → VIC Therapists DB: Latest Survey Date = [timestamp]
   → VIC Therapists DB: Profile Intent, Profile Ready updated
   ↓
5. User Clicks "Check out sandbox demo"
   → URL includes all UTM parameters
   → SessionStorage: therapair_sandbox_visit = 1
   → SessionStorage: therapair_survey_completed = 1
   → Beacon API: Tracking event sent (optional)
   → Navigate to sandbox demo
```

---

## 📊 Tracking Summary Table

| Event | Database | Property | Value |
|-------|----------|----------|-------|
| Email opened | VIC Therapists | Research Status | "Opened (email X)" |
| Email clicked | VIC Therapists | Research Status | "Clicked (email X)" |
| Email clicked | VIC Therapists | Latest Survey Date | [timestamp] |
| Email clicked | VIC Therapists | Research Source Notes | UTM params |
| Survey completed | Research Survey DB | All answers | Survey responses |
| Survey completed | Research Survey DB | Engagement Source | UTM tags |
| Survey completed | Research Survey DB | Source Notes | Full metadata |
| Survey completed | VIC Therapists | Research Status | "Survey Completed" |
| Survey completed | VIC Therapists | Latest Survey Date | [timestamp] |
| Sandbox demo click | SessionStorage | therapair_sandbox_visit | "1" |
| Sandbox demo click | SessionStorage | therapair_survey_completed | "1" |

---

## ✅ Files Modified

1. **`products/landing-page/research/survey/index.html`**
   - Removed download button
   - Added sandbox demo button

2. **`products/landing-page/research/survey/main.js`**
   - Removed download button handler
   - Added `configureCompletionLinks()` function
   - Added `trackSandboxClick()` function
   - Enhanced tracking for completion page links

---

## 🧪 Testing

### Test Email Click Tracking
1. Send test email
2. Click survey link
3. Check Resend dashboard → Should show "clicked" event
4. Check Notion VIC Therapists DB → Research Status should update

### Test Survey Completion
1. Complete survey
2. Check Research Survey DB → Should have new entry
3. Check VIC Therapists DB → Research Status = "Survey Completed"

### Test Sandbox Demo Button
1. Complete survey
2. Click "Check out sandbox demo"
3. Check URL → Should have UTM parameters
4. Check SessionStorage → Should have flags set

---

**Last Updated:** 2025-11-26  
**Status:** ✅ All tracking implemented and documented

