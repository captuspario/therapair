# 07 — Documentation and Onboarding

## 🎯 Purpose
Document the multi-audience onboarding system, in-product documentation, and knowledge transfer strategies for Therapair.

---

## 👥 Three Audience Onboarding Paths

### 1. For Therapy Seekers
**Goal:** Make the search process feel supportive, not overwhelming

**Onboarding journey:**
```
First visit
  ↓
Hero message validates need ("Find your person. Feel understood.")
  ↓
Explainer: "How it works" (3 steps: Answer questions, See matches, Request intro)
  ↓
Social proof: Testimonials showing "finally understood" moments
  ↓
Privacy assurance: "No tracking, no data mining"
  ↓
CTA: "Start Matching Journey"
  ↓
[Enter matching flow — see below]
```

**In-journey guidance:**
- Progressive disclosure (one question at a time)
- Context tooltips (why we ask each question)
- Option to skip or say "not sure"
- Progress indicator (Question 3 of 9)

**Post-match onboarding:**
- "Here's what happens next" explainer
- Realistic expectations (1-2 days for intro)
- FAQ: What if I don't like my matches?
- Email confirmation with next steps

---

### 2. For Therapists
**Goal:** Make onboarding simple, values-aligned, and trust-building

**Onboarding journey:**
```
Discover Therapair (organic, referral, or direct)
  ↓
"For Therapists" landing section
  ↓
Value proposition: Reach underserved communities you care about
  ↓
How it works: Profile → Matching → Intro → You take it from there
  ↓
Privacy commitment: We don't sell data or spam you
  ↓
CTA: "Join Our Network"
  ↓
[Onboarding form]
  ↓
Confirmation email with:
  - Profile review timeline (1-2 days)
  - How to update info
  - What happens when matched
```

**Profile setup guidance:**
```markdown
# Therapist Profile Guide

## What makes a great Therapair profile?

### Your Bio (150-300 words)
✅ Start with who you serve (not credentials)
✅ Name specific communities/experiences
✅ Use warm, first-person language
✅ Mention approach but don't jargon-dump

❌ Don't lead with "I have 15 years experience..."
❌ Don't list every qualification
❌ Don't be overly formal

**Example:**
"I work with queer and trans folks navigating identity, relationships, 
and life transitions. As a queer therapist myself, I get the nuances of 
coming out, chosen family, and community complexities. I use IFS and 
somatic approaches to help you reconnect with your authentic self."

### Specializations
Be specific! Instead of:
- ❌ "Anxiety and depression"

Try:
- ✅ "Social anxiety in neurodivergent adults"
- ✅ "Queer relationship challenges"
- ✅ "Complex PTSD and trauma recovery"
```

---

### 3. For Contributors/Collaborators
**Goal:** Enable community expansion, open-source contributions, and partner integrations

**Documentation structure:**
```
/docs/
├── README.md                    # Project overview
├── CONTRIBUTING.md              # How to contribute code/content
├── technical/
│   ├── architecture.md          # System design
│   ├── matching-algorithm.md    # How matching works
│   └── deployment.md            # How to deploy
├── database/
│   ├── schema.md                # Notion database structure
│   └── optimization.md          # Scaling guidelines
└── guides/
    ├── therapist-onboarding.md  # For practitioners
    └── partner-integration.md   # For referral sources
```

**Key documents:**
- **Technical README** — Setup, run locally, test
- **Matching Algorithm Docs** — How therapists are ranked
- **Database Schema** — Fields, types, constraints
- **Deployment Guide** — Hostinger setup, environment variables
- **Security Guide** — Token management, privacy practices

---

## 📚 In-Product Documentation

### Contextual Help

**Question tooltips (matching journey):**
```
Q: "What brings you to therapy?"
ℹ️  Tooltip: "This helps us match you with therapists who specialize 
   in your specific needs. You can select multiple options."
```

**Privacy assurances (form submission):**
```
Before submit button:
🔒 "Your information goes directly to us. We don't use tracking or 
    sell data. Read our privacy policy →"
```

**Expected timeline (confirmation page):**
```
✅ Request received!

What happens next:
1. We review your request (within 1 business day)
2. We send a personal introduction via email
3. You connect directly with the therapist
4. We follow up to see how it went (optional)

Questions? Reply to your confirmation email.
```

---

## 🎓 Knowledge Base (Future)

### Planned Resources

**For therapy seekers:**
- How to know if a therapist is right for you
- What to expect in first session
- How to talk about identity/trauma
- Insurance & Medicare guide (Australia)
- Crisis resources

**For therapists:**
- Marketing to underserved communities ethically
- Inclusive practice tips
- Notion database best practices
- Community partnership ideas

**Format:**
- Blog-style articles (SEO-friendly)
- Downloadable guides (PDF)
- Video tutorials (therapist onboarding)
- Community forum (peer support)

---

## 📖 Documentation Principles

### Writing Style
- **Clear, not clever** — Simple language, short sentences
- **Empathetic, not patronizing** — Acknowledge difficulty without being condescending
- **Specific, not generic** — Examples over abstractions
- **Action-oriented** — Next steps always clear

### Accessibility
- ✅ Alt text for all images
- ✅ High contrast (WCAG AA)
- ✅ Semantic HTML (screen readers)
- ✅ Keyboard navigation
- ✅ Plain language (Grade 8 reading level)

### Maintenance
- Review docs quarterly
- Update with user feedback
- Version control (Git)
- Changelog for major updates

---

## 🔄 Onboarding Optimization

### Metrics to Track
- **Therapy seekers:**
  - % completing matching journey
  - Drop-off points (which questions?)
  - Form submission rate
  - Time to first therapist contact

- **Therapists:**
  - Application completion rate
  - Profile approval time
  - Match rate (how often selected)
  - Retention (active after 6 months?)

### A/B Tests (Future)
- Hero message variations
- Question order/wording
- Number of questions (9 vs 6 vs 12)
- Result presentation (cards vs list)

---

## 🧪 User Testing Insights

### What we learned (qualitative)

**Therapy seekers:**
> "I loved that it asked about my identity first, not just symptoms."

> "The 'not sure' option made me feel less pressured."

> "I wish I could see more therapists — only got 3 matches."

**Therapists:**
> "Easiest onboarding I've done. Other platforms want my whole life story."

> "I appreciate that you edited my bio — made it warmer."

> "How do I know if I'm being shown to people? Would love analytics."

**Changes made:**
- ✅ Added "why we ask this" tooltips
- ✅ Increased match count (3 → 5 therapists)
- ✅ Created therapist profile guide
- 🔜 Planned: Therapist dashboard (match analytics)

---

## 📱 Widget Embeds

### For Partner Sites
**Goal:** Unison (and others) can embed matching journey on their site

**Embed code:**
```html
<iframe 
  src="https://therapair.com.au/matching-journey"
  width="100%" 
  height="800px"
  frameborder="0"
  title="Therapair Matching Journey"
></iframe>
```

**Or JavaScript widget:**
```html
<div id="therapair-widget"></div>
<script src="https://therapair.com.au/widget.js"></script>
<script>
  Therapair.init({
    container: '#therapair-widget',
    theme: 'unison' // Custom branding
  });
</script>
```

**Documentation for partners:**
- Integration guide (copy/paste code)
- Branding customization options
- Analytics access (how many completions)
- Co-branded confirmation emails

---

## ❓ Questions for Expansion

1. What documentation do users request most often?
2. Which onboarding steps cause the most drop-off?
3. Do therapists update their profiles after onboarding?
4. Would a video tutorial improve completion rates?
5. Should there be a "sandbox" mode for trying the journey?

---

## 🔗 Related Documents

- **[01_vision_and_origin.md](./01_vision_and_origin.md)** — Mission shapes onboarding tone
- **[06_strategy_prompt_framework.md](./06_strategy_prompt_framework.md)** — How docs were generated
- **[08_lessons_and_principles.md](./08_lessons_and_principles.md)** — Onboarding learnings

---

## 📸 Assets (to be added)

- [ ] Onboarding flow screenshots
- [ ] Therapist profile guide (PDF)
- [ ] Tooltip examples
- [ ] Partner embed demo

---

*This document is a living prompt. Expand it by feeding it back to Claude with user feedback, analytics, or new onboarding ideas.*
