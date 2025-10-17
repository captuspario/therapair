# 03 — Landing Page and Forms

## 🎯 Purpose
Document the website structure, audience separation (clients vs therapists), form handling, and page architecture for the Therapair standalone platform.

---

## 🏗️ Website Architecture

### Dual-Audience Design
**Two distinct pathways:**

1. **For Therapy Seekers**
   - Hero: "Find your person. Feel understood."
   - Matching journey CTA
   - Social proof / testimonials
   - FAQ focused on privacy & process

2. **For Therapists**
   - Value proposition: Reach underserved communities
   - Profile setup guidance
   - Onboarding form
   - Community alignment messaging

### Information Architecture
```
therapair.com.au/
├── index.html              (Main landing — dual audience)
├── matching-journey/       (React app for clients)
├── therapist-onboarding/   (Form for practitioners)
├── about/                  (Mission & values)
├── privacy/                (Privacy policy)
└── thank-you/              (Confirmation pages)
```

---

## ✍️ Copywriting Tone

### Emotional Principles
- **Warm, not clinical** — "Your person" not "provider"
- **Specific, not generic** — Name marginalized communities explicitly
- **Empowering, not prescriptive** — "You deserve..." not "You need..."
- **Conversational, not corporate** — First person, contractions, human voice

### Key Messaging

**Hero Section:**
> "Find your person. Feel understood. Start healing."
>
> "Therapair connects you with affirming therapists who understand LGBTQI+, neurodivergent, and trauma-informed care."

**Value Proposition:**
- ✅ Matched to your identity & needs
- ✅ Privacy-first (no tracking)
- ✅ Inclusive by design
- ✅ Free for therapy seekers

**Social Proof:**
> "Finally, someone who gets it. The matching journey asked questions I didn't even know mattered."

---

## 🎨 Design System

### Color Palette (Therapair Design System)
```css
--therapair-rosewood: #9a634d    /* Primary brand color */
--therapair-alabaster: #faf9f7   /* Background */
--therapair-charcoal: #333333    /* Text */
--therapair-calm-clay: #b88b76   /* Accents */
--therapair-terracotta: #a75a3c  /* CTAs */
--therapair-success: #609169     /* Confirmation */
```

### Typography
- **Headings:** Open Sans Bold, warm & approachable
- **Body:** Open Sans Regular, readable
- **Emotional moments:** Slightly larger, letter-spaced

### UI Patterns
- Rounded corners (soften edges)
- Generous whitespace (reduce overwhelm)
- Progressive disclosure (one question at a time)
- Mobile-first (most users on phones)

---

## 📝 Form Architecture

### Privacy-First Submission

**No third-party form services** — Forms submit directly to:
- PHP handler on Hostinger
- Sends to `contact@therapair.com.au`
- No data stored in external databases

**Form flow:**
```
User fills form
  ↓
Client-side validation (React)
  ↓
POST to /api/booking-request.php
  ↓
PHP sends email via Hostinger SMTP
  ↓
User sees confirmation
  ↓
Email arrives at contact@therapair.com.au
```

### Client Form Fields
```javascript
{
  name: "Required",
  email: "Required",
  phone: "Optional",
  preferredTherapist: "From matching results",
  message: "Optional notes",
  consent: "Checkbox — privacy policy"
}
```

### Therapist Onboarding Form
```javascript
{
  fullName: "Required",
  email: "Required",
  phone: "Required",
  location: "Melbourne / Regional / Online",
  expertise: "Multi-select tags",
  approach: "Multi-select modalities",
  bulkBilling: "Yes/No",
  sessionFee: "If not bulk billing",
  bio: "Textarea — will be edited for consistency",
  website: "Optional",
  availability: "Optional"
}
```

---

## 🔒 Privacy Implementation

### No Tracking Scripts
```html
<!-- What we DON'T use -->
<!-- ❌ Google Analytics -->
<!-- ❌ Facebook Pixel -->
<!-- ❌ Hotjar / session recording -->
<!-- ❌ Third-party form services -->
```

### What We DO Use
- Self-hosted fonts (no Google Fonts CDN)
- Direct email submission
- Server-side form handling
- Optional browser localStorage (user consent)

### Privacy Policy Highlights
- No data sold or shared
- Emails stored only in secure inbox
- User can request deletion anytime
- HIPAA-lite thinking (though not clinical service)

---

## 🧭 User Journey

### For Therapy Seekers
1. Land on homepage
2. Read hero + value props
3. Click "Start Matching Journey"
4. Answer 9 conversational questions
5. See 3-5 matched therapists
6. Click "Request Introduction"
7. Fill simple form (name, email, message)
8. Receive confirmation
9. Tino manually sends introductions

### For Therapists
1. Land on homepage or direct link
2. Read "For Therapists" section
3. Click "Join Our Network"
4. Fill onboarding form
5. Receive confirmation email
6. Tino reviews & adds to Notion database
7. Profile goes live in matching journey

---

## 📱 Responsive Design

### Mobile-First Approach
- 90%+ of therapy seekers search on mobile
- Single-column layouts
- Large touch targets (min 44px)
- Minimal scrolling per screen
- Bottom navigation for matching journey

### Breakpoints
```css
/* Mobile: Default */
/* Tablet: 768px */
/* Desktop: 1024px */
```

---

## 🚀 Performance Optimization

### Speed Targets
- < 2s initial load
- < 100ms interaction response
- Minimal JavaScript (React only for matching journey)
- Lazy-load images

### Hosting
- **Hostinger** shared hosting
- CDN enabled
- Gzip compression
- Minified assets

---

## ❓ Questions for Expansion

1. Do we have before/after screenshots of design iterations?
2. What was the bounce rate on the landing page?
3. How many form submissions in first month?
4. Were there A/B tests on copy or CTAs?
5. What user feedback shaped the design?

---

## 🔗 Related Documents

- **[01_vision_and_origin.md](./01_vision_and_origin.md)** — Design ethos origins
- **[04_email_hosting_and_privacy.md](./04_email_hosting_and_privacy.md)** — Email setup details
- **[06_strategy_prompt_framework.md](./06_strategy_prompt_framework.md)** — How copy was generated

---

## 📸 Assets (to be added)

- [ ] Homepage screenshot (desktop + mobile)
- [ ] Matching journey UI
- [ ] Form submission flow
- [ ] Design system color swatches

---

*This document is a living prompt. Expand it by feeding it back to Claude with additional context, screenshots, or user feedback.*
