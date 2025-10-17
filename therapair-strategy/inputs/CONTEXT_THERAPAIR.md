# Therapair Context Document

**Last Updated**: 2025-10-13  
**Version**: 1.1  
**Purpose**: Consolidated project context for strategic planning

---

## Project Overview

### What is Therapair?

Therapair is a **therapist-matching concierge service** built with real humans and real care, designed specifically for diverse and marginalised communities. We're revolutionising how people find mental health support through AI-enabled, human-centred matching that goes beyond simple directory listings.

**Core Value Proposition:**
- Match based on identity, values, and specific needs (not just availability)
- Highlight inclusive, culturally competent practitioners
- Use AI to personalise the experience while maintaining human oversight
- Built with continuous feedback from our community

**Mission:** Create truly inclusive mental health care by connecting people with therapists who understand their unique identities and needs.

**Vision:** Become Australia's leading therapist-matching platform, expanding globally to transform mental health access for underserved communities.

---

## Current State

### Product Status

**Development Stage**: MVP Development → Pilot Launch (30-day timeline)

**Current Deployments:**

1. **Landing Page** (therapair.com.au) - ✅ **LIVE**
   - Multi-audience interest forms (Individuals, Therapists, Organisations, Supporters)
   - AI-powered email confirmations via OpenAI
   - Notion database integration for lead management
   - Email preference management system
   - Status: Production, gathering early interest

2. **Therapist Matching Widget** (Unison Counselling) - ✅ **LIVE**
   - Interactive 6-question quiz
   - Smart matching algorithm (8 therapists)
   - Booking form integration
   - Embedded iframe widget
   - Status: Production at unisoncounselling.com

### Technology Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Mobile-responsive design (mobile-first)
- Accessibility: WCAG 2.1 AA compliance target

**Backend:**
- PHP 7.4+ (landing page form handling)
- OpenAI API (gpt-4o-mini for email personalization)
- FormSubmit.co (widget bookings - to migrate)

**Database:**
- Notion API (current - single unified database)
- Database ID: `2875c25944da80c0b14afbbdf2510bb0`
- Future: PostgreSQL for scale

**Infrastructure:**
- Hosting: Hostinger (landing page), Unison server (widget)
- Email: PHP mail() + OpenAI personalization
- Analytics: To be implemented (GA4 planned)

**Design System:**
- Primary: Therapair Purple (#9B74B7, #4F064F, #D4B5D8)
- Secondary: Blue (#2563eb, #3b82f6)
- Success: Green (#10b981, #059669)
- Typography: Open Sans, responsive scale
- Components: Documented in THERAPAIR-DESIGN-SYSTEM.md

---

## Problem & Solution

### Problem Space

**For Clients Seeking Therapy:**
- Overwhelming choice with no guidance on "fit"
- Difficulty finding therapists who understand specific identities (LGBTQ+, neurodivergent, culturally diverse)
- Long wait times and unclear availability
- Trial-and-error approach wastes time and emotional energy
- Generic directories don't surface inclusive, affirming practitioners
- No way to assess therapist approach or specialisation before contact

**For Therapists:**
- Inconsistent referral flow (feast or famine)
- Poor-fit clients waste time and energy
- Difficulty attracting ideal clients
- Manual marketing is time-consuming
- Hard to stand out in crowded directories
- No efficient way to communicate specialisations and approach

**For Organisations (EAPs, Universities, Clinics):**
- Manual triage and matching is resource-intensive
- Hard to ensure culturally appropriate matches
- Limited visibility into provider availability
- Difficulty tracking outcomes and satisfaction

### Solution Approach

Therapair addresses these through:

1. **Intelligent Matching Algorithm**
   - Beyond location and specialty: identity, values, approach
   - Considers therapeutic modality, communication style, lived experience
   - AI-powered but human-curated and verified
   - Continuous learning from user feedback

2. **Human-Centred Design**
   - Warm, approachable interface (not clinical)
   - Quick, non-overwhelming quiz (5-10 minutes)
   - Clear explanations of why matches are suggested
   - Transparent about practitioner credentials and approach

3. **Inclusive by Default**
   - Explicit filtering for LGBTQ+ affirming care
   - Cultural background and language matching
   - Neurodiversity-informed care options
   - Trauma-informed practice highlighting
   - Accessibility considerations (physical, financial)

4. **Practitioner Support**
   - Professional profiles that showcase approach, not just credentials
   - Consistent, quality referrals of well-matched clients
   - Practice-building tools and insights
   - Time saved on admin and marketing

5. **Concierge Experience**
   - Real humans available for complex matching needs
   - Follow-up support to ensure successful connections
   - Therapist changes supported without stigma
   - Ongoing relationship, not just a directory search

---

## Value Proposition

### For Clients
**Primary Benefit:** Find a therapist who truly understands you, faster and with less stress.

**Functional Benefits:**
- Save hours of research and trial-and-error
- Confidently choose from vetted, affirming practitioners
- Understand therapist approach before committing
- Access practitioners you wouldn't find in generic directories

**Emotional Benefits:**
- Feel understood and validated in your search
- Reduce anxiety about finding the "right" therapist
- Trust the process is designed for people like you
- Confidence that specialisations are genuine

**Social Benefits:**
- Access to community-recommended practitioners
- Connection to identity-affirming care
- Part of building more inclusive mental health system

### For Therapists
**Primary Benefit:** Build a sustainable practice with well-matched clients who benefit from your specific expertise.

**Functional Benefits:**
- Consistent referral flow without constant marketing
- Higher-quality client matches (better retention)
- Save time on intake calls with poor-fit clients
- Professional profile that showcases your unique approach
- Practice insights and analytics

**Emotional Benefits:**
- Satisfaction of working with ideal clients
- Reduced burnout from mismatched cases
- Pride in inclusive, affirming practice
- Professional credibility and visibility

**Financial Benefits:**
- More stable income (consistent referrals)
- Higher client retention (better matches)
- Reduced marketing costs
- Premium positioning for specialisation

### For Organisations
**Primary Benefit:** Provide inclusive, efficient mental health support with measurable outcomes.

**Benefits:**
- Scale matching without additional staff
- Ensure culturally appropriate care
- Track outcomes and satisfaction
- Improve engagement rates
- Demonstrate commitment to diversity and inclusion

---

## Market Context

### Target Market

**Primary Market:** Australian mental health practitioners in private practice

**Segments:**
1. **Solo Practitioners** - Psychologists, counsellors, psychotherapists in private practice
2. **Group Practices** - Small to medium clinics (2-10 practitioners)
3. **Specialists** - Trauma, ADHD, eating disorders, LGBTQ+ affirming, culturally specific

**Secondary Market:** Clients seeking therapy
- Individuals with specific identity or cultural needs
- First-time therapy seekers (need guidance)
- Previous therapy users seeking better fit
- Parents seeking therapists for children/adolescents

**Geographic Focus:**
- Launch: Victoria (Melbourne metro + regional)
- Phase 2: NSW, QLD
- Phase 3: National (all Australian states/territories)
- Future: New Zealand, UK, other English-speaking markets

### Market Size (Australia)

**Total Addressable Market (TAM):**
- ~40,000 registered mental health practitioners in Australia
- ~100,000+ individuals seeking therapy annually

**Serviceable Available Market (SAM):**
- ~15,000 practitioners in private practice (likely to adopt digital tools)
- ~50,000 individuals actively searching for therapists online

**Serviceable Obtainable Market (SOM):**
- Year 1: 200-500 practitioners, 2,000-5,000 client matches
- Year 2: 1,000-2,000 practitioners, 10,000-20,000 client matches
- Year 3: 3,000-5,000 practitioners, 50,000+ client matches

### Current Alternatives

**Direct Competitors:**
- **Psychology Today Australia** - Directory listings, basic search
- **PACFA / ACA / APS Directories** - Professional body listings
- **Halaxy** - Practice management + booking (expanding to matching)
- **Heidi Health** - AI medical documentation (adjacent)

**Indirect Alternatives:**
- Self-built websites and Google search
- Social media marketing (Instagram, Facebook)
- Word-of-mouth referrals
- GP referrals
- EAP provider panels

**International Comparables:**
- **BetterHelp** (US/Global) - Online therapy marketplace
- **Headway** (US) - Insurance + matching
- **SonderMind** (US) - AI-powered matching
- **Zocdoc** - Doctor booking (adjacent model)

---

## Product Features

### Current Features (MVP)

**Landing Page:**
- ✅ Multi-audience interest forms (4 journey types)
- ✅ AI-personalized email confirmations
- ✅ Notion database integration
- ✅ Email preference management
- ✅ Australian English throughout

**Matching Widget:**
- ✅ Interactive 6-question quiz
- ✅ Basic matching algorithm (8 therapists)
- ✅ Therapist profile cards with photos, bios, specialisations
- ✅ Booking form integration
- ✅ Email notifications
- ✅ Mobile-responsive embed

### Planned Features (Next 3-12 Months)

**Phase 1: Enhanced MVP (30 days)**
- [ ] Practitioner signup and profile creation
- [ ] Verified practitioner database
- [ ] Enhanced matching algorithm (ML-based)
- [ ] Client quiz refinement (A/B testing)
- [ ] Basic analytics dashboard
- [ ] Booking/scheduling integration

**Phase 2: Core Platform (3-6 months)**
- [ ] Practitioner dashboard (inquiries, analytics)
- [ ] Client dashboard (saved searches, shortlist)
- [ ] Review and rating system
- [ ] Advanced filtering (insurance, fees, availability)
- [ ] Telehealth integration options
- [ ] Multi-location support

**Phase 3: Scale Features (6-12 months)**
- [ ] Mobile apps (iOS, Android)
- [ ] Group practice management
- [ ] B2B2C features (EAP, university integration)
- [ ] AI-powered insights for practitioners
- [ ] Marketplace features (resources, workshops)
- [ ] International expansion groundwork

---

## Business Model

### Revenue Model

**Hybrid Non-Profit SaaS:**
- Primary: Subscription fees from practitioners
- Secondary: Commission on successful matches (ethical rate)
- Tertiary: B2B2C partnerships (organisations)
- Impact: Grant funding and social investment

**Pricing Strategy (Proposed):**

**For Practitioners:**
- **Free Tier**: Basic profile, limited visibility (testing/emerging practitioners)
- **Professional Tier**: $79-99/month AUD - Full profile, priority matching, analytics
- **Premium Tier**: $149-199/month AUD - Featured placement, advanced insights, priority support
- Annual discount: 15-20%

**For Organisations (B2B2C):**
- Custom pricing based on size and usage
- Per-employee/per-student licensing
- White-label options for larger partners

**Revenue Mix Target (Year 3):**
- Practitioner subscriptions: 70%
- Match commissions: 15%
- B2B2C partnerships: 10%
- Grants/social impact funding: 5%

### Cost Structure

**Fixed Costs:**
- Team salaries (development, operations, support)
- Infrastructure (hosting, APIs, tools)
- Legal and compliance
- Office/workspace (if applicable)

**Variable Costs:**
- Marketing and customer acquisition
- AI/ML API costs (OpenAI, etc.)
- Payment processing fees
- Support scaling

**Target Unit Economics:**
- Customer Acquisition Cost (CAC): <$150 per practitioner
- Customer Lifetime Value (CLTV): $2,000-3,000
- CLTV:CAC Ratio: 15:1 or better
- Payback Period: <6 months

---

## Competitive Landscape

### Direct Competitors

1. **Psychology Today Australia**
   - Strength: Established brand, large directory
   - Weakness: Basic search, no intelligent matching, US-centric
   - Opportunity: Better UX, AI matching, Australian focus

2. **Halaxy**
   - Strength: Practice management ecosystem, growing user base
   - Weakness: Not matching-focused, more for existing practices
   - Opportunity: Better client-side experience, specialisation in matching

3. **Professional Body Directories** (PACFA, ACA, APS)
   - Strength: Authoritative, trusted
   - Weakness: Basic listings, no matching, poor UX
   - Opportunity: Partnership for verification, superior experience

### International Comparables

4. **BetterHelp** (US/Global)
   - Model: Online therapy marketplace
   - Lesson: Scalable matching, but quality concerns
   - Differentiate: Local focus, higher-touch, practitioner-first

5. **Headway** (US)
   - Model: Insurance + matching
   - Lesson: Remove friction (insurance), practitioner support
   - Differentiate: Australian context (Medicare, NDIS), inclusive focus

6. **SonderMind** (US)
   - Model: AI-powered matching + telehealth
   - Lesson: Technology can enable better matches
   - Differentiate: Human-centred AI, community trust

### Competitive Advantages

**Therapair's Differentiation:**
1. **Inclusive by Design**: Built specifically for diverse communities (not retrofitted)
2. **Human + AI**: Best of both worlds (not purely algorithmic)
3. **Australian Context**: AHPRA, NDIS, Medicare, cultural nuance
4. **Practitioner-Centric**: Not exploitative, supportive business model
5. **Warm, Human UX**: Professional but approachable (not clinical or corporate)
6. **Community Trust**: Built with and for the communities we serve
7. **Ethical Business Model**: Hybrid non-profit, transparent pricing

---

## Technical Overview

### Current Architecture

```
┌─────────────────────────────────────┐
│  Frontend (HTML/CSS/JS)             │
│  - Landing page (therapair.com.au)  │
│  - Widget (Unison embed)             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Backend (PHP)                       │
│  - Form handling                     │
│  - OpenAI API integration            │
│  - Email dispatch                    │
└──────────────┬──────────────────────┘
               │
               ├─→ Notion API (Database)
               ├─→ OpenAI API (Email AI)
               └─→ Email (PHP mail())
```

### Planned Architecture (Scale)

```
┌─────────────────────────────────────┐
│  Frontend (React/Next.js)            │
│  - Web app                           │
│  - Mobile apps (React Native)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  API Layer (Node.js/Express)         │
│  - RESTful API                       │
│  - Authentication                    │
│  - Business logic                    │
└──────────────┬──────────────────────┘
               │
               ├─→ PostgreSQL (Primary DB)
               ├─→ Redis (Cache, sessions)
               ├─→ Elasticsearch (Search)
               ├─→ OpenAI API (Matching AI)
               ├─→ SendGrid/Postmark (Email)
               └─→ Stripe (Payments)
```

### Key Integrations

**Current:**
- OpenAI API (gpt-4o-mini)
- Notion API
- PHP mail()

**Planned:**
- Stripe (payments)
- Zoom/Coviu (telehealth)
- Practice management software (Cliniko, Power Diary, Halaxy)
- Calendar integrations (Google, Outlook)
- Email platforms (SendGrid, Postmark)
- Analytics (Mixpanel, Amplitude)
- Customer support (Intercom, Zendesk)

---

## Design Philosophy

### Core Principles

1. **Inclusive by Design**: Default to accessibility and cultural competence
2. **Human-Centred**: Warm, conversational, never clinical
3. **Accessible**: WCAG 2.1 AA minimum, keyboard navigation
4. **Mobile-First**: Most users on mobile devices
5. **Performance**: Fast loading, minimal dependencies
6. **Consistent**: Same look and feel across all touchpoints

### Tone & Voice

**Characteristics:**
- ✅ **Conversational**: "Thanks so much for..." not "Thank you for your inquiry"
- ✅ **Inclusive**: Explicitly mention diverse identities
- ✅ **Honest**: Transparent about current stage and limitations
- ✅ **Encouraging**: "You're one of the first to explore this with us"
- ✅ **Human**: Avoid jargon, speak plainly
- ✅ **Australian**: Use Australian English spelling

**Avoid:**
- ❌ Corporate/formal language
- ❌ Over-promising
- ❌ Overly enthusiastic (too many exclamation points)
- ❌ Clinical/medical jargon
- ❌ Pressure tactics or scarcity marketing

### Language Standards

**Australian English:**
- Personalised (not personalized)
- Organisation (not organization)
- Specialisation (not specialization)
- Recognise (not recognize)
- Prioritise (not prioritize)
- Centre (not center)
- Practise (verb), Practice (noun)

---

## Recent Developments

**2025-10-10:**
- ✅ Central documentation hub created
- ✅ Unified design system established
- ✅ Landing page live and operational
- ✅ Widget deployed at Unison Counselling
- ✅ Notion database operational with multi-project support

**2025-10-13:**
- ✅ Strategic planning framework initiated
- ✅ Master protocol established
- 🔄 Context documentation consolidated
- 📋 30-day MVP sprint planning

---

## Key Learnings & Insights

### From Landing Page Launch
1. **Multi-audience approach works**: Separate journeys for individuals, therapists, organisations, supporters all seeing engagement
2. **AI emails well-received**: OpenAI personalization creates warm, human responses
3. **Notion as MVP database**: Sufficient for early-stage, easy team collaboration
4. **Mobile-first critical**: 70%+ traffic on mobile devices

### From Widget Deployment
1. **Quiz engagement high**: 80%+ completion rate when users start
2. **Question sequence matters**: Preference questions before demographic questions
3. **Visual therapist profiles essential**: Photos and personality shine through
4. **Booking friction point**: Need to streamline booking after match

### Strategic Insights
1. **Speed to market essential**: Mental health sector moving fast, need to establish position
2. **Trust is everything**: Verification, transparency, community endorsement critical
3. **Practitioner economics matter**: Can't be extractive, must support practitioners
4. **Inclusive = competitive advantage**: Not a nice-to-have, it's the core differentiator

---

## Documentation References

**Central Hub:**
- `THERAPAIR-CENTRAL-DOCUMENTATION.md` - Overview of all projects
- `THERAPAIR-DESIGN-SYSTEM.md` - Brand and design standards
- `THERAPAIR-README.md` - Quick start and project structure
- `THERAPAIR-SCALABLE-INFRASTRUCTURE.md` - Technical architecture and scaling

**Project-Specific:**
- `therapair-landing-page/LANDING-PAGE-DOCUMENTATION.md`
- `therapair-widget-unison/WIDGET-DOCUMENTATION.md`
- `therapair-landing-page/notion-database-setup.md`
- `therapair-landing-page/email-ai-prompt.md`

**Project Management:**
- `/docs/project-management/` - Deployment guides, team info, workflows

---

**Last Updated**: 2025-10-13  
**Maintained By**: Therapair Strategic Planning  
**Next Review**: As strategy develops

---

*This is a living document. Update as Therapair evolves.*
