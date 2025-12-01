# 📧 Optimized Email Campaign Strategy - Therapist Research

## 🎯 Campaign Overview

**Objective:** Gather research insights from 200+ Victorian therapists to inform Therapair platform development  
**Primary Goal:** 20-30 survey responses (10-15% response rate)  
**Secondary Goals:** Sandbox demo engagement, platform opt-ins, relationship building  
**Timeline:** 4-week campaign with automated follow-ups

---

## 📊 Strategy Optimization

### **Key Improvements Made:**

1. ✅ **Clear Priority Structure** - Research survey is primary CTA
2. ✅ **Progressive Follow-ups** - Different messages for different engagement levels
3. ✅ **Personalized Tokens** - Each therapist gets unique survey link
4. ✅ **Value-First Approach** - Show what you're building (sandbox) before asking
5. ✅ **Respectful Opt-out** - Easy unsubscribe, no pressure
6. ✅ **Thank You Sequence** - Reward participation with platform access

---

## 📬 Email Sequence Structure

### **Email 1: Research Invitation (Day 0)**
**Audience:** All 200+ therapists  
**Goal:** Initial survey participation  
**Priority:** Survey only (+ “Learn more” footer). Sandbox is handled in a separate track (Email B1).

**Key Elements:**
- Personal, peer-to-peer introduction
- Clear value proposition (help shape the future)
- Primary CTA: Research survey (5-7 minutes)
- Soft CTA: “Learn more about Therapair” footer link
- Sandbox/demo is mentioned in copy but **not** a button; it lives in Email B1

**Expected Results:**
- Open Rate: 25-30%
- Click Rate: 8-12%
- Survey Start: 15-20%
- Survey Completion: 12-18%

---

### **Email 2: Follow-up Non-Responder (Day 3)**
**Audience:** Did not open Email 1  
**Goal:** Re-engagement  
**Priority:** Survey only

**Key Elements:**
- Shorter, more direct
- Reminder of opportunity
- Single CTA: Survey
- Easy opt-out

**Expected Results:**
- Open Rate: 15-20%
- Click Rate: 5-8%
- Survey Start: 3-5%

---

### **Email 3: Follow-up No-Click (Day 7)**
**Audience:** Opened Email 1 but didn't click  
**Goal:** Re-engagement with context  
**Priority:** Survey → Sandbox

**Key Elements:**
- Acknowledge they opened
- Emphasize quick survey (5-7 minutes)
- Provide sandbox link for context
- Respectful, no pressure

**Expected Results:**
- Open Rate: 20-25%
- Click Rate: 6-10%
- Survey Start: 4-6%

---

### **Email 4: Follow-up Incomplete (Day 14)**
**Audience:** Started survey but didn't complete  
**Goal:** Survey completion  
**Priority:** Survey only

**Key Elements:**
- Acknowledge they started
- Emphasize "2 minutes left"
- Direct survey link
- Easy opt-out

**Expected Results:**
- Open Rate: 30-40%
- Click Rate: 15-25%
- Survey Completion: 10-15%

---

### **Email 5: Thank You + Next Steps (Immediate)**
**Audience:** Completed survey  
**Goal:** Reward, platform opt-in, future engagement  
**Priority:** Platform → Sandbox → Future Research

**Key Elements:**
- Thank you message
- What we're doing with their input
- Platform listing offer (if opted in)
- Sandbox demo link (if not explored)
- Future research opportunities

**Expected Results:**
- Open Rate: 60-70%
- Click Rate: 30-40%
- Platform Opt-in: 20-30% of completers

---

## 🟩 Sandbox Track (Email B1)
**Audience:** Survey completers (or a secondary re-engagement segment)  
**Goal:** Showcase the Therapair sandbox demo  
**Priority:** Sandbox demo (primary) → Learn more footer

**Structure:**
- Remind them of the research context
- Explain what’s inside the sandbox demo
- Primary CTA: “Try the Sandbox Demo” button
- Soft CTA: “Learn more about Therapair” link

**Optional Follow-up (Email B2):**
- Triggered for those who opened B1 but didn’t click
- Same structure, gentle reminder
- Primary CTA remains the sandbox demo

**Why:** Keeps the research ask clean while still giving therapists a chance to explore the platform after they’ve invested their time.

---

## 🎯 CTA Priority Strategy

### **Email 1: Research Invitation**
```
1. PRIMARY: Join Research Survey (Big Green Button)
   - "5-7 minutes"
   - Personalized token link
   - Top placement

2. SECONDARY: Learn More (Text Link)
   - Documentation & platform story
   - Bottom placement
```

### **Email 2-4: Follow-ups**
```
1. PRIMARY: Survey (Only CTA)
   - Direct, focused
   - No distractions
```

### **Email 5: Thank You**
```
1. PRIMARY: Sandbox Demo (If not explored)
2. SECONDARY: Platform Listing (If opted in)
3. TERTIARY: Future Research Opportunities
```

---

## 📈 Expected Campaign Results

### **Overall Metrics:**
- **Total Emails Sent:** 200+
- **Total Opens:** 50-60 (25-30%)
- **Total Clicks:** 20-30 (10-15%)
- **Survey Starts:** 30-40 (15-20%)
- **Survey Completions:** 20-30 (10-15%) ✅ **PRIMARY GOAL**
- **Sandbox Visits:** 40-60 (20-30%)
- **Platform Opt-ins:** 6-10 (30% of completers)

### **By Email:**
- **Email 1:** 12-18 completions (60% of total)
- **Email 2:** 2-3 completions (10% of total)
- **Email 3:** 3-5 completions (15% of total)
- **Email 4:** 3-4 completions (15% of total)
- **Email 5:** 6-10 platform opt-ins

---

## 🔄 Automation Rules

### **Email 2: Non-Responder (Day 3)**
- **Trigger:** Did not open Email 1
- **Wait:** 3 days
- **Condition:** No open recorded

### **Email 3: No-Click (Day 7)**
- **Trigger:** Opened Email 1 but no click
- **Wait:** 7 days
- **Condition:** Open recorded, no click

### **Email 4: Incomplete (Day 14)**
- **Trigger:** Started survey but didn't complete
- **Wait:** 14 days
- **Condition:** Survey start recorded, no completion

### **Email 5: Thank You (Immediate)**
- **Trigger:** Survey completed
- **Wait:** Immediate (or within 1 hour)
- **Condition:** Survey completion recorded

---

## 🎨 Personalization Strategy

### **Variables Used:**
- `{{first_name}}` - Personal greeting
- `{{profession}}` - Professional context
- `{{region}}` - Local relevance
- `{{token}}` - Unique survey link
- `{{unsubscribe}}` - Easy opt-out

### **Dynamic Content:**
- **Email 1:** Full personalization
- **Email 2-4:** Name + profession/region
- **Email 5:** Name + survey responses (if available)

---

## 📊 Tracking & Analytics

### **UTM Parameters:**
All links include:
- `utm_source=email`
- `utm_medium=research`
- `utm_campaign=therapist_research`
- `utm_content=[survey|sandbox|learn_more]`
- `utm_email=[1|2|3|4|5]` - Email number
- `utm_segment=[segment_id]` - Audience segment

### **Resend Webhook Tracking**
Click events are captured via `/api/research/email-event.php`, which verifies Resend’s signing secret and logs the `utm_email`/`utm_content` values directly back into the therapist directory’s `Research Status` and `Latest Survey Date` fields. That dataset lets you filter contact segments inside Notion before running follow-ups.

### **Unsubscribe Handling**
Every email footer now says “You received this email from Therapair… If you would like to unsubscribe, click here: {{unsubscribe}}.” That link should point to `/api/research/unsubscribe.php` and will mark the therapist as “Unsubscribed” in Notion so you can keep the list clean.

### **Metrics to Track:**
1. **Email Metrics:**
   - Open rate
   - Click rate
   - Bounce rate
   - Unsubscribe rate

2. **Survey Metrics:**
   - Start rate
   - Completion rate
   - Average time
   - Drop-off points

3. **Engagement Metrics:**
   - Sandbox visits
   - Documentation views
   - Platform opt-ins

---

## ✅ Optimization Checklist

### **Pre-Launch:**
- [ ] All email templates created and tested
- [ ] Personalization variables configured
- [ ] UTM parameters added to all links
- [ ] Survey links include unique tokens
- [ ] Unsubscribe links working
- [ ] Test emails sent and verified
- [ ] Mobile rendering tested
- [ ] Spam score checked

### **Launch:**
- [ ] Email 1 sent to all contacts
- [ ] Automation rules configured
- [ ] Tracking enabled
- [ ] Response monitoring set up

### **Post-Launch:**
- [ ] Daily monitoring (first week)
- [ ] Weekly analysis (weeks 2-4)
- [ ] Response quality review
- [ ] Strategy adjustments as needed

---

## 🚀 Best Practices Applied

1. ✅ **Research-First Approach** - Survey is primary goal
2. ✅ **Progressive Follow-ups** - Different messages for different stages
3. ✅ **Value Exchange** - Clear benefit (free listing) for participation
4. ✅ **Respectful Communication** - Easy opt-out, no pressure
5. ✅ **Personalization** - Name, profession, region
6. ✅ **Clear CTAs** - One primary action per email
7. ✅ **Mobile-First** - Responsive design
8. ✅ **Tracking** - Comprehensive UTM parameters

---

## 📝 Email Copy Files

All email copies saved in:
- `EMAIL-1-RESEARCH-INVITATION-PLAIN.txt`
- `EMAIL-2-FOLLOWUP-NONRESPONDER-PLAIN.txt`
- `EMAIL-3-FOLLOWUP-NOCLICK-PLAIN.txt`
- `EMAIL-4-FOLLOWUP-INCOMPLETE-PLAIN.txt`
- `EMAIL-5-THANKYOU-SURVEY-COMPLETE-PLAIN.txt`

HTML versions to be created based on these plain text templates.

---

**Last Updated:** 2025-01-17  
**Status:** Ready for Implementation  
**Next Steps:** Create HTML versions, set up automation, test sequence

