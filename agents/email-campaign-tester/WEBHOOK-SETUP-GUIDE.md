# Resend Webhook Setup Guide

## ✅ Status

### Database Properties: ✅ ADDED
All research tracking properties have been successfully added to the VIC Therapists database:
- ✅ **Research Status** (Select) - Tracks email engagement
- ✅ **Latest Survey Date** (Date) - Last engagement timestamp  
- ✅ **Research Follow-up** (Rich Text) - Engagement notes
- ✅ **Research Source Notes** (Rich Text) - UTM tracking data

### Webhook Secret: ❌ NOT CONFIGURED
`RESEND_WEBHOOK_SECRET` is not found in `config.php`.

---

## 🔧 Setup Instructions

### Step 1: Get Webhook Secret from Resend

1. **Log in to Resend Dashboard**
   - Go to https://resend.com
   - Navigate to **Settings** → **Webhooks**

2. **Create or View Webhook**
   - If webhook doesn't exist, create one
   - Webhook URL: `https://therapair.com.au/api/research/email-event.php`
   - Events to subscribe: `email.opened`, `email.clicked`

3. **Copy the Webhook Secret**
   - Resend will show a signing secret
   - Copy this secret (it looks like: `whsec_...` or similar)

### Step 2: Add to config.php

Add the following line to `products/landing-page/config.php`:

```php
define('RESEND_WEBHOOK_SECRET', 'your-webhook-secret-from-resend-dashboard');
```

**Important:** 
- Replace `your-webhook-secret-from-resend-dashboard` with the actual secret from Resend
- Keep it secret - never commit to git
- The secret must match exactly what Resend shows

### Step 3: Register Webhook URL in Resend

In Resend dashboard:
1. Go to **Settings** → **Webhooks**
2. Add webhook endpoint: `https://therapair.com.au/api/research/email-event.php`
3. Subscribe to events:
   - ✅ `email.opened`
   - ✅ `email.clicked`
4. Save the webhook

### Step 4: Test the Webhook

Run the test script:

```bash
cd agents/email-campaign-tester
RESEND_WEBHOOK_SECRET=your-secret-here node test-webhook.mjs
```

Or test with a real email:
1. Send a test email using the email campaign tester
2. Open or click a link in the email
3. Check Notion database - the "Research Status" should update

---

## 📊 How It Works

### Webhook Flow

1. **Email Sent** → Resend sends email
2. **User Opens/Clicks** → Resend detects event
3. **Webhook Triggered** → Resend sends POST to `/api/research/email-event.php`
4. **Signature Verified** → PHP verifies Resend signature
5. **Database Updated** → Notion database updated with:
   - Research Status: "Opened (email 1)" or "Clicked (email 1)"
   - Latest Survey Date: Current timestamp
   - Research Source Notes: UTM parameters

### Events Tracked

- **email.opened** → Updates "Research Status" to "Opened (email X)"
- **email.clicked** → Updates "Research Status" to "Clicked (email X)" and extracts UTM parameters

### UTM Parameter Extraction

The webhook extracts:
- `utm_email` - Which email number (1-5)
- `utm_content` - Content type (survey, sandbox, learn_more, homepage)
- `utm_source`, `utm_medium`, `utm_campaign` - Campaign tracking

---

## 🧪 Testing

### Test Script

```bash
cd agents/email-campaign-tester
RESEND_WEBHOOK_SECRET=your-secret node test-webhook.mjs
```

### Manual Test

1. Send test email:
   ```bash
   cd agents/email-campaign-tester
   node index.js send-test-email tinokuhn@gmail.com
   ```

2. Open the email and click a link

3. Check Notion database:
   - Open VIC Therapists database
   - Find the therapist by email
   - Verify "Research Status" updated
   - Verify "Latest Survey Date" updated

---

## 🔍 Troubleshooting

### Error: "Webhook secret not configured"
- **Fix:** Add `RESEND_WEBHOOK_SECRET` to `config.php`

### Error: "Invalid webhook signature"
- **Fix:** Verify the secret in `config.php` matches Resend dashboard exactly
- Check for extra spaces or quotes

### Webhook not receiving events
- **Fix:** Verify webhook URL is registered in Resend dashboard
- Check that events are subscribed (opened, clicked)
- Verify webhook endpoint is accessible (not blocked by firewall)

### Database not updating
- **Fix:** Verify therapist email exists in database
- Check that property names match exactly (case-sensitive)
- Verify Notion API token has write permissions

---

## 📝 Files

- **Webhook Handler:** `products/landing-page/api/research/email-event.php`
- **Test Script:** `agents/email-campaign-tester/test-webhook.mjs`
- **Config Sample:** `products/landing-page/config.sample.php`

---

## ✅ Checklist

- [ ] Webhook secret obtained from Resend dashboard
- [ ] `RESEND_WEBHOOK_SECRET` added to `config.php`
- [ ] Webhook URL registered in Resend dashboard
- [ ] Events subscribed (opened, clicked)
- [ ] Test script run successfully
- [ ] Real email test completed
- [ ] Notion database verified updating correctly

