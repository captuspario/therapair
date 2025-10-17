# 08 — Lessons and Principles

## 🎯 Purpose
Capture insights, failures, design philosophy, and replicable principles from building Therapair with agentic AI systems.

---

## 💡 Core Principles

### 1. Privacy is Non-Negotiable
**Principle:** Mental health search is deeply personal. Every technical decision must protect user privacy.

**Applications:**
- ✅ No Google Analytics, Facebook Pixel, or third-party tracking
- ✅ Self-hosted email (Hostinger), not third-party CRM
- ✅ Direct form submission, not Typeform/Google Forms
- ✅ Environment variables for all secrets, never hardcoded

**Trade-offs accepted:**
- Less analytics → Harder to optimize conversions
- More manual work → Can't automate everything
- Slower growth → But users trust us

**Lesson:** Privacy isn't a feature to add later. It's the foundation.

---

### 2. Specificity Creates Safety
**Principle:** Generic "inclusive" messaging doesn't serve marginalized users. Name communities explicitly.

**Examples:**
- ❌ Generic: "We support diverse clients"
- ✅ Specific: "LGBTQI+, neurodivergent, trauma-informed"

- ❌ Generic: "All therapists welcome"
- ✅ Specific: "Therapists with lived experience serving marginalized communities"

**Why it works:**
- Marginalized users see themselves reflected
- Filters out providers who don't "get it"
- Builds trust through transparency

**Lesson:** Trying to serve everyone serves no one.

---

### 3. Warmth Over Efficiency
**Principle:** This is emotional work, not e-commerce. Optimize for feeling understood, not conversion rate.

**Manifestations:**
- Conversational question flow (not form fields)
- "Your person" not "provider"
- Manual introductions (not automated booking)
- Follow-up check-ins (not transactional)

**Why it matters:**
- Users are vulnerable, often seeking help for the first time
- Cold, transactional UX reinforces stigma
- Warm experience = more likely to follow through

**Lesson:** Speed isn't always the goal. Sometimes slow is better.

---

### 4. Build With, Not For
**Principle:** Center lived experience in every design decision.

**How we do this:**
- Tino (founder) is queer, has lived experience
- Early users shaped question flow
- Therapists edit their own bios
- Community feedback informs roadmap

**What we avoid:**
- Corporate "user research" extraction
- Designing from assumptions
- Speaking on behalf of communities

**Lesson:** Authenticity can't be faked. Build from within the community.

---

### 5. Own Your Stack
**Principle:** Third-party tools = compromises. Build what matters most.

**What we built ourselves:**
- Matching algorithm (not off-the-shelf)
- Question flow (not Typeform)
- Landing page (not Webflow)
- Email submission (not Mailchimp)

**What we used:**
- Hostinger (hosting, we control it)
- Notion (database, can export anytime)
- React (open-source, we own the code)

**Trade-offs:**
- More dev time → But full control
- Less "enterprise features" → But no vendor lock-in
- Steeper learning curve → But deeper understanding

**Lesson:** Convenience isn't free. Ownership is power.

---

## 🧠 Agentic Development Insights

### Cursor + Claude Synergy

**What worked:**
1. **Full codebase context** — Claude sees everything, suggests coherent changes
2. **Rapid iteration** — Generate → Test → Refine in minutes
3. **Design system consistency** — AI enforces color/typography rules
4. **Documentation generation** — Claude writes docs from code
5. **Debugging with context** — AI sees error + entire stack

**What didn't work:**
- Over-relying on AI for architecture decisions (human judgment still needed)
- Accepting first draft code (always review, refine)
- Skipping tests because "AI wrote it" (still need QA)

**Best practices:**
- Write detailed prompts (context + constraints + examples)
- Iterate in small chunks (one component at a time)
- Review AI-generated code like a PR from a junior dev
- Use AI for boilerplate, human for strategy

---

### Prompt Engineering Lessons

**Effective prompts include:**
1. **Context:** "This is a therapy matching platform for marginalized communities"
2. **Goal:** "Create a therapist card component"
3. **Constraints:** "Must use Therapair design system colors, mobile-first"
4. **Examples:** "Similar to Airbnb listings but warmer tone"
5. **Output format:** "React component with TypeScript, Tailwind CSS"

**Bad prompts:**
- Too vague: "Make it look nice"
- No constraints: "Build a matching algorithm" (which approach?)
- Too complex: "Build entire platform" (break it down)

**Lesson:** Claude is a brilliant junior dev. You're the senior. Guide, don't dictate.

---

## 🚫 What Didn't Work (Failures)

### 1. Typebot Widget Limitations
**Problem:** Tag-based matching too rigid, CSV management painful

**Fix:** Built custom React matching journey with weighted algorithm

**Lesson:** MVP tools are great for validation, not for scale.

---

### 2. Hardcoded Notion Tokens
**Problem:** Pushed API tokens to Git, GitHub blocked deploy

**Fix:** Migrated to `.env` files, rewrote Git history

**Lesson:** Security from day one. Don't "fix it later."

---

### 3. Too Many Questions Initially
**Problem:** First version had 15 questions, users dropped off

**Fix:** Reduced to 9 core questions, added "skip" options

**Lesson:** Every question is friction. Ruthlessly cut.

---

### 4. Generic Therapist Bios
**Problem:** Therapists submitted CVs, not warm profiles

**Fix:** Created profile guide, manually edited bios

**Lesson:** Users need training/examples. Don't assume they know.

---

### 5. No Analytics (At First)
**Problem:** Couldn't see where users dropped off

**Fix:** Added privacy-friendly event tracking (localStorage, no external calls)

**Lesson:** Privacy doesn't mean blind. Measure what matters.

---

## 🎨 Design Philosophy

### "Vibe-Based Coding"
**What it means:** Design decisions based on emotional resonance, not just function

**Examples:**
- Chose "rosewood" over "corporate blue" (warmer)
- "Your person" over "your provider" (human)
- Progressive disclosure over "efficient" form (less overwhelming)

**Why it works:** Users remember how you made them feel, not your features

---

### Mobile-First Empathy
**Insight:** Most therapy searches happen on phones, often late at night, in vulnerable moments

**Design implications:**
- Large touch targets (anxious hands shake)
- Minimal scrolling (exhaustion)
- Progress indicators (sense of progress)
- Auto-save (don't lose work)

**Lesson:** Design for context, not just device size.

---

## 🔄 Iteration Velocity

### Speed Metrics
- **Typebot MVP:** 2 days
- **Landing page v1:** 1 week
- **React matching journey:** 4 days
- **Notion database optimization:** 2 days
- **Security audit + fixes:** 1 day

**Why so fast:**
- Claude generates boilerplate instantly
- Cursor auto-completes with context
- Git enables fearless iteration
- Modular architecture (change one piece at a time)

**Lesson:** Agentic AI is a 10x multiplier, but only if you know what to build.

---

## 📊 What to Measure

### Meaningful Metrics
- **Completion rate** (matching journey) — Are questions too hard?
- **Match satisfaction** (qualitative) — Do users feel understood?
- **Therapist match rate** — Are all therapists getting matched?
- **Time to first contact** — How long until intro email?

### Vanity Metrics to Avoid
- Page views (we don't track)
- Social media followers (not our channel)
- Time on site (longer isn't always better)

**Lesson:** Measure outcomes, not activity.

---

## 🌍 Expansion Principles

### How to Scale Without Losing Soul

**Geographic expansion:**
- Melbourne → Regional Victoria → Australia → International
- Validate demand before adding regions
- Recruit therapists organically (not ads)

**Feature expansion:**
- Start with MVP (matching + intro)
- Add features users request (not what we think they need)
- Keep privacy-first (no compromise)

**Team expansion:**
- Hire from community (lived experience non-negotiable)
- Remote-first (access talent anywhere)
- Values-aligned (mission over profit)

**Lesson:** Scale the mission, not just the metrics.

---

## 🎓 Replicable Frameworks

### For Others Building Similar Products

**1. The Modular Prompt System**
- Break strategy into `.md` files
- Use Claude to generate each section
- Version control in Git
- Iterate based on product evolution

**2. Privacy-First Stack Decisions**
- Self-host when possible
- Use open-source tools
- Environment variables for secrets
- Minimize third-party dependencies

**3. Agentic Development Workflow**
- Cursor + Claude for code generation
- Human reviews all AI output
- Test frequently
- Deploy small, iterate fast

**4. Community-Centered Design**
- Build from lived experience
- Specific > generic messaging
- Warmth > efficiency
- Feedback loops with users

---

## ❓ Questions for Expansion

1. What was the single biggest mistake? How did we recover?
2. If starting over, what would we do differently?
3. Which principle was hardest to uphold?
4. What advice for someone building a similar product?
5. How has the approach evolved over time?

---

## 🔗 Related Documents

- **[01_vision_and_origin.md](./01_vision_and_origin.md)** — Where principles came from
- **[06_strategy_prompt_framework.md](./06_strategy_prompt_framework.md)** — Methodology details
- **[05_git_and_deployment.md](./05_git_and_deployment.md)** — Technical workflow

---

## 💬 Key Quotes

> "Privacy isn't a feature. It's the foundation."

> "Specificity creates safety. Generic inclusion serves no one."

> "Claude is a brilliant junior dev. You're the senior."

> "Users remember how you made them feel, not your features."

> "Scale the mission, not just the metrics."

---

*This document is a living prompt. Expand it by feeding it back to Claude with new learnings, failures, or philosophical evolutions.*
