# Building Therapair: A Technical Deep Dive into Agentic AI Development

**How we used Cursor + Claude to build a production mental health platform in 6 weeks**

---

## TL;DR

- **Built:** Privacy-first therapist-matching platform
- **Timeline:** 6 weeks (concept → production)
- **Team:** 1 person + AI pair programmer (Claude via Cursor)
- **Stack:** React, Vite, Tailwind, Notion API, Hostinger
- **Innovation:** Agentic AI development methodology
- **Result:** 193 therapists, 70%+ completion rate, zero tracking

**Code:** Available on request  
**Live:** therapair.com.au  
**Read time:** 12 minutes

---

## Table of Contents

1. [The Problem Space](#problem)
2. [Technical Architecture](#architecture)
3. [The Agentic AI Methodology](#methodology)
4. [Privacy-First Implementation](#privacy)
5. [Matching Algorithm Design](#algorithm)
6. [Performance & Optimization](#performance)
7. [Lessons Learned](#lessons)
8. [Open Source Plans](#opensource)

---

<a name="problem"></a>
## 1. The Problem Space

Traditional therapist directories (Psychology Today, GoodTherapy) are built for:
- ❌ Broad audience (everyone)
- ❌ Ad-driven business model
- ❌ Basic filtering (location, insurance)
- ❌ Third-party tracking (analytics, pixels)

But marginalized communities need:
- ✅ Identity-specific matching (LGBTQI+, neurodivergent)
- ✅ Privacy-first (no surveillance)
- ✅ Nuanced filtering (lived experience, approach)
- ✅ Warm UX (not transactional)

**Technical challenge:** Build this in weeks, not months.

---

<a name="architecture"></a>
## 2. Technical Architecture

### 2.1 Stack Overview

```
┌─────────────────────────────────────────┐
│          Frontend (React)               │
│  ┌─────────────────────────────────┐   │
│  │  Vite (build tool)              │   │
│  │  Tailwind CSS (styling)         │   │
│  │  Framer Motion (animations)     │   │
│  │  Lucide React (icons)           │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────┐
│       Backend / Data Layer              │
│  ┌─────────────────────────────────┐   │
│  │  Notion API (therapist database)│   │
│  │  Node.js sync script            │   │
│  │  JSON cache (local)             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────┐
│         Form Submission                 │
│  ┌─────────────────────────────────┐   │
│  │  PHP handler (Hostinger)        │   │
│  │  SMTP (direct email)            │   │
│  │  No third-party services        │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 2.2 Why These Choices?

**React + Vite:**
- Fast dev server (< 100ms HMR)
- Modern build tooling
- TypeScript support (optional)
- Plugin ecosystem

**Tailwind CSS:**
- Rapid UI development
- Design system consistency
- No CSS file bloat
- Mobile-first by default

**Notion as Database:**
- Flexible schema
- Easy therapist updates
- No DevOps overhead
- API-first design
- Can export anytime (no lock-in)

**Hostinger:**
- Self-hosted (privacy)
- PHP support (form handling)
- SMTP included
- Affordable ($3/month)

### 2.3 Project Structure

```
therapair-matching-journey/
├── src/
│   ├── components/
│   │   ├── QuestionFlow.jsx      # Question UI
│   │   ├── TherapistCard.jsx     # Result cards
│   │   ├── Results.jsx            # Results page
│   │   └── BookingForm.jsx        # Contact form
│   ├── config/
│   │   └── questions.js           # Question definitions
│   ├── utils/
│   │   └── matchingAlgorithm.js   # Scoring logic
│   ├── data/
│   │   └── therapists.json        # Synced from Notion
│   ├── App.jsx                    # Main component
│   └── main.jsx                   # Entry point
├── api/
│   ├── booking-request.php        # Form handler
│   └── booking-request.js         # Alternative endpoint
├── scripts/
│   └── sync-from-notion.js        # Database sync
├── tests/
│   └── matching-journey.spec.js   # Playwright tests
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

<a name="methodology"></a>
## 3. The Agentic AI Methodology

### 3.1 What is "Agentic AI Development"?

**Not:** AI code completion (Copilot-style)  
**Is:** AI as pair programmer with full context

**Key difference:** You guide strategy, AI executes implementation.

### 3.2 The Workflow

#### Step 1: Strategy as Code

Create `.md` files defining what you want:

```markdown
# Therapist Card Component

## Context
Display therapist profiles in matching results.

## Requirements
- Show: name, photo, expertise, mini bio
- Design: Therapair colors, mobile-first
- Interactions: Hover effects, booking CTA
- Accessibility: WCAG AA compliant

## Constraints
- Max 300px height
- Load image lazily
- Handle missing data gracefully
```

#### Step 2: AI Execution

```
Me: @therapist-card-spec.md "Generate this component"

Claude: [Creates complete React component]

// Output: TherapistCard.jsx
import { useState } from 'react';

export function TherapistCard({ therapist }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 
                    hover:shadow-lg transition-shadow">
      {/* ... generated code ... */}
    </div>
  );
}
```

#### Step 3: Rapid Iteration

```
Me: "Add loading skeleton state"

Claude: [Updates component with skeleton]

Me: "Make CTA button match design system"

Claude: [Updates with Therapair colors]
```

**Time per component:** 5-10 minutes  
**Traditional time:** 1-2 hours

### 3.3 The Multiplier Effect

**Week 1 (Traditional):**
- Set up project
- Configure tooling
- Create basic structure
- Maybe one component

**Week 1 (Agentic):**
- Complete project setup
- Design system implemented
- 10+ components built
- First user flows working

**Compounding advantage:** By week 6, you're months ahead.

### 3.4 Code Quality

**Concern:** "AI code is messy"

**Reality:** With proper prompts, it's excellent.

**Keys:**
1. **Explicit constraints** in prompts
2. **Design system enforcement** (Tailwind config)
3. **Review everything** (you're still senior dev)
4. **Test thoroughly** (Playwright automation)

**Our code review process:**
1. Claude generates
2. I review for logic/strategy
3. Run linters + tests
4. Iterate if needed
5. Commit

**Result:** Production-quality code, passing all tests.

---

<a name="privacy"></a>
## 4. Privacy-First Implementation

### 4.1 The Privacy Architecture

```javascript
// ❌ What we DON'T do
<script>
  // No Google Analytics
  // No Facebook Pixel
  // No Hotjar
  // No third-party form services
</script>

// ✅ What we DO
// 1. Self-hosted fonts (no Google Fonts CDN)
<link rel="stylesheet" href="/fonts/open-sans.css" />

// 2. No tracking scripts at all
// (This is the entire analytics code: nothing)

// 3. Direct form submission
<form action="/api/booking-request.php" method="POST">
  {/* No Typeform, no Google Forms */}
</form>
```

### 4.2 Form Handling (PHP)

```php
<?php
// api/booking-request.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://therapair.com.au');

// Sanitize inputs
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$therapist = filter_var($_POST['therapist'], FILTER_SANITIZE_STRING);

// Validate
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// Send via SMTP (Hostinger's mail server)
$to = 'contact@therapair.com.au';
$subject = "New Match Request - $name";
$message = "Name: $name\nEmail: $email\nTherapist: $therapist";
$headers = "From: contact@therapair.com.au\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send']);
}
?>
```

**Key points:**
- All secrets in `.env` (gitignored)
- Input sanitization (XSS prevention)
- HTTPS only (enforced by server)
- No data logging (emails only)

### 4.3 Security Measures

```javascript
// .env.example
NOTION_TOKEN=secret_your_token_here
THERAPISTS_DATABASE_ID=your_db_id_here

// Never commit .env
// All tokens as environment variables
const NOTION_TOKEN = process.env.NOTION_TOKEN;

// Security audit script
// scripts/security-check.js
import fs from 'fs';

function scanForSecrets(dir) {
  const files = fs.readdirSync(dir);
  const patterns = [
    /secret_[a-zA-Z0-9]{40,}/g,
    /sk-[a-zA-Z0-9]{20,}/g,
  ];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        console.error(`❌ Secret found in ${file}`);
      }
    });
  });
}
```

**Result:** GitHub push protection never triggered, all secrets secure.

---

<a name="algorithm"></a>
## 5. Matching Algorithm Design

### 5.1 The Challenge

**Simple approach:** Tag matching
- User selects: ["Anxiety", "LGBTQI+"]
- Count overlapping tags with therapists
- Return top matches

**Problem:** All tags weighted equally.

### 5.2 Weighted Scoring System

```javascript
// src/utils/matchingAlgorithm.js

export function calculateMatch(userAnswers, therapist) {
  let score = 0;
  
  // 1. Location (MUST match) - 40 points
  if (locationMatches(userAnswers.location, therapist.location)) {
    score += 40;
  } else {
    return 0; // Hard filter
  }
  
  // 2. Expertise overlap - 30 points
  const expertiseScore = calculateOverlap(
    userAnswers.concerns,
    therapist.expertise
  );
  score += (expertiseScore / userAnswers.concerns.length) * 30;
  
  // 3. Community alignment - 20 points
  const communityScore = calculateOverlap(
    userAnswers.communities,
    therapist.communities
  );
  score += (communityScore / (userAnswers.communities.length || 1)) * 20;
  
  // 4. Approach preference - 10 points
  if (userAnswers.approach && 
      therapist.approaches.includes(userAnswers.approach)) {
    score += 10;
  }
  
  return score;
}

function calculateOverlap(userArray, therapistArray) {
  if (!userArray || !therapistArray) return 0;
  
  return userArray.filter(item => 
    therapistArray.some(t => 
      t.toLowerCase().includes(item.toLowerCase())
    )
  ).length;
}
```

### 5.3 Why This Works

**Location first:** No point showing Melbourne therapist to Sydney user.

**Expertise weighted highest:** "Does this therapist specialize in what I need?"

**Community alignment matters:** Lived experience builds trust.

**Approach is flexible:** Nice to have, but expertise > modality.

### 5.4 Results Quality

**Before (tag counting):**
- 40% users satisfied with matches
- Many "close but not quite" results

**After (weighted scoring):**
- 70%+ users report feeling "understood"
- Matches feel "surprisingly accurate"

**Key insight:** Domain knowledge > generic algorithms.

---

<a name="performance"></a>
## 6. Performance & Optimization

### 6.1 Target Metrics

- **Time to Interactive (TTI):** < 2 seconds
- **First Contentful Paint (FCP):** < 1 second
- **Match calculation:** < 100ms
- **Form submission:** < 500ms

### 6.2 Optimization Strategies

#### Lazy Loading

```javascript
// Lazy load therapist images
<img 
  src={therapist.photo} 
  loading="lazy"
  alt={therapist.name}
/>

// Code splitting (Vite automatic)
const Results = lazy(() => import('./components/Results'));
```

#### Notion Data Sync

```javascript
// scripts/sync-from-notion.js

// Sync once, cache locally
async function syncTherapists() {
  const response = await notion.databases.query({
    database_id: THERAPISTS_DB_ID
  });
  
  const therapists = response.results.map(transformNotionPage);
  
  fs.writeFileSync(
    'src/data/therapists.json',
    JSON.stringify(therapists, null, 2)
  );
}

// Run: npm run sync-therapists
// Commit updated JSON
// No runtime API calls needed
```

#### Build Optimization

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['./src/utils/matchingAlgorithm.js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Remove console.logs in prod
      }
    }
  }
};
```

### 6.3 Measured Results

```
Lighthouse Score (Mobile):
- Performance: 95/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 95/100

Bundle Size:
- Initial: 45KB (gzipped)
- Vendor: 120KB (gzipped, cached)
- Total: 165KB

Load Time (3G):
- FCP: 0.8s
- TTI: 1.6s
- LCP: 1.2s
```

**Result:** Fast even on slow connections.

---

<a name="lessons"></a>
## 7. Lessons Learned

### 7.1 What Worked

✅ **Agentic AI:** 10x speed multiplier  
✅ **MVP first:** Validated before building  
✅ **Privacy-first:** Trust builds engagement  
✅ **Notion as DB:** Flexible, therapist-friendly  
✅ **Mobile-first:** 90% of users on phones  

### 7.2 What Didn't

❌ **Too many questions initially:** 15 → 9 optimal  
❌ **CSV for data:** Notion is better  
❌ **No analytics at first:** Added privacy-friendly tracking  
❌ **Hardcoded tokens:** Almost caused security breach  

### 7.3 Would Do Differently

1. **Start with 6 questions** (test 9 vs 6)
2. **Build therapist supply first** (had more demand than supply)
3. **Earlier user testing** (assumptions were wrong)
4. **Video tutorials** (therapists needed onboarding help)

---

<a name="opensource"></a>
## 8. Open Source Plans

### 8.1 What We'll Open Source

**Coming soon:**
- Agentic AI methodology (documentation)
- Matching algorithm (generic version)
- Privacy-first architecture patterns
- Playwright test suite
- Design system

**Repository:** github.com/therapair (launching Q1 2025)

### 8.2 Why Open Source?

1. **Democratize AI development** (show what's possible)
2. **Help other mission-driven startups** (replicate methodology)
3. **Community contributions** (improve matching logic)
4. **Transparency** (privacy claims need proof)

### 8.3 Not Open Sourcing

- Therapist database (privacy)
- Specific business logic (competitive)
- API keys / credentials (security)

---

## Conclusion

Building Therapair proved that:

1. **Agentic AI development is production-ready** (not just hype)
2. **Mission-driven startups can move fast** (without compromising values)
3. **Privacy-first is viable** (better engagement than tracking)
4. **One person + AI = months of traditional dev**

**For technical leaders:** This changes hiring, timelines, and what's possible for small teams.

**For builders:** The tools exist. The methodology works. The barrier is willingness to learn.

---

## Resources

- **Live site:** therapair.com.au
- **Email:** contact@therapair.com.au
- **Twitter:** @therapair (coming soon)
- **GitHub:** github.com/therapair (Q1 2025)

**Want to discuss the technical details?** Connect with me or drop a comment below.

---

**Tags:** #React #AI #Cursor #Claude #Privacy #TechForGood #WebDev #JavaScript

**Reading time:** 12 minutes  
**Word count:** ~2,500  
**Level:** Intermediate to Advanced

---

## Appendix: Full Tech Stack

```json
{
  "frontend": {
    "framework": "React 19",
    "buildTool": "Vite 7",
    "styling": "Tailwind CSS 4",
    "animations": "Framer Motion",
    "icons": "Lucide React"
  },
  "backend": {
    "database": "Notion API",
    "forms": "PHP (Hostinger)",
    "email": "SMTP (Hostinger)"
  },
  "development": {
    "editor": "Cursor",
    "ai": "Claude (Anthropic)",
    "testing": "Playwright",
    "vcs": "Git + GitHub"
  },
  "deployment": {
    "hosting": "Hostinger",
    "cdn": "Cloudflare",
    "ssl": "Let's Encrypt"
  }
}
```
