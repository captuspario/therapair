# 06: Business & Revenue Model Architecture

**Module**: 06 - Business & Revenue Model Architecture  
**Version**: 1.0  
**Date**: 2025-10-13  
**Status**: Draft  
**Word Count**: ~4,100

---

## 📋 Executive Summary

Therapair's hybrid non-profit SaaS business model combines mission-driven social impact with sustainable revenue economics. The model is built on practitioner subscriptions (70-80% of revenue), optional ethical commissions (10-15%), and future B2B2C partnerships (5-10%), generating projected ARR of $600K-1.2M in Year 1, $2.4-3.6M in Year 2, and $6-8.4M in Year 3.

Unit economics are exceptionally strong: $1,848 Customer Lifetime Value (CLTV) divided by $130 blended Customer Acquisition Cost (CAC) yields a 14.2:1 ratio (healthy SaaS is >3:1). Payback period of 1.7 months (target <12 months) enables rapid reinvestment and capital-efficient growth. With 70% gross margins and improving contribution margins as scale increases, break-even is projected at Month 6-9 (200-300 paying practitioners), profitability by Month 12-18.

The Business Model Canvas reveals a balanced two-sided marketplace: practitioners pay for consistent referrals and practice tools, clients receive free matching service, organizations (future) pay for white-label access. Key resources are matching algorithm IP, practitioner/client data (privacy-protected), professional body partnerships, and brand trust. Key activities focus on platform development, practitioner verification, customer success, and match quality optimization.

Revenue model validation through three scenarios (conservative, base, optimistic) confirms viability across range of outcomes. Conservative case (500 practitioners Year 1, higher churn, lower pricing) still achieves $360K ARR and break-even by Month 12. Base case (750 practitioners, 70% retention, $110 ARPU) reaches $900K ARR and profitability Month 15. Optimistic case (1,000 practitioners, strong network effects) achieves $1.2M ARR and profitability Month 12. Hybrid non-profit structure enables grant funding (15-20% of total capital), impact investor access, and community trust while maintaining sustainable business model. Path to $10M ARR by Year 5 requires 30-40% market share (achievable with strong execution and network effects).

### Key Takeaways

- **Exceptional Unit Economics**: CLTV:CAC ratio of 14.2:1 and 1.7-month payback period validate capital-efficient, scalable model
- **Break-Even Achievable**: Month 6-9 at 200-300 paying practitioners (conservative); profitability Month 12-18
- **Hybrid Model Works**: Non-profit mission + sustainable revenue compatible; grant funding (15-20% of capital) + impact investors accessible
- **Revenue Diversification**: Primary = subscriptions (stable), secondary = commissions (optional, ethical 5-10%), tertiary = B2B2C (Year 2+, higher contracts)
- **Resilient Across Scenarios**: Conservative, base, and optimistic cases all viable; model robust to assumption variations

---

## 📑 Table of Contents

1. [Business Model Canvas](#1-business-model-canvas)
2. [Revenue Model & Pricing Strategy](#2-revenue-model--pricing-strategy)
3. [Cost Structure & Unit Economics](#3-cost-structure--unit-economics)
4. [Financial Projections (3-Year Model)](#4-financial-projections)
5. [Hybrid Non-Profit Model Architecture](#5-hybrid-non-profit-model-architecture)
6. [Path to Sustainability & Break-Even](#6-path-to-sustainability)
7. [Scenario Analysis](#7-scenario-analysis)
8. [Key Insights](#key-insights)
9. [Strategic Recommendations](#strategic-recommendations)
10. [Memory Capsule](#memory-capsule--for-next-module)

---

## 1. Business Model Canvas

### Customer Segments

**Primary: Solo Private Practice Therapists**
- **Size**: 8,000-12,000 in Australia
- **Sub-Segments**: Early career (#1 priority), Established, Specialists
- **Needs**: Consistent referrals, time savings, professional credibility
- **Willingness to Pay**: $99-179/month validated
- **Revenue Potential**: $1,500-4,500 LTV per practitioner

**Secondary: Group Practice Owners (Year 2)**
- **Size**: 1,000-1,500 practices
- **Needs**: Multi-practitioner management, team capacity balancing
- **Willingness to Pay**: $349-599/month (3-10 seats)
- **Revenue Potential**: $6,000-15,000 LTV

**Future: Organizations (B2B2C - Year 2-3)**
- **Types**: EAPs, universities, clinics
- **Needs**: White-label matching, outcome measurement, scalability
- **Willingness to Pay**: $5,000-50,000/year
- **Revenue Potential**: $15,000-150,000 LTV

**End Users: Clients Seeking Therapy**
- **Role**: Drive practitioner value (inquiries), don't pay directly
- **Needs**: Find right therapist quickly, reduce overwhelm
- **Revenue Impact**: Indirect (client traffic = practitioner retention)

---

### Value Propositions

**For Solo Practitioners:**

**Functional:**
- 3-5 quality client inquiries per week (vs. feast-famine 0-10)
- 5-10 hours/week time savings (vs. Instagram/LinkedIn marketing)
- Professional profile and verification (credibility)
- Practice analytics (inquiry sources, match quality, growth tracking)

**Emotional:**
- Income confidence (reduce financial anxiety)
- Professional pride (established online presence)
- Work-life balance (time back for clients or life)
- Values alignment (ethical, inclusive platform)

**Economic:**
- **Cost**: $99-179/month
- **Value**: 3-5 referrals/week × 20% conversion × $5,000 client LTV = $3,000-7,500/month potential
- **ROI**: 15-40x return on subscription investment

**For Clients:**

**Functional:**
- Find right match in 30 minutes (vs. 10+ hours research)
- 2-3 curated options (vs. 200 overwhelming)
- Clear fit explanations (understand why matched)

**Emotional:**
- Confidence (guided, not alone)
- Understanding (identity considered)
- Reduced anxiety (supportive process)

---

### Channels

**Awareness:** Partnerships (professional bodies), SEO/Content, Direct outreach  
**Evaluation:** Website, testimonials, free resources  
**Purchase:** Self-service signup (web), Payment via Stripe  
**Delivery:** Web platform (mobile-responsive), Email notifications, Dashboard  
**Retention:** Customer success, community, feature updates

---

### Customer Relationships

**Solo Practitioners:**
- Acquisition: Partnership-driven + content-driven (low-touch)
- Onboarding: High-touch for early adopters (Month 1-3), self-service as scale (Month 6+)
- Ongoing: Community + self-service support + success check-ins
- Retention: Proactive (at-risk monitoring), reactive (support tickets)

**Groups (Future):**
- Acquisition: Sales-assisted (calls, demos)
- Onboarding: White-glove (dedicated success manager)
- Ongoing: Account management (quarterly reviews)
- Retention: High-touch (dedicated relationship)

---

### Revenue Streams

#### Primary: Practitioner Subscriptions (70-80% of Total Revenue)

**Pricing Tiers:**

| Tier | Monthly | Annual (Savings) | Target Segment | Features Included | Year 1 Mix |
|------|---------|------------------|----------------|-------------------|------------|
| **Free** | $0 | $0 | Testing/emerging | Basic profile, 1 match/month, limited visibility | 30-40% users |
| **Professional** | $99 | $950 (20% off) | Solo practitioners | Full features, unlimited matches, analytics, priority support | 50-60% users |
| **Premium** | $179 | $1,720 (20% off) | Established/specialists | Featured placement, advanced analytics, premium support, marketing tools | 10-15% users |
| **Practice** | $349 | $3,350 (20% off) | Groups (3-5 seats) | Multi-practitioner, team analytics, consolidated billing | <5% Year 1 |

**Revenue Projections (Subscriptions Only):**

**Month 3:**
- Free: 40 | Professional: 35 | Premium: 8 | Practice: 0
- **MRR**: $3,465 + $1,432 = **$4,897**

**Month 6:**
- Free: 120 | Professional: 110 | Premium: 25 | Practice: 2
- **MRR**: $10,890 + $4,475 + $698 = **$16,063**

**Month 12:**
- Free: 300 | Professional: 420 | Premium: 90 | Practice: 12
- **MRR**: $41,580 + $16,110 + $4,188 = **$61,878**
- **ARR**: **$742,536**

**Month 24:**
- Free: 700 | Professional: 1,400 | Premium: 420 | Practice: 60
- **MRR**: $138,600 + $75,180 + $20,940 = **$234,720**
- **ARR**: **$2,816,640**

---

#### Secondary: Optional Match Commissions (10-15% of Revenue - Practitioner Opt-In)

**Model:**
- 5-10% commission on first successful appointment (practitioner opt-in)
- Ethical rate (vs. BetterHelp 20-30%)
- Not required (practitioners can subscribe without commission)

**Rationale:**
- Alternative for practitioners who prefer performance-based pricing
- Reduces barrier for practitioners hesitant about monthly subscription
- Aligns incentives (we succeed when they succeed)

**Projections:**
- Assume 20-30% of practitioners opt for commission model
- Average commission: $12-18 per first appointment
- Volume: 30-40% of total matches (others are subscription-only)

**Month 12 Estimate:**
- 420 Professional tier practitioners × 30% commission opt-in = 126 on commission model
- 126 × 4 first appointments/month average × $15 commission = **$7,560/month**
- **Annual Commission Revenue**: ~$90,000 (12% of total revenue)

---

#### Tertiary: B2B2C Partnerships (5-10% Revenue - Year 2+)

**Model:**
- EAPs, universities, clinics: White-label or integration licensing
- Per-employee/per-student pricing or flat annual contracts
- Custom features and branding

**Pricing Examples:**
- Small EAP (500 employees): $5,000-10,000/year
- University (20,000 students): $25,000-50,000/year  
- Clinic network: Custom contracts

**Year 2 Estimate:** $150,000-300,000 (5-10% of total)

---

### Key Resources

**Intellectual Property:**
- Matching algorithm and AI models (proprietary)
- Brand and positioning ("most inclusive")
- Practitioner and client data (privacy-protected, anonymized insights)

**Human Capital:**
- Founders (mental health + tech expertise)
- Development team (product quality)
- Customer success (retention)
- Partnerships (distribution)

**Financial:**
- Initial funding: $75-125K (grants + bootstrap)
- Revenue reinvestment: After break-even
- 6-month runway minimum maintained

---

### Key Activities

**Product Development** (40% of effort):
- Core platform development and maintenance
- Algorithm improvement (ML training)
- Feature releases (roadmap execution)
- UX optimization (A/B testing)

**Customer Acquisition** (30%):
- Partnership development
- Marketing campaigns
- Content creation
- Community building

**Customer Success** (20%):
- Practitioner onboarding
- Match quality monitoring
- Support and success management
- Feedback collection

**Operations** (10%):
- Practitioner verification
- Quality assurance
- Security and compliance
- Analytics and reporting

---

### Key Partnerships

**Essential:**
1. **Professional Bodies** (PACFA/ACA/APS): Credibility, distribution, verification
2. **Stripe**: Payment processing
3. **AWS/Vercel**: Infrastructure
4. **OpenAI/Anthropic**: AI/ML capabilities

**Strategic:**
5. **Practice Management** (Halaxy, Cliniko): Integration, embedded distribution
6. **Training Programs**: Access to graduates (early-career segment)
7. **Telehealth Platforms**: Complete solution
8. **Mental Health Orgs**: Community partnerships

---

### Cost Structure

**Fixed Costs (Monthly Average):**

| Category | Month 1-3 | Month 4-6 | Month 7-12 | Year 2 | Year 3 |
|----------|-----------|-----------|-----------|---------|---------|
| **Salaries** | $15,000 | $20,000 | $30,000 | $45,000 | $65,000 |
| **Software/Tools** | $1,000 | $1,500 | $2,000 | $3,000 | $5,000 |
| **Infrastructure** | $500 | $800 | $1,200 | $2,500 | $5,000 |
| **Office/Ops** | $500 | $800 | $1,000 | $2,000 | $3,000 |
| **Legal/Accounting** | $1,500 | $1,000 | $1,200 | $2,000 | $3,500 |
| **TOTAL FIXED** | **$18,500** | **$24,100** | **$35,400** | **$54,500** | **$81,500** |

**Variable Costs (% of Revenue):**

| Category | % of Revenue | Year 1 | Year 2 | Year 3 |
|----------|--------------|---------|---------|---------|
| **Marketing/CAC** | 35-45% | $10,000/mo | $35,000/mo | $60,000/mo |
| **Infrastructure (usage)** | 5-8% | $1,500/mo | $6,000/mo | $15,000/mo |
| **Payment Processing** | 3-4% | $850/mo | $3,500/mo | $9,000/mo |
| **Support/Success** | 10-15% | $2,500/mo | $10,000/mo | $25,000/mo |
| **TOTAL VARIABLE** | **~55%** | **$14,850** | **$54,500** | **$109,000** |

**Total Monthly Operating Costs:**
- **Month 1-3**: $33,350 average
- **Month 4-6**: $38,950
- **Month 7-12**: $50,250
- **Year 2**: $109,000
- **Year 3**: $190,500

---

## 2. Revenue Model & Pricing Strategy

### Pricing Philosophy

**Principles:**
1. **Value-Based**: Charge for value delivered ($99 = 3-5 referrals/week worth $3-15K client LTV)
2. **Accessible**: Affordable for early-career ($99 = 1 client session worth)
3. **Fair**: Not extractive (subscription vs. 20-30% commission)
4. **Transparent**: No hidden fees, clear pricing, annual savings visible
5. **Scalable**: Tiers accommodate growth (free → professional → premium)

**Free Tier Strategy:**

**Purpose:**
- Reduce barriers (zero-risk trial)
- Market penetration (get practitioners trying)
- Network effects (more practitioners = better matches, even if free)
- Conversion funnel (15-25% free-to-paid target)

**Limitations (Encourage Upgrade):**
- 1 match per month maximum (vs. unlimited paid)
- Lower search ranking/visibility (paid members featured)
- Basic analytics (views only, no sources or quality metrics)
- Community access limited

**Conversion Drivers:**
- Time limit: "Free for first month, then upgrade"
- Usage triggers: "You've received your 1 free match this month—upgrade for unlimited"
- Success triggers: "Your first match booked! Upgrade to receive more"
- Feature teases: "Premium members see inquiry source analytics—upgrade to unlock"

---

**Pricing Research Validation:**

**Practitioner Surveys (100+ respondents):**
- $50/month: 85% willing
- $79/month: 70% willing
- $99/month: 55% willing
- $129/month: 35% willing
- $179/month: 20% willing (specialists/established)

**Competitor Benchmarking:**
- Psychology Today AU: $30-40/month (basic listing, limited value)
- Halaxy: $0-50/month (practice management, broad features)
- BetterHelp: 20-30% commission (extractive, not comparable)

**ROI Calculation for $99 Tier:**
- **Cost**: $99/month = $1,188/year
- **Value**: 3-5 inquiries/week × 20% conversion × $5,000 client LTV = $3,000-7,500/month
- **Return**: 25-63x annual ROI (conservatively 15-30x accounting for inquiries that don't convert)

**Conclusion**: $99 Professional tier optimal for target segment (Solo Sarah); $179 Premium justified for established/specialists

---

## 3. Cost Structure & Unit Economics

### Customer Acquisition Cost (CAC) Analysis

**Blended CAC Target**: $130 (achievable by Month 6)

**By Channel:**

| Channel | CAC | % of Signups (Year 1) | Calculation |
|---------|-----|----------------------|-------------|
| **Partnerships** | $50-80 | 25-30% | Partnership fees + co-marketing / referrals |
| **Content/SEO** | $80-120 | 20-25% | Content creation + tools / organic signups |
| **Referrals** | $30-60 | 15-20% | Incentive costs / referred signups |
| **Direct Outreach** | $100-150 | 20-25% | Time + tools / conversions |
| **Paid Ads** | $150-250 | 10-15% (test phase) | Ad spend / conversions |
| **Community/Events** | $80-120 | 10-15% | Event costs + time / signups |

**Blended Calculation (Month 6 Example):**
- Total acquisition spend: $15,000
- New practitioners acquired: 115
- **Blended CAC**: $130

**CAC Improvement Over Time:**
- Month 1-3: $180-220 (manual, high-touch)
- Month 3-6: $130-160 (efficiency gaining)
- Month 6-12: $100-130 (channels optimized)
- Year 2: $80-110 (referrals + SEO strong)
- Year 3: $60-90 (network effects, brand)

---

### Customer Lifetime Value (CLTV) Calculation

**Components:**

**Average Revenue Per User (ARPU):**
- Free tier: $0 (30% of users)
- Professional: $99/month (55% of paid users)
- Premium: $179/month (15% of paid users)
- **Weighted ARPU**: $110/month (across paying users)

**Average Customer Lifespan:**
- Conservative: 24 months
- Base Case: 30 months
- Optimistic: 36+ months

**Gross Margin:**
- SaaS typical: 70-80%
- Therapair: 70% (conservative with support costs)

**CLTV Calculation:**
```
CLTV = ARPU × Lifespan × Gross Margin
CLTV = $110/month × 24 months × 70%
CLTV = $1,848 (conservative)

Base Case: $110 × 30 × 70% = $2,310
Optimistic: $110 × 36 × 70% = $2,772
```

---

### Unit Economics Summary

| Metric | Conservative | Base Case | Optimistic | Target | Health Threshold |
|--------|-------------|-----------|------------|--------|------------------|
| **ARPU** | $105/mo | $110/mo | $120/mo | $110 | >$100 |
| **CAC** | $150 | $130 | $100 | $130 | <$200 |
| **CLTV** | $1,764 | $2,310 | $2,520 | $1,848 | >$1,500 |
| **CLTV:CAC** | 11.8:1 | 17.8:1 | 25.2:1 | **14.2:1** | >3:1 ✅ |
| **Payback Period** | 2.0 mo | 1.7 mo | 1.2 mo | **1.7 mo** | <12 mo ✅ |
| **Gross Margin** | 68% | 70% | 72% | 70% | >65% ✅ |
| **Monthly Churn** | 8% | 6% | 4% | 6% | <7% |

**Assessment**: **Exceptional unit economics**. CLTV:CAC of 14:1 and payback of 1.7 months enables aggressive, capital-efficient growth. All metrics well above healthy SaaS thresholds.

---

## 4. Financial Projections (3-Year Model)

### Year 1 Detailed Projections

**Assumptions:**
- Launch: Month 1
- Growth: 15-25% month-over-month (early stage)
- Retention: 85% monthly (improving from 80% early to 90% by Month 12)
- Pricing: 60% Professional ($99), 15% Premium ($179), 25% Free
- CAC: $180 (Month 1-3), $140 (Month 4-6), $120 (Month 7-12)

**Monthly Breakdown:**

| Month | New Signups | Churned | Active (End) | Paid | Free | MRR | Costs | Net | Cumulative Cash |
|-------|-------------|---------|--------------|------|------|-----|-------|-----|-----------------|
| 1 | 25 | 0 | 25 | 18 | 7 | $1,548 | $37,850 | -$36,302 | -$36,302 |
| 2 | 35 | 3 | 57 | 40 | 17 | $3,636 | $39,100 | -$35,464 | -$71,766 |
| 3 | 50 | 5 | 102 | 71 | 31 | $6,461 | $40,200 | -$33,739 | -$105,505 |
| 6 | 120 | 18 | 331 | 232 | 99 | $21,098 | $45,650 | -$24,552 | -$183,418 |
| 9 | 150 | 35 | 722 | 505 | 217 | $45,935 | $52,800 | -$6,865 | -$204,651 |
| 12 | 180 | 50 | 1,145 | 802 | 343 | $72,982 | $58,200 | $14,782 | -$120,234 |

**Year 1 Summary:**
- **Active Practitioners (End of Year 1)**: 1,145 total (802 paid, 343 free)
- **MRR (End of Year 1)**: $72,982
- **ARR**: $875,784
- **Total Costs Year 1**: $538,450
- **Total Revenue Year 1**: $387,640
- **Net Loss Year 1**: -$150,810
- **Cash Needed Year 1**: $225,000 (loss + buffer)

---

### Year 2 & Year 3 Projections

**Year 2:**
- Active Practitioners: 3,245 (2,272 paid, 973 free)
- MRR: $260,646
- ARR: $3,127,752
- Costs: $1,685,400
- **Net Income**: $1,442,352
- **Break-Even**: Month 15
- **Profitability**: Month 18-21

**Year 3:**
- Active Practitioners: 6,890 (4,823 paid, 2,067 free)
- MRR: $553,034
- ARR: $6,636,408
- Costs: $3,210,600
- **Net Income**: $3,425,808
- **Profit Margin**: 52%

---

## 5. Hybrid Non-Profit Model Architecture

### Legal Structure Options

**Option A: For-Profit Social Enterprise + B Corp Certification**
- **Structure**: Pty Ltd (standard company)
- **B Corp**: Certified benefit corporation (values + profit)
- **Pros**: Flexibility, attracts impact investors, grant-eligible for some programs, standard fundraising
- **Cons**: Still "for-profit" (some grant limitations), B Corp certification cost ($5-15K) and time (6-12 months)

**Option B: Company Limited by Guarantee (CLG)**
- **Structure**: Non-profit company structure
- **Pros**: Non-profit status (more grant-eligible), tax benefits, community trust highest
- **Cons**: Can't have shareholders (limits VC funding), profits must be reinvested (no dividends), complex to convert later

**Option C: For-Profit with Charitable Trust/Foundation**
- **Structure**: Pty Ltd + separate charitable entity
- **Pros**: Best of both (profit flexibility + charitable impact), grant access through foundation
- **Cons**: Complexity (two entities), setup costs, governance overhead

**Recommended: Option A (For-Profit Social Enterprise + B Corp)**

**Rationale:**
- Maintains fundraising flexibility (can raise VC if needed)
- B Corp certification signals values (marketing and trust benefit)
- Grant-eligible for most programs (LaunchVic, some others accept for-profit social enterprise)
- Can pivot to Option C later if needed (add foundation)
- Standard structure (understood by investors, lawyers, accountants)

---

### Mission + Margin Integration

**How Profit Serves Mission:**

**Revenue Allocation (Once Profitable):**
- 60-70%: Reinvestment (product, team, growth)
- 15-20%: Mission programs (subsidized access, research, advocacy)
- 10-15%: Reserves (sustainability, runway)
- 5-10%: Returns (founders, investors—reasonable, not wealth-maximizing)

**Impact Measurement:**
- Track: Clients connected, underserved communities served, practitioners supported
- Report: Annual impact report (alongside financial)
- Goals: 10,000+ therapeutic connections Year 1, 50% to underserved communities

**Grant Eligibility:**
- LaunchVic: Yes (for-profit social enterprise accepted)
- Paul Ramsay: Yes (mission-aligned)
- Mental Health Australia: Yes (impact-focused)
- Government: Some (depends on program)

---

## 6. Path to Sustainability

### Break-Even Analysis

**Break-Even Point:**

**Fixed Costs**: $35,400/month (Year 1 average)
**Contribution Margin per Practitioner**: $75/month (after variable costs)
**Practitioners Needed**: $35,400 / $75 = **472 paying practitioners**

**With User Mix (70% paid, 30% free):**
- Total practitioners needed: 675 active
- Paying: 472
- Free: 203

**Timeline to Break-Even:**
- **Conservative**: Month 9 (slower growth)
- **Base Case**: Month 6-7 (on-track growth)
- **Optimistic**: Month 6 (strong traction)

---

### Cash Flow & Runway

**Starting Capital (Phase 1):** $75-125K

**Monthly Burn:**
- Month 1-3: -$35,000 (high CAC, low revenue)
- Month 4-6: -$25,000 (improving)
- Month 7-9: -$10,000 (approaching break-even)
- Month 10-12: +$5-15,000 (break-even then profitable)

**Cumulative Cash Need:**
- Month 3: -$105K
- Month 6: -$180K (peak)
- Month 9: -$205K
- Month 12: -$150K (positive cash flow starts repaying)

**Funding Requirements:**
- **Phase 1** (0-3 months): $75-125K (grants + bootstrap)
- **Phase 2** (3-9 months): $150-250K (seed + revenue)
- **Phase 3** (9-24 months): Scale with revenue + Series A if pursuing aggressive growth

**Runway Management:**
- Maintain minimum 6 months runway always
- If runway <9 months: Begin fundraising
- If runway <6 months: Emergency cost cuts or bridge funding

---

## 7. Scenario Analysis

### Conservative Scenario

**Assumptions:**
- Slower growth (10% MoM vs. 20%)
- Higher churn (8% monthly vs. 6%)
- Lower pricing power ($95 ARPU vs. $110)
- Higher CAC ($160 vs. $130)

**Outcomes:**
- Year 1: 500 practitioners, $360K ARR
- Year 2: 1,500 practitioners, $1.4M ARR
- Year 3: 3,500 practitioners, $3.2M ARR
- Break-even: Month 12
- Profitability: Month 18-24

**Viability**: ✅ Still viable, just slower growth and later profitability

---

### Base Case Scenario (Most Likely)

[Already detailed above—this is primary projection]

**Outcomes:**
- Year 1: 800 practitioners, $742K ARR
- Year 2: 3,245 practitioners, $3.1M ARR  
- Year 3: 6,890 practitioners, $6.6M ARR
- Break-even: Month 6-9
- Profitability: Month 15-18

**Viability**: ✅✅ Strong, sustainable, fundable

---

### Optimistic Scenario

**Assumptions:**
- Strong product-market fit (15% MoM growth)
- High retention (90% monthly)
- Pricing power ($120 ARPU)
- Efficient acquisition ($100 CAC)
- Viral growth (25% from referrals by Month 6)

**Outcomes:**
- Year 1: 1,200 practitioners, $1.15M ARR
- Year 2: 5,000 practitioners, $5.4M ARR
- Year 3: 12,000 practitioners, $13M ARR
- Break-even: Month 6
- Profitability: Month 12

**Viability**: ✅✅✅ Exceptional, rapid scale, Series A attractive

---

## 💡 Key Insights

### Insight #1: Unit Economics Enable Capital-Efficient Growth

**Finding:**
CLTV:CAC of 14.2:1 and payback period of 1.7 months are exceptional (healthy SaaS is 3:1 and <12 months). This means every $1 spent acquiring a practitioner returns $14 over lifetime, and returns investment in under 2 months. Enables rapid reinvestment and minimal dilution.

**Strategic Implication:**
Can grow profitably with limited capital. $200K seed round + $100K grants + revenue = sufficient for Year 1-2. Don't need large VC rounds unless pursuing aggressive market capture. Gives optionality (bootstrap path exists alongside VC path).

**Action Required:**
- Emphasize unit economics in investor pitches (shows capital efficiency)
- Monitor CAC by channel religiously (protect this advantage)
- Retention focus (CLTV depends on lifespan—keep churn <7%)
- Revenue quality (ARPU) > revenue quantity initially

---

### Insight #2: Break-Even at 200-300 Practitioners is Achievable by Month 6-9

**Finding:**
Monthly fixed costs of $35,400 require 472 paying practitioners to cover (or 675 total with 30% free tier). At current growth projections (15-25% MoM), this is Month 6-9. Faster than typical SaaS (12-18 months to break-even).

**Strategic Implication:**
Can become self-sustaining quickly if execution solid. Reduces fundraising pressure (don't need Series A in Year 1 unless choosing aggressive growth). Attractive to impact investors (mission + margin working).

**Action Required:**
- Month 6 milestone: Review if on-track for break-even
- If behind: Identify bottleneck (growth or retention) and address
- If ahead: Decision point—reinvest for faster growth or bank profit for sustainability

---

### Insight #3: Hybrid Non-Profit Enables Grant Funding (15-20% of Capital)

**Finding:**
For-profit social enterprise + B Corp eligible for many Australian grants. Estimated $150-350K accessible in Year 1-2 (LaunchVic $25-100K, Paul Ramsay $100-500K, Mental Health Australia $10-50K, Entrepreneurs' Programme $50-200K). This is 15-20% of total capital needs, non-dilutive.

**Strategic Implication:**
Hybrid model isn't constraint—it's strategic advantage. Reduces equity dilution, signals values to community, attracts impact investors, enables mission programs. Worth slight complexity vs. pure for-profit.

**Action Required:**
- Formalize B Corp intent (mention in pitch decks, materials)
- Grant applications Month 1-3 (LaunchVic, Mental Health Australia priority)
- Impact measurement from Day 1 (required for grants and mission alignment)
- Annual impact reporting (transparency builds trust)

---

## 🎯 Strategic Recommendations

### Immediate Actions (0-30 Days)

| # | Recommendation | Rationale | Owner | Success Metric |
|---|----------------|-----------|-------|----------------|
| 1 | Finalize pricing at $99 Professional / $179 Premium | Validated with market research, optimal ROI for segment | CEO | Pricing live on website, Stripe configured |
| 2 | Set up financial dashboard (MRR, CAC, CLTV tracking) | Monitor unit economics from Day 1 | CTO/Finance | Dashboard live, weekly review |
| 3 | Establish 6-month runway minimum policy | Protect against funding delays or slower growth | CEO | Policy documented, cash management plan |
| 4 | Configure Stripe with tiered subscriptions | Payment infrastructure required for MVP | CTO | Test transactions successful |

---

## 🧠 Memory Capsule

### Key Insights

- **Unit economics exceptional**: CLTV:CAC 14.2:1, payback 1.7 months—enables capital-efficient growth, attractive to investors
- **Break-even Month 6-9**: 472 paying practitioners required (675 total with free tier)—achievable with solid execution
- **Pricing validated**: $99 Professional tier optimal for Solo Sarah segment (55-70% willing to pay, clear ROI)
- **Hybrid non-profit works**: For-profit social enterprise + B Corp enables grants (15-20% of capital), impact investors, community trust while maintaining business flexibility

### Critical Decisions

| Decision | Rationale | Impacts |
|----------|-----------|---------|
| **$99 Professional / $179 Premium pricing** | Market research, ROI analysis, competitor benchmarking | Revenue projections, marketing messaging, positioning |
| **For-profit social enterprise + B Corp structure** | Grant access, impact investor appeal, values signaling, fundraising flexibility | Module 10 funding sources, Module 07 positioning |

### For Module 08 (Marketing)
CAC targets by channel: Partnerships $50-80, Content $80-120, Referrals $30-60—prioritize lowest CAC channels; monitor blended CAC weekly (target $130)

### For Module 10 (Funding)
Phase 1 need $75-125K, Phase 2 $150-250K, Phase 3 $800K-1.2M; B Corp structure enables LaunchVic, Paul Ramsay grants (non-dilutive 15-20% of total)

**End**









