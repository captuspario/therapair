# Therapair: Privacy-First Mental Health Matching Platform

> **How I built an AI-powered therapist-matching platform for marginalized communities from concept to production in 6 weeks**

---

## Project Overview

**Client:** Self-initiated (Founder) | Partner: Unison Mental Health  
**Role:** Founder, Product Designer, UX Designer, AI Developer  
**Timeline:** 6 weeks (October 2025)  
**Outcome:** 193 therapists onboarded, 70%+ user completion rate, production-ready platform  

**Core Challenge:** Create an inclusive, privacy-first therapist-matching experience for LGBTQI+, neurodivergent, and trauma-informed therapy seekers

**My Approach:** Mission-driven design + privacy-first architecture + agentic AI development

---

## The Problem I Solved

Traditional therapist directories (Psychology Today, GoodTherapy) fail marginalized communities by offering only generic filters (location, insurance) while ignoring identity-specific needs. Therapy seekers from LGBTQI+ and neurodivergent communities face:

- **No identity-specific matching** — Can't filter for lived experience or cultural competency
- **Privacy violations** — Tracking pixels, data mining, surveillance capitalism
- **Cold, transactional UX** — Corporate forms that feel clinical, not supportive
- **Trial-and-error process** — Costly, time-consuming, potentially re-traumatizing

**The core insight:** Finding a therapist isn't just about credentials—it's about trust, understanding, and safety.

---

## My Role & Responsibilities

As **Founder & Solo Creator**, I handled:

### Product Strategy
- Market research & competitive analysis
- User persona development
- Value proposition definition
- Go-to-market strategy

### UX Design
- User research & interviews
- Information architecture
- User flow design (9-question matching journey)
- Usability testing & iteration

### UI Design
- Design system creation (colors, typography, components)
- Visual design (landing page, matching journey, result cards)
- Mobile-first responsive design
- Accessibility compliance (WCAG AA)

### Development
- Frontend: React + Vite + Tailwind CSS
- Backend: PHP form handlers, Notion API integration
- Database: Notion structure & optimization
- Deployment: Hostinger setup, Git workflow

### AI/Innovation
- Agentic AI development methodology (Cursor + Claude)
- Matching algorithm design (weighted scoring)
- Privacy-first architecture
- Security implementation

---

## Research & Discovery

### User Research Methods

**1. Interview with Partner (Unison Mental Health)**
- Identified pain points in current therapist matching
- Understood unique needs of LGBTQI+ clients
- Validated demand for specialized matching

**2. Competitive Analysis**
Analyzed Psychology Today, GoodTherapy, PACFA, local directories:
- ❌ All lacked identity-specific filters
- ❌ All used tracking/advertising models
- ❌ None offered concierge-style experience

**3. Early User Feedback (Typebot MVP)**
- 50+ users in week 1
- Validated that users wanted identity-first matching
- Learned which questions resonated vs. confused

### Key Insights

> "I spent weeks searching for a therapist who would 'get it.' Every intake form felt like explaining myself all over again."

**Finding #1:** Specificity creates safety (explicit > generic)  
**Finding #2:** Privacy is non-negotiable for mental health search  
**Finding #3:** Warmth matters more than efficiency  
**Finding #4:** Questions should validate identity, not just extract symptoms  

---

## Design Process

### Phase 1: MVP Validation (Week 1)

**Goal:** Prove demand before building

**Approach:** Embedded Typebot quiz on partner website
- 9 conversational questions
- Tag-based matching to CSV (50 therapists)
- Direct email submission (no third-party tools)

**Outcome:**
- ✅ 50+ completions validated demand
- ❌ Tag system too rigid for nuanced matching
- ✅ Learned optimal question count/order

![Typebot MVP](../portfolio-assets/typebot-screenshot-placeholder.png)
*▸ VISUAL: Typebot widget embedded on Unison site*

---

### Phase 2: Design System (Week 2)

**Challenge:** Create a visual language that feels warm, safe, and affirming—not clinical

**Color Palette Development**

| Color | Hex | Purpose | Rationale |
|-------|-----|---------|-----------|
| Rosewood | `#9a634d` | Primary brand | Earthy, warm, grounded |
| Alabaster | `#faf9f7` | Background | Soft, inviting, not harsh white |
| Terracotta | `#a75a3c` | CTAs | Action-oriented, organic |
| Charcoal | `#333333` | Text | Readable, not overpowering |
| Calm Clay | `#b88b76` | Accents | Supportive, gentle |

**Design Principle:** Avoid clinical blues/whites (trigger medical anxiety) in favor of earth tones (safety, nature, warmth)

![Design System](../portfolio-assets/design-system-full-placeholder.png)
*▸ VISUAL: Color swatches, typography scale, button states, card components*

**Typography**
- **Font:** Open Sans (warm, approachable, highly readable)
- **Scale:** 14px / 16px / 18px / 24px / 32px / 48px
- **Line height:** 1.6 (generous for easy scanning)
- **Weight:** Regular (400) for body, Bold (700) for headings

**Component Library**
- Buttons (primary, secondary, ghost states)
- Form inputs (text, select, multi-select)
- Cards (therapist profiles, result cards)
- Progress indicators
- Tooltips (contextual help)

---

### Phase 3: Information Architecture (Week 2)

**Challenge:** Structure a 9-question flow that feels conversational, not interrogative

**IA Principles:**
1. **Start broad, get specific** (Location → Identity → Nuance)
2. **Progressive disclosure** (Show/hide based on answers)
3. **Always provide exits** ("Skip" / "Not sure" options)
4. **Show progress** (Question 3 of 9)

**Question Flow Design:**

```
1. Location (foundational filter)
   ↓
2. Who it's for (self, partner, family, teen)
   ↓
3. What brings you (anxiety, trauma, LGBTQI+, etc.)
   ↓
4. Therapeutic approach (CBT, EMDR, somatic, etc.)
   ↓
5. Community identity (LGBTQI+, neurodivergent, etc.)
   ↓
6. Therapist character (warm, direct, experienced with X)
   ↓
7. Languages needed
   ↓
8. Accessibility needs (in-person, telehealth, wheelchair, etc.)
   ↓
9. Pricing (bulk billing, affordable, standard)
```

**Rationale:** Location must come first (no point showing Melbourne therapist to Sydney user). Identity/concerns come early to validate user experience. Practical details (language, pricing) come last when emotionally invested.

![User Flow](../portfolio-assets/user-flow-diagram-placeholder.png)
*▸ VISUAL: Flow diagram showing question progression with branching logic*

---

### Phase 4: UI Design & Prototyping (Week 3)

**Challenge:** Design a mobile-first experience that reduces overwhelm

**Key Screens Designed:**

**1. Landing Page**
- Hero: "Find your person. Feel understood."
- Value props (3 pillars: Identity-specific, Privacy-first, Actually helpful)
- Social proof (user quotes)
- Dual CTAs ("Start Matching Journey" / "For Therapists")

**2. Matching Journey**
- One question per screen (reduce cognitive load)
- Large touch targets (44px minimum for mobile)
- Multi-select with visual feedback (checkmarks, color change)
- Bottom-aligned "Continue" button (thumb reach)

**3. Results Page**
- Vertical card layout (3-5 therapists)
- Key info above fold (name, photo, mini bio, expertise tags)
- Expandable sections (full bio, approach, pricing)
- Single CTA per card ("Request Introduction")

**4. Booking Form**
- Pre-filled with selected therapist
- Minimal fields (name, email, optional message)
- Privacy reassurance before submit
- Clear confirmation page

![UI Screens](../portfolio-assets/ui-screens-grid-placeholder.png)
*▸ VISUAL: 4-6 key screens in grid layout*

**Responsive Design:**
- **Mobile:** 375px-767px (single column, bottom nav)
- **Tablet:** 768px-1023px (larger cards, side-by-side CTAs)
- **Desktop:** 1024px+ (max-width container, hero imagery)

**Accessibility Features:**
- WCAG AA contrast ratios (4.5:1 text, 3:1 UI elements)
- Semantic HTML (proper heading hierarchy)
- Keyboard navigation (tab order, focus states)
- Screen reader labels (ARIA)
- Alt text for all images

---

### Phase 5: Development & Implementation (Weeks 3-4)

**Tech Stack Selection:**

| Technology | Rationale |
|------------|-----------|
| React | Component reusability, state management |
| Vite | Fast dev server, optimized builds |
| Tailwind CSS | Rapid UI development, design system consistency |
| Notion (database) | Flexible schema, easy therapist updates |
| Hostinger | Self-hosted (privacy), affordable |
| Cursor + Claude | Agentic AI development (10x speed) |

**Matching Algorithm Design:**

I developed a **weighted scoring system** instead of simple tag matching:

```javascript
function calculateMatch(userAnswers, therapistProfile) {
  let score = 0;
  
  // Location (must-match, 40 points)
  if (locationMatches(user, therapist)) {
    score += 40;
  } else {
    return 0; // Hard filter
  }
  
  // Expertise overlap (30 points)
  const expertiseMatch = countOverlap(
    user.concerns, 
    therapist.expertise
  );
  score += (expertiseMatch / user.concerns.length) * 30;
  
  // Community alignment (20 points)
  const communityMatch = countOverlap(
    user.communities,
    therapist.communities
  );
  score += (communityMatch / user.communities.length) * 20;
  
  // Approach preference (10 points)
  if (user.approach && user.approach === therapist.approach) {
    score += 10;
  }
  
  return score;
}
```

**Why this works:**
- Location is non-negotiable (hard filter)
- Expertise/identity weighted highest (what users care about most)
- Approach matters but less than "will they understand me?"

**Privacy Architecture:**

I implemented **zero third-party tracking**:
- ❌ No Google Analytics, Facebook Pixel, Hotjar
- ❌ No Typeform, Google Forms, Calendly
- ✅ Self-hosted email (Hostinger SMTP)
- ✅ Direct PHP form submission
- ✅ All secrets in `.env` (gitignored)
- ✅ HTTPS everywhere

**Form Submission Flow:**
```
User submits → React validates → POST to PHP → 
Hostinger SMTP → contact@therapair.com.au → 
Manual triage → Personal introduction email
```

**No user data** stored in external databases. HIPAA-lite thinking from day one.

---

### Phase 6: Testing & Iteration (Week 5)

**Usability Testing Methods:**

**1. Playwright Automated Tests**
- Complete journey flow (9 questions → results)
- Mobile responsiveness (375px viewport)
- Design system verification (colors, spacing)
- Form submission validation

**2. Manual Testing**
- Therapist onboarding flow
- Email delivery confirmation
- Cross-browser (Chrome, Safari, Firefox)
- Accessibility (keyboard nav, screen reader)

**Key Iterations Based on Testing:**

| Issue Found | Solution Implemented |
|-------------|---------------------|
| 15 questions too many | Reduced to 9 core questions |
| "Skip" unclear | Added "Not sure" as explicit option |
| Only 3 matches felt limiting | Increased to 5 matches |
| Therapist bios too formal | Created style guide, edited manually |
| No progress indicator | Added "Question X of 9" |

![Testing Screenshots](../portfolio-assets/playwright-tests-placeholder.png)
*▸ VISUAL: Playwright test results + mobile screenshots*

---

### Phase 7: Launch & Optimization (Week 6)

**Pre-Launch Checklist:**
- ✅ Security audit (removed hardcoded tokens)
- ✅ Performance optimization (< 2s load time)
- ✅ Database standardization (193 therapists)
- ✅ Email testing (delivery, formatting)
- ✅ Analytics setup (privacy-friendly)
- ✅ Documentation (technical, onboarding)

**Soft Launch:**
- Partner announcement (Unison Mental Health)
- Direct outreach to therapist network
- Organic social (no paid ads)

**Post-Launch Monitoring:**
- Completion rate tracking (70%+ achieved)
- Drop-off analysis (identified Question 5 as friction point)
- User feedback collection (email follow-ups)
- Therapist feedback (onboarding survey)

---

## Results & Impact

### Quantitative Outcomes

| Metric | Result | Industry Benchmark |
|--------|--------|-------------------|
| **Development time** | 6 weeks | 3-6 months typical |
| **Therapists onboarded** | 193 | N/A (greenfield) |
| **User completion rate** | 70%+ | 40-50% typical for multi-step forms |
| **Avg. journey time** | 3.5 min | Target: <5 min ✅ |
| **Marketing spend** | $0 | Organic growth only |
| **Security incidents** | 0 | Privacy-first architecture |

### Qualitative Impact

**User Testimonials:**

> "Finally, someone who asks the right questions. I felt understood before I even met my therapist."

> "I loved that it understood I'm queer AND neurodivergent—not just one or the other."

> "This felt like a friend helping me, not a corporate form."

**Therapist Feedback:**

> "Easiest onboarding I've done. Other platforms want my whole life story."

> "Clients arrive pre-qualified—they already know I'm queer-affirming."

**Partner (Unison) Feedback:**

> "This is exactly what our community needed. The privacy-first approach aligns with our values."

---

## Innovation: Agentic AI Development

### How I Achieved 10x Development Speed

**Traditional approach:** 6 weeks = basic prototype  
**My approach:** 6 weeks = production-ready platform

**Methodology: Strategy as Code**

1. **Wrote strategy modules as `.md` prompts**
   - Audience definition
   - Value proposition
   - Copywriting guidelines
   - Technical architecture

2. **Claude AI executed each module**
   - Generated user personas
   - Wrote landing page copy
   - Created React components
   - Suggested architectural patterns

3. **Iterated rapidly**
   - Generate → Test → Refine in minutes
   - Full codebase context (Claude sees everything)
   - Consistent with design system automatically

**Example workflow:**
```
Me: "Create therapist card component: Therapair colors, 
     mobile-first, shows name, photo, mini bio, expertise 
     tags, booking CTA"

Claude: [Generates React component with Tailwind, 
         accessible, responsive, on-brand]

Me: "Add hover animation and loading states"

Claude: [Updates with smooth transitions, skeleton loader]
```

**Result:** Professional-quality code in hours, not days

![Cursor AI Development](../portfolio-assets/cursor-claude-placeholder.png)
*▸ VISUAL: Cursor interface showing Claude generating component*

---

## Key Learnings & Takeaways

### What Worked Exceptionally Well

✅ **Specificity creates safety** — Naming LGBTQI+, neurodivergent explicitly built immediate trust  
✅ **Privacy as foundation** — Users noticed and appreciated no tracking  
✅ **Warmth over efficiency** — Slower, warmer UX outperformed fast/cold  
✅ **MVP validation** — Typebot proved demand with minimal investment  
✅ **Agentic AI** — Cursor + Claude enabled 10x faster development without quality compromise  
✅ **Community-centered design** — Building from lived experience = authentic  

### What I'd Do Differently Next Time

❌ **Start with 6 questions, not 9** — Testing shows 6 is optimal  
❌ **Build therapist supply first** — Had more demand than supply initially  
❌ **Earlier analytics** — Hard to optimize without data (added later)  
❌ **Video tutorials** — Some therapists needed more onboarding guidance  

### Replicable Principles (For Any Project)

1. **Mission-first design** — Clear values attract aligned users
2. **Privacy-first architecture** — Technical decisions must reflect ethical stance
3. **Progressive disclosure** — One step at a time reduces overwhelm
4. **Modular prompts** — Strategy as code enables rapid iteration
5. **Community-centered** — Build with, not for target audience
6. **Agentic AI** — Human guides strategy, AI executes rapidly
7. **Test early, test often** — MVP validation before big investment

---

## Technical Specifications

### Stack
- **Frontend:** React 19, Vite 7, Tailwind CSS 4
- **Backend:** PHP (form handling), Node.js (Notion sync)
- **Database:** Notion (API-synced to JSON)
- **Hosting:** Hostinger (self-hosted, cPanel)
- **Email:** Hostinger SMTP (direct, no third-party)
- **Development:** Cursor + Claude (agentic AI)
- **Testing:** Playwright (automated UI/UX tests)
- **Version Control:** Git + GitHub

### Performance
- **Load time:** < 2 seconds
- **Mobile responsive:** 375px - 1920px
- **Accessibility:** WCAG AA compliant
- **Browser support:** Chrome, Safari, Firefox (latest 2 versions)

### Security
- All API tokens in `.env` (gitignored)
- HTTPS enforced
- Input sanitization (FILTER_SANITIZE_*)
- No data logging (emails only)
- Regular security audits

---

## What's Next

**Short-term (Q1 2025):**
- Expand to all Victoria
- Therapist dashboard (analytics)
- A/B test 6-question flow

**Medium-term (Q2-Q3 2025):**
- Launch in NSW
- Mobile app (iOS, Android)
- Partner API (embeddable widget)

**Long-term (2026+):**
- National (Australia-wide)
- International expansion
- Open-source methodology

---

## Skills Demonstrated

### Product Design
- User research & personas
- Competitive analysis
- MVP validation
- Feature prioritization
- Roadmap planning

### UX Design
- Information architecture
- User flow design
- Usability testing
- Accessibility (WCAG AA)
- Mobile-first design

### UI Design
- Design system creation
- Visual design
- Component library
- Responsive design
- Brand identity

### Development
- React + JavaScript
- Tailwind CSS
- API integration (Notion)
- PHP backend
- Git workflow

### Innovation
- Agentic AI development
- Prompt engineering
- Rapid iteration
- Privacy architecture
- Weighted algorithms

### Business
- Go-to-market strategy
- Value proposition
- Partnership development
- Community building
- Mission-driven approach

---

## Project Artifacts

**Live Site:** therapair.com.au  
**Timeline:** 6 weeks (October 2025)  
**Status:** Production, growing  
**Open Source:** Methodology (coming soon)  

**Available for discussion:**
- Design system deep dive
- Agentic AI methodology
- Privacy-first architecture
- Community-centered design approach
- Case study adaptation for your project

---

## Contact

**Tino**  
Founder, Product Designer, UX Designer, AI Developer  
contact@therapair.com.au

**Available for:**
- Product design consulting
- UX/UI design projects
- Agentic AI development training
- Mission-driven project collaboration
- Speaking engagements

---

*This case study demonstrates my ability to take a project from concept to production across the full stack: research, strategy, design, development, and launch. The 6-week timeline showcases efficiency without compromising quality, made possible through agentic AI development and deep user empathy.*

**Portfolio:** [Your consultancy URL]  
**LinkedIn:** [Your LinkedIn]  
**Email:** contact@therapair.com.au  

---

**Last updated:** October 2025  
**Reading time:** ~7 minutes  
**Word count:** ~3,500  

*For consulting inquiries, collaboration opportunities, or to discuss how I can bring this approach to your project, please reach out via email.*
