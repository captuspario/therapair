# Token Signature Error & Research Database Tracking Status

## 🔴 Issue 1: "Invalid Token Signature" Error

### Problem
Survey links show "Invalid token signature" error when clicked.

### Root Cause
The `RESEARCH_TOKEN_SECRET` in Node.js `.env` file **does not match** the `RESEARCH_TOKEN_SECRET` in PHP `config.php` file.

**Current Status:**
- Node.js is using: `change-me-to-a-long-random-string` (default/placeholder)
- PHP likely has a different secret in `config.php`
- Token generation algorithm is **correct** ✅ (verified by test)

### Solution

**Step 1: Check what PHP is using**
```bash
cd /Users/tino/Projects/Therapair\ V2/products/landing-page
grep RESEARCH_TOKEN_SECRET config.php
```

**Step 2: Generate a secure secret (if needed)**
```bash
openssl rand -hex 32
```

**Step 3: Update both files with the SAME secret**

**Node.js (.env):**
```bash
RESEARCH_TOKEN_SECRET=your-generated-secret-here
```

**PHP (config.php):**
```php
define('RESEARCH_TOKEN_SECRET', 'your-generated-secret-here');
```

**⚠️ CRITICAL:** Both must be **EXACTLY** the same string.

**Step 4: Regenerate tokens for existing testers**
After updating the secret, regenerate tokens:
```bash
cd agents/email-campaign-tester
node index.js send-test-email tinokuhn@gmail.com
```

### Verification
Run the test script:
```bash
cd agents/email-campaign-tester
node test-token-verification.mjs
```

---

## 📊 Issue 2: Research Database Tracking Status

### Database: VIC Therapists Inclusive (DEMO)
- **Database ID:** `28c5c25944da80a48d85fd43119f4ec1`
- **Total Entries:** 200+ therapists
- **Status:** ✅ Database exists and is being used

### Required Tracking Properties

According to `config.sample.php`, the following properties should exist for email campaign tracking:

#### ✅ **Should Exist (Defined in Config):**
1. **Research Status** (Select)
   - Purpose: Track email engagement (e.g., "Opened (email 1)", "Clicked (email 1)", "Unsubscribed")
   - Config: `NOTION_DIRECTORY_RESEARCH_STATUS_PROPERTY`

2. **Latest Survey Date** (Date)
   - Purpose: Last survey completion timestamp
   - Config: `NOTION_DIRECTORY_LATEST_SURVEY_PROPERTY`

3. **Research Follow-up** (Rich Text)
   - Purpose: Engagement notes and follow-up information
   - Config: `NOTION_DIRECTORY_FUTURE_CONTACT_PROPERTY`

4. **Source** (Select)
   - Purpose: Mark test personas (currently using "Test" value)
   - Status: ✅ Confirmed working (used in persona-manager.js)

#### ⚠️ **Needs Verification:**
The following properties are **documented** but need to be verified if they actually exist in the database:

- `Research Status` - For tracking email engagement
- `Latest Survey Date` - For tracking survey completion
- `Research Follow-up` - For engagement notes
- `Research Source Notes` - For UTM tracking data (if implemented)

### Current Tracking Capabilities

**✅ Working:**
- ✅ Email address lookup (`find_directory_page_by_email`)
- ✅ Unsubscribe tracking (updates "Research Status" to "Unsubscribed")
- ✅ Test persona marking (using "Source" property with "Test" value)
- ✅ Token generation and storage

**⚠️ Needs Setup:**
- ⚠️ Resend webhook integration (`/api/research/email-event.php`)
  - Requires `RESEND_WEBHOOK_SECRET` in config.php
  - Needs webhook URL registered in Resend dashboard
  - Should update "Research Status" and "Latest Survey Date" on email clicks

**❌ Not Confirmed:**
- ❓ Whether "Research Status" property actually exists in database
- ❓ Whether "Latest Survey Date" property actually exists
- ❓ Whether "Research Follow-up" property exists
- ❓ Whether Resend webhook is configured and working

### Action Items

1. **Verify Database Properties:**
   - Check if "Research Status" exists in VIC Therapists database
   - Check if "Latest Survey Date" exists
   - Check if "Research Follow-up" exists
   - Verify property names match config exactly (case-sensitive)

2. **Set Up Resend Webhook:**
   - Generate webhook secret in Resend dashboard
   - Add `RESEND_WEBHOOK_SECRET` to `config.php`
   - Register webhook URL: `https://therapair.com.au/api/research/email-event.php`
   - Test webhook with Resend test event

3. **Test Tracking Flow:**
   - Send test email
   - Click link in email
   - Verify webhook receives event
   - Verify Notion database updates correctly

### Documentation References

- **Tracking Setup:** `campaigns/email-campaign/READINESS-REVIEW.md` (lines 105-216)
- **Database Config:** `products/landing-page/config.sample.php` (lines 48-53)
- **Webhook Handler:** `products/landing-page/api/research/email-event.php`
- **Unsubscribe Handler:** `products/landing-page/api/research/unsubscribe.php`

---

## 🎯 Summary

### Token Issue
- **Status:** 🔴 Broken (secret mismatch)
- **Fix:** Update both `.env` and `config.php` with matching `RESEARCH_TOKEN_SECRET`
- **Time:** 5 minutes

### Tracking Status
- **Database:** ✅ Exists (200+ therapists)
- **Properties:** ⚠️ Need verification if tracking properties exist
- **Webhook:** ❌ Not confirmed if configured
- **Action:** Verify properties exist, set up webhook if needed

