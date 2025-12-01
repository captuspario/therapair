# 📧 Therapair Email Campaign - Setup Guide

## 🎯 Campaign Overview

**Campaign Name:** Therapist Research Outreach  
**Target Audience:** ~200 Victorian therapists (from vicinclusivepractitioners.com)  
**Objective:** Invite therapists to explore sandbox demo and complete research survey  
**Sender:** contact@therapair.com.au  
**Timeline:** Ready when you are

---

## 📋 Prerequisites Checklist

Before setting up the campaign, ensure you have:

- [ ] Mailchimp account created
- [ ] contact@therapair.com.au email configured
- [ ] List of ~200 therapist contacts (name, email, specialization)
- [ ] Typebot survey URL ready
- [ ] Sandbox demo deployed to therapair.com.au/sandbox/sandbox-demo.html

---

## 🚀 Step 1: Mailchimp Account Setup

### 1.1 Create Mailchimp Account
1. Go to https://mailchimp.com
2. Sign up for free account (500 contacts free)
3. Verify your email address

### 1.2 Add Your Email Domain
1. Go to **Account & Billing** → **Settings** → **Verified domains**
2. Add `therapair.com.au`
3. Follow DNS verification steps:
   - Add TXT record: `v=spf1 include:servers.mcsv.net ?all`
   - Add CNAME record: `k1._domainkey.therapair.com.au`
   - Wait 24-48 hours for verification

### 1.3 Get API Key
1. Go to **Account & Billing** → **Extras** → **API keys**
2. Click **Create A Key**
3. Name it "Therapair Campaign"
4. **Copy the API key** - you'll need this for Typebot integration

---

## 📬 Step 2: Create Mailchimp Audience

### 2.1 Create New Audience
1. Go to **Audience** → **All contacts**
2. Click **View audiences** → **Create Audience**
3. Name: "Therapist Research Outreach"
4. Default from email: contact@therapair.com.au
5. Default from name: "Therapair Team"
6. Click **Save**

### 2.2 Get Audience ID
1. Go to **Audience** → **Settings** → **Audience name and defaults**
2. Scroll to bottom
3. **Copy the Audience ID** (looks like: `a1b2c3d4e5`)

---

## 👥 Step 3: Import Therapist Contacts

### 3.1 Prepare Your Contact List
Create a CSV file with these columns:
```
Email Address,First Name,Last Name,Specialization,Location
therapist@example.com,Jane,Smith,Trauma & PTSD,Melbourne
john@example.com,John,Doe,LGBTQ+ Affirming,Sydney
```

### 3.2 Import to Mailchimp
1. Go to **Audience** → **All contacts**
2. Click **Import** → **Import contacts**
3. Upload your CSV file
4. Map columns:
   - Email Address → Email address
   - First Name → First name
   - Last Name → Last name
5. Click **Import** (leave other fields as is)

### 3.3 Verify Import
1. Check that ~200 contacts were imported
2. Review a few contacts to ensure data is correct

---

## 📧 Step 4: Create Email Campaign

### 4.1 Create Campaign
1. Go to **Campaigns** → **All campaigns**
2. Click **Create Campaign** → **Email**
3. Select **Regular** campaign

### 4.2 Choose Audience
1. Select "Therapist Research Outreach" audience
2. Click **Next**

### 4.3 Campaign Details
1. **Campaign name:** "Therapist Research Outreach - [Date]"
2. **Email subject:** "Help us build a better therapist-matching system (invitation inside)"
3. **From name:** "Therapair Team"
4. **From email:** contact@therapair.com.au
5. **Reply-to:** contact@therapair.com.au
6. Click **Next**

### 4.4 Design Email
1. Click **Code your own** → **Paste in code**
2. Open `therapist-outreach-email.html`
3. Copy entire HTML code
4. Paste into Mailchimp editor
5. Click **Save and Continue**

### 4.5 Review and Test
1. Click **Preview and test** → **Send a test email**
2. Send test to your email
3. Check:
   - [ ] Layout looks correct on desktop
   - [ ] Layout looks correct on mobile
   - [ ] All links work
   - [ ] Personalization works ({{first_name}})
   - [ ] Images load correctly
   - [ ] Unsubscribe link works

### 4.6 Schedule Campaign
1. Click **Schedule**
2. Choose send time:
   - **Best time:** Tuesday-Thursday, 9-11am Melbourne time
   - **Avoid:** Monday mornings, Friday afternoons
3. Click **Schedule Campaign**

---

## 🔗 Step 5: Update Email Links

### 5.1 Sandbox Demo Link
✅ Already configured: `https://therapair.com.au/sandbox/sandbox-demo.html?utm_source=email&utm_medium=outreach&utm_campaign=therapist_research&utm_content=sandbox_demo`

### 5.2 Typebot Survey Link
Replace `https://typebot.io/therapair-research` with your actual Typebot URL:
1. Get Typebot URL from Typebot dashboard
2. Update in email HTML:
   ```html
   <a href="YOUR_TYPEBOT_URL?utm_source=email&utm_medium=outreach&utm_campaign=therapist_research&utm_content=survey">
   ```

### 5.3 Documentation Link
✅ Already configured: `https://therapair.com.au/documentation.html?utm_source=email&utm_medium=outreach&utm_campaign=therapist_research&utm_content=learn_more`

---

## 📊 Step 6: Set Up Tracking

### 6.1 Enable Click Tracking
1. In campaign editor, click **Settings**
2. Enable **Click tracking**
3. Enable **Open tracking**
4. Click **Save**

### 6.2 Set Up Google Analytics (Optional)
1. In campaign editor, click **Settings**
2. Under **Tracking**, add Google Analytics:
   - Campaign name: `therapist_research_outreach`
   - Campaign source: `email`
   - Campaign medium: `outreach`
3. Click **Save**

---

## 🎯 Step 7: A/B Test Subject Lines (Optional)

### 7.1 Create A/B Test
1. Click **Create Campaign** → **A/B Test**
2. Choose **Subject line** test
3. Create two variants:
   - **Variant A:** "Help us build a better therapist-matching system (invitation inside)"
   - **Variant B:** "Join the Therapair pilot – aligning therapists and clients through values and lived experience"
4. Set test to 20% of audience
5. Set winner criteria: Highest open rate
6. Send to remaining 80% after 24 hours

---

## 📈 Step 8: Monitor Campaign Performance

### 8.1 Key Metrics to Track
After sending, monitor:
- **Open Rate:** Target >25% (industry average: 20-25%)
- **Click Rate:** Target >5% (industry average: 3-5%)
- **Survey Completion:** Track via Typebot dashboard
- **Sandbox Demo Visits:** Track via Google Analytics

### 8.2 Access Reports
1. Go to **Campaigns** → **All campaigns**
2. Click on your campaign
3. View:
   - Opens and clicks by device
   - Top links clicked
   - Bounce and unsubscribe rates

---

## 🔄 Step 9: Follow-Up Campaign (Optional)

### 9.1 Create Reminder Email
After 7 days, send follow-up to non-responders:
1. Create new campaign
2. Target: Contacts who didn't click survey link
3. Subject: "Quick reminder: Share your insights on therapist matching"
4. Use shorter, more direct copy

### 9.2 Thank You Email
For survey completers:
1. Create new campaign
2. Target: Contacts who completed survey
3. Subject: "Thank you for helping shape Therapair"
4. Include:
   - Gratitude message
   - Sandbox demo link again
   - One-year free listing offer reminder

---

## 🛠️ Troubleshooting

### Email Not Delivering
- **Check SPF/DKIM:** Ensure DNS records are verified
- **Warm up domain:** Send to small test group first
- **Check spam folder:** Test with multiple email providers

### Links Not Working
- **Check UTM parameters:** Ensure no typos in URLs
- **Test all links:** Click through before sending
- **Check Typebot URL:** Ensure survey is published

### Personalization Not Working
- **Check merge tags:** Ensure {{first_name}} syntax is correct
- **Verify contact data:** Ensure First Name field is populated
- **Test with sample:** Send test email to yourself

---

## 📞 Support Resources

- **Mailchimp Support:** https://mailchimp.com/help/
- **Email Deliverability Guide:** https://mailchimp.com/help/about-email-deliverability/
- **Typebot Documentation:** https://docs.typebot.io/

---

## ✅ Pre-Send Checklist

Before clicking "Send," verify:
- [ ] All links work correctly
- [ ] Personalization ({{first_name}}) is working
- [ ] Images load properly
- [ ] Mobile layout looks good
- [ ] Unsubscribe link works
- [ ] From email is correct (contact@therapair.com.au)
- [ ] Subject line is clear and compelling
- [ ] Typebot survey is published and accessible
- [ ] Sandbox demo is deployed and working
- [ ] Tracking is enabled

---

## 🎉 You're Ready to Send!

Once all steps are complete and checklist is verified, you're ready to launch your campaign.

**Good luck!** 🚀
