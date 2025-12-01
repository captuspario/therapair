# Webhook 404 Error - Fixed

## 🔴 Problem

The Resend webhook was returning **404 Not Found** because:

- **Resend Dashboard URL:** `https://therapair.com.au/api/research/resend-webhook.php`
- **Actual File:** `email-event.php` (not `resend-webhook.php`)
- **Result:** File doesn't exist → 404 error

## ✅ Solution

Created `resend-webhook.php` as an alias that includes `email-event.php`.

**File Created:** `products/landing-page/api/research/resend-webhook.php`

This file simply requires the actual webhook handler, so the Resend dashboard URL will now work.

## 📋 Next Steps

1. **Deploy the new file:**
   - Upload `resend-webhook.php` to your server
   - Path: `/api/research/resend-webhook.php`
   - Make sure it's in the same directory as `email-event.php`

2. **Verify webhook secret is configured:**
   - Check `config.php` has `RESEND_WEBHOOK_SECRET`
   - Should match the signing secret shown in Resend dashboard

3. **Test the webhook:**
   - Resend will automatically retry the failed events
   - Or click "Replay" on a failed event in Resend dashboard
   - Should now return 200 OK instead of 404

## 🔍 Verification

After deploying, the webhook should:
- ✅ Return 200 OK (not 404)
- ✅ Update Notion database with email engagement
- ✅ Show "success" status in Resend dashboard

## 📝 Alternative Solution

If you prefer, you can update the Resend webhook URL instead:
- Change from: `https://therapair.com.au/api/research/resend-webhook.php`
- Change to: `https://therapair.com.au/api/research/email-event.php`

But creating the alias file is easier and doesn't require changing Resend configuration.

