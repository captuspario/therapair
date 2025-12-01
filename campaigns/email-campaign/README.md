# 📧 Therapair Email Campaign & Research Survey

## 🎯 Project Overview

This campaign invites ~200 Victorian therapists to:
1. **Explore the sandbox demo** (100 realistic therapist profiles)
2. **Complete a 5-7 minute research survey** (via Typebot)
3. **Opt-in for a one-year free listing** when Therapair launches

---

## 📁 Project Structure

```
therapair/
├── email-campaign/
│   ├── therapist-outreach-email.html          # HTML email template
│   ├── therapist-outreach-email-plain.txt     # Plain text version
│   ├── EMAIL-CAMPAIGN-SETUP-GUIDE.md         # Mailchimp setup instructions
│   └── README.md                              # This file
│
├── typebot-survey/
│   ├── therapair-research-survey.json         # Typebot survey export
│   ├── TYPEBOT-SETUP-GUIDE.md                 # Typebot setup instructions
│   └── NOTION-DATABASE-SCHEMA.md              # Notion database schema
│
└── README.md                                   # Main project README
```

---

## 🚀 Quick Start

### **Step 1: Set Up Mailchimp** (30 minutes)
1. Create Mailchimp account
2. Add `therapair.com.au` domain
3. Create audience "Therapist Research Outreach"
4. Import ~200 therapist contacts
5. Follow: `EMAIL-CAMPAIGN-SETUP-GUIDE.md`

### **Step 2: Set Up Typebot** (20 minutes)
1. Create Typebot account
2. Import survey JSON
3. Customize branding and links
4. Follow: `TYPEBOT-SETUP-GUIDE.md`

### **Step 3: Set Up Notion** (15 minutes)
1. Create database with schema
2. Create integration
3. Connect Typebot webhook
4. Follow: `NOTION-DATABASE-SCHEMA.md`

### **Step 4: Test Everything** (15 minutes)
1. Send test email to yourself
2. Complete survey
3. Verify data appears in Notion
4. Check all links work

### **Step 5: Launch!** (5 minutes)
1. Schedule campaign in Mailchimp
2. Monitor responses
3. Follow up as needed

**Total Setup Time:** ~90 minutes

---

## 📧 Email Campaign Details

### **Subject Line A/B Test**
- **Variant A:** "Help us build a better therapist-matching system (invitation inside)"
- **Variant B:** "Join the Therapair pilot – aligning therapists and clients through values and lived experience"

**Recommendation:** Use Variant A (less jargon, more curiosity)

### **From Email**
- **Address:** contact@therapair.com.au
- **Name:** Therapair Team
- **Reply-to:** contact@therapair.com.au

### **Target Audience**
- ~200 Victorian therapists
- Listed on vicinclusivepractitioners.com
- Psychologists, counsellors, psychotherapists, social workers

### **Best Send Time**
- **Day:** Tuesday-Thursday
- **Time:** 9-11am Melbourne time
- **Avoid:** Monday mornings, Friday afternoons

---

## 🎯 Campaign Goals

### **Primary Goals**
1. **Survey Responses:** Target 20-30 responses (10-15% response rate)
2. **Sandbox Demo Visits:** Target 40-60 visits (20-30% click rate)
3. **Free Listing Opt-ins:** Target 6-10 therapists (30% of respondents)

### **Secondary Goals**
1. Build awareness of Therapair
2. Gather qualitative insights on matching
3. Test email deliverability
4. Validate messaging and positioning

---

## 📊 Success Metrics

### **Email Metrics** (Track in Mailchimp)
- **Open Rate:** Target >25% (industry avg: 20-25%)
- **Click Rate:** Target >5% (industry avg: 3-5%)
- **Bounce Rate:** Target <2%
- **Unsubscribe Rate:** Target <1%

### **Survey Metrics** (Track in Typebot)
- **Start Rate:** Target >30% of email opens
- **Completion Rate:** Target >80% of starts
- **Average Time:** Target 5-7 minutes
- **Drop-off Points:** Identify and optimize

### **Notion Metrics** (Track in Database)
- **Total Responses:** Target 20-30
- **Free Listing Interest:** Target >30% of respondents
- **AI Trust Level:** Target >40% "Yes"
- **Profile Detail Preference:** Target 3-4 (moderate)

---

## 🎨 Brand Alignment

### **Tone & Voice**
- **Warm Professional:** Conversational yet credible
- **Non-commercial:** Peer-to-peer, not salesy
- **Values-aligned:** Emphasize inclusive, ethical approach
- **Australian:** Local context and language

### **Key Messages**
1. **Intelligent Matching:** Beyond location and specialty
2. **Inclusive by Design:** Built for diverse communities
3. **Practitioner-First:** Fair economics, not exploitative
4. **Research-Driven:** Non-profit, ethical development

### **Design**
- **Colors:** Therapair green (#10b981)
- **Font:** Inter (clean, professional)
- **Style:** Modern, accessible, mobile-first
- **Imagery:** Professional, inclusive, diverse

---

## 🔗 Key Links

### **Sandbox Demo**
- **URL:** https://therapair.com.au/sandbox/sandbox-demo.html
- **UTM:** `?utm_source=email&utm_medium=outreach&utm_campaign=therapist_research&utm_content=sandbox_demo`

### **Research Survey**
- **URL:** https://typebot.io/therapair-research-survey (update with your URL)
- **UTM:** `?utm_source=email&utm_medium=outreach&utm_campaign=therapist_research&utm_content=survey`

### **Documentation**
- **URL:** https://therapair.com.au/documentation.html
- **UTM:** `?utm_source=email&utm_medium=outreach&utm_campaign=therapist_research&utm_content=learn_more`

### **Legal Pages**
- **Privacy Policy:** https://therapair.com.au/legal/privacy-policy.html
- **Consent & Removal:** https://therapair.com.au/legal/consent-removal.html

---

## 📋 Pre-Launch Checklist

### **Email Campaign**
- [ ] Mailchimp account created and verified
- [ ] Domain (therapair.com.au) verified in Mailchimp
- [ ] Audience created with ~200 contacts
- [ ] Email template tested (HTML + plain text)
- [ ] All links work correctly
- [ ] Personalization ({{first_name}}) tested
- [ ] UTM parameters added to all links
- [ ] Subject line chosen (Variant A recommended)
- [ ] Send time scheduled (Tuesday-Thursday, 9-11am)
- [ ] Tracking enabled (opens, clicks)

### **Typebot Survey**
- [ ] Typebot account created
- [ ] Survey imported from JSON
- [ ] Branding customized (colors, fonts)
- [ ] All links updated (sandbox demo, documentation)
- [ ] Survey tested end-to-end
- [ ] Survey published and URL obtained
- [ ] Email campaign updated with survey URL

### **Notion Database**
- [ ] Database created with all properties
- [ ] Integration created and token obtained
- [ ] Database shared with integration
- [ ] Typebot webhook configured
- [ ] Test response added to database
- [ ] Data structure verified
- [ ] Filtered views created for analysis

### **General**
- [ ] Sandbox demo deployed and working
- [ ] Documentation pages live and accessible
- [ ] Legal pages (privacy, consent) live
- [ ] Test email sent and completed
- [ ] All systems tested end-to-end
- [ ] Team briefed on campaign
- [ ] Response monitoring plan in place

---

## 🔄 Follow-Up Strategy

### **7-Day Reminder** (Optional)
Send to non-responders:
- **Subject:** "Quick reminder: Share your insights on therapist matching"
- **Shorter copy:** More direct, less formal
- **Focus:** Survey link only

### **Thank You Email** (For Survey Completers)
Send after survey completion:
- **Subject:** "Thank you for helping shape Therapair"
- **Content:**
  - Gratitude message
  - Sandbox demo link (in case they missed it)
  - One-year free listing offer reminder
  - Next steps (when we'll launch)

### **Free Listing Follow-Up** (For Opt-ins)
Send 1-2 weeks before launch:
- **Subject:** "Your free Therapair listing is ready"
- **Content:**
  - Profile creation link
  - Onboarding instructions
  - Support contact information

---

## 📈 Monitoring & Analysis

### **Week 1: Daily**
- Check email opens and clicks
- Monitor survey starts and completions
- Review Notion database for new responses
- Check for any technical issues

### **Week 2-4: Weekly**
- Analyze response patterns
- Identify drop-off points in survey
- Review qualitative feedback
- Plan follow-up campaigns

### **Month 2: Analysis**
- Compile all responses
- Analyze key insights
- Create summary report
- Plan product improvements
- Follow up with interested therapists

---

## 🛠️ Troubleshooting

### **Email Not Delivering**
- Check SPF/DKIM records
- Verify domain in Mailchimp
- Test with multiple email providers
- Check spam folder

### **Survey Not Loading**
- Verify Typebot is published
- Check survey URL is correct
- Clear browser cache
- Try incognito mode

### **Data Not Appearing in Notion**
- Verify integration token
- Check database ID is correct
- Ensure database is shared with integration
- Review Typebot webhook logs

---

## 📞 Support Resources

### **Mailchimp**
- **Help Center:** https://mailchimp.com/help/
- **Email Deliverability:** https://mailchimp.com/help/about-email-deliverability/
- **Support:** Available on paid plans

### **Typebot**
- **Documentation:** https://docs.typebot.io/
- **Community:** https://discord.gg/typebot
- **Support:** Community-based

### **Notion**
- **Help Center:** https://notion.so/help
- **API Docs:** https://developers.notion.com/
- **Support:** Available on paid plans

---

## 🎉 Success!

Once all systems are tested and checklist is complete, you're ready to launch!

**Remember:**
- Start small (test with 10-20 emails first)
- Monitor closely for first 24 hours
- Be ready to respond to questions
- Follow up promptly with interested therapists

**Good luck!** 🚀

---

## 📝 Notes

- **Campaign is non-commercial:** Emphasize research and ethical development
- **Participation is optional:** No pressure, respectful approach
- **Data is confidential:** Used only for product research
- **GDPR compliant:** Consent tracking, right to withdraw
- **Australian context:** Local practitioners, local laws

---

**Built with ❤️ for inclusive mental healthcare**
