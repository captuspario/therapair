# 09: Product & Execution Roadmap

**Module**: 09 - Product & Execution Roadmap  
**Version**: 1.0  
**Date**: 2025-10-13  
**Status**: Draft  
**Word Count**: ~3,900

---

## 📋 Executive Summary

Therapair's product roadmap delivers intelligent matching platform in four phases: MVP (Days 0-30), PMF Validation (Months 1-9), Growth (Months 9-18), and Scale (Months 18-24). The 30-day MVP scope is ruthlessly focused on core value proposition: practitioner signup/profile, AHPRA verification, client matching quiz, algorithm v1.0 (rule-based weighted scoring), search/filter, basic booking/contact, and payment (Stripe). Nice-to-have features (analytics dashboard, reviews, mobile apps) deferred to post-MVP.

Feature prioritization uses RICE scoring (Reach × Impact × Confidence / Effort) with top priorities being: Enhanced matching algorithm v2.0 (ML-powered, RICE score 45), Practitioner analytics dashboard (RICE 60), Referral program infrastructure (RICE 55), and Mobile apps (RICE 15—lower due to high effort, Month 6+ only if web traction validates). Product principles guide decisions: (1) Practitioner value first, (2) Quality over quantity, (3) Privacy by design, (4) Mobile-first, (5) Ethical AI.

Technical roadmap addresses infrastructure evolution (current: Vercel + Railway/AWS sufficient for 1,000 users; Month 6: scale to 10K with load balancing and caching; Month 12: enterprise reliability with monitoring and redundancy), algorithm improvement (MVP: rule-based; Month 3: weighted ML; Month 6: continuous learning; Month 12: predictive matching), and security enhancements (Month 1: penetration test, Month 6: bug bounty, Month 12: SOC 2 Type II preparation).

Execution planning defines sprint methodology (2-week sprints, daily async standups, weekly reviews, monthly retrospectives), team hiring sequence (Month 1-3: +1 developer, +0.5 customer success; Month 3-6: +1 product manager, +1 developer; Month 6-12: +2 developers, +1 marketing, +1 ops), and decision framework (say yes if: aligns with principles, validated user need, RICE >20, differentiated, can be done well). Success metrics by phase: MVP (20-30 practitioners, stable platform, first matches), PMF (200-500 practitioners, 70% retention, NPS >40), Growth (800-1,200 practitioners, referrals >15%, CAC <$120), Scale (3,000-5,000 practitioners, profitability, market leadership).

### Key Takeaways

- **30-Day MVP Scope Defined**: Core features only (signup, profile, quiz, algorithm v1.0, search, book, pay)—no analytics, reviews, or mobile apps until post-MVP
- **Feature Prioritization Clear**: Algorithm v2.0, analytics, referral infrastructure top priorities Month 1-6; mobile apps Month 6-12 only if validated
- **Technical Debt Acceptable at MVP**: 80% quality, manual processes OK, iterate in production—speed > perfection initially
- **Team Hiring Sequence**: +1 dev Month 1, +product manager Month 3, +2 devs + marketing + ops Month 6-12—phased based on growth
- **Success Metrics by Phase**: MVP = stability + first matches, PMF = retention + NPS, Growth = referrals + efficiency, Scale = leadership + profitability

---

## 📑 Table of Contents

[Sections 1-12...]

---

## KEY SECTIONS

### 30-Day MVP Scope (CRITICAL)

**MUST-HAVE (Core Value Proposition):**

- [ ] Practitioner signup and profile creation (20-30 min flow)
- [ ] AHPRA verification system (manual Month 1, automated Month 3)
- [ ] Client matching quiz (6-8 questions, 5-10 mins)
- [ ] Matching algorithm v1.0 (rule-based, weighted scoring, 20+ factors)
- [ ] Search and filter (location, specialty, identity, availability)
- [ ] Booking/contact integration (form submission + email notification)
- [ ] Payment (Stripe subscriptions: Free, Professional $99, Premium $179)
- [ ] User authentication (practitioners + clients, secure)
- [ ] Mobile-responsive web (not native apps, but fully functional on mobile)
- [ ] Email notifications (match alerts, admin notifications)
- [ ] Privacy policy and T&Cs (legally compliant)
- [ ] Basic admin dashboard (practitioner verification, user management)

**Total Estimated Effort**: 200-250 hours (2-3 developers × 30 days = achievable)

**NICE-TO-HAVE (Defer to Month 2+):**
- ~~Advanced analytics dashboard~~ → Month 2-3
- ~~Review/rating system~~ → Month 3-6
- ~~Practitioner marketing tools~~ → Month 6+
- ~~Mobile apps (iOS/Android)~~ → Month 6-12
- ~~API for integrations~~ → Month 6+
- ~~Community features~~ → Month 6+

**30-Day Sprint Timeline:**

- **Week 1**: Core signup + profile flows, database schema, auth
- **Week 2**: Matching quiz, algorithm v1.0, search/filter
- **Week 3**: Booking, payment (Stripe), email notifications
- **Week 4**: Testing, security audit, deployment, verification process setup

**Go/No-Go Criteria (Day 30):**
- [ ] All MUST-HAVE features functional
- [ ] Zero P0/P1 bugs (critical or high-severity)
- [ ] Security audit passed
- [ ] Can onboard real practitioners
- [ ] Can process real payments
- [ ] Mobile-responsive (tested on iOS + Android)

---

### Feature Prioritization (RICE Scoring Top 20)

| Feature | Reach (1-10) | Impact (0.25-3) | Confidence (0.5-1) | Effort (weeks) | RICE Score | Priority |
|---------|--------------|-----------------|-------------------|----------------|------------|----------|
| **Enhanced Algorithm v2.0 (ML)** | 10 | 3.0 | 0.8 | 6 | **40.0** | #1 |
| **Practitioner Analytics Dashboard** | 9 | 2.5 | 1.0 | 4 | **56.3** | #1 |
| **Referral Program Infrastructure** | 8 | 2.5 | 0.9 | 3 | **60.0** | #2 |
| **First-Match Guarantee Program** | 9 | 2.0 | 0.7 | 1 | **126.0** | #2 |
| **Profile Optimization Tips (AI)** | 8 | 1.5 | 0.8 | 2 | **48.0** | #3 |
| **Review & Rating System** | 7 | 2.0 | 0.8 | 4 | **28.0** | #4 |
| **Calendar Integration (Google/Outlook)** | 7 | 1.5 | 0.9 | 3 | **31.5** | #4 |
| **Saved Searches/Shortlists (Client)** | 6 | 1.5 | 1.0 | 2 | **45.0** | #5 |
| **Mobile Apps (iOS/Android)** | 8 | 2.0 | 0.7 | 16 | **7.0** | #8 |
| **Practice Management Integration API** | 6 | 2.5 | 0.8 | 8 | **15.0** | #6 |

**Insights:**
- Quick wins (high RICE, low effort): First-match guarantee, profile tips, referral program
- High impact, moderate effort: Analytics, algorithm v2.0—prioritize Month 1-3
- High effort, lower priority: Mobile apps, integrations—defer to Month 6-12

---

## Phase-Based Roadmap Detail

### Phase 1: MVP & Launch (Days 0-30)

**Success Criteria:**
- [ ] MVP deployed to production (Day 30)
- [ ] 20-30 beta practitioners onboarded
- [ ] First 10+ successful matches completed
- [ ] No critical bugs or security issues
- [ ] Payment processing functional
- [ ] 99%+ uptime

---

### Phase 2: Product-Market Fit (Months 1-9)

**Month 1-3 Priorities:**
- [ ] Enhanced matching algorithm v2.0 (ML-powered)
- [ ] Practitioner analytics dashboard
- [ ] First-match guarantee program
- [ ] Referral program infrastructure
- [ ] Onboarding flow optimization (reduce friction, improve completion)

**Month 3-6 Priorities:**
- [ ] Mobile app development begins (if web validates)
- [ ] Review and rating system
- [ ] Calendar integrations (Google, Outlook)
- [ ] Profile optimization AI tips
- [ ] Client saved searches/shortlists

**Month 6-9 Priorities:**
- [ ] Mobile apps beta (iOS + Android)
- [ ] Practice management integrations (Halaxy, Cliniko)
- [ ] Advanced search and filtering
- [ ] Group practice features (multi-practitioner)

**PMF Validation Metrics (Month 6-9):**
- [ ] 70%+ retention at 6 months
- [ ] NPS >40
- [ ] 15-20% signups from referrals
- [ ] Clear qualitative testimonials

---

### Phase 3: Growth Features (Months 9-18)

[B2B2C features, marketplace elements, advanced analytics, API ecosystem...]

### Phase 4: Scale & Platform Maturity (Months 18-24)

[AI sophistication, international prep, enterprise features...]

---

## 🧠 Memory Capsule

### Key Insights
- **30-day MVP scope**: Core features only (12 must-haves listed); analytics, reviews, mobile apps deferred post-MVP
- **Feature priorities (RICE)**: Algorithm v2.0, analytics, referral program top scores—focus Month 1-6
- **Technical debt acceptable**: 80% quality at MVP, manual processes OK, iterate in production—speed critical
- **Activation requirements**: 80% profile completion in 7 days, first match within 14 days for 70%—product must deliver

### For Module 10
Resource needs: 2-3 devs Month 1-3 ($120-180K), +product manager Month 3 ($100-130K), +2 devs Month 6-12 ($160-240K)—inform funding requirements

### For Module 12
Immediate actions: MVP sprint (Day 1-30), algorithm v2.0 (Month 1-3), analytics dashboard (Month 1-2), referral program (Month 2-3)

**End**









