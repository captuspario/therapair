# Webhook Fix - Ready for Deployment

## ✅ Files Created

1. **`products/landing-page/api/research/resend-webhook.php`**
   - Alias file that includes `email-event.php`
   - Fixes the 404 error by matching Resend dashboard URL

2. **`products/landing-page/deploy-webhook.sh`**
   - Deployment script to upload the webhook file
   - Ready to run

3. **Updated `test-webhook.mjs`**
   - Now tests the correct URL: `resend-webhook.php`

## 🚀 Deployment Options

### Option 1: Use Deployment Script (Recommended)

```bash
cd products/landing-page
./deploy-webhook.sh
```

This will:
- Upload `resend-webhook.php` to the server
- Place it in `/api/research/` directory
- Verify the upload succeeded

### Option 2: Manual Upload via FTP/SFTP

1. Upload `products/landing-page/api/research/resend-webhook.php`
2. Destination: `/api/research/resend-webhook.php` on server
3. Set permissions: 644 (readable by web server)

### Option 3: Git Deploy (if using Git)

```bash
# Commit the file
git add products/landing-page/api/research/resend-webhook.php
git commit -m "Add resend-webhook.php alias to fix 404 error"
git push

# Then on server:
cd domains/therapair.com.au/public_html
git pull origin main
```

## ✅ Pre-Deployment Checklist

- [x] File created: `resend-webhook.php`
- [x] File includes correct handler: `email-event.php`
- [x] Deployment script created
- [ ] File deployed to server
- [ ] Verify `RESEND_WEBHOOK_SECRET` in `config.php`
- [ ] Test webhook endpoint

## 🧪 Testing After Deployment

### 1. Test Webhook Endpoint

```bash
cd agents/email-campaign-tester
RESEND_WEBHOOK_SECRET=your-secret node test-webhook.mjs
```

**Expected:**
- ✅ 200 OK (not 404)
- ✅ Response: `{"success": true, "status": "logged"}`

### 2. Test in Resend Dashboard

1. Go to Resend dashboard → Webhooks
2. Click "Replay" on a failed event
3. Should now show 200 OK instead of 404

### 3. Test with Real Email

1. Send test email:
   ```bash
   cd agents/email-campaign-tester
   node index.js send-test-email tinokuhn@gmail.com
   ```

2. Open/click the email

3. Check Resend dashboard:
   - Event should show 200 OK
   - No more 404 errors

4. Check Notion database:
   - Find therapist by email
   - "Research Status" should update
   - "Latest Survey Date" should update

## 🔍 Verification

### Check File Exists on Server

```bash
ssh -p 65002 u549396201@45.87.81.159 "ls -la domains/therapair.com.au/public_html/api/research/resend-webhook.php"
```

### Check Webhook Secret

```bash
ssh -p 65002 u549396201@45.87.81.159 "grep RESEND_WEBHOOK_SECRET domains/therapair.com.au/public_html/config.php"
```

### Test Endpoint Directly

```bash
curl -X POST https://therapair.com.au/api/research/resend-webhook.php \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

**Expected without secret:**
- 500 error: "Webhook secret not configured"

**Expected with secret:**
- 403 error: "Invalid webhook signature" (because we didn't sign it)

Both mean the file exists and is working!

## 📋 Summary

**Problem:** Webhook URL in Resend (`resend-webhook.php`) didn't match actual file (`email-event.php`)

**Solution:** Created alias file `resend-webhook.php` that includes `email-event.php`

**Status:** ✅ Ready to deploy

**Next:** Run deployment script or upload file manually, then test webhook

