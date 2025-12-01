# 📧 Resend MCP Setup for Email Campaign

**Email Platform:** Resend (via MCP Server)  
**Status:** ✅ Ready to Configure  
**Location:** `/Users/tino/Projects/Therapair V2/email-resend-mcp/`

---

## 🎯 Overview

The Resend MCP server is set up and ready to use as the email platform for the campaign. This allows you to send emails directly from Cursor using natural language commands.

---

## ✅ What's Already Done

- ✅ MCP server code implemented
- ✅ Dependencies installed
- ✅ Project built (`build/index.js` exists)
- ✅ Documentation created

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Resend API Key

1. **Sign up/Login:**
   - Go to [resend.com](https://resend.com/)
   - Sign up (free tier: 3,000 emails/month)

2. **Create API Key:**
   - Go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Name it: "Therapair Campaign MCP"
   - Copy the key (starts with `re_`)

3. **Verify Domain (Recommended):**
   - Go to [Domains](https://resend.com/domains)
   - Click "Add Domain"
   - Enter: `therapair.com.au`
   - Add DNS records (SPF, DKIM, DMARC) to your domain
   - Wait for verification (usually a few minutes)

### Step 2: Configure Cursor

1. **Open Cursor Settings:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows)
   - Type "Cursor Settings" and select it
   - Navigate to: **Features** → **Model Context Protocol**

2. **Add MCP Server:**
   - Click "Add new global MCP server"
   - Paste this configuration:

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/Users/tino/Projects/Therapair V2/email-resend-mcp/build/index.js",
        "--key=YOUR_RESEND_API_KEY_HERE"
      ]
    }
  }
}
```

**⚠️ Important:** Replace `YOUR_RESEND_API_KEY_HERE` with your actual Resend API key!

3. **Alternative (Environment Variable):**
   If you prefer to keep the API key in an environment variable:

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/Users/tino/Projects/Therapair V2/email-resend-mcp/build/index.js"
      ],
      "env": {
        "RESEND_API_KEY": "YOUR_RESEND_API_KEY_HERE"
      }
    }
  }
}
```

4. **Save and Restart:**
   - Save the configuration
   - **Completely quit and restart Cursor** (important!)

### Step 3: Test It

After restarting Cursor, test by asking:

```
Send a test email to tinoman@me.com with subject "Resend MCP Test" and body "Testing the Resend MCP integration for the email campaign!"
```

---

## 📧 Campaign Usage Examples

Once configured, you can use Resend MCP for the campaign:

### Send Research Invitation

```
Send an HTML email to therapist@example.com with subject "Help us build a better therapist-matching system" and HTML body: "<h1>Hi {{first_name}}!</h1><p>We'd love your input on our matching platform.</p><p><a href='https://therapair.com.au/research/survey/?token=abc123&utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=survey&utm_email=1'>Take the survey</a></p>" from contact@therapair.com.au
```

### Send Test Campaign Email

```
Send an HTML email to tinoman@me.com with subject "Test: Research Invitation" and HTML body: "[paste HTML from EMAIL-1 template]" from contact@therapair.com.au
```

### Send Follow-up Email

```
Send an email to therapist@example.com with subject "Don't miss this opportunity" and HTML body: "[paste HTML from EMAIL-3 template]" from contact@therapair.com.au
```

---

## 🔗 Integration with Campaign

### Webhook Configuration

The Resend MCP is for **sending emails**. For **tracking email events** (opens, clicks), you still need to:

1. **Set up Resend Webhook:**
   - In Resend dashboard, go to **Webhooks**
   - Add webhook URL: `https://therapair.com.au/api/research/email-event.php`
   - Get webhook signing secret
   - Add to `config.php`: `define('RESEND_WEBHOOK_SECRET', 'secret_here');`

2. **Configure Tracking:**
   - See `READINESS-REVIEW.md` for full tracking setup
   - All email links should include UTM parameters
   - Webhook will capture click events and update Notion

### Email Templates

- **Plain text versions:** Ready in `campaigns/email-campaign/EMAIL-*.txt`
- **HTML versions:** Need to be created (convert from plain text)
- **Personalization:** Use `{{first_name}}`, `{{profession}}`, `{{region}}`, `{{token}}`

---

## 📋 Pre-Launch Checklist

### Resend Account:
- [ ] Account created
- [ ] API key generated
- [ ] Domain verified (`therapair.com.au`)
- [ ] DNS records added (SPF, DKIM, DMARC)

### Cursor MCP:
- [ ] MCP server added to Cursor settings
- [ ] API key configured
- [ ] Cursor restarted
- [ ] Test email sent successfully

### Campaign Integration:
- [ ] Webhook configured in Resend dashboard
- [ ] Webhook secret added to `config.php`
- [ ] Webhook endpoint tested
- [ ] Email templates ready (HTML versions)

---

## 🛠️ Troubleshooting

### MCP Server Not Appearing
- ✅ Make sure you **completely quit and restarted Cursor**
- ✅ Check the path is correct: `/Users/tino/Projects/Therapair V2/email-resend-mcp/build/index.js`
- ✅ Verify Node.js is installed: `node --version` (should be 18+)

### "API key not found" Error
- ✅ Double-check the API key in Cursor config
- ✅ Make sure there are no extra spaces or quotes
- ✅ Try using the environment variable method instead

### Emails Not Sending
- ✅ Check Resend dashboard for error logs
- ✅ Verify your sender email is verified (`contact@therapair.com.au`)
- ✅ If domain not verified, use `onboarding@resend.dev` for testing
- ✅ Check spam folder

### Domain Verification Issues
- ✅ Go to Resend dashboard → Domains
- ✅ Check DNS records are correct
- ✅ Wait a few minutes for DNS propagation
- ✅ Use [mxtoolbox.com](https://mxtoolbox.com) to verify records

---

## 📊 Resend Limits

**Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for campaign (200+ therapists)

**Paid Plans:**
- Start at $20/month
- 50,000 emails/month
- Needed if scaling beyond free tier

---

## 🔗 Related Documentation

- **Full MCP Setup:** `email-resend-mcp/CURSOR-SETUP.md`
- **Campaign Readiness:** `campaigns/email-campaign/READINESS-REVIEW.md`
- **Quick Actions:** `campaigns/email-campaign/QUICK-ACTION-CHECKLIST.md`
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)

---

## ✅ Status

**MCP Server:** ✅ Built and Ready  
**Documentation:** ✅ Complete  
**Configuration:** ⚠️ Needs API Key  
**Testing:** ⚠️ Not Tested Yet  

**Next Step:** Get Resend API key and configure Cursor!

---

**Last Updated:** 2025-01-30  
**Ready for:** Campaign email sending via Cursor

