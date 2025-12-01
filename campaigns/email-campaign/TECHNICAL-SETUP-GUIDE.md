# 🛠️ Technical Setup Guide - Email Automation Platform

## 🎯 Overview

**Platform:** Brevo (formerly Sendinblue) - Recommended  
**Alternative:** Klaviyo or Mailchimp  
**Timeline:** 2-3 hours setup + 24-48 hours for domain authentication  
**Prerequisites:** Domain transferred to Hostinger, contact list ready  

---

## 📋 Prerequisites Checklist

### **Domain Requirements**
- [ ] Domain transferred to Hostinger
- [ ] DNS access available
- [ ] Email hosting configured (contact@therapair.com.au)

### **Contact List Requirements**
- [ ] 200+ Victorian therapists in Notion database
- [ ] Contact segmentation completed
- [ ] Email addresses validated
- [ ] Consent status tracked

### **Integration Requirements**
- [ ] Typebot survey ready
- [ ] Notion database configured
- [ ] Google Analytics set up
- [ ] UTM tracking parameters defined

---

## 🚀 Step 1: Brevo Account Setup

### **1.1 Create Account**
1. Go to [brevo.com](https://www.brevo.com)
2. Click "Sign up for free"
3. Choose "Email Marketing" plan
4. Verify email address

### **1.2 Account Configuration**
1. **Company Information:**
   - Company: "Therapair"
   - Industry: "Healthcare/Medical"
   - Country: "Australia"
   - Timezone: "Australia/Melbourne"

2. **Sender Information:**
   - From Name: "Therapair Team"
   - From Email: "contact@therapair.com.au"
   - Reply-to: "contact@therapair.com.au"

### **1.3 Get API Key**
1. Go to **Settings** → **API Keys**
2. Click **Create a new API key**
3. Name: "Therapair Campaign"
4. **Copy the API key** - you'll need this for integrations

---

## 🔐 Step 2: Domain Authentication (Post-Hostinger Transfer)

### **2.1 SPF Record**
Add this TXT record to your DNS:
```
Name: @
Type: TXT
Value: v=spf1 include:spf.brevo.com ~all
TTL: 3600
```

### **2.2 DKIM Record**
Add this CNAME record to your DNS:
```
Name: mail._domainkey
Type: CNAME
Value: mail._domainkey.brevo.com
TTL: 3600
```

### **2.3 DMARC Record**
Add this TXT record to your DNS:
```
Name: _dmarc
Type: TXT
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@therapair.com.au; ruf=mailto:dmarc@therapair.com.au; fo=1
TTL: 3600
```

### **2.4 Verify Domain**
1. Go to **Settings** → **Senders & IP**
2. Click **Add a domain**
3. Enter: `therapair.com.au`
4. Follow verification steps
5. Wait 24-48 hours for full propagation

---

## 📊 Step 3: Contact List Setup

### **3.1 Create Lists**
Create these lists in Brevo:
1. **"Victorian Therapists - Research"** (All contacts)
2. **"Unison-Aware Supporters"** (Segment 1)
3. **"Custom Widget Prospects"** (Segment 2)
4. **"General Research Participants"** (Segment 3)
5. **"Minimal Contact"** (Segment 4)

### **3.2 Import Contacts**
1. **Export from Notion:**
   ```csv
   email,first_name,last_name,profession,region,specialization,segment,consent_status
   therapist@example.com,John,Smith,Psychologist,Melbourne,LGBTQ+,unison_aware,granted
   ```

2. **Import to Brevo:**
   - Go to **Contacts** → **Import**
   - Upload CSV file
   - Map fields correctly
   - Assign to appropriate lists

### **3.3 Set Up Attributes**
Create these custom attributes:
- `profession` (Text)
- `region` (Text)
- `specialization` (Text)
- `segment` (Text)
- `consent_status` (Text)
- `last_contacted` (Date)
- `survey_completed` (Boolean)
- `custom_widget_interest` (Boolean)

---

## 📧 Step 4: Email Template Setup

### **4.1 Create Templates**
1. **Research Invitation (Segments 1 & 3):**
   - Name: "Research Invitation - Main"
   - Subject: "Help us build a better therapist-matching system (invitation inside)"
   - Use HTML from Template 1

2. **Custom Widget Interest (Segment 2):**
   - Name: "Custom Widget Interest"
   - Subject: "Custom therapist matching for your practice"
   - Use HTML from Template 2

3. **Minimal Contact (Segment 4):**
   - Name: "Minimal Contact Update"
   - Subject: "Quick update: Therapair research initiative"
   - Use HTML from Template 3

### **4.2 Set Up Personalization**
Configure these variables in each template:
- `{{first_name}}`
- `{{last_name}}`
- `{{profession}}`
- `{{region}}`
- `{{specialization}}`
- `{{segment}}`
- `{{unsubscribe}}`

### **4.3 Test Templates**
1. Send test emails to yourself
2. Check all links work
3. Verify personalization variables
4. Test on mobile devices

---

## 🔄 Step 5: Automation Setup

### **5.1 Create Workflows**
Set up these automated workflows:

#### **Workflow 1: Initial Outreach**
```
Trigger: Contact added to list
Action: Send Research Invitation template
Delay: 0 minutes
Conditions: Based on segment
```

#### **Workflow 2: Non-opener Follow-up**
```
Trigger: Email not opened
Action: Send "Did you see our research invitation?"
Delay: 3 days
Conditions: Email = Research Invitation
```

#### **Workflow 3: No-click Follow-up**
```
Trigger: Email opened but no click
Action: Send "Don't miss this opportunity"
Delay: 7 days
Conditions: Email = Research Invitation
```

#### **Workflow 4: Survey Incomplete**
```
Trigger: Survey started but not completed
Action: Send "Complete your contribution"
Delay: 14 days
Conditions: Survey started = true, Survey completed = false
```

#### **Workflow 5: Thank You**
```
Trigger: Survey completed
Action: Send "Thank you + here's what we learned"
Delay: 0 minutes
Conditions: Survey completed = true
```

### **5.2 Custom Widget Interest Flow**
```
Trigger: Custom widget interest expressed
Action: Send "Thanks for your interest in custom solutions"
Delay: 0 minutes
Follow-up: Case study, consultation booking, pricing
```

### **5.3 Unsubscribe Handling**
```
Trigger: Unsubscribe request
Action: Send "We understand and respect your decision"
Delay: 0 minutes
Follow-up: Optional feedback request
```

---

## 🔗 Step 6: Integration Setup

### **6.1 Notion Integration**
1. **Create Zapier Account:**
   - Go to [zapier.com](https://zapier.com)
   - Sign up for free account
   - Connect Notion and Brevo

2. **Set Up Webhook:**
   - Create webhook URL in Zapier
   - Configure to sync contact data
   - Set up survey response tracking

### **6.2 Typebot Integration**
1. **Survey Completion Tracking:**
   - Add webhook to survey completion
   - Send data to Brevo
   - Update contact attributes

2. **Response Data Sync:**
   - Map survey responses to Brevo attributes
   - Set up automated follow-ups
   - Track completion rates

### **6.3 Google Analytics Integration**
1. **UTM Parameter Setup:**
   - Add UTM parameters to all links
   - Track campaign performance
   - Monitor conversion rates

2. **Conversion Tracking:**
   - Set up goals in Google Analytics
   - Track survey completions
   - Monitor demo visits

---

## 📊 Step 7: Testing & Validation

### **7.1 Deliverability Testing**
1. **Send Test Emails:**
   - Test to different email providers
   - Check spam folder placement
   - Verify authentication records

2. **Domain Reputation:**
   - Check domain reputation
   - Monitor bounce rates
   - Track spam complaints

### **7.2 Automation Testing**
1. **Test Each Workflow:**
   - Trigger each automation manually
   - Verify correct emails are sent
   - Check personalization variables

2. **End-to-End Testing:**
   - Complete full user journey
   - Test survey completion flow
   - Verify data sync

### **7.3 Mobile Testing**
1. **Test on Mobile Devices:**
   - Check email rendering
   - Test all links
   - Verify CTA buttons

2. **Cross-Platform Testing:**
   - Test on different email clients
   - Check Gmail, Outlook, Apple Mail
   - Verify responsive design

---

## 📈 Step 8: Launch Preparation

### **8.1 Pre-Launch Checklist**
- [ ] All templates created and tested
- [ ] Automation workflows configured
- [ ] Contact lists imported and segmented
- [ ] Domain authentication complete
- [ ] Integration webhooks working
- [ ] Test emails sent successfully
- [ ] Mobile rendering verified
- [ ] UTM tracking configured

### **8.2 Launch Sequence**
1. **Day 1:** Send to Segment 1 (Unison-aware supporters)
2. **Day 2:** Send to Segment 2 (Custom widget prospects)
3. **Day 3:** Send to Segment 3 (General research participants)
4. **Day 4:** Send to Segment 4 (Minimal contact)

### **8.3 Monitoring Setup**
1. **Real-time Monitoring:**
   - Track open rates
   - Monitor click rates
   - Watch for bounces

2. **Daily Reports:**
   - Survey completion rates
   - Custom widget inquiries
   - Unsubscribe requests

---

## ⚠️ Troubleshooting

### **Common Issues**

#### **Domain Authentication Problems**
- **Issue:** Emails going to spam
- **Solution:** Check SPF, DKIM, DMARC records
- **Verification:** Use [mxtoolbox.com](https://mxtoolbox.com)

#### **Personalization Not Working**
- **Issue:** Variables showing as {{first_name}}
- **Solution:** Check attribute mapping in Brevo
- **Verification:** Test with sample data

#### **Automation Not Triggering**
- **Issue:** Workflows not executing
- **Solution:** Check trigger conditions and delays
- **Verification:** Test each workflow manually

#### **Integration Sync Issues**
- **Issue:** Data not syncing between platforms
- **Solution:** Check webhook URLs and API keys
- **Verification:** Test webhook endpoints

### **Support Resources**
- **Brevo Documentation:** [help.brevo.com](https://help.brevo.com)
- **Zapier Support:** [zapier.com/help](https://zapier.com/help)
- **Notion API:** [developers.notion.com](https://developers.notion.com)

---

## 📊 Performance Monitoring

### **Key Metrics to Track**
1. **Email Performance:**
   - Open rate (target: >25%)
   - Click rate (target: >5%)
   - Bounce rate (target: <2%)
   - Unsubscribe rate (target: <2%)

2. **Engagement Metrics:**
   - Survey completion rate (target: >80%)
   - Demo visit rate (target: >20%)
   - Custom widget inquiries (target: 5-10)

3. **Technical Metrics:**
   - Deliverability rate (target: >95%)
   - Spam complaint rate (target: <0.1%)
   - Domain reputation score

### **Reporting Schedule**
- **Hourly:** Email delivery status
- **Daily:** Open/click rates, survey completions
- **Weekly:** Overall campaign performance
- **Monthly:** Optimization recommendations

---

## 🔧 Maintenance Tasks

### **Weekly Tasks**
- [ ] Check email deliverability
- [ ] Monitor bounce rates
- [ ] Review survey completion rates
- [ ] Update contact attributes

### **Monthly Tasks**
- [ ] Analyze campaign performance
- [ ] Optimize email templates
- [ ] Update segmentation rules
- [ ] Review automation workflows

### **Quarterly Tasks**
- [ ] Audit domain reputation
- [ ] Update compliance policies
- [ ] Review integration performance
- [ ] Plan next campaign iteration

---

**Last Updated:** October 2025  
**Status:** Ready for Implementation  
**Estimated Setup Time:** 2-3 hours + 24-48 hours for domain authentication  
**Next Steps:** Choose platform, set up account, configure domain authentication

