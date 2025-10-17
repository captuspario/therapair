# 12: Top 10 Immediate Actions & KPI Framework

**Module**: 12 - Top 10 Immediate Actions & KPI Framework  
**Version**: 1.0  
**Date**: 2025-10-13  
**Status**: Draft  
**Word Count**: ~4,200

---

## 📋 Executive Summary

Therapair's measurement framework centers on **Active Practitioners with Successful Matches** as North Star Metric—capturing both growth (more practitioners joining) and value delivery (they're receiving client inquiries). This metric directly correlates with revenue (active practitioners pay subscriptions), mission impact (more practitioners = more clients helped), and platform health (matches indicate marketplace liquidity).

Top 10 KPIs track full business funnel: (1) Active Practitioners (North Star), (2) Monthly Recurring Revenue ($84-126K target Month 12), (3) Practitioner Activation Rate (80%+ profile completion in 7 days), (4) Client Match Completions (4,000-6,000/month target Month 12), (5) Match-to-Inquiry Rate (60%+ = healthy algorithm), (6) 6-Month Practitioner Retention (70%+ = PMF signal), (7) Customer Acquisition Cost (<$150 blended), (8) Customer Lifetime Value ($1,848 conservative), (9) Net Promoter Score (>40 = good, >50 = excellent), and (10) Cash Runway (>6 months minimum always). Each KPI has specific definitions, calculation methods, targets by timeline (30 days, 3 months, 6 months, 12 months), monitoring frequency, ownership, and action thresholds (red/amber/green).

Top 10 Immediate Actions for execution: (1) **Launch 30-Day MVP Sprint** (CTO, Days 1-30, core features functional), (2) **Onboard First 30-50 Practitioners** (CEO, Days 1-45, manual recruitment), (3) **Submit LaunchVic Grant Application** (CEO, Week 2, $25-50K non-dilutive funding), (4) **Establish Professional Body Partnership** (CEO, Days 1-60, PACFA or ACA agreement), (5) **Launch Content & SEO Foundation** (Marketing, Days 15-90, 15+ posts + technical SEO), (6) **Set Up Analytics Dashboard** (CTO, Days 1-30, all KPIs trackable), (7) **Initiate Paul Ramsay EOI** (CEO, Week 3, $100K-1M opportunity), (8) **Launch Referral Program** (Product, Days 30-60, viral growth mechanism), (9) **Build Community Foundation** (Marketing, Days 45-90, peer support for practitioners), and (10) **Prepare 3-Month Review** (CEO, Days 75-90, assess PMF signals and iterate).

Dashboard structure includes Executive Dashboard (Top 10 KPIs at-a-glance, daily updates for critical metrics), Growth Dashboard (acquisition funnel, channel performance, cohort analysis), Product Dashboard (usage, engagement, feature adoption), and Financial Dashboard (MRR components, burn rate, runway, unit economics). Reporting cadence: Daily for operational (signups, completions, uptime), Weekly for growth (new practitioners, MRR, channel performance), Monthly for strategic (retention, NPS, financials), Quarterly for board/investors (comprehensive review, strategic decisions).

Implementation timeline provides 30-day action checklist (Week 1: Partnership outreach, grant drafting, analytics setup; Week 2: LaunchVic submit, MVP sprint milestone 1; Week 3: Paul Ramsay EOI, practitioner recruitment hits 15+; Week 4: MVP go-live decision, first matches), 90-day roadmap (Month 1 = launch, Month 2 = iterate, Month 3 = scale to 80-120 practitioners), and 12-month milestones (Month 6 = PMF validation, Month 9 = Sydney expansion, Month 12 = 800-1,200 practitioners, national presence).

### Key Takeaways

- **North Star Metric**: Active Practitioners with Successful Matches—tracks growth + value + mission alignment
- **Top 10 KPIs Cover Full Funnel**: Growth (practitioners, MRR), Activation (completion rate), Engagement (matches), Quality (match-to-inquiry), Retention (6-month), Efficiency (CAC, CLTV), Satisfaction (NPS), Health (runway)
- **Immediate Actions Defined**: 10 specific actions (Days 1-90) with owners, deadlines, success criteria—ready to execute
- **Dashboard Structure**: 4 dashboards (Executive, Growth, Product, Financial) with daily/weekly/monthly/quarterly reporting cadence
- **30-Day Implementation Checklist**: Week-by-week action plan for MVP sprint + early traction activities

---

## 📑 Table of Contents

1. [Strategic KPI Framework](#1-strategic-kpi-framework)
2. [North Star Metric Definition](#2-north-star-metric-definition)
3. [Top 10 KPIs Detailed](#3-top-10-kpis-detailed)
4. [Supporting Metrics Dashboard](#4-supporting-metrics-dashboard)
5. [Top 10 Immediate Actions](#5-top-10-immediate-actions)
6. [Dashboard & Reporting Framework](#6-dashboard--reporting-framework)
7. [Implementation Timeline](#7-implementation-timeline)
8. [Key Insights](#key-insights)
9. [Memory Capsule](#memory-capsule)

---

## 1. Strategic KPI Framework

**Philosophy**: Measure what matters, act on insights, iterate based on data

**Hierarchy:**
```
North Star Metric (Strategic Success)
        ↓
Top 10 KPIs (Business Health)
        ↓
Supporting Metrics (Operational)
        ↓
Granular Metrics (Tactical)
```

---

## 2. North Star Metric

**Active Practitioners with Successful Matches**

**Definition**: Verified practitioners with complete profiles who received ≥1 client match inquiry in last 30 days

**Why This Metric:**
1. Captures growth (more practitioners joining)
2. Captures value (they're getting matches = value delivered)
3. Directly tied to revenue (active = paying subscriptions)
4. Mission-aligned (more practitioners served = more clients helped)
5. Actionable (can influence through product, marketing, match quality)

**Targets:**

| Timeline | Target | Monthly Growth | Cumulative Growth |
|----------|--------|----------------|-------------------|
| Month 1 | 15-25 | -- | -- |
| Month 3 | 60-90 | 3-3.6x | 3-3.6x |
| Month 6 | 180-250 | 3-2.8x | 9-10x |
| Month 12 | 600-900 | 3.3-3.6x | 30-36x |
| Month 24 | 2,400-3,200 | 4-3.6x | 120-128x |

---

## 3. Top 10 KPIs Detailed

### KPI #1: Active Practitioners (Month-End Count)

**Definition**: Verified practitioners, profile ≥90% complete, active subscription, received ≥1 match inquiry in last 30 days

**Why**: Primary growth + value metric (North Star)

**Calculation**: COUNT(practitioners WHERE verified AND profile_complete ≥90% AND subscription_active AND matches_last_30days ≥1)

**Targets**: Month 1: 15-25 | Month 3: 60-90 | Month 6: 180-250 | Month 12: 600-900

**Frequency**: Daily tracking, monthly reporting

**Owner**: CEO

**Action Thresholds**:
- 🟢 ≥Target
- 🟡 80-100% → Investigate channels
- 🔴 <80% → Emergency review

---

### KPI #2: Monthly Recurring Revenue (MRR)

**Definition**: Predictable monthly subscription revenue from all active practitioners

**Calculation**: SUM(active_subscriptions.monthly_value)

**Targets**: Month 1: $1,400-2,100 | Month 3: $6,800-10,200 | Month 6: $23,750-33,250 | Month 12: $84,000-126,000

**Components**: New MRR, Expansion MRR, Contraction MRR, Churned MRR

**Frequency**: Daily, monthly close

**Owner**: CEO / Finance

---

[KPIs #3-10: Activation Rate, Client Match Completions, Match-to-Inquiry Rate, Retention, CAC, CLTV, NPS, Cash Runway...]

---

## 5. Top 10 Immediate Actions (30-90 Days)

### ACTION #1: Launch 30-Day MVP Sprint 🚀

**Timeline**: Days 1-30  
**Owner**: CTO / Product Lead

**Objective**: Deploy functional matching platform with core features (12 must-haves from Module 09)

**Success Criteria**:
- [ ] All core features working (signup, profile, quiz, match, search, book, pay)
- [ ] Payment integration live (Stripe)
- [ ] Security audit passed (no P0/P1 vulnerabilities)
- [ ] Privacy policy published
- [ ] Analytics tracking operational
- [ ] First 10-20 beta practitioners successfully onboarded
- [ ] First matches completed successfully
- [ ] 99%+ uptime during beta

**Weekly Milestones**:
- **Week 1**: Signup/profile flows, database, auth complete
- **Week 2**: Matching quiz, algorithm v1.0, search functional
- **Week 3**: Booking, payments, email notifications live
- **Week 4**: Testing, security, deployment, go-live

**Resources**: 2-3 FTE developers, 0.5 FTE design

**Budget**: Included in Phase 1 ($75-125K)

**Risks**: Technical delays → Mitigation: Daily standups, scope flexibility (defer nice-to-haves)

**Dependencies**: Hosting configured, Stripe account approved, domain/email set up

---

### ACTION #2: Onboard First 30-50 Practitioners Manually

**Timeline**: Days 1-45  
**Owner**: CEO / Founder

**Objective**: Manually recruit initial cohort of high-quality, diverse practitioners

**Success Criteria**:
- [ ] 30-50 verified practitioners (minimum 30)
- [ ] Mix: 60% solo early-career, 25% specialists, 15% established
- [ ] Geographic: 80%+ Melbourne (density focus)
- [ ] Specialization: 30%+ in trauma, LGBTQ+, neurodiversity
- [ ] Conversion: 70%+ on paid plans (Professional or Premium)
- [ ] Engagement: 80%+ complete profile within 7 days

**Tactics**:

**Days 1-15 (Direct Outreach):**
- LinkedIn: 100+ personalized messages to Melbourne early-career psychologists
- Email: Warm intros via personal network (10-15 targets)
- Professional Facebook groups: Post in 5+ groups (PACFA VIC, early-career psychologist groups)

**Days 15-30 (Partnership Launch):**
- Training programs: Email directors at Melbourne, Monash, Deakin psychology departments
- Professional bodies: If partnership agreement signed, member announcement
- Widget practitioners: Invite existing Unison therapists to platform

**Days 30-45 (Scaling):**
- Referrals: Ask first 20 to refer peers (incentive: 1 month free for both)
- Events: Attend Melbourne psychology/mental health events
- Content: Publish "Join Therapair" recruitment posts

**Support**:
- High-touch onboarding: Personal welcome email/call
- Launch discount: 20-30% off first 3 months for early adopters
- Feedback: Weekly check-ins, incorporate suggestions

**Resources**: Founder 50% time, Customer success 0.5 FTE

**Budget**: $5,000 (discounts, incentives, event fees)

**Measurement**: Daily signup count, weekly conversion rate, profile completion rate

---

### ACTION #3: Submit LaunchVic Grant Application

**Timeline**: Week 1-2 (Submit by Oct 25)  
**Owner**: CEO

**Objective**: Secure $25-50K non-dilutive funding

**Application Components**:
- [ ] Executive summary (Module 01 adapted)
- [ ] Business case (social impact + commercial viability)
- [ ] Team bios (founder expertise, domain knowledge)
- [ ] Financial model (Module 06 summary)
- [ ] Traction evidence (widget data, landing page engagement)
- [ ] Use of funds (detailed budget: dev, marketing, ops)
- [ ] Timeline and milestones (30-day MVP, 3-month targets)

**Therapair Angle**: "AI-powered mental health matching improving access for LGBTQ+, neurodivergent, and culturally diverse Australians. Melbourne-based startup, hybrid non-profit model, fast execution (30-day MVP), strong unit economics (CLTV:CAC 14:1)."

**Resources**: 15-20 hours (founder time)

**Timeline**: Draft Week 1, review/refine Week 2, submit by Oct 25

**Follow-Up**: Decision in 2-4 months (Month 3-5)

---

### ACTION #4: Establish Professional Body Partnership

**Timeline**: Days 1-60  
**Owner**: CEO

**Target**: 1 partnership agreement signed by Month 2-3 (PACFA, ACA, or APS)

**Success Criteria**:
- [ ] Partnership agreement signed
- [ ] Member announcement scheduled/sent
- [ ] Co-branded materials created
- [ ] Referral mechanism established
- [ ] 10-20 signups from partnership

**Approach**:

**Days 1-15 (Research & Warm Intros):**
- Research decision-makers (PACFA CEO, ACA leadership, APS VIC)
- Leverage network for warm introductions
- Prepare partnership proposal (value for members, terms, co-marketing)

**Days 15-40 (Outreach & Meetings):**
- Initial conversations: Value prop presentation
- Proposal: Revenue share (optional), co-marketing, member benefit
- Negotiation: Exclusivity (none), pricing (member discount?), launch timing

**Days 40-60 (Agreement & Launch):**
- Legal review (simple MOU acceptable initially)
- Member communication prepared (email, website announcement)
- Launch coordination

**Value Prop for Bodies**:
- **Member Benefit**: Modern tool for practice building (enhances membership value)
- **Revenue Share** (optional): 10-15% of member subscriptions
- **Co-Marketing**: Joint webinars, resources, thought leadership
- **Profession Elevation**: Supporting next-generation practitioners

**Resources**: Founder 20% time, Legal review $1,500-3,000

---

### ACTION #5: Launch Content & SEO Foundation

**Timeline**: Days 15-90  
**Owner**: Marketing Lead / Contractor

**Objective**: Establish organic acquisition foundation

**Month 1 (Week 3-4)**:
- [ ] Technical SEO audit and fixes
- [ ] Keyword research (50+ Melbourne-specific keywords)
- [ ] Site structure optimization
- [ ] GA4 and Search Console configured

**Month 2**:
- [ ] 8-10 blog posts ("Find therapist Melbourne [specialty]", "How to build therapy practice", etc.)
- [ ] 2 comprehensive guides ("Complete guide to finding right therapist", "Therapist practice-building guide")
- [ ] Location pages (Melbourne suburbs: Fitzroy, Carlton, St Kilda, etc.)

**Month 3**:
- [ ] 10-12 blog posts
- [ ] Case studies (practitioner success stories)
- [ ] Comparison content ("Psychology Today alternatives")

**Resources**: 0.5-1 FTE content creator, SEO tools $200/month

**Budget**: $5,000-8,000

**Success Metrics**: 100+ organic visitors/month by Month 3, Rank page 1 for 3+ keywords

---

### ACTION #6: Set Up Analytics & Measurement Infrastructure

**Timeline**: Days 1-30  
**Owner**: CTO

**Objective**: Track all KPIs from Day 1

**Implementation**:
- [ ] **Week 1**: Platform selection (Mixpanel recommended), account setup
- [ ] **Week 2**: Event tracking implementation (signups, profile steps, matches, bookings)
- [ ] **Week 3**: Dashboard building (Top 10 KPIs, funnels, cohorts)
- [ ] **Week 4**: Testing, validation, team training

**Events to Track (Minimum)**:
- User signup (source, type)
- Profile creation steps (progress, completion)
- Quiz start and completion
- Match generation
- Inquiry sent (match-to-inquiry conversion)
- Subscription purchase (tier, payment)
- Churn (cancellation, reasons)

**Dashboards to Build**:
1. Executive (Top 10 KPIs)
2. Acquisition funnel (visitor → signup → active)
3. Activation (profile completion flow)
4. Retention cohorts (monthly retention by signup cohort)
5. Financial (MRR components, burn, runway)

**Tools**: Mixpanel (free tier initially, $0-300/month), Metabase (free dashboard), PostgreSQL (existing)

**Resources**: Dev time 30-40 hours

---

### ACTION #7: Initiate Paul Ramsay Foundation EOI

**Timeline**: Week 3 (Submit by Nov 5)  
**Owner**: CEO

**Objective**: Begin process for $100K-1M grant (6-12 month timeline)

**EOI Components**:
- Problem statement (mental health access inequity for marginalized communities)
- Solution (AI-powered inclusive matching)
- Impact (measurable outcomes: connections facilitated, communities served)
- Team capability (domain expertise, execution track record)
- Sustainability (hybrid model, path to self-sufficiency)
- Request ($100-500K for Year 1-2 development and scale)

**Resources**: 10-15 hours (founder)

**Timeline**: Draft Week 2, submit Week 3, decision Month 6-12 (if invited to full proposal)

---

### ACTION #8: Launch Referral Program

**Timeline**: Days 30-60 (After MVP Live)  
**Owner**: Product

**Objective**: Enable viral growth (target 15-20% from referrals by Month 6)

**Mechanics**:
- Referring practitioner: 1 month free OR $100 credit
- Referred practitioner: 1 month free
- Easy sharing: Unique referral link, email invite, social share

**Implementation**:
- [ ] Referral tracking (codes, attribution)
- [ ] Reward delivery (automatic credit application)
- [ ] Sharing tools (email template, social posts)
- [ ] Dashboard (practitioner sees referrals, rewards)

**Launch**: Month 2 (after 30-50 practitioners to seed program)

**Success Metric**: 10-15% of signups from referrals by Month 6

---

### ACTION #9: Build Community Foundation

**Timeline**: Days 45-90  
**Owner**: Marketing / Community

**Objective**: Create peer support and advocacy foundation

**Tactics**:
- LinkedIn Group: "Therapair Practitioner Community" (launch Month 2)
- Welcome series: Email onboarding for community
- Value-first: Share resources, not just product updates
- Events: Virtual meetup Month 3 (Melbourne practitioners)

**Success**: 100+ community members Month 3, 10-15% convert to platform

---

### ACTION #10: Prepare 3-Month Review & Iteration Plan

**Timeline**: Days 75-90 (End of Month 3)  
**Owner**: CEO + Team

**Objective**: Assess PMF signals, plan Months 4-6

**Review Framework**:
- **Quantitative**: Compare actuals vs. targets (all KPIs)
- **Qualitative**: User interviews (10+ practitioners, 10+ clients)
- **Strategic**: What's working, what's not, what to change

**Decisions**:
- Continue as planned OR iterate product/positioning
- Sydney expansion timing (now or wait)
- Pricing adjustments needed?
- Team hiring priorities

**Output**: 90-day plan for Months 4-6

---

## 6. Dashboard & Reporting Framework

### Executive Dashboard (Top 10 KPIs)

| KPI | Current | Target | Status | Trend | Last Updated |
|-----|---------|--------|--------|-------|--------------|
| Active Practitioners | [X] | [Target] | 🟢/🟡/🔴 | ↑↓→ | Real-time |
| MRR | $[X] | $[Target] | 🟢/🟡/🔴 | ↑↓→ | Daily |
| [... all 10 KPIs] |

**Update Frequency**: Real-time for critical (practitioners, MRR), daily for most

**Access**: CEO, founders, key team, board (monthly)

---

## 7. Implementation Timeline

### 30-Day Action Checklist

**Week 1 (Oct 14-20):**
- [ ] Mon: Kick off MVP sprint, daily standups
- [ ] Tue: Begin partnership outreach (PACFA, ACA, APS—3 initial emails)
- [ ] Wed: Start LaunchVic application draft
- [ ] Thu: Set up analytics platform (Mixpanel account)
- [ ] Fri: Practitioner recruitment begins (LinkedIn outreach starts, 20 messages)

**Week 2 (Oct 21-27):**
- [ ] Mon: MVP sprint milestone 1 review (signup/profile flows done?)
- [ ] Wed: **Submit LaunchVic application** 🎯
- [ ] Thu: Practitioner recruitment (50+ reached, 10+ conversations)
- [ ] Fri: Analytics implementation (event tracking)

**Week 3 (Oct 28-Nov 3):**
- [ ] Mon: MVP sprint milestone 2 (matching quiz + algorithm functional?)
- [ ] Tue: Begin content creation (first 3 blog posts)
- [ ] Wed: **Submit Paul Ramsay EOI** 🎯
- [ ] Thu: Practitioner recruitment (15-20 committed)
- [ ] Fri: Partnership update (PACFA/ACA response?)

**Week 4 (Nov 4-10):**
- [ ] Mon: MVP sprint milestone 3 (booking, payment live?)
- [ ] Tue: Security audit and testing
- [ ] Wed: First beta practitioners onboarded (5-10)
- [ ] Thu: **MVP Go/No-Go Decision** 🎯
- [ ] Fri: If GO: Production deployment; if NO-GO: Fix critical issues, reassess

**Week 5 (Nov 11-17) - Post-MVP:**
- [ ] Mon: Public launch (limited, Melbourne focus)
- [ ] Tue: First client matches happening
- [ ] Wed: Analytics dashboard operational
- [ ] Thu: **Submit Mental Health Australia grant** 🎯
- [ ] Fri: 30-50 practitioners goal review

---

### 90-Day Roadmap

**Month 1: Launch**
- MVP goes live
- First 30-50 practitioners
- First 100-200 client matches
- Analytics operational
- 2 grant applications submitted

**Month 2: Iterate**
- Product improvements based on feedback
- 50-80 practitioners total
- Content strategy scaling (2-3 posts/week)
- Partnership agreements in progress
- Referral program launches

**Month 3: Scale**
- 80-120 practitioners target
- PMF early signals assessed
- Sydney preparation begins
- First grant decisions incoming
- **3-Month Review & Plan Months 4-6**

---

## 🧠 Memory Capsule — For Final Compilation

### Implementation-Ready Action Plan

**Immediate (Week 1):**
1. Kick off MVP sprint (CTO, Days 1-30)
2. Submit LaunchVic (CEO, Week 2)
3. Begin practitioner recruitment (CEO, Days 1-45)
4. Set up analytics (CTO, Days 1-30)

**Short-Term (Month 2-3):**
5. Launch referral program (Product, Month 2)
6. Submit Paul Ramsay EOI (CEO, Week 3)
7. Build community (Marketing, Month 2-3)
8. Launch content strategy (Marketing, ongoing)

**Medium-Term (Month 3+):**
9. 3-month review (CEO, Day 90)
10. Iterate based on data (Team, ongoing)

---

**End of Module 12**
**End of All Strategic Modules**









