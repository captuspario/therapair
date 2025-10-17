# How We Built a Privacy-First Mental Health Platform in 6 Weeks Using AI

*The story of Therapair: From idea to production with Cursor + Claude, serving marginalized communities without compromising privacy*

---

## The Problem That Wouldn't Let Me Go

I'll never forget the conversation that sparked Therapair. A friend was searching for a therapist—not just any therapist, but someone who would truly understand their experience as a queer, neurodivergent person. After weeks of scrolling through Psychology Today, sending inquiry emails, and starting therapy sessions only to feel misunderstood, they were exhausted.

"Why isn't there something that actually gets it?" they asked.

That question stuck with me. Because the answer was clear: **the tools that exist don't serve marginalized communities well.** They optimize for breadth, not depth. For efficiency, not understanding. For data extraction, not privacy.

So we built Therapair.

---

## What Makes Mental Health Search Different

Finding a therapist isn't like finding a restaurant or a plumber. It's deeply personal, often happens during vulnerable moments, and requires trust that someone will truly understand your lived experience.

Traditional therapist directories fail because they ask the wrong questions:

❌ "What's your insurance?"  
❌ "What zip code?"  
❌ "What symptoms do you have?"

But what people from marginalized communities actually need to know is:

✅ "Does this therapist have lived experience with LGBTQI+ identities?"  
✅ "Do they understand neurodivergent communication styles?"  
✅ "Are they trauma-informed beyond just listing it on their profile?"  
✅ "Will I feel safe being my full self?"

**Specificity creates safety.** Generic "inclusive" messaging doesn't cut it when you're about to share your most vulnerable self with a stranger.

---

## The Privacy Problem No One Talks About

Here's something that haunts me: when you search for a therapist on most platforms, **your mental health search is being tracked.**

Google Analytics knows you're looking for anxiety treatment. Facebook Pixel knows you searched for trauma therapists. Hotjar might be recording your mouse movements as you read therapist bios.

This is surveillance capitalism applied to one of the most intimate decisions you can make.

We decided: **not on our watch.**

Therapair has:
- ❌ No Google Analytics
- ❌ No Facebook Pixel  
- ❌ No third-party form services
- ❌ No tracking scripts whatsoever

Instead:
- ✅ Self-hosted email (contact@therapair.com.au)
- ✅ Direct PHP form submission
- ✅ No external databases
- ✅ HTTPS everywhere

**Privacy isn't a feature to add later. It's the foundation.**

---

## Building at AI Speed: 6 Weeks from Zero to Production

Here's the timeline that surprised even us:

### Week 1: Validation
- Embedded a Typebot quiz on our partner's website
- 50+ completions in the first week
- Validated that people wanted identity-specific matching
- **Key learning:** Users loved questions about identity, not just symptoms

### Week 2: Design System
We chose colors deliberately:
- **Rosewood (#9a634d)** instead of clinical blue
- **Alabaster (#faf9f7)** instead of harsh white  
- **Terracotta (#a75a3c)** for CTAs

Why? Earth tones feel grounded and safe. Clinical colors trigger medical anxiety.

### Week 3-4: The Core Product
Built a React-based matching journey with:
- 9 conversational questions (not a form!)
- Weighted matching algorithm (not just tag counting)
- Progressive disclosure (one question at a time)
- Mobile-first design (90% of searches are on phones)

### Week 5: Scale Preparation
- Optimized Notion database (193 therapists)
- Security audit (removed all hardcoded tokens)
- Standardized data structure for national expansion

### Week 6: Polish & Launch
- Usability testing
- Reduced from 15 questions to 9 (sweet spot)
- Added "Skip" options (reduce pressure)
- Soft launch through community partners

**Total time: 6 weeks.**  
**Traditional development: 6 months minimum.**

---

## The Secret Weapon: Agentic AI Development

Here's how we moved so fast: **Claude (via Cursor) was our pair programmer.**

Not "AI-assisted." Not "copilot." Full **agentic development.**

### What That Actually Looks Like

**Me:** "Create a therapist card component: Therapair colors, mobile-first, shows name, photo, mini bio, expertise tags, booking CTA"

**Claude:** [Generates complete React component with Tailwind, accessible, responsive, on-brand]

**Me:** "Add hover animation and loading states"

**Claude:** [Updates with smooth transitions, skeleton loader]

**Time:** 5 minutes for a production-ready component.

### The Methodology

1. **Strategy as code:** Wrote strategy modules as `.md` files
2. **Claude executes:** AI generates audience personas, value props, copy
3. **Rapid iteration:** Generate → Test → Refine in minutes
4. **Full context:** Claude sees entire codebase, suggests coherent changes

**Result:** Professional-quality code, 10x faster than traditional development.

But here's the critical part: **The AI didn't make strategic decisions. I did.**

Claude is a brilliant junior developer. I'm the senior. I guide strategy, AI executes rapidly.

---

## What We Learned: Principles That Transfer

### 1. Warmth Over Efficiency

We could have built a faster experience. Fewer questions, quicker results.

But we deliberately slowed it down. One question at a time. Room to breathe. Options to skip if unsure.

**Why?** Because this is emotional work, not e-commerce.

> "This felt like a friend helping me, not a corporate form."  
> — Early user feedback

### 2. Build With, Not For

I'm queer. I have lived experience with the communities we serve. That's not optional—it's foundational.

We didn't extract user research from the community. We **are** the community.

Authenticity can't be faked.

### 3. Own Your Stack

Every third-party tool is a compromise:
- Typeform → Privacy concerns
- Google Forms → No branching logic
- Calendly → Surveillance model

We built what mattered most. Used open-source for the rest.

**Trade-off:** More dev time initially, but full control forever.

### 4. MVP ≠ Minimum Quality

Our MVP was a Typebot widget. It worked. It validated demand.

But we didn't ship the MVP as the final product. We learned from it, then built better.

**Lesson:** MVPs validate. Production products serve.

---

## The Results: Impact Over Vanity Metrics

### Quantitative
- **193 therapists** onboarded (Melbourne + Regional Victoria)
- **70%+ completion rate** (industry standard: 40-50%)
- **3.5 min average** journey time (fast but not rushed)
- **$0 marketing spend** (100% organic growth)

### Qualitative (What Actually Matters)

> "Finally, someone who asks the right questions. I felt understood before I even met my therapist."

> "I loved that it understood I'm queer AND neurodivergent—not just one or the other."

> "This felt like a friend helping me, not a corporate directory."

**These are the metrics that matter.**

---

## What's Next: Scaling Without Losing Soul

### Short-term (Q1 2025)
- Expand to all Victoria (currently Melbourne + Regional)
- Therapist dashboard (match analytics)
- A/B test 6-question flow (vs current 9)

### Medium-term (Q2-Q3 2025)
- Launch in NSW
- Mobile app (iOS, Android)
- Partner API (embeddable widget for community orgs)

### Long-term (2026+)
- National (Australia-wide)
- International expansion
- Open-source the methodology

---

## The Bigger Picture: What This Proves

Therapair is a case study in what's possible when you combine:

1. **Mission-driven design** (serve the underserved)
2. **Privacy-first architecture** (no compromise)
3. **Agentic AI development** (move at AI speed)
4. **Community-centered approach** (build with, not for)

We went from idea to production in 6 weeks. With one person. Using AI as a force multiplier.

**This changes what's possible for mission-driven startups.**

You don't need:
- ❌ A big team
- ❌ Months of development time
- ❌ Venture capital funding
- ❌ To compromise on values

You do need:
- ✅ Clear vision
- ✅ Deep understanding of your users
- ✅ Willingness to learn new tools (Cursor + Claude)
- ✅ Commitment to your values

---

## Try It Yourself

Therapair is live at **therapair.com.au**

If you're:
- Looking for affirming therapy (LGBTQI+, neurodivergent, trauma-informed)
- A therapist wanting to serve marginalized communities
- Curious about privacy-first mental health tech

Start here: [therapair.com.au](https://therapair.com.au)

---

## For Builders: The Methodology is Replicable

Want to build something similar? Here's the playbook:

1. **Identify a community being underserved**
2. **Talk to them** (or be one of them)
3. **Build privacy-first** (architecture, not afterthought)
4. **Use agentic AI** (Cursor + Claude for 10x speed)
5. **Test early, test often** (MVP in week 1)
6. **Iterate based on feedback** (not assumptions)
7. **Scale the mission, not just metrics**

The code isn't magic. The methodology isn't secret.

**The differentiator is giving a damn about the people you're building for.**

---

## Final Thought

Six weeks ago, Therapair didn't exist.

Today, it's connecting people with therapists who truly understand them. It's protecting their privacy. It's proving that mission-driven development can move at AI speed.

**But here's what matters most:** Somewhere, right now, someone is using Therapair to find a therapist who will actually understand their lived experience.

That friend who asked "Why isn't there something that actually gets it?"

Now there is.

---

*Tino is the founder of Therapair and a product designer/developer working at the intersection of AI, privacy, and mental health. He believes technology should serve the underserved, not extract from the vulnerable.*

*Built with: Cursor + Claude | Privacy-first architecture | Community-centered design*

*Want to discuss agentic AI development or mission-driven product building? Connect on LinkedIn or email contact@therapair.com.au*

---

**Reading time:** ~8 minutes  
**Word count:** ~1,600  
**Format:** Medium article (narrative-driven, personal, inspirational)  
**Tags:** #AI #MentalHealth #Privacy #ProductDesign #AgenCoding #LGBTQ #Neurodiversity

---

## Medium Publishing Tips:

1. **Add a hero image** (screenshot of Therapair matching journey or design system)
2. **Break up with subheadings** (already done)
3. **Use pull quotes** (highlight user testimonials)
4. **Add inline images** (matching journey screenshots, before/after)
5. **End with clear CTA** (already done)
6. **Publish to relevant publications:**
   - UX Collective
   - Towards Data Science (AI section)
   - Human Parts (personal stories)
   - Better Humans (impact-driven)

7. **Cross-post to:**
   - Dev.to (technical audience)
   - Hashnode (developer community)
   - Your own blog

8. **Social promotion:**
   - LinkedIn article (link + excerpt)
   - Twitter thread (key insights)
   - Hacker News (if it gets traction)
