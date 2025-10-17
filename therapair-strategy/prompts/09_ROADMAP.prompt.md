# Module 09 — Product & Execution Roadmap

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

Write a comprehensive product and execution roadmap covering MVP through scale phases with feature prioritization.

### Document Structure

1. **Executive Summary** (250-350 words)
2. **Table of Contents**
3. **Product Vision & Principles**
4. **Current State & Feature Inventory**
5. **Feature Prioritization Framework**
6. **Phase-Based Roadmap** (MVP → PMF → Growth → Scale)
7. **Technical Roadmap**
8. **Design & UX Evolution**
9. **Regulatory & Compliance Roadmap**
10. **Execution Planning & Resources**
11. **Decision Framework & Trade-Offs**
12. **Success Metrics by Phase**
13. **Key Insights & Memory Capsule**

### Content Requirements

#### 1. Product Vision & Principles (400-500 words)

**12-Month Product Vision:**

Where should the product be in 12 months?
- Capabilities and features
- User experience quality
- Technical sophistication
- Market position
- Scale (users, data, geography)

**24-Month Vision:**

Extended vision without lengthy projections

**Product Principles (5-7 Guiding Principles):**

**Principle 1: "Practitioner Value First"**
- **Description**: Features must benefit practitioners, not just look good
- **Decision Test**: "Does this help practitioners build their practice?"
- **Example**: Profile analytics over vanity metrics

**Principle 2: "Quality Over Quantity"**
- **Description**: Curated matches over high volume
- **Decision Test**: "Does this improve match quality or just increase volume?"
- **Example**: Better algorithm over more listings

**Principle 3: "Privacy by Design"**
- **Description**: Data protection isn't an afterthought
- **Decision Test**: "Have we considered privacy implications?"
- **Example**: Minimum data collection, clear consent

[Continue for all 5-7 principles]

---

#### 2. Current State & Feature Inventory (500-600 words)

**What Exists (MVP/Launch State):**

**Core Matching:**
- ✅ Client quiz (6 questions)
- ✅ Basic matching algorithm (rule-based)
- ✅ Practitioner profiles
- ✅ Search and filtering
- ~ Booking integration (basic)

**Platform Features:**
- ✅ User accounts and authentication
- ✅ Email notifications
- ✅ Mobile-responsive web
- ✅ Admin dashboard (basic)
- ❌ Mobile apps
- ❌ API for integrations

**Current Technical Debt:**
- [List known technical debt to address]

**Feature Backlog (Categorized):**

Organize by category:
1. Core Matching & Discovery
2. Practitioner Tools
3. Client Experience
4. Platform & Infrastructure
5. Business & Operations
6. Expansion & Innovation

---

#### 3. Feature Prioritization Framework (600-700 words)

**RICE Scoring:**
- **Reach**: How many users does this impact? (1-10 scale)
- **Impact**: How much does it improve their experience? (0.25-3.0)
- **Confidence**: How certain are we? (0.5-1.0)
- **Effort**: How much work is required? (person-weeks)
- **Score**: (Reach × Impact × Confidence) / Effort

**Feature Example:**

| Feature | Reach | Impact | Confidence | Effort | RICE Score |
|---------|-------|--------|------------|--------|------------|
| Enhanced algorithm | 10 | 3.0 | 0.8 | 8 weeks | 30.0 |
| Profile analytics | 9 | 2.0 | 1.0 | 3 weeks | 60.0 |
| Mobile app | 8 | 1.5 | 0.7 | 16 weeks | 5.25 |

**Must-Have vs. Nice-to-Have:**
- **Must-Have**: Core functionality, competitive parity, compliance
- **Should-Have**: Significant value, moderate effort
- **Nice-to-Have**: Incremental value, deprioritize

**Feature Prioritization Table (Top 20 Features):**

[Create comprehensive table with scoring for top backlog items]

---

#### 4. Phase-Based Roadmap (2000-2500 words)

This is the core section—be extremely detailed.

---

### **Phase 1: MVP & Launch (Days 0-30)**

**Objective**: Validate core value proposition, get first paying customers

**Must-Have Features:**

**Core Functionality:**
- [ ] Complete practitioner profile creation flow
- [ ] Practitioner verification system (AHPRA check)
- [ ] Client matching quiz (5-10 questions)
- [ ] Matching algorithm v1.0 (rule-based, weighted)
- [ ] Search and filter (location, specialty, identity)
- [ ] Booking/contact integration
- [ ] Email notifications (match alerts, admin)

**Platform Essentials:**
- [ ] User authentication (practitioners + clients)
- [ ] Payment integration (Stripe)
- [ ] Mobile-responsive web (not apps)
- [ ] Basic admin dashboard
- [ ] Analytics tracking (Mixpanel or similar)
- [ ] Privacy policy and T&Cs live

**Nice-to-Have (If Time Allows):**
- [ ] Practitioner profile previews
- [ ] Basic practitioner analytics (views)
- [ ] Save/favorite functionality

**Success Criteria (30 Days):**
- [ ] MVP deployed to production
- [ ] 20-50 verified practitioners live
- [ ] First paying subscribers (even if discounted)
- [ ] Matching flow working end-to-end
- [ ] No critical bugs or security issues
- [ ] 99%+ uptime

**Technical Priorities:**
- Stability over features
- Security and privacy first
- Performance acceptable (not perfect)
- Manual operations acceptable

---

### **Phase 2: Product-Market Fit (Months 1-6)**

**Objective**: Refine based on real usage, improve retention, achieve PMF signals

**Priorities (Months 1-3):**

**Algorithm Improvements:**
- [ ] Machine learning matching v2.0
- [ ] Learning from successful matches
- [ ] Personalization based on user behavior
- [ ] A/B testing framework

**Onboarding & Activation:**
- [ ] Streamlined profile creation (reduce friction)
- [ ] Guided onboarding flow
- [ ] First-match guarantee program
- [ ] Onboarding analytics and optimization

**Practitioner Tools:**
- [ ] Enhanced analytics dashboard
  - Profile views over time
  - Inquiry sources and quality
  - Match success rates
  - Conversion funnel
- [ ] Inquiry management (basic CRM)
- [ ] Profile optimization tips
- [ ] Availability calendar integration

**Client Experience:**
- [ ] Improved search and filtering
- [ ] Practitioner comparison tool
- [ ] Reviews and ratings system (ethical design)
- [ ] Saved searches and shortlists
- [ ] Anonymous pre-contact questions

**Priorities (Months 3-6):**

**Mobile App (If Web Traction Proven):**
- [ ] iOS app (React Native)
- [ ] Android app (React Native)
- [ ] Push notifications
- [ ] App-specific features

**Integration Ecosystem:**
- [ ] Practice management integration (Cliniko, Halaxy)
- [ ] Calendar sync (Google, Outlook)
- [ ] Telehealth platform links (Coviu, Zoom)
- [ ] Website widget for practitioners

**Community & Reputation:**
- [ ] Practitioner verification badges
- [ ] Specialization endorsements
- [ ] Professional body affiliations
- [ ] Content contributions (blogs, resources)

**Success Criteria (6 Months):**
- [ ] 200+ active practitioners
- [ ] 70%+ retention at 3 months
- [ ] NPS >40 (practitioners)
- [ ] Measurable improvement in match quality
- [ ] 10-15% of new signups from referrals
- [ ] Clear PMF signals (qualitative + quantitative)

---

### **Phase 3: Growth Features (Months 6-12)**

**Objective**: Scale, differentiate, expand value, go national

**Advanced Matching:**
- [ ] Cultural and linguistic matching refinement
- [ ] Trauma-informed care indicators
- [ ] Neurodiversity-specific matching
- [ ] Therapeutic modality depth
- [ ] Therapist personality/approach matching

**Practitioner Growth Tools:**
- [ ] Marketing assets (shareable profile links, widgets)
- [ ] Email signature badges
- [ ] Social media integration
- [ ] Referral program dashboard
- [ ] Premium support tier

**Group Practice Features:**
- [ ] Multi-practitioner management
- [ ] Team profiles and bios
- [ ] Centralized billing
- [ ] Practice-level analytics
- [ ] Practitioner assignment rules

**B2B2C Foundations:**
- [ ] Organization accounts (EAPs, universities)
- [ ] White-label options
- [ ] Custom branding
- [ ] Bulk user management
- [ ] Reporting and insights

**API & Ecosystem:**
- [ ] Public API (v1.0)
- [ ] Developer documentation
- [ ] Webhook support
- [ ] Partner integrations

**Success Criteria (12 Months):**
- [ ] 1,000+ active practitioners
- [ ] National presence (all major cities)
- [ ] Strong word-of-mouth growth (>20% referrals)
- [ ] Clear competitive differentiation
- [ ] Path to profitability visible
- [ ] 1-2 major partnerships launched

---

### **Phase 4: Platform Maturity (Months 12-24)**

**Objective**: Become indispensable, expand scope, prepare for scale

**AI/ML Sophistication:**
- [ ] Predictive matching (before client starts quiz)
- [ ] Natural language processing (profile analysis)
- [ ] Outcome prediction models
- [ ] Automated quality scoring

**Marketplace & Ecosystem:**
- [ ] Continuing education marketplace
- [ ] Resource library (worksheets, tools)
- [ ] Peer consultation platform
- [ ] Practitioner community forums

**Adjacent Features:**
- [ ] Supervisor-supervisee relationships
- [ ] Peer consultation matching
- [ ] Professional development tracking
- [ ] Career resources for emerging practitioners

**International Expansion Groundwork:**
- [ ] Multi-currency support
- [ ] Localization framework
- [ ] Regional compliance (NZ, UK preparation)
- [ ] International payment options

**Enterprise/Scale Features:**
- [ ] Advanced B2B2C features
- [ ] Custom workflows
- [ ] Enterprise security (SSO, audit logs)
- [ ] SLA and uptime guarantees

**Success Criteria (24 Months):**
- [ ] Market leadership position
- [ ] High switching costs (platform stickiness)
- [ ] Diversified revenue streams
- [ ] Strong brand recognition
- [ ] 3,000-5,000 practitioners
- [ ] Profitability achieved or clear path

---

#### 5. Technical Roadmap (600-700 words)

**Infrastructure Evolution:**
- **Current**: Vercel (frontend), Railway/AWS (backend)
- **Month 6**: Scale to 10x users
- **Month 12**: Enterprise-grade reliability
- **Monitoring & observability**: Datadog, Sentry

**Performance Optimizations:**
- Algorithm speed (sub-second response)
- Database query optimization
- Caching strategy (Redis)
- CDN for global performance

**Security Enhancements:**
- Penetration testing (Month 6, Month 12)
- Bug bounty program (Month 12)
- ISO 27001 preparation (Year 2)
- SOC 2 Type II consideration (Year 2)

**Technical Debt Management:**
- Monthly tech debt sprint (20% capacity)
- Refactoring priorities by impact
- Code quality metrics
- Automated testing coverage >80%

---

#### 6. Regulatory & Compliance Roadmap (400-500 words)

**Compliance Milestones:**

**Month 1 (MVP Launch):**
- [ ] Privacy Act 1988 compliant
- [ ] Privacy policy live and accessible
- [ ] AHPRA verification process operational
- [ ] Terms of service enforceable
- [ ] WCAG 2.1 AA compliance (web)

**Month 3:**
- [ ] Notifiable Data Breaches scheme ready
- [ ] Incident response plan documented
- [ ] Data breach insurance considered
- [ ] Accessibility audit completed

**Month 6:**
- [ ] Professional body partnership compliance review
- [ ] Marketing compliance (AHPRA advertising guidelines)
- [ ] Consumer protection law alignment verified

**Month 12:**
- [ ] ISO 27001 preparation begins
- [ ] Annual security audit
- [ ] Privacy policy update (based on learnings)

---

#### 7. Execution Planning & Resources (600-700 words)

**Team Structure & Hiring:**

**Current (MVP):**
- Founder(s): Strategy, product, ops
- Developer(s): Full-stack (1-2)
- Contractor: Design, marketing

**Month 1-3 Hires:**
- Full-stack developer: +1 FTE
- Customer success: 0.5-1 FTE
- Marketing/growth: 0.5 FTE (contract)

**Month 3-6 Hires:**
- Product manager: 1 FTE
- Developer: +1 FTE
- Customer success: +0.5 FTE

**Month 6-12 Hires:**
- Developers: +2 FTE
- Marketing: 1 FTE (full-time)
- Operations: 1 FTE

**Agile Process:**
- Sprint length: 1-2 weeks
- Sprint planning: Mondays
- Daily standup: Async (remote team)
- Sprint review: End of sprint
- Retrospective: Monthly

**Decision Framework:**

**When to Say Yes to a Feature:**
1. Aligns with product principles
2. Validated user need (not just requested)
3. RICE score >20
4. Differentiated vs. competitors
5. Can be done well with available resources

**When to Say No:**
- Dilutes focus from core value prop
- "Nice-to-have" without strong impact
- Benefits few users (<10%)
- Overly complex for the value
- Can be solved with partners/integrations

---

### Analysis Depth

- **Total Length**: 3500-4000 words
- **Executive Summary**: 250-350 words
- **Detailed phases**: MVP, PMF, Growth, Scale
- **Specific features**: Not vague categories
- **Realistic timelines**: Based on resources

---

## Output Requirements

- Save to `../outputs/09_ROADMAP.md`
- Save memory capsule to `../outputs/09_ROADMAP.memory.md`
- Phase-based roadmap with specific features
- Prioritization framework with examples
- Timeline (30d, 3mo, 6mo, 12mo, 24mo)
- Team and resource planning
- Australian English throughout

---

## Key Questions to Answer

1. **What are the top 5 features for the next 12 months?**
2. **When do we expect to achieve product-market fit?**
3. **What's the MVP scope for 30-day launch?**
4. **How do we balance innovation with stability?**
5. **What's the biggest product risk?**
6. **When do we build mobile apps?**
7. **What features differentiate us long-term?**

---

## Success Criteria

- ✅ Clear MVP scope (30 days)
- ✅ Realistic feature timelines
- ✅ Prioritization framework applied
- ✅ Phase success criteria defined
- ✅ Technical roadmap included
- ✅ Resource/hiring plan
- ✅ Decision framework for feature trade-offs

---

**End of Prompt**
