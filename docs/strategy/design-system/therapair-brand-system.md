# Therapair – Design System

A lightweight, scalable design system for the Therapair web experience.

---

## 1️⃣ Brand Essence
**Core Idea:** Inclusive, warm, and intelligent connection between people and mental‑health professionals.  
**Tone:** Calm · Authentic · Empathic · Grounded · Human.

---

## 2️⃣ Colour Palette

| Role | Name | Hex | Usage |
|------|------|-----|--------|
| **Primary** | Rosewood | `#9A634D` | Buttons, links, accents |
| **Accent** | Calm Clay | `#B88B76` | Highlights, icons, dividers |
| **Background** | Alabaster Sand | `#FAF9F7` | Page background |
| **Text Primary** | Charcoal | `#333333` | Headings, body text |
| **Text Secondary** | Warm Grey | `#666666` | Captions, metadata |
| **Success** | Sage Green | `#609169` | Confirmation states |
| **Error** | Clay Red | `#C8553D` | Validation, alerts |
| **CTA Hover** | Terracotta | `#A75A3C` | Hover/focus on primary CTAs |
| **Divider** | Soft Beige | `#EAE6E2` | Borders, light separations |

---

## 3️⃣ Typography

| Element | Font | Size | Weight | Example |
|----------|------|------|--------|----------|
| **H1** | Work Sans / DM Sans | 56 px | 700 | “Therapy that fits.” |
| **H2** | Work Sans / DM Sans | 32 px | 600 | “Why we started Therapair” |
| **Body** | Inter | 18 px | 400 | Readable long text |
| **Small** | Inter | 14 px | 400 | Footnotes, captions |
| **Button** | Work Sans | 16 px | 600 | All caps, tracking +1 % |

Line‑height 1.4–1.6 × font‑size.  
Colour contrast ≥ 4.5:1 for accessibility.

---

## 4️⃣ Components

### Buttons
- **Primary:** Rosewood background, white text, 8 px radius.  
- **Secondary:** Transparent background, 1 px Rosewood border.  
- Hover → Terracotta; Focus → Rosewood + 2 px outline.

### Cards
- **TherapistCard**
  - 16 px padding, 12 px radius
  - Portrait (1:1.2)
  - Name → H3, 16 px gap
  - “Good for” tags with Calm Clay background (#B88B76 10 %)

- **AudienceCard**
  - Icon + Label + Short Text  
  - Shadow 1px 2px 8px rgba(0, 0, 0, 0.05)

### Forms
- Rounded inputs, border #EAE6E2
- Focus border Rosewood
- Submit button = Primary style
- Success = Sage Green banner

---

## 5️⃣ Layout & Grid
- **Container Width:** 1200 px max
- **Gutters:** 24 px desktop, 16 px mobile
- **Grid:** 12 columns (Desktop) → 4 columns (Mobile)
- **Section Spacing:** 96 px desktop, 64 px tablet, 48 px mobile

---

## 6️⃣ Imagery & Illustration
- Use real therapist portraits (neutral backgrounds).
- No stock therapy clichés.
- Optional abstract background gradients:  
  `linear-gradient(135deg, #FAF9F7 0%, #F1ECE7 100%)`

---

## 7️⃣ Accessibility Guidelines
- Minimum contrast ratio 4.5:1.  
- Keyboard‑navigable buttons.  
- Form labels and ARIA tags.  
- Avoid gendered or pathologising language.

---

## 8️⃣ Motion / Micro‑Interactions
- Fade‑in on scroll (200–300 ms ease‑out)  
- Button hover → colour transition 150 ms  
- Card reveal → slide up & fade in (400 ms ease)

---

## 9️⃣ Iconography
- Use Lucide / Feather icons 16 px stroke.  
- Outline style, no fills.  
- Stroke colour = Calm Clay #B88B76.

---

## 10️⃣ Usage Examples
**Primary Button**
```html
<button class="btn-primary">Join Early Access</button>