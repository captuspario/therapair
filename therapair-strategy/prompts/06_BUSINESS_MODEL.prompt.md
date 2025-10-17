# Module 06 — Business & Revenue Model Architecture

Follow the master protocol in `00_MASTER_PROTOCOL.md`.

---

## Context

- **Project**: Therapair (AI-driven therapist-matching SaaS)
- **Model**: Hybrid non-profit + subscription/commission
- **Focus**: Fast-track execution (30 days MVP → 3 months paying customers → 12-24 months scale)
- **Geography**: Australia → Global scale
- **Use inputs**: `../inputs/CONTEXT_THERAPAIR.md`, `../inputs/ASSUMPTIONS.md`, and previous module memory files

---

## Deliverable

Write a comprehensive business model analysis using Business Model Canvas and financial modeling to validate sustainability.

### Document Structure

1. **Executive Summary** (250-350 words)
2. **Table of Contents**
3. **Business Model Canvas** (All 9 blocks detailed)
4. **Revenue Model & Pricing Strategy**
5. **Cost Structure & Unit Economics**
6. **Financial Projections** (3-year model)
7. **Hybrid Non-Profit Model Architecture**
8. **Path to Sustainability & Break-Even**
9. **Alternative Models & Scenarios**
10. **Key Insights & Memory Capsule**

### Content Requirements

#### 1. Business Model Canvas (1800-2200 words)

Complete all nine building blocks in detail:

---

### **1. Customer Segments**

**Primary Segment: Solo Private Practice Therapists**
- Size: [Number in Australia]
- Sub-segments: Early career, established, specialists
- Needs: Consistent referrals, time savings, professional credibility
- Willingness to Pay: $79-149/month
- Priority: #1 for launch

**Secondary Segment: Group Practice Owners**
- Size: [Number]
- Needs: Multiple practitioner management, quality control, efficiency
- Willingness to Pay: $199-399/month (multi-seat)
- Priority: Months 6-12

**Future Segments:**
- Organisations (EAPs, universities): B2B2C model
- International markets: Year 2+
- Adjacent health practitioners: Year 2+

**Multi-Sided Platform Dynamics:**
- Practitioners (paying customers)
- Clients (users driving practitioner value)
- Balance and interdependence
- Network effects model

---

### **2. Value Propositions**

**For Solo Practitioners:**

**Functional Value:**
- Consistent, quality client referrals (3-5/week target)
- Time savings (5-10 hours/week on marketing)
- Professional profile showcasing expertise
- Practice analytics and insights
- Verification and credibility boost

**Emotional Value:**
- Confidence in practice sustainability
- Pride in professional online presence
- Reduced anxiety about "where next client comes from"
- Satisfaction working with well-matched clients

**Social Value:**
- Professional credibility
- Part of inclusive, values-aligned community
- Recommended by trusted professional bodies

**Economic Value:**
- Increased income from fuller practice
- Reduced marketing costs
- Better client retention (good matches)
- ROI: [Calculate expected return]

**For Clients:**

**Functional Value:**
- Find right therapist in <30 minutes
- Intelligent matching vs. overwhelming choice
- Clear therapist profiles and specializations
- Easy booking and contact

**Emotional Value:**
- Confidence in match quality
- Reduced anxiety about therapy-seeking
- Feel understood in search process
- Empowered decision-making

---

### **3. Channels**

**Awareness Channels (How they discover Therapair):**
- SEO and content marketing (blog, resources)
- Professional body partnerships (PACFA, ACA, APS)
- Social media (LinkedIn, Instagram for practitioners)
- Peer recommendations and word-of-mouth
- PR and media coverage
- Events and conferences

**Evaluation Channels (How they assess fit):**
- Website (practitioner info, testimonials, case studies)
- Free resources and guides
- Webinars or demos
- Trial or freemium tier
- Comparison with alternatives

**Purchase Channels (How they sign up/pay):**
- Website signup flow
- Stripe payment integration
- Sales calls for groups/organisations
- Partner referral links

**Delivery Channels (How they receive value):**
- Web application (desktop and mobile)
- Mobile apps (future)
- Email notifications
- Dashboard and analytics
- Support (email, chat)

**After-Sales Channels (Retention and expansion):**
- Email nurture sequences
- Product updates and feature launches
- Community (forum, events)
- Customer success outreach
- Upsell and cross-sell prompts

**Channel Strategy by Phase:**
- **MVP**: Focus on partnerships, content, direct outreach
- **Growth**: Scale SEO, referrals, add selective paid
- **Scale**: Full channel mix optimized

---

### **4. Customer Relationships**

**Acquisition Relationships:**
- **Marketing-Driven**: Content, SEO, partnerships (low-touch)
- **Sales-Assisted**: For groups and organisations (high-touch)
- **Partner-Driven**: Professional body referrals (warm intros)

**Onboarding Relationships:**
- **Self-Service**: For solo practitioners (guided, clear)
- **High-Touch**: For early adopters and VIPs (personalized)
- **Automated**: Email sequences, in-app tutorials, videos

**Ongoing Relationships:**
- **Community-Based**: Peer support, forums, events
- **Customer Success**: Proactive check-ins for at-risk accounts
- **Self-Service Support**: Knowledge base, FAQs, chatbot
- **Premium Support**: Priority for higher tiers

**Retention & Expansion:**
- **Regular Value Delivery**: Weekly match notifications, insights
- **Feedback Loops**: Surveys, feature requests, interviews
- **Upsell Prompts**: Usage-based (when tier limits reached)
- **Win-Back**: For churned users (special offers, improvements)

**Relationship Type by Segment:**

| Segment | Acquisition | Onboarding | Ongoing | Retention |
|---------|------------|------------|---------|-----------|
| Solo (Early) | Partner/Content | High-touch | Community + Self-service | Success calls |
| Solo (Established) | Content/Referral | Self-service | Self-service | Automated |
| Groups | Sales-assisted | High-touch | Success mgmt | Dedicated account |

---

### **5. Revenue Streams**

**Primary Revenue: Practitioner Subscriptions (70-80% of total)**

**Pricing Tiers:**

| Tier | Price (Monthly) | Price (Annual) | Target Segment | Features |
|------|-----------------|----------------|----------------|----------|
| **Free** | $0 | $0 | Testing/emerging | Basic profile, limited visibility |
| **Professional** | $99 | $950 (20% off) | Solo practitioners | Full features, priority matching |
| **Premium** | $179 | $1,720 (20% off) | Established/specialists | Featured placement, advanced analytics |
| **Practice** | $349 | $3,350 (20% off) | Group practices (3-5 seats) | Multi-practitioner management |

**Pricing Rationale:**
- Professional tier affordable for early-career ($99/month = 1-2 client sessions)
- Premium tier for those wanting competitive advantage
- Annual discount drives commitment and cash flow
- Free tier for market penetration and low-risk trial

**Revenue Projections (Subscriptions):**

| Cohort | Month 3 | Month 6 | Month 12 | Month 24 |
|--------|---------|---------|----------|----------|
| Free | 50 | 150 | 400 | 800 |
| Professional | 20 | 80 | 250 | 800 |
| Premium | 5 | 20 | 80 | 300 |
| Practice | 0 | 3 | 15 | 60 |
| **MRR** | **$2,370** | **$10,210** | **$34,860** | **$126,660** |
| **ARR** | **$28,440** | **$122,520** | **$418,320** | **$1,519,920** |

**Secondary Revenue: Match Commissions (10-15% of total)**

- Optional 5-10% commission on successful first appointment
- Only charged if practitioner opts in
- Ethical rate (vs. BetterHelp 20-30%+)
- Not primary model (avoids extraction dynamics)

**Tertiary Revenue: B2B2C Partnerships (5-10% of total)**

- EAPs, universities, clinics: Custom pricing
- White-label or integration fees
- Per-employee/per-student licensing
- Launch: Year 2

**Other Potential Revenue (Future):**
- Premium listings or featured placements
- Therapist resources or training (marketplace)
- Anonymized data insights (aggregate only, ethical)
- API access for partners

---

### **6. Key Resources**

**Intellectual Assets:**
- Matching algorithm and AI (proprietary)
- Brand and positioning ("most inclusive")
- Practitioner and client data (privacy-protected)
- Content library and resources
- Relationships with professional bodies

**Human Resources:**
- Founders/leadership (domain expertise)
- Development team (product quality)
- Customer success (retention)
- Marketing/growth (acquisition)
- Advisory board (credibility, guidance)

**Physical Resources:**
- Office space (minimal, remote-first)
- Hardware/equipment (laptops, etc.)

**Financial Resources:**
- Initial funding (grants, investment, revenue)
- Cash reserves (6-month runway minimum)
- Credit lines (if needed)

**Technology Resources:**
- Cloud infrastructure (AWS, Vercel)
- Software tools (Stripe, SendGrid, analytics)
- Development environment

---

### **7. Key Activities**

**Product Development & Maintenance:**
- Feature development (roadmap execution)
- Algorithm improvement (ML training)
- UX optimization (A/B testing)
- Bug fixes and performance
- Security and compliance

**Customer Acquisition:**
- Marketing campaigns
- Content creation
- Partnership development
- Sales (for groups/orgs)
- Community building

**Customer Success & Retention:**
- Onboarding new practitioners
- Proactive support and check-ins
- Churn prevention
- Feedback collection and analysis
- Product education

**Platform Operations:**
- Practitioner verification
- Quality assurance and moderation
- Customer support (email, chat)
- Analytics and reporting
- Infrastructure monitoring

**Strategic Activities:**
- Fundraising and grant applications
- Partnership negotiations
- Market research and validation
- Team hiring and development
- Compliance and legal

---

### **8. Key Partnerships**

**Essential Partnerships (Must-Have):**

**1. Professional Bodies (PACFA, ACA, APS)**
- **What They Provide**: Credibility, member access, verification support
- **What We Provide**: Member benefit, referral fees, co-marketing
- **Strategic Rationale**: Trust and distribution

**2. Payment Processor (Stripe)**
- **What They Provide**: Payment infrastructure, compliance
- **What We Provide**: Transaction volume, fees
- **Strategic Rationale**: Core functionality

**3. Cloud Infrastructure (AWS/Vercel)**
- **What They Provide**: Hosting, scalability, reliability
- **What We Provide**: Revenue, usage
- **Strategic Rationale**: Technical foundation

**Strategic Partnerships (High-Value):**

**4. Practice Management Software (Cliniko, Halaxy, Power Diary)**
- **What They Provide**: Integration, existing user base
- **What We Provide**: Enhanced functionality, referral fees
- **Strategic Rationale**: Embedded distribution, reduce friction

**5. Telehealth Platforms (Coviu, Zoom Healthcare)**
- **What They Provide**: Session technology, integration
- **What We Provide**: User base, referrals
- **Strategic Rationale**: Complete the value chain

**6. Universities & Training Programs**
- **What They Provide**: Access to emerging practitioners
- **What We Provide**: Graduate support, career resources
- **Strategic Rationale**: Early relationship building

**Future Partnerships:**
- EAPs and corporate wellness providers
- Health insurers (for credentialing, possibly)
- Research institutions (for validation studies)
- Government mental health initiatives

**Partnership Priorities:**
- **Month 1-3**: Professional bodies (critical)
- **Month 3-6**: Practice management integrations
- **Month 6-12**: Universities, EAPs
- **Year 2**: Insurance, government programs

---

### **9. Cost Structure**

**Fixed Costs (Monthly):**

| Category | Year 1 | Year 2 | Year 3 |
|----------|--------|--------|--------|
| Salaries & Payroll | $15,000 | $35,000 | $60,000 |
| Software & Tools | $1,500 | $2,500 | $4,000 |
| Infrastructure (base) | $500 | $1,000 | $2,000 |
| Office / Operations | $500 | $1,000 | $2,000 |
| Legal & Accounting | $1,000 | $1,500 | $2,500 |
| **Total Fixed** | **$18,500** | **$41,000** | **$70,500** |

**Variable Costs:**

| Category | % of Revenue | Year 1 | Year 2 | Year 3 |
|----------|--------------|--------|--------|--------|
| Marketing & CAC | 30-40% | $10,000 | $40,000 | $80,000 |
| Infrastructure (usage) | 5-8% | $1,500 | $8,000 | $20,000 |
| Payment Processing | 3-4% | $850 | $4,900 | $18,000 |
| Customer Support | 8-10% | $2,000 | $10,000 | $30,000 |
| **Total Variable** | **~50%** | **$14,350** | **$62,900** | **$148,000** |

**Total Operating Costs:**
- Year 1: ~$32,850/month average = $394,200 annually
- Year 2: ~$103,900/month average = $1,246,800 annually  
- Year 3: ~$218,500/month average = $2,622,000 annually

**Cost Structure Philosophy:**
- **Lean Operations**: Keep fixed costs low initially
- **Variable-Heavy**: Scale costs with revenue
- **Efficiency Focus**: CAC payback <6 months target
- **Strategic Investment**: Willing to invest in growth when ROI clear

**Cost Drivers:**
- **Salaries** (largest): Quality team essential
- **Marketing**: Efficient acquisition critical
- **Infrastructure**: Scales with users but manageable
- **Support**: Quality support drives retention

---

#### 2. Revenue Model & Pricing Strategy (600-700 words)

**Pricing Philosophy:**
- Value-based (charge for value delivered)
- Accessible (affordable for early-career)
- Fair (not extractive or exploitative)
- Transparent (no hidden fees)
- Scalable (tiers grow with practitioner success)

**Free Tier Strategy:**
- **Purpose**: Market penetration, reduce barriers, viral growth
- **Limitations**: Basic profile, lower priority, limited analytics
- **Conversion Goal**: 15-25% upgrade to paid within 6 months
- **Risk Mitigation**: Monitor free-to-paid ratio, adjust limits

**Pricing Research & Validation:**
- Competitor analysis (Psychology Today: $30-40/month basic)
- Willingness-to-pay surveys (100+ practitioners)
- Value perception testing
- ROI calculation for practitioners

**Pricing by Market Segment:**

| Segment | Pain Level | Value Perception | WTP | Recommended Tier |
|---------|------------|------------------|-----|------------------|
| Early Career | Very High | High | $50-100 | Professional $99 |
| Established | Medium | Medium-High | $100-200 | Professional or Premium |
| Specialists | High | Very High | $150-250 | Premium $179 |
| Groups | Medium | High | $300-500 | Practice $349 (3-5 seats) |

**International Pricing (Future):**
- Purchasing power parity adjustments
- Local competitor benchmarking
- Currency considerations

---

#### 3. Unit Economics & Financial Viability (600-700 words)

**Customer Acquisition Cost (CAC):**
- **Target**: <$150 per practitioner (Year 1)
- **Channel Breakdown**:
  - Partnerships: $50-80 (lowest)
  - Content/SEO: $80-120 (efficient long-term)
  - Referrals: $30-60 (lowest, but need scale)
  - Paid ads: $150-250 (test carefully)
- **Blended CAC**: $100-130 (once efficient)

**Customer Lifetime Value (CLTV):**
- **Assumptions**:
  - Average revenue: $110/month (mix of tiers)
  - Average lifespan: 24 months (conservative)
  - Gross margin: 70% (SaaS typical)
- **Calculation**: $110/month × 24 months × 70% = **$1,848 CLTV**

**CLTV:CAC Ratio:**
- **Target**: >3:1 (healthy SaaS)
- **Expected**: $1,848 / $130 = **14.2:1** (excellent if achieved)
- **Conservative**: $1,848 / $200 = **9.2:1** (still very good)

**Payback Period:**
- **Target**: <6 months
- **Calculation**: $130 CAC / ($110/month × 70% margin) = **1.7 months** (excellent)
- **Conservative**: $200 / $77 = **2.6 months** (still great)

**Churn Rate:**
- **Assumption**: 5-7% monthly churn (8-10% early, improving)
- **Benchmark**: SaaS average ~5-7%
- **Mitigation**: High-touch onboarding, success management

**Monthly Recurring Revenue (MRR) Growth:**
- **Target**: 15-25% month-over-month (early stage)
- **Drivers**: New signups + upsells - churn
- **Sustainability**: 10-15% as market matures

**Contribution Margin:**
- Revenue per practitioner: $110/month
- Variable costs: ~$35/month (support, infrastructure, payment)
- Contribution margin: **$75/month** (68%)
- Goes to: Fixed costs, growth investment, profit

---

#### 4. Financial Projections (3-Year Model) (400-500 words + tables)

Include detailed tables in output showing:
- Monthly projections for Year 1
- Quarterly for Years 2-3
- Revenue by tier
- Cost breakdown
- Cash flow
- Break-even analysis

[Detailed model in output]

---

#### 5. Hybrid Non-Profit Model Architecture (500-600 words)

**Legal Structure Options:**
- For-profit social enterprise with B Corp certification
- Company limited by guarantee with commercial arm  
- For-profit with mission lock / charitable trust

**Mission + Margin Integration:**
- How profit serves mission
- Stakeholder vs. shareholder primacy
- Impact measurement alongside financial

**Grant Eligibility:**
- Which structure optimizes grant access
- Trade-offs in flexibility vs. funding

**Investor Compatibility:**
- Impact investors and alignment
- Return expectations
- Exit considerations

---

### Analysis Depth

- **Total Length**: 3500-4000 words
- **Executive Summary**: 250-350 words
- **Financial rigor**: Detailed projections
- **Evidence-based**: Benchmarks and research
- **Honest assessment**: Risks acknowledged

---

## Output Requirements

- Save to `../outputs/06_BUSINESS_MODEL.md`
- Save memory capsule to `../outputs/06_BUSINESS_MODEL.memory.md`
- Complete Business Model Canvas
- Detailed financial model (3-year)
- Unit economics validated
- Australian English throughout

---

## Key Questions to Answer

1. **Is this business model sustainable?**
2. **What are the key assumptions and risks?**
3. **How quickly can we reach break-even?**
4. **Are unit economics viable?**
5. **Does hybrid non-profit model work financially?**
6. **What's the path to profitability?**

---

## Success Criteria

- ✅ Comprehensive Business Model Canvas
- ✅ Validated pricing strategy
- ✅ Strong unit economics (CLTV:CAC >3:1)
- ✅ Clear financial projections
- ✅ Path to sustainability demonstrated
- ✅ Hybrid model architecture defined
- ✅ Risks and assumptions explicit

---

**End of Prompt**
