# 02 — First Widget: Typebot Implementation

## 🎯 Purpose
Document the first working product — the Typebot-based therapist-matching quiz embedded on Unison Mental Health's website.

---

## 🚀 Why Typebot?

### Selection Criteria
**Chosen because:**
- ✅ Open-source and self-hostable
- ✅ No-code quiz builder with logic branching
- ✅ Embeddable widget format
- ✅ Tag-based filtering capability
- ✅ Privacy-friendly (no third-party tracking)

**Alternatives considered:**
- Typeform — Too corporate, data privacy concerns
- Custom build — Too slow for MVP validation
- Google Forms — No branching logic, poor UX

---

## 🧩 Quiz Structure

### Question Flow
1. **Location** — Melbourne, Regional Victoria, Online
2. **Concerns** — Anxiety, trauma, LGBTQI+, neurodiversity, etc.
3. **Approach** — CBT, EMDR, psychodynamic, somatic, etc.
4. **Identity factors** — LGBTQI+, neurodivergent, cultural background
5. **Practical needs** — Bulk billing, session format, accessibility

### Logic Design
- **Branching:** Skip questions based on previous answers
- **Multi-select:** Allow multiple concerns/identities
- **Progressive disclosure:** Start broad, get specific
- **Exit paths:** Option to skip or say "not sure"

---

## 📊 Matching Logic

### Tag-Based System
Each therapist in the CSV had tags like:
```
LGBTQI+, Trauma, EMDR, Melbourne, Bulk-Billing, Neurodiversity
```

User responses were converted to tags:
```
User selects: "Anxiety" → Tag: anxiety
User selects: "LGBTQI+ support" → Tag: lgbtqi
User selects: "Melbourne" → Tag: melbourne
```

**Matching algorithm:**
- Count overlapping tags
- Weight by category (location > expertise > approach)
- Return top 3-5 matches

### Limitations
- ❌ No nuanced weighting (all tags equal)
- ❌ Hard to update therapist data (manual CSV edits)
- ❌ No feedback loop (couldn't track what worked)
- ❌ Limited personalization (same results for similar inputs)

---

## 📁 Therapist CSV Structure

```csv
Name, Email, Phone, Location, Expertise, Approach, Bulk Billing, Tags
Dr. Emma Clarke, emma@example.com, 0400..., Melbourne, "LGBTQI+, Trauma", "EMDR, IFS", Yes, "lgbtqi,trauma,emdr,melbourne,bulk-billing"
```

### Data Management Challenges
- Manual entry prone to inconsistency
- No version control on CSV
- Hard to validate data quality
- Tags had to be perfectly matched (case-sensitive)

---

## 🎨 Widget Design

### Embedding
```html
<script src="https://typebot.io/embed.js"></script>
<div id="typebot-therapair"></div>
<script>
  Typebot.init({
    id: "therapair-quiz",
    container: "#typebot-therapair"
  });
</script>
```

### Styling
- Custom CSS to match Unison's branding
- Responsive design for mobile
- Warm color palette (avoided clinical blue/white)

---

## 📈 Results & Learnings

### What Worked
- ✅ Validated demand (people completed the quiz)
- ✅ Proved matching logic was valuable
- ✅ Users appreciated conversational flow
- ✅ Fast to deploy (MVP in days, not weeks)

### What Didn't
- ❌ Tag system too rigid
- ❌ No way to handle ambiguous needs
- ❌ CSV management was painful
- ❌ No analytics on which questions mattered most
- ❌ Typebot had occasional bugs/downtime

### User Feedback
> "Finally, someone asks the right questions."

> "I loved that it understood I'm queer AND neurodivergent."

> "Only got 2 matches — wish there were more options."

---

## 🔄 Evolution Path

This Typebot widget led directly to:
1. **Notion database** (replaced CSV for therapist data)
2. **Custom matching journey** (React-based, more control)
3. **Weighted algorithm** (smarter than tag counting)
4. **Standalone platform** (not just embedded widget)

---

## ❓ Questions for Expansion

1. Do we have screenshots or video of the Typebot quiz?
2. What was the completion rate? Drop-off points?
3. How many therapists were in the original CSV?
4. Were there specific bugs or user complaints?
5. How long did it take to build the first version?

---

## 🔗 Related Documents

- **[01_vision_and_origin.md](./01_vision_and_origin.md)** — Why we needed this
- **[03_landing_page_and_forms.md](./03_landing_page_and_forms.md)** — Website context
- **[08_lessons_and_principles.md](./08_lessons_and_principles.md)** — Learnings applied

---

## 📸 Assets (to be added)

- [ ] Screenshot of Typebot quiz UI
- [ ] Sample CSV structure
- [ ] Embed code snippet
- [ ] User flow diagram

---

*This document is a living prompt. Expand it by feeding it back to Claude with additional context, screenshots, or analytics.*
