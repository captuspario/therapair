# 06 — Strategy Prompt Framework

## 🎯 Purpose
Document the Claude-powered strategy system that enabled modular, agentic development of marketing, positioning, and technical documentation.

---

## 🧠 The Modular Prompt Methodology

### The Problem
**Traditional strategy development:**
- ❌ Requires expensive consultants
- ❌ Takes weeks to months
- ❌ Disconnected from execution
- ❌ Hard to iterate or adapt

**Therapair's approach:**
- ✅ Strategy as modular `.md` prompts
- ✅ Claude executes each section
- ✅ Generated in hours, not weeks
- ✅ Living documents that evolve with product

---

## 📚 Strategy Module Structure

### Core Strategy Documents Created

1. **Audience Definition**
   - Primary: Therapy seekers (LGBTQI+, neurodivergent, trauma)
   - Secondary: Inclusive therapists
   - Tertiary: Referral sources (GPs, community orgs)

2. **Value Proposition**
   - Differentiation from competitors
   - Emotional resonance positioning
   - Privacy-first messaging

3. **Pricing Strategy**
   - Free for therapy seekers
   - Therapist onboarding models (future)
   - Sustainability considerations

4. **Go-to-Market**
   - Community partnerships (Unison)
   - Organic social (lived experience content)
   - SEO for long-tail searches

5. **Copywriting Guidelines**
   - Tone principles (warm, specific, affirming)
   - Forbidden words (provider, patient, consumer)
   - Inclusive language patterns

6. **Technical Architecture**
   - Privacy-first stack decisions
   - Modular component design
   - Deployment requirements

---

## 🎨 Master Prompt Template

### Structure of Each Strategy Module
```markdown
# [STRATEGY SECTION NAME]

## Context
[What this section addresses]

## Current State
[What we know, what exists]

## Goals
[What we want to achieve]

## Questions to Address
[Specific prompts for Claude]

## Output Format
[How the strategy should be documented]

## Success Criteria
[How we'll know it worked]
```

### Example: Audience Strategy Prompt
```markdown
# Therapair Audience Strategy

## Context
Define primary, secondary, and tertiary audiences for Therapair's 
therapist-matching platform, focusing on underserved communities.

## Current State
- Prototype serving Unison Mental Health clients (LGBTQI+)
- Anecdotal evidence of neurodivergent user interest
- Therapist network in Melbourne

## Goals
- Clearly define who we serve (and who we don't)
- Understand user motivations and pain points
- Guide product decisions with user personas

## Questions to Address
1. What are the psychographic traits of our ideal users?
2. What are their specific therapy search challenges?
3. How do they currently find therapists?
4. What language resonates vs alienates?
5. What proof do they need to trust us?

## Output Format
Create user personas with:
- Demographics & identity factors
- Therapy search pain points
- Emotional needs
- Decision criteria
- How they discover Therapair

## Success Criteria
- Can answer "Is this feature for our users?" decisively
- Copywriting sounds like it's written FOR them
- Design choices reflect their needs
```

**Result:** Claude generates detailed personas, which inform every product decision.

---

## 🔄 Agentic Workflow

### How Strategy Prompts Work with Cursor

**Step 1: Create Prompt File**
```bash
touch docs/strategy/audience-personas.md
# Write structured prompt with context + questions
```

**Step 2: Execute with Claude**
```
Tino: @audience-personas.md 
      "Generate detailed user personas following this prompt"

Claude: [Generates 3 personas with demographics, pain points, 
         emotional needs, decision criteria]
```

**Step 3: Integrate into Product**
```
Tino: "Update the landing page hero copy to speak to 
       Persona 1's emotional needs"

Claude: [Updates copy using persona language patterns]
```

**Step 4: Iterate**
```
Tino: "Persona 2 feels too generic. Add more specificity 
       around neurodivergent therapy search challenges"

Claude: [Refines persona with ADHD/autism-specific details]
```

---

## 📖 Key Strategy Documents

### `/docs/strategy/value-proposition.md`
**Generated insights:**
- "Privacy-first" is table stakes, not differentiator
- "Concierge experience" positions us above directories
- "Affirming" is overused — use "understand your lived experience"

**Application:**
- Homepage tagline: "Find your person. Feel understood."
- Avoided "inclusive" (generic) → Used specific communities

### `/docs/strategy/competitive-analysis.md`
**Competitors analyzed:**
- Psychology Today (generic, ad-driven)
- GoodTherapy (US-focused, not identity-specific)
- PACFA (professional directory, not client-friendly)
- Local queer directories (incomplete, not national)

**Differentiation:**
- Only matching concierge (not just directory)
- Privacy-first architecture
- Built for marginalized communities specifically
- Melbourne → Victoria → Australia expansion path

### `/docs/design-system/THERAPAIR-DESIGN-SYSTEM.md`
**Design principles derived from strategy:**
- Colors evoke warmth, earth (not clinical blue/white)
- Typography approachable (Open Sans, not corporate sans-serif)
- Language conversational ("your person" not "providers")
- UI progressive disclosure (reduce overwhelm)

---

## 🛠️ Technical Strategy Prompts

### Database Optimization Prompt
**Prompt structure:**
```markdown
# Notion Database Optimization for National Scale

## Context
Current: 193 therapists in Notion, Melbourne-focused

## Goal
Structure database to support Victoria → Australia expansion

## Questions
1. What fields enable precise matching?
2. How to standardize location (suburbs vs regions)?
3. How to handle pricing (bulk billing, sliding scale)?
4. What metadata improves discoverability?

## Constraints
- Must integrate with existing matching algorithm
- Therapist-friendly data entry
- Privacy-first (no PII in Notion)

## Output
SQL-like schema + migration guide
```

**Claude's output:**
- Added "Price Tier" (Bulk Billing / Affordable / Standard)
- Standardized "Location" (Melbourne / Regional Victoria / Online)
- Created "Mini Bio" (150 chars, SEO-friendly)
- Defined "Specializations" taxonomy

---

## 💡 Copywriting Prompt System

### Tone Guidelines Generated
**Prompt:** "Define copywriting principles for mental health platform serving marginalized communities"

**Claude's output:**
| ✅ Use | ❌ Avoid |
|--------|----------|
| Your person | Provider |
| Understand | Treat |
| LGBTQI+ | Diverse |
| Affirming | Accepting |
| Feel safe | Comfortable |

**Application:**
- All copy reviewed against this rubric
- Therapist bios edited for consistency
- Form language made warm, not transactional

---

## 📊 Strategy Metrics

### How We Measure Strategy Success

**User engagement:**
- % completing matching journey (target: >70%)
- Time spent on results page (longer = better match quality)
- Form submission rate (target: >50% of completions)

**Qualitative:**
- User feedback mentions "understood," "safe," "finally"
- Therapists say clients arrive "pre-qualified"
- Community partners recommend Therapair organically

**Business:**
- Therapist network growth (organic applications)
- Geographic expansion (Victoria → NSW → National)
- Sustainability path (therapist subscriptions, not ads)

---

## 🔮 Future Strategy Modules

### Planned but not yet executed:
1. **SEO Strategy** — Long-tail keywords for marginalized therapy searches
2. **Content Marketing** — Educational resources (therapist interviews, guides)
3. **Partnership Strategy** — GPs, community health centers, universities
4. **Expansion Roadmap** — State-by-state launch sequence
5. **Sustainability Model** — Revenue without compromising mission

---

## ❓ Questions for Expansion

1. Which strategy prompts had the biggest impact?
2. Were there prompts that failed or missed the mark?
3. How often were strategy docs revisited/updated?
4. Could this prompt framework be open-sourced?
5. What would a "Strategy Prompt Library" look like?

---

## 🔗 Related Documents

- **[01_vision_and_origin.md](./01_vision_and_origin.md)** — Mission feeds strategy
- **[03_landing_page_and_forms.md](./03_landing_page_and_forms.md)** — Strategy → Copy
- **[08_lessons_and_principles.md](./08_lessons_and_principles.md)** — Methodology learnings

---

## 📸 Assets (to be added)

- [ ] Sample strategy prompt (before/after)
- [ ] Cursor conversation showing prompt execution
- [ ] Strategy document folder structure
- [ ] Impact examples (prompt → product change)

---

## 🎓 Replicable Framework

### How Others Can Use This

**For any product/service:**
1. Identify key strategy areas (audience, value prop, GTM, etc.)
2. Write structured prompts (context, goals, questions, output format)
3. Execute with Claude/GPT-4
4. Integrate outputs into product decisions
5. Iterate prompts as product evolves

**Why it works:**
- Forces clarity (prompts must be specific)
- Modular (can tackle one area at a time)
- Versioned (prompts are code, track in Git)
- Agentic (AI does research/synthesis, human guides)

---

*This document is a living prompt. Expand it by feeding it back to Claude with additional strategy modules, execution examples, or methodology refinements.*
