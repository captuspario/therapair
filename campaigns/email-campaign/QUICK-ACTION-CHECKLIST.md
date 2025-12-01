# ⚡ Quick Action Checklist - Email Campaign Readiness

**Priority Actions to Complete Before Launch**

---

## 🔴 CRITICAL - Must Complete Before Launch

### 1. Resend MCP Setup
- [x] Platform selected: **Resend MCP** (ready in `email-resend-mcp/`)
- [ ] Get Resend API key from [resend.com/api-keys](https://resend.com/api-keys)
- [ ] Configure Cursor MCP (see `RESEND-MCP-SETUP.md`)
- [ ] Verify domain `therapair.com.au` in Resend dashboard
- [ ] Add DNS records (SPF/DKIM/DMARC) provided by Resend
- [ ] Test email sending via MCP

### 2. Webhook Configuration
- [ ] Get webhook secret from Resend dashboard
- [ ] Add to `config.php`: `define('RESEND_WEBHOOK_SECRET', 'secret_here');`
- [ ] Register webhook URL: `https://therapair.com.au/api/research/email-event.php`
- [ ] Test webhook with sample event

### 3. Database Verification
- [ ] Verify therapist directory database exists in Notion
- [ ] Check these properties exist:
  - `Research Status` (Select)
  - `Latest Survey Date` (Date)
  - `Research Follow-up` (Rich Text)
  - `Research Source Notes` (Rich Text)
- [ ] Test Notion API connection
- [ ] Verify `THERAPIST_DIRECTORY_DATABASE_ID` in config.php

---

## 🟡 HIGH PRIORITY - Should Complete Before Launch

### 4. Email Templates
- [ ] Convert plain text emails to HTML
- [ ] Add responsive styling
- [ ] Add UTM parameters to ALL links:
  - `utm_source=email`
  - `utm_medium=research`
  - `utm_campaign=therapist_research`
  - `utm_content=[survey|sandbox|learn_more]`
  - `utm_email=[1|2|3|4|5]`
- [ ] Test mobile rendering

### 5. End-to-End Testing
- [ ] Send test email to yourself
- [ ] Click survey link → verify webhook receives event
- [ ] Click sandbox link → verify webhook receives event
- [ ] Complete test survey → verify data in Notion
- [ ] Test unsubscribe link → verify status updates
- [ ] Verify all UTM parameters captured correctly

### 6. Personalization Setup
- [ ] Map variables in email platform:
  - `{{first_name}}`
  - `{{profession}}`
  - `{{region}}`
  - `{{token}}`
  - `{{unsubscribe}}`
- [ ] Test with sample data
- [ ] Verify all variables populate correctly

---

## 🟢 MEDIUM PRIORITY - Can Complete After Launch

### 7. Automation Workflows
- [ ] Set up Email 2 trigger (Day 3, non-responder)
- [ ] Set up Email 3 trigger (Day 7, no-click)
- [ ] Set up Email 4 trigger (Day 14, incomplete)
- [ ] Set up Email 5 trigger (immediate, survey complete)

### 8. Monitoring Setup
- [ ] Set up email metrics dashboard
- [ ] Configure survey completion tracking
- [ ] Set up alerts for webhook failures
- [ ] Create Notion views for campaign analysis

---

## 📋 Configuration Checklist

### config.php Required Settings:
```php
// Notion API
define('NOTION_TOKEN', 'secret_xxx');
define('THERAPIST_DIRECTORY_DATABASE_ID', 'database_id');

// Resend Webhook
define('RESEND_WEBHOOK_SECRET', 'webhook_secret');

// Property Names (verify these match Notion)
define('NOTION_DIRECTORY_RESEARCH_STATUS_PROPERTY', 'Research Status');
define('NOTION_DIRECTORY_LATEST_SURVEY_PROPERTY', 'Latest Survey Date');
define('NOTION_DIRECTORY_FUTURE_CONTACT_PROPERTY', 'Research Follow-up');
```

---

## ✅ What's Already Ready

- ✅ All 5 email copies created
- ✅ Campaign strategy documented
- ✅ Tracking code implemented (`email-event.php`)
- ✅ Unsubscribe handler implemented (`unsubscribe.php`)
- ✅ Database schema documented
- ✅ UTM parameter strategy defined

---

## ⏱️ Estimated Time

- **Critical Items:** 4-6 hours
- **High Priority:** 2-3 hours
- **Medium Priority:** 2-3 hours
- **Total:** 8-12 hours to full readiness

---

## 🚀 Launch Readiness

**Current Status:** 🟡 **47.5% Ready**

**Blockers:**
1. Email platform not configured
2. Webhook secret not set
3. No end-to-end testing completed

**Once Complete:**
- Email platform: ✅
- Tracking: ✅
- Database: ✅
- Testing: ✅

**Then:** Ready to launch! 🎉

---

**See full review:** `READINESS-REVIEW.md`

