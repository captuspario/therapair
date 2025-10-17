# Therapair Case Study: Building Inclusive Mental Health Matching

> **How we created a privacy-first therapist-matching platform for marginalized communities in 6 weeks — and why it matters**

---

## At a Glance

**Mission:** Connect LGBTQI+, neurodivergent, and trauma-informed therapy seekers with affirming practitioners  
**Timeline:** 6 weeks from concept to production (October 2025)  
**Impact:** 193 therapists, 70%+ journey completion rate, $0 marketing spend  
**Innovation:** AI-native development, privacy-first architecture, community-centered design  

**Team:** Tino (Founder, Product Designer, UX Designer, AI Developer)  
**Partners:** Unison Mental Health  
**Tech Stack:** React, Notion, Cursor + Claude AI, Hostinger  

---

## The Problem: Therapy Search is Broken for Marginalized Communities

Finding a therapist is overwhelming. Finding one who truly understands your lived experience—as a queer person, as neurodivergent, as a trauma survivor—feels impossible.

### What's Wrong with Existing Solutions?

**Traditional directories** (Psychology Today, GoodTherapy) offer:
- ❌ Generic filters (location, insurance)
- ❌ No identity-specific matching
- ❌ Ad-driven business models
- ❌ Privacy concerns (tracking, data mining)
- ❌ Transactional, cold user experience

**The real questions therapy seekers ask:**
- *"Does this therapist have lived experience in LGBTQI+ communities?"*
- *"Will they understand neurodivergent communication styles?"*
- *"Are they trauma-informed beyond just a checkbox?"*
- *"Can I trust them with my most vulnerable self?"*

> "I spent weeks searching for a therapist who would 'get it.' Every intake form felt like explaining myself all over again."  
> — Early user feedback

### The Opportunity

Create a **matching concierge experience** that feels like a trusted friend helping you find your person—not a corporate directory extracting your data.

**Core requirements:**
1. **Identity-specific** — Center LGBTQI+, neurodivergent, trauma-informed needs
2. **Privacy-first** — No tracking, no data mining, no surveillance capitalism
3. **Emotionally intelligent** — Warm, affirming, never clinical
4. **Actually helpful** — Precise matching based on what really matters

---

## Our Approach: Mission-Driven, Privacy-First, AI-Powered

### Phase 1: Validation (Week 1)

**Challenge:** Prove demand before building

**Solution:** Embedded Typebot quiz on partner site (Unison Mental Health)
- 9 conversational questions
- Tag-based matching to CSV of 50 therapists
- Direct email submission (no third-party forms)

**Outcome:**
- ✅ 50+ completions in first week
- ✅ Validated that users wanted identity-specific matching
- ✅ Learned which questions actually mattered
- ❌ Tag system too rigid, CSV management painful

> "Finally, someone who asks the right questions."  
> — User feedback, Week 1

---

### Phase 2: Product Build (Weeks 2-4)

**Challenge:** Scale beyond MVP while maintaining privacy and warmth

**Solution:** Standalone React-based matching journey + Notion database

#### 🎨 Design System: Warmth Over Clinical

**Color Palette**
- Rosewood (#9a634d) — Primary, earthy, warm
- Alabaster (#faf9f7) — Background, soft, inviting
- Terracotta (#a75a3c) — CTAs, action-oriented
- Charcoal (#333333) — Text, readable, not harsh

**Why these colors?**
- Avoid clinical blues/whites (trigger medical anxiety)
- Earth tones = grounded, safe, natural
- Warm palette = emotionally resonant

**Typography**
- Open Sans (warm, approachable, highly readable)
- Generous line height (1.6) for easy scanning
- Clear hierarchy without feeling corporate

![Design System](../portfolio-assets/design-system-placeholder.png)
*▸ VISUAL: Color swatches + typography samples + component examples*

---

#### 🧭 UX Design: Progressive Disclosure

**The Matching Journey**

We designed a 9-question conversational flow that prioritizes what actually matters:

1. **Location** — Melbourne, Regional Victoria, Online, Anywhere in Australia
2. **Who it's for** — Yourself, partner, family member, child/teen
3. **What brings you** — Anxiety, trauma, LGBTQI+, neurodiversity, etc.
4. **Approach** — CBT, EMDR, psychodynamic, somatic, etc.
5. **Community** — LGBTQI+, neurodivergent, kink/ENM, cultural, disability
6. **Therapist traits** — Warm, direct, experienced with X, younger/older
7. **Languages** — English, Mandarin, Arabic, etc.
8. **Accessibility** — In-person, telehealth, NDIS, wheelchair accessible
9. **Pricing** — Bulk billing, affordable, standard

**Key UX Principles:**

**1. One question at a time** (no overwhelming forms)
![Question Flow](../portfolio-assets/question-flow-placeholder.png)
*▸ VISUAL: Screenshot of Question 3 (concerns) with multi-select options*

**2. Progressive disclosure** (reduce cognitive load)
- Show/hide based on previous answers
- "Skip" option for uncertain users
- Progress indicator (Question 3 of 9)

**3. Warm, conversational language**
- ❌ "Select your presenting concerns"
- ✅ "What brings you to therapy?"

- ❌ "Provider preferences"
- ✅ "What feels important in your therapist?"

**4. Mobile-first design** (90% of therapy searches happen on phones)
- Large touch targets (44px minimum)
- Minimal scrolling per screen
- Bottom navigation for thumb reach

![Mobile Experience](../portfolio-assets/mobile-screens-placeholder.png)
*▸ VISUAL: 3 mobile screenshots side-by-side (question → selection → next)*

---

#### 🎯 Matching Algorithm: Weighted Intelligence

Instead of simple tag counting, we built a **weighted matching system**:

```javascript
// Simplified algorithm logic
function calculateMatch(user, therapist) {
  let score = 0;
  
  // Location (highest priority)
  if (locationMatches(user, therapist)) score += 40;
  
  // Expertise/concerns (high priority)
  score += expertiseOverlap(user, therapist) * 30;
  
  // Community/identity (high priority)
  score += communityAlignment(user, therapist) * 20;
  
  // Approach/modality (medium priority)
  score += approachMatch(user, therapist) * 10;
  
  return score;
}
```

**Why this approach?**
- Location must match (no point showing Melbourne therapist to Sydney user)
- Expertise/identity are most important for marginalized users
- Approach matters, but less than "will they understand me?"

**Result:** Users report feeling "seen" by their matches, not just randomly matched

---

#### 🔒 Privacy Architecture: Zero Compromise

**What we DON'T use:**
- ❌ Google Analytics
- ❌ Facebook Pixel
- ❌ Third-party form services (Typeform, Google Forms)
- ❌ Marketing automation (Mailchimp, ConvertKit)
- ❌ Booking platforms (Calendly, Acuity)

**What we DO use:**
- ✅ Self-hosted email (contact@therapair.com.au on Hostinger)
- ✅ Direct form submission (PHP to inbox)
- ✅ No external databases
- ✅ HTTPS everywhere
- ✅ All secrets in `.env` (gitignored, never committed)

**Why this matters:**
> Mental health search is deeply personal. Every technical decision must protect user privacy.

![Privacy Architecture](../portfolio-assets/privacy-flow-placeholder.png)
*▸ VISUAL: Flow diagram: User → Form → PHP → Email (no third-party stops)*

---

### Phase 3: Scale & Optimize (Weeks 5-6)

**Challenge:** Prepare for Victoria → Australia expansion

**Solution:** Database optimization + security hardening

#### Database Structure (Notion)
- **193 therapists** (Melbourne + Regional Victoria)
- **Standardized fields:** Location, Expertise, Approach, Pricing, Accessibility
- **New fields for scale:** Price Tier, Mini Bio (150 chars), Pronouns
- **Sync system:** Notion API → JSON (version-controlled)

#### Security Audit
- Removed hardcoded tokens from Git history
- Implemented `.env` for all secrets
- Created encryption tools for sensitive data
- Automated security scanning

**Result:** Production-ready, secure, scalable to national level

---

## Results: Meaningful Impact in 6 Weeks

### Quantitative Outcomes

| Metric | Result | Context |
|--------|--------|---------|
| **Therapists onboarded** | 193 | Melbourne + Regional Victoria |
| **Completion rate** | 70%+ | Industry standard: 40-50% |
| **Avg. time per journey** | 3.5 minutes | Fast but not rushed |
| **Match satisfaction** | High (qualitative) | User feedback: "finally understood" |
| **Development time** | 6 weeks | Concept → production |
| **Marketing spend** | $0 | Organic growth only |

### Qualitative Impact

**User Feedback:**

> "Finally, someone who asks the right questions. I felt understood before I even met my therapist."

> "I loved that it understood I'm queer AND neurodivergent—not just one or the other."

> "This felt like a friend helping me, not a corporate form."

**Therapist Feedback:**

> "Easiest onboarding I've done. Other platforms want my whole life story."

> "I appreciate that clients arrive pre-qualified—they already know I'm queer-affirming."

---

## Innovation: Agentic AI Development

### How We Built So Fast

**Traditional development:** 6 weeks = maybe basic prototype  
**With Cursor + Claude:** 6 weeks = production-ready platform

**The Methodology:**

1. **Strategy as code** — Wrote strategy modules as `.md` prompts
2. **Claude executes** — AI generates audience personas, value props, copy
3. **Rapid iteration** — Generate → Test → Refine in minutes, not days
4. **Full context** — Claude sees entire codebase, suggests coherent changes
5. **Human-in-loop** — AI generates, human guides and refines

**Example workflow:**
```
Tino: "Create a therapist card component with warm design 
       system colors, mobile-first, shows expertise tags"

Claude: [Generates React component with Tailwind, following 
         design system, responsive, accessible]

Tino: "Add hover effects and booking CTA"

Claude: [Updates with smooth transitions, onClick handler]
```

**Result:** 10x faster than traditional development, without compromising quality

![AI Development](../portfolio-assets/cursor-screenshot-placeholder.png)
*▸ VISUAL: Screenshot of Cursor showing Claude generating component*

---

## Key Learnings

### What Worked

✅ **Specificity creates safety** — Naming LGBTQI+, neurodivergent explicitly builds trust  
✅ **Privacy is non-negotiable** — Users appreciate no tracking  
✅ **Warmth over efficiency** — Slower, warmer experience > fast, cold transaction  
✅ **MVP validation** — Typebot proved demand before big investment  
✅ **Agentic AI** — Claude enabled 10x faster development  

### What We'd Do Differently

❌ **Start with fewer questions** — 9 is borderline too many (testing 6-question version)  
❌ **Earlier therapist onboarding** — Needed more supply in week 1  
❌ **Better analytics** — Hard to optimize without data (added privacy-friendly tracking)  

### Replicable Principles

These work for any product:
1. **Mission first** — Clear values attract aligned users
2. **Privacy-first architecture** — Technical decisions reflect values
3. **Progressive disclosure** — One question at a time reduces overwhelm
4. **Modular prompts** — Strategy as code enables rapid iteration
5. **Community-centered** — Build with, not for

---

## What's Next

### Short-term (Q1 2025)
- Expand to all Victoria (currently Melbourne + Regional)
- Therapist dashboard (see match analytics)
- Client portal (track inquiries)

### Medium-term (Q2-Q3 2025)
- Launch in NSW
- Content library (guides, therapist interviews)
- Partner API (embed matching journey on partner sites)

### Long-term (2026+)
- National (Australia-wide)
- Mobile app (iOS, Android)
- International expansion

---

## Why This Matters

### For Users
**Faster path to right therapist:** Weeks → days  
**Reduced trial-and-error:** Costly and retraumatizing  
**Increased follow-through:** When matched well, people actually start therapy  

### For Therapists
**Reach ideal clients:** No more generic marketing  
**Build diverse caseload:** Serve communities you care about  
**Values-aligned platform:** Not just profit-driven  

### For Healthcare
**Reduce strain:** Better matching = fewer dropouts  
**Improve outcomes:** Right therapist = better results  
**Model for others:** Replicable for other underserved communities  

---

## Get Involved

### For Therapy Seekers
**Start your matching journey:** [therapair.com.au](https://therapair.com.au)

### For Therapists
**Join our network:** contact@therapair.com.au

### For Partners
**Embed our matching journey:** Integration opportunities available

### For Supporters
**Spread the word:** Share with someone seeking therapy

---

## Credits

**Founder & Creator:** Tino  
**Roles:** Product Designer, UX Designer, AI Developer  
**Partner:** Unison Mental Health  
**Technology:** Cursor + Claude AI, React, Notion, Hostinger  
**Timeline:** 6 weeks (October 2025)  
**Status:** Live and growing  

---

## Technical Details

**Open to sharing our methodology?** Yes! We believe agentic AI development should be democratized.

**Stack:**
- Frontend: React + Vite + Tailwind CSS
- Database: Notion (API-synced to JSON)
- Hosting: Hostinger (self-hosted)
- Email: Direct SMTP (no third-party)
- Development: Cursor + Claude (agentic AI)
- Testing: Playwright (automated UI tests)

**Want to learn more?** Contact us about:
- Agentic development methodology
- Privacy-first architecture
- Community-centered design
- Therapist partnerships

---

*This case study represents 6 weeks of rapid, mission-driven development. Every decision prioritized user privacy, emotional resonance, and serving marginalized communities. The result: a platform that users describe as "finally understanding them."*

**Contact:** contact@therapair.com.au  
**Website:** therapair.com.au  
**Location:** Melbourne, Australia  

---

**Last updated:** October 2025  
**Reading time:** ~5 minutes  
**Word count:** ~2,400  

*For press inquiries, partnership opportunities, or speaking engagements, please reach out via email.*
