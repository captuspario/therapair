# Visual Assets Specification for Therapair Case Studies

**Purpose:** Define all visual assets needed for both case study versions  
**Status:** Specification complete, awaiting asset creation  
**Priority:** High-priority assets marked with ⭐

---

## Asset Inventory

### ✅ EXISTING ASSETS (Already Captured)

**Location:** `/therapair-matching-journey/screenshots/`

| File | Description | Usage | Status |
|------|-------------|-------|--------|
| `01-question-location.png` | Question 1 (location selection) | Question flow examples | ✅ Ready |
| `02-question-who.png` | Question 2 (who it's for) | User flow | ✅ Ready |
| `03-question-concerns.png` | Question 3 (concerns, blank) | Multi-select UI | ✅ Ready |
| `03b-concerns-selected.png` | Question 3 (with selections) | Interaction state | ✅ Ready |
| `04-question-approach.png` | Question 4 (therapeutic approach) | Flow continuation | ✅ Ready |
| `05-question-community.png` | Question 5 (community identity) | Identity-specific design | ✅ Ready |
| `06-question-character.png` | Question 6 (therapist traits) | Preference selection | ✅ Ready |
| `07-question-languages.png` | Question 7 (languages) | Accessibility feature | ✅ Ready |
| `08-question-accessibility.png` | Question 8 (accessibility needs) | Inclusive design | ✅ Ready |
| `09-question-pricing.png` | Question 9 (pricing options) | Final question | ✅ Ready |
| `mobile-01-question.png` | Mobile view | Responsive design | ✅ Ready |

**Total existing:** 11 screenshots

---

## 🎨 NEW ASSETS NEEDED

### Priority 1: Essential (Create First) ⭐

#### 1. Design System Showcase
**Filename:** `design-system-full.png`  
**Dimensions:** 1920x1200px  
**Content:**
- Color palette (5 swatches with hex codes)
- Typography scale (6 sizes, Open Sans)
- Button states (primary, secondary, hover, disabled)
- Card component (therapist profile example)
- Form inputs (text, select, multi-select)

**Creation method:** Figma export or HTML/CSS mockup  
**Usage:** Both case studies (design system section)  
**Priority:** ⭐ HIGH

---

#### 2. User Flow Diagram
**Filename:** `user-flow-diagram.png`  
**Dimensions:** 1600x1200px (landscape)  
**Content:**
- Start → 9 questions → Results → Booking
- Branching logic (show/skip paths)
- Icons for each step
- Color-coded by phase

**Creation method:** Figma, Whimsical, or Miro  
**Usage:** Consultancy portfolio (IA section)  
**Priority:** ⭐ HIGH

**Suggested structure:**
```
[Start] → [Q1: Location] → [Q2: Who] → [Q3: Concerns] → ...
              ↓                 ↓              ↓
         [Filter]          [Branch]      [Skip option]
              ↓                 ↓              ↓
         [Continue] → [Continue] → [Continue] → [Results (5 cards)]
                                                       ↓
                                              [Select Therapist]
                                                       ↓
                                               [Booking Form]
                                                       ↓
                                               [Confirmation]
```

---

#### 3. Results Page (Therapist Cards)
**Filename:** `results-therapist-cards.png`  
**Dimensions:** 1440x900px  
**Content:**
- 3-5 therapist profile cards in vertical layout
- Names, photos (placeholder faces), mini bios
- Expertise tags
- "Request Introduction" CTA
- Mobile and desktop views side-by-side

**Creation method:** Playwright screenshot of actual app  
**Usage:** Both case studies (results section)  
**Priority:** ⭐ HIGH

**Playwright script:**
```javascript
// Navigate to results with specific answers
// Take full-page screenshot
// Capture mobile viewport separately
```

---

#### 4. Privacy Architecture Flow
**Filename:** `privacy-flow-diagram.png`  
**Dimensions:** 1600x800px (wide)  
**Content:**
- User → Form (React) → PHP Handler → Hostinger SMTP → Email
- Red X marks over "No Google Analytics, Facebook Pixel, etc."
- Green checkmarks for "HTTPS, .env secrets, Direct submission"

**Creation method:** Figma or draw.io  
**Usage:** Both case studies (privacy section)  
**Priority:** ⭐ HIGH

**Visual style:** Clean, minimal, arrows showing data flow

---

### Priority 2: Important (Create Next)

#### 5. Landing Page (Hero)
**Filename:** `landing-page-hero.png`  
**Dimensions:** 1920x1080px (full viewport)  
**Content:**
- Hero section: "Find your person. Feel understood."
- Value props (3 pillars)
- CTA buttons
- Social proof quote

**Creation method:** Playwright screenshot of therapair.com.au  
**Usage:** Both case studies (landing page section)  
**Priority:** MEDIUM

---

#### 6. Mobile Screens Grid
**Filename:** `mobile-screens-grid.png`  
**Dimensions:** 1920x1080px (3 phones side-by-side)  
**Content:**
- 3 mobile screenshots in phone frames
- Question screen → Selection → Next question
- Show progression

**Creation method:** Playwright + image composition  
**Usage:** Consultancy portfolio (responsive design section)  
**Priority:** MEDIUM

---

#### 7. Cursor + Claude Screenshot
**Filename:** `cursor-claude-development.png`  
**Dimensions:** 1920x1080px  
**Content:**
- Cursor editor interface
- Claude chat sidebar generating component
- Code diff showing AI-generated React component
- Terminal with successful build

**Creation method:** Actual screenshot during development  
**Usage:** Both case studies (AI development section)  
**Priority:** MEDIUM

---

#### 8. Typebot Widget (MVP)
**Filename:** `typebot-mvp-screenshot.png`  
**Dimensions:** 1440x900px  
**Content:**
- Typebot quiz embedded on Unison website
- Question visible
- Unison branding + Therapair widget

**Creation method:** Historical screenshot (if available) or recreate  
**Usage:** Both case studies (MVP phase)  
**Priority:** MEDIUM

---

### Priority 3: Nice-to-Have (Create If Time)

#### 9. Playwright Test Results
**Filename:** `playwright-test-results.png`  
**Dimensions:** 1920x1080px  
**Content:**
- Playwright report showing passing tests
- Screenshot artifacts grid
- Test duration, pass/fail stats

**Creation method:** Screenshot of `playwright-report/index.html`  
**Usage:** Consultancy portfolio (testing section)  
**Priority:** LOW

---

#### 10. Notion Database Structure
**Filename:** `notion-database-structure.png`  
**Dimensions:** 1920x1080px  
**Content:**
- Notion database view showing columns
- Sample therapist entries (anonymized)
- Filters/sorts visible

**Creation method:** Screenshot of Notion (blur sensitive data)  
**Usage:** Consultancy portfolio (database section)  
**Priority:** LOW

---

#### 11. Before/After Comparison
**Filename:** `before-after-bio-comparison.png`  
**Dimensions:** 1600x600px (side-by-side)  
**Content:**
- LEFT: Generic therapist bio (formal, CV-style)
- RIGHT: Edited Therapair bio (warm, affirming)

**Creation method:** Text composition in design tool  
**Usage:** Both case studies (iteration examples)  
**Priority:** LOW

---

## 📸 Playwright Automation Scripts

### Script 1: Full Journey Screenshots
**Filename:** `capture-full-journey.spec.js`  
**Purpose:** Capture all 9 questions + results page

```javascript
// Already exists at:
// /therapair-matching-journey/tests/matching-journey.spec.js
// Modify to save to /therapair/portfolio-assets/
```

**Outputs:**
- `question-01-location.png` ✅ (already have)
- `question-02-who.png` ✅
- ... (all 9 questions)
- `results-page-full.png` ⭐ NEED
- `mobile-question-example.png` ✅

---

### Script 2: Results Page Focused
**Filename:** `capture-results-page.spec.js`  
**Purpose:** Capture therapist cards with good sample data

```javascript
test('Capture results page with 5 matches', async ({ page }) => {
  // Navigate through journey with specific answers
  await page.goto('http://localhost:3001');
  
  // Answer questions to get good match variety
  await page.click('text=Melbourne');
  await page.click('text=Myself');
  await page.click('text=Anxiety');
  await page.click('text=LGBTQI+ support');
  // ... complete journey
  
  // Wait for results
  await page.waitForSelector('.therapist-card');
  
  // Full page screenshot
  await page.screenshot({
    path: '../portfolio-assets/results-therapist-cards-desktop.png',
    fullPage: true
  });
  
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({
    path: '../portfolio-assets/results-therapist-cards-mobile.png',
    fullPage: true
  });
});
```

---

### Script 3: Landing Page Capture
**Filename:** `capture-landing-page.spec.js`  
**Purpose:** Capture hero section

```javascript
test('Capture landing page hero', async ({ page }) => {
  await page.goto('http://localhost:3001');
  
  // Wait for hero to load
  await page.waitForSelector('h1');
  
  // Capture viewport (hero section)
  await page.screenshot({
    path: '../portfolio-assets/landing-page-hero.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
});
```

---

## 🎨 Design Tool Mockups Needed

### Figma/Design Files to Create

#### 1. Design System Board
**Components:**
- Color palette with accessibility notes
- Typography scale with usage examples
- Spacing system (4px grid)
- Button component (all states)
- Card component variations
- Form elements library

**Export:** PNG (1920x1200px) + Figma link

---

#### 2. User Flow Diagram
**Tool:** Figma, Whimsical, FigJam, or Miro  
**Style:** Clean, minimal, Therapair colors  
**Export:** PNG (1600x1200px)

---

#### 3. Privacy Flow Diagram
**Tool:** Figma or draw.io  
**Style:** Technical but accessible  
**Export:** PNG (1600x800px)

---

## 📋 Asset Creation Checklist

### Immediate (Within 24 hours) ⭐
- [ ] Results page screenshot (Playwright)
- [ ] Design system mockup (Figma)
- [ ] User flow diagram (Figma/Whimsical)
- [ ] Privacy flow diagram (Figma/draw.io)

### Short-term (Within 1 week)
- [ ] Landing page hero (Playwright)
- [ ] Mobile screens grid (composition)
- [ ] Cursor + Claude screenshot (actual)
- [ ] Typebot MVP (historical or recreate)

### Nice-to-have (As time permits)
- [ ] Playwright test results
- [ ] Notion database structure
- [ ] Before/after comparison
- [ ] Additional mobile views

---

## 🔧 Technical Setup

### For Playwright Screenshots

```bash
# Navigate to matching journey
cd /Users/tino/Projects/therapair-matching-journey

# Ensure dev server is running
npm run dev

# Run screenshot capture scripts
npx playwright test tests/capture-*.spec.js --headed

# Screenshots save to ../therapair/portfolio-assets/
```

### For Design Mockups

**Tools needed:**
- Figma (free tier sufficient)
- Optional: Whimsical (for flows)
- Optional: draw.io (for technical diagrams)

---

## 📊 Asset Usage Matrix

| Asset | Therapair Case Study | Consultancy Portfolio |
|-------|---------------------|----------------------|
| Design system | ✅ | ✅ |
| User flow diagram | ❌ | ✅ |
| Results page | ✅ | ✅ |
| Privacy flow | ✅ | ✅ |
| Landing hero | ✅ | ✅ |
| Mobile grid | ✅ | ✅ |
| Cursor screenshot | ✅ | ✅ |
| Typebot MVP | ✅ | ✅ |
| Playwright tests | ❌ | ✅ |
| Notion database | ❌ | ✅ |
| Before/after | ✅ | ✅ |

---

## 💡 Tips for Asset Creation

### Screenshot Best Practices
- Use consistent browser (Chrome)
- Clear cache before capture
- Disable browser extensions
- Use incognito mode
- Capture at 2x resolution for retina

### Design Mockup Best Practices
- Export at 2x for retina displays
- Use consistent spacing (8px grid)
- Include labels/annotations
- Maintain Therapair brand colors
- Keep file sizes under 1MB

### Composition Best Practices
- Use white/light backgrounds
- Add subtle shadows for depth
- Maintain consistent padding
- Use arrows sparingly
- Annotate when needed

---

## 🚀 Next Steps

1. **Run Playwright scripts** to capture results page
2. **Create design system mockup** in Figma
3. **Design user flow diagram** in Whimsical
4. **Design privacy flow** in Figma
5. **Replace placeholders** in case studies with actual filenames
6. **Review all assets** for consistency
7. **Export for web** (optimize file sizes)

---

**Status:** Specification complete, ready for asset creation  
**Estimated time:** 4-6 hours for Priority 1 assets  
**Owner:** Tino  
**Next review:** After Priority 1 assets created

---

*This specification ensures all visual assets are created consistently and serve clear purposes in both case study versions.*
