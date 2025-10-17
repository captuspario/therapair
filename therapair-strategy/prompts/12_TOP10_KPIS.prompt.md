# Module 12 — Top 10 Immediate Actions & KPI Framework

Follow the master protocol in `00_MASTER_PROTOCOL.md`.

---

## Context

- **Project**: Therapair (AI-driven therapist-matching SaaS)
- **Model**: Hybrid non-profit + subscription/commission
- **Focus**: Fast-track execution (30 days MVP → 3 months paying customers → 12-24 months scale)
- **Geography**: Australia → Global scale
- **Use inputs**: `../inputs/CONTEXT_THERAPAIR.md`, `../inputs/ASSUMPTIONS.md`, and ALL previous module memory files

---

## Deliverable

Write a comprehensive KPI framework and immediate action plan to guide execution and measurement.

### Document Structure

1. **Executive Summary** (250-350 words)
2. **Table of Contents**
3. **Strategic KPI Framework**
4. **North Star Metric Definition**
5. **Top 10 KPIs** (Detailed)
6. **Supporting Metrics Dashboard**
7. **Top 10 Immediate Actions** (30-90 days)
8. **Measurement & Reporting Framework**
9. **Target Setting & Benchmarking**
10. **Using Metrics for Decision-Making**
11. **Metric Evolution by Phase**
12. **Implementation Timeline & Checklist**
13. **Key Insights & Memory Capsule**

### Content Requirements

#### 1. Strategic KPI Framework (400-500 words)

**KPI Philosophy:**
- **Actionable**: Can we influence this metric?
- **Accessible**: Can we reliably measure it?
- **Auditable**: Is the data verifiable?
- **Aligned**: Does it reflect strategic priorities?
- **Simple**: Easy to understand and communicate?

**Measurement Principles:**
1. Leading indicators > Lagging indicators (where possible)
2. Input metrics + output metrics (balance)
3. Quantity + quality (both matter)
4. Absolute numbers + rates/percentages
5. Cohort analysis (understand patterns)

**Metric Hierarchy:**

```
North Star Metric
        ↓
Top 10 KPIs (Strategic)
        ↓
Supporting Metrics (Operational)
        ↓
Granular Metrics (Tactical)
```

---

#### 2. North Star Metric Definition (500-600 words)

**Candidate Metrics for North Star:**

**Option 1: Active Practitioners with Successful Matches**
- **Definition**: Number of verified practitioners who received ≥1 match inquiry in last 30 days
- **Why**: Captures both supply growth AND value delivery
- **Pros**: Aligned with value prop, actionable, captures platform health
- **Cons**: Dual-sided complexity

**Option 2: Successful Client-Therapist Matches Per Month**
- **Definition**: Number of client inquiries that resulted in booked first session
- **Why**: Measures ultimate value (actual therapy starts)
- **Pros**: True outcome, mission-aligned
- **Cons**: Harder to track, outside our platform initially

**Option 3: Monthly Recurring Revenue (MRR)**
- **Definition**: Predictable monthly subscription revenue
- **Why**: Business sustainability, simplest
- **Pros**: Clear, easy to track, vital for business
- **Cons**: Revenue focus, not mission focus

**RECOMMENDED NORTH STAR: Active Practitioners with Successful Matches**

**Rationale:**
1. **Value Capture**: Practitioners only stay active if getting value (matches)
2. **Growth Signal**: As this grows, revenue grows
3. **Quality Indicator**: Not just signups, but engaged users
4. **Mission-Aligned**: More practitioners served = more clients helped
5. **Actionable**: We can influence through product, marketing, quality

**North Star Target Trajectory:**

| Timeline | Target | Growth Rate | What This Represents |
|----------|--------|-------------|----------------------|
| Month 1 | 20 | -- | MVP launch, first matches |
| Month 3 | 60 | 3x | PMF early signals |
| Month 6 | 180 | 3x | Clear traction |
| Month 12 | 600 | 3.3x | Strong growth |
| Month 24 | 2,500 | 4.2x | Scale achieved |

**What Drives North Star Metric:**
- Practitioner acquisition (new users)
- Profile completion rate (activation)
- Client traffic generation (demand side)
- Match algorithm quality (value delivery)
- Practitioner retention (keeps them active)

---

#### 3. Top 10 KPIs - Detailed Definitions (2500-3000 words)

For each KPI, provide comprehensive analysis:

---

### **KPI #1: Active Practitioners (Month-End Count)**

**Category**: Growth / Supply-Side

**Definition:**
Number of verified practitioners with complete profiles (≥90%) and active subscription at month-end.

**Why It Matters:**
Primary growth metric. More practitioners = more specializations = better matches = more client value = more practitioner value = network effects.

**Calculation Method:**
```
Active Practitioners = COUNT(practitioners WHERE 
  profile_completion ≥ 90% AND 
  subscription_status = 'active' AND 
  account_status ≠ 'suspended'
)
```

**Current Baseline:** 0 (pre-launch)

**Target Benchmarks:**

| Timeline | Target | Growth Rate | Confidence |
|----------|--------|-------------|------------|
| 30 Days | 20-30 | -- | High (manual outreach) |
| 3 Months | 80-120 | 3-4x | Medium (depends on channels) |
| 6 Months | 250-350 | 3x | Medium (market validation) |
| 12 Months | 800-1,200 | 3.2-3.4x | Medium-Low (competitive) |
| 24 Months | 3,000-4,000 | 3.8-3.3x | Low (many variables) |

**Frequency:** Daily tracking, monthly reporting

**Owner:** CEO / Growth Lead

**Data Source:** Application database (practitioners table)

**Reporting:** Dashboard (real-time), monthly board slides

**Action Thresholds:**
- 🟢 Green: ≥Target
- 🟡 Amber: 80-100% of target → Investigate channels, conversion
- 🔴 Red: <80% of target → Emergency measures, reassess strategy

**Segment By:**
- Tier (Free, Professional, Premium, Practice)
- Location (Metro Melbourne, Regional VIC, NSW, QLD, etc.)
- Specialization (General, Trauma, LGBTQ+, ADHD, etc.)
- Source (Partnership, Content, Direct, Referral, Paid)

**Related Metrics:**
- New practitioner signups (input)
- Churn rate (negative input)
- Revenue per practitioner (value)

---

### **KPI #2: Practitioner Activation Rate (7-Day Profile Completion)**

**Category**: Activation / Conversion

**Definition:**
Percentage of new signups who complete profile (≥90%) within 7 days of signup.

**Why It Matters:**
Incomplete profiles don't deliver value. Activation is first critical step. Predicts long-term retention.

**Calculation:**
```
Activation Rate = (Practitioners completing profile in 7 days / Total signups) × 100
```

**Current Baseline:** 0% (pre-launch)

**Target Benchmarks:**
- 30 Days: 70%+ (manual high-touch onboarding)
- 3 Months: 75%+ (onboarding optimization)
- 6 Months: 80%+ (self-service working well)
- 12 Months: 85%+ (refined and efficient)

**Industry Benchmark:** SaaS onboarding 60-70% typical, 80%+ is excellent

**Frequency:** Weekly

**Owner:** Product / Customer Success

**Action Thresholds:**
- 🔴 <60%: Onboarding is broken, urgent fix needed
- 🟡 60-75%: Room for improvement, A/B test changes
- 🟢 >75%: Good, continue optimizing

**Improvement Tactics:**
- Reduce friction (simplify form fields)
- Motivate completion (show preview, progress bar)
- Remind via email (Day 1, 3, 7)
- Support via chat or phone

---

### **KPI #3: Client Match Completions (Monthly)**

**Category**: Demand-Side / Value Delivery

**Definition:**
Number of clients who complete the matching quiz per month.

**Why It Matters:**
Client demand drives practitioner value. No clients = no matches = practitioners churn.

**Calculation:**
```
Match Completions = COUNT(quiz_completions WHERE 
  completed = true AND 
  month = current_month
)
```

**Baseline:** 0

**Targets:**
- Month 3: 100-200 (early organic, practitioner-driven)
- Month 6: 500-1,000 (SEO starting, word-of-mouth)
- Month 12: 2,500-4,000 (SEO mature, channels scaled)
- Month 24: 15,000-25,000 (national presence, strong brand)

**Ratio to Practitioners:**
- Target: 5-10 quiz completions per active practitioner per month
- Healthy marketplace: 8-12:1 ratio

**Frequency:** Daily tracking, weekly review

**Owner:** Marketing / Growth

**Action Thresholds:**
- Ratio <3:1 → Insufficient client demand, boost marketing
- Ratio >15:1 → Too much demand, accelerate practitioner acquisition

**Segment By:**
- Source (Organic search, Direct, Practitioner referral, Paid)
- Issue type (Anxiety, Depression, Trauma, Relationship, etc.)
- Geography (Match to practitioner density)

---

### **KPI #4: Match-to-Inquiry Rate**

**Category**: Quality / Conversion

**Definition:**
Percentage of quiz completions that result in at least one practitioner inquiry/contact.

**Why It Matters:**
Measures match quality and client satisfaction with options. Low rate = algorithm failing or poor practitioner base.

**Calculation:**
```
Match-to-Inquiry Rate = (Quiz completions resulting in inquiry / Total quiz completions) × 100
```

**Baseline:** Unknown (estimate from widget: ~60-70%)

**Targets:**
- Month 1-3: 50%+ (acceptable early)
- Month 3-6: 60%+ (improving algorithm)
- Month 6-12: 65%+ (good algorithm)
- Month 12+: 70%+ (excellent algorithm)

**Industry Benchmark:** Marketplace 40-60% typical, 70%+ excellent

**Frequency:** Weekly

**Owner:** Product

**Action Thresholds:**
- 🔴 <40%: Algorithm problem or practitioner base insufficient
- 🟡 40-60%: Room for improvement
- 🟢 >60%: Healthy, optimize

**Improvement Drivers:**
- Algorithm quality
- Practitioner base diversity (specializations, locations)
- Profile quality (photos, bios, clear specializations)

---

### **KPI #5: Monthly Recurring Revenue (MRR)**

**Category**: Business Health / Revenue

**Definition:**
Predictable monthly subscription revenue from all active practitioners.

**Why It Matters:**
Core business sustainability metric. Tracks revenue growth, predicts cash flow.

**Calculation:**
```
MRR = SUM(active_subscriptions.monthly_value)
```

For annual plans: Annual price / 12

**Baseline:** $0

**Targets:**

| Month | Practitioners | Avg ARPU | MRR | ARR |
|-------|---------------|----------|-----|-----|
| 1 | 20-30 | $70 (discounts) | $1,400-2,100 | $17-25K |
| 3 | 80-120 | $85 | $6,800-10,200 | $82-122K |
| 6 | 250-350 | $95 | $23,750-33,250 | $285-399K |
| 12 | 800-1,200 | $105 | $84,000-126,000 | $1.0-1.5M |
| 24 | 3,000-4,000 | $110 | $330,000-440,000 | $4.0-5.3M |

**Frequency:** Daily tracking, monthly close

**Owner:** CEO / Finance

**Components to Track:**
- New MRR (from new customers)
- Expansion MRR (upgrades, upsells)
- Contraction MRR (downgrades)
- Churned MRR (cancellations)
- Net New MRR = New + Expansion - Contraction - Churned

**Action Thresholds:**
- Month-over-month growth <10% → Review acquisition and retention
- Month-over-month growth <5% → Strategic concern
- Negative growth → Crisis mode

---

### **KPI #6: Customer Acquisition Cost (CAC) - Blended**

**Category**: Efficiency / Unit Economics

**Definition:**
Total cost to acquire one verified, active practitioner (averaged across all channels).

**Why It Matters:**
Determines scalability and profitability. Must be significantly lower than CLTV.

**Calculation:**
```
CAC = Total Acquisition Spend (marketing + sales) / New Practitioners Acquired
```

**Baseline:** Unknown (estimate $100-200)

**Targets:**
- Month 1-3: <$200 (manual, high-touch acceptable)
- Month 3-6: <$150 (efficiency improving)
- Month 6-12: <$120 (channels optimized)
- Month 12-24: <$100 (mature, efficient)

**Industry Benchmark:** SaaS B2B $200-500 typical, <$150 is efficient

**Frequency:** Monthly calculation

**Owner:** Marketing / Growth

**By Channel:**
- Partnerships: $50-80 (target)
- Content/SEO: $80-120 (target)
- Referrals: $30-60 (target)
- Direct Outreach: $100-150 (acceptable)
- Paid Ads: $150-250 (test carefully)

**Action Thresholds:**
- CAC > CLTV/3 → Unsustainable, fix channels or pricing
- CAC increasing → Investigate why, optimize or pause channels

---

### **KPI #7: Customer Lifetime Value (CLTV)**

**Category**: Value / Unit Economics

**Definition:**
Total gross profit expected from practitioner over their lifetime.

**Calculation:**
```
CLTV = (Average Revenue Per User × Average Lifespan in Months) × Gross Margin %
```

Example:
```
CLTV = ($105/month × 24 months) × 70% = $1,764
```

**Components:**
- **ARPU**: $105/month (blended average)
- **Lifespan**: 24 months (conservative estimate, need data)
- **Gross Margin**: 70% (typical SaaS)

**Baseline:** Unknown (need retention data)

**Targets:**
- CLTV: $1,500-2,000 (conservative)
- CLTV:CAC Ratio: >3:1 (healthy), >5:1 (excellent)

**Frequency:** Quarterly recalculation (as retention data matures)

**Owner:** Finance / CEO

**Improvement Levers:**
- Increase ARPU (upsells, price increases)
- Extend lifespan (retention, reduce churn)
- Improve gross margin (efficiency)

---

### **KPI #8: Practitioner Retention Rate (6-Month Cohort)**

**Category**: Retention / Stickiness

**Definition:**
Percentage of practitioners who remain active 6 months after signup.

**Why It Matters:**
Retention is cheaper than acquisition. High retention = PMF, low retention = broken value prop.

**Calculation:**
```
6-Month Retention = (Practitioners active at Month 6 / Practitioners who signed up in Cohort) × 100
```

**Baseline:** Unknown (estimate 60-70% based on SaaS norms)

**Targets:**
- Target: 70%+ at 6 months (good)
- Stretch: 80%+ at 6 months (excellent)
- PMF Signal: >75% retention + NPS >50

**Industry Benchmark:** B2B SaaS 70-90% annual retention (58-74% at 6 months)

**Frequency:** Monthly cohort tracking

**Owner:** Customer Success / Product

**Churn Reasons (Track):**
- Not getting matches (insufficient client traffic)
- Too expensive (pricing issue)
- Using competitor (competitive loss)
- No longer practicing (unavoidable)
- Technical issues (fixable)

**Action Thresholds:**
- <60% at 6 months → Value prop or onboarding broken
- 60-70% → Acceptable but room for improvement
- >70% → Healthy

---

### **KPI #9: Net Promoter Score (NPS) - Practitioners**

**Category**: Satisfaction / Advocacy

**Definition:**
Likelihood practitioners would recommend Therapair (0-10 scale).

**Calculation:**
```
NPS = % Promoters (9-10) - % Detractors (0-6)
```

**Baseline:** Unknown (measure at 50+ responses)

**Targets:**
- Month 6 (first measurement): 30-40 (acceptable)
- Month 12: 40-50 (good)
- Month 24: 50-60 (excellent)
- PMF Signal: NPS >50

**Industry Benchmark:** B2B SaaS 30-50 typical, >50 excellent

**Frequency:** Quarterly survey (min 50 responses)

**Owner:** Product / Customer Success

**Follow-Up Actions:**
- Interview Promoters: Why they love it, testimonials, referral ask
- Interview Detractors: What's broken, prioritize fixes
- Interview Passives (7-8): What would make them promoters?

---

### **KPI #10: Cash Runway (Months)**

**Category**: Financial Health / Survival

**Definition:**
Number of months until cash runs out at current burn rate.

**Calculation:**
```
Runway = Cash Balance / Monthly Burn Rate
```

**Baseline:** Variable (depends on funding)

**Targets:**
- **Minimum**: 6 months (never go below)
- **Comfortable**: 12-18 months
- **Safe**: 18-24 months

**Frequency:** Weekly tracking

**Owner:** CEO / Finance

**Action Thresholds:**
- 🔴 <6 months: Emergency fundraising or cost cuts
- 🟡 6-9 months: Begin fundraising or tighten spend
- 🟢 >9 months: Healthy, monitor

**Burn Rate Components:**
- Fixed: Salaries, tools, office
- Variable: Marketing, support, infrastructure
- Target: Reduce burn rate 10-20% per quarter as revenue grows

---

#### 4. Supporting Metrics Dashboard (400-500 words)

**Secondary Metrics to Track:**

**Acquisition Funnel:**
- Website visitors (monthly)
- Signup conversion rate
- Source breakdown (channel attribution)

**Activation:**
- Time to complete profile (median days)
- Profile quality score (completeness, photos, bio quality)

**Engagement:**
- Weekly Active Practitioners (WAP)
- Logins per week (median)
- Profile updates per month

**Client-Side:**
- Quiz start rate (% of website visitors)
- Quiz completion rate (% who finish)
- Inquiries per practitioner (distribution)

**Revenue:**
- ARPU by tier
- Annual vs. monthly mix
- Upgrade rate (tier migration)
- Expansion MRR

**Efficiency:**
- CAC by channel
- LTV:CAC by cohort
- Payback period
- Unit economics by segment

---

#### 5. Top 10 Immediate Actions (30-90 Days) (1500-1800 words)

**Action #1: Launch MVP (Days 1-30) 🚀**

**Objective:** Deploy functional matching platform with core features.

**Owner:** CTO / Product Lead

**Success Criteria:**
- [ ] All core features working (signup, profile, quiz, match, book)
- [ ] Payment integration live (Stripe)
- [ ] Security audit passed
- [ ] Privacy policy and T&Cs published
- [ ] Analytics tracking operational
- [ ] No P0/P1 bugs

**Subtasks:**
- [ ] Week 1: Final dev sprint, bug fixes
- [ ] Week 2: Security review, testing
- [ ] Week 3: Staging deployment, beta testing
- [ ] Week 4: Production deployment, monitoring

**Resources Required:**
- Dev team: 2-3 FTE
- Design: 0.5 FTE
- Budget: Included in Phase 1

**Risks:**
- Technical delays → Mitigation: Daily standups, scope flexibility
- Security issues found → Mitigation: Fix before launch, no shortcuts

**Dependencies:**
- Hosting setup
- Payment processor approval
- Domain and email configured

---

**Action #2: Onboard First 20-50 Practitioners (Days 1-45)**

**Objective:** Manually recruit and onboard initial cohort of high-quality practitioners.

**Owner:** CEO / Founder

**Success Criteria:**
- [ ] 20-30 practitioners minimum (50 stretch)
- [ ] Mix of specializations and locations
- [ ] All profiles complete and verified
- [ ] 80%+ on paid plans (Professional or Premium)
- [ ] Active and engaged (logging in, checking matches)

**Tactics:**
1. **Direct Outreach (Days 1-15):**
   - LinkedIn: 100 personalized messages
   - Email: Warm intros via network
   - Professional Facebook groups: 50+ contacts

2. **Partnership Launch (Days 15-30):**
   - Contact PACFA, ACA, APS: Member announcement
   - Training program directors: Graduate support
   - Existing widget practitioners: Invite to platform

3. **High-Touch Onboarding:**
   - Personal welcome call/email
   - Profile creation support
   - Launch discount (20% off first 3 months)
   - Early adopter perks (featured, feedback input)

**Resources:**
- Founder time: 50% of capacity
- Customer success: 0.5 FTE
- Budget: $5,000 (discounts, incentives)

**Measurement:**
- Daily: Signup count, outreach volume
- Weekly: Conversion rate, profile completion

---

**Action #3: Establish Professional Body Partnerships (Days 1-60)**

**Objective:** Secure partnership agreements with 1-2 professional bodies.

**Owner:** CEO

**Success Criteria:**
- [ ] PACFA or ACA partnership signed (minimum 1)
- [ ] Member announcement sent
- [ ] Co-branded materials created
- [ ] Referral mechanism established
- [ ] 10-20 signups from partnership

**Approach:**
1. **Research & Warm Intros (Days 1-15):**
   - Identify decision-makers
   - Leverage network for warm intros
   - Prepare partnership proposal

2. **Outreach & Meetings (Days 15-40):**
   - Initial calls: Value prop for members
   - Proposal presentation: Terms, benefits
   - Negotiation: Pricing, exclusivity, co-marketing

3. **Launch (Days 40-60):**
   - Agreement signed
   - Member communication prepared
   - Launch announcement
   - Support partnership success

**Partnership Value Prop:**
- **For Members**: Professional development, practice support, member benefit
- **For Body**: Member value, revenue share (optional), sector leadership

**Resources:**
- Founder time: 20% for 2 months
- Budget: $3,000 (materials, legal review)

---

**Action #4: Launch Content & SEO Foundation (Days 15-90)**

**Objective:** Establish content marketing and SEO foundation for organic growth.

**Owner:** Marketing Lead / Content Creator

**Success Criteria:**
- [ ] 10-15 blog posts published
- [ ] 2-3 comprehensive guides created
- [ ] SEO: Technical setup complete
- [ ] SEO: 20+ target keywords identified
- [ ] Analytics: GA4 and Search Console configured
- [ ] First organic traffic (100+ visitors/month)

**Content Priorities:**

**Week 1-4 (SEO Foundation):**
- [ ] Technical SEO audit and fixes
- [ ] Keyword research (100+ keywords mapped)
- [ ] Site structure optimization
- [ ] Schema markup implemented

**Week 4-8 (Core Content):**
- [ ] "How to Find the Right Therapist" (comprehensive guide)
- [ ] "Therapist Specializations Explained" (guide)
- [ ] Location pages (Find therapist in [Melbourne/Sydney/etc.])
- [ ] Identity-specific pages (LGBTQ+, neurodivergent, etc.)

**Week 8-12 (Scaling Content):**
- [ ] 2-3 blog posts per week
- [ ] Practitioner success stories
- [ ] Mental health topics (anxiety, depression, trauma)
- [ ] Building your practice series

**Resources:**
- Content creator: 0.5-1 FTE
- SEO tools: $200/month
- Budget: $3,000-5,000 (content creation)

---

**Action #5: Set Up Analytics & Reporting (Days 1-30)**

**Objective:** Establish measurement infrastructure for all KPIs.

**Owner:** CTO / Data Lead

**Success Criteria:**
- [ ] Analytics platform implemented (Mixpanel or Amplitude)
- [ ] All key events tracked
- [ ] Dashboard created for Top 10 KPIs
- [ ] Weekly reporting automated
- [ ] Cohort analysis setup

**Implementation:**
- [ ] Week 1: Platform selection and setup
- [ ] Week 2: Event tracking implementation
- [ ] Week 3: Dashboard building
- [ ] Week 4: Testing and validation

**Tools:**
- **Analytics**: Mixpanel ($0-300/month) or Amplitude
- **Dashboard**: Metabase (free) or custom
- **Data Warehouse**: PostgreSQL (existing)

**Resources:**
- Dev time: 40 hours
- Tools: $300/month
- No additional budget needed

---

[Continue with Actions #6-10:]

**Action #6: Launch Referral Program (Days 30-60)**
**Action #7: Implement Feedback Loops (Days 1-90)**
**Action #8: Secure Initial Funding (Days 1-90)**
**Action #9: Build Community Foundation (Days 45-90)**
**Action #10: Prepare 3-Month Review & Iteration (Days 75-90)**

---

### Analysis Depth

- **Total Length**: 4000-4500 words
- **Executive Summary**: 250-350 words
- **North Star Metric**: Clear recommendation with rationale
- **Top 10 KPIs**: Comprehensive definitions with targets
- **Top 10 Actions**: Specific, actionable, time-bound

---

## Output Requirements

- Save to `../outputs/12_TOP10_KPIS.md`
- Save memory capsule to `../outputs/12_TOP10_KPIS.memory.md`
- North Star Metric defined and justified
- Top 10 KPIs with targets (30d, 3mo, 6mo, 12mo, 24mo)
- Top 10 Immediate Actions with owners and timelines
- Dashboard structure outlined
- Implementation checklist
- Australian English throughout

---

## Key Questions to Answer

1. **What is Therapair's North Star Metric?**
2. **What are the 3 most critical KPIs for first 12 months?**
3. **How will we know if we're achieving product-market fit?**
4. **What are the top 3 immediate actions for next 30 days?**
5. **What metrics trigger strategic concerns or pivots?**
6. **How do we balance growth, quality, and sustainability metrics?**

---

## Success Criteria

- ✅ North Star Metric clearly defined
- ✅ Top 10 KPIs comprehensive with targets
- ✅ All KPIs measurable and actionable
- ✅ Targets realistic but ambitious
- ✅ Dashboard structure clear
- ✅ Top 10 Actions specific and time-bound
- ✅ Integration with all previous modules
- ✅ Ready-to-implement measurement plan

---

**End of Prompt**

**End of All Module Prompts**
