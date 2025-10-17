# 05 — Git and Deployment Workflow

## 🎯 Purpose
Document the development workflow, Git setup, deployment structure, and how Cursor + Git enabled rapid iteration.

---

## 🔧 Development Stack

### Core Tools
- **Editor:** Cursor (VS Code fork with Claude integration)
- **Version Control:** Git + GitHub
- **Deployment:** Hostinger (shared hosting)
- **Build Tool:** Vite (for React matching journey)
- **Languages:** HTML/CSS/JavaScript, React, PHP

---

## 📁 Repository Structure

### Multi-Project Organization
```
/Users/tino/Projects/
├── therapair/                  # Main project folder
│   ├── docs/                   # Strategy & documentation
│   ├── images/                 # Therapist photos
│   └── tests/                  # Playwright test suites
│
├── therapair-landing-page/     # Static landing page
│   ├── index.html
│   ├── src/                    # React components (if used)
│   ├── scripts/                # Notion API scripts
│   └── deploy.sh               # Auto-deploy script
│
├── therapair-matching-journey/ # Standalone matching app
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── config/             # Question definitions
│   │   ├── utils/              # Matching algorithm
│   │   └── data/               # Therapist JSON (synced)
│   ├── api/                    # Form handlers
│   ├── tests/                  # Playwright tests
│   └── scripts/                # Notion sync
│
└── therapair-widget-unison/    # Embeddable widget version
    ├── therapair-widget/       # Distribution files
    └── deploy-to-unison.sh     # Deploy to Unison site
```

### Git Strategy
**Separate repos for modularity:**
- `therapair` — Main documentation & assets
- `therapair-landing-page` — Marketing site
- `therapair-matching-journey` — Core product (can be standalone)
- `therapair-widget-unison` — Client-specific widget

**Why separate?**
- Independent versioning
- Easier deployment to different domains
- Cleaner history per component
- Widget can be open-sourced separately

---

## 🚀 Deployment Workflow

### Hostinger Setup

**Hosting plan:** Shared hosting with cPanel  
**Domain:** `therapair.com.au`  
**Deployment method:** FTP/SFTP or SSH (if available)

### Auto-Deploy Script

**`deploy.sh`** (therapair-landing-page)
```bash
#!/bin/bash

# Build production assets
npm run build

# Deploy to Hostinger via FTP
lftp -c "
open -u username,password ftp.therapair.com.au
mirror -R dist/ public_html/ --delete
"

echo "✅ Deployed to therapair.com.au"
```

**Security note:** Credentials stored in `.env` (gitignored)

### Deployment Workflow
```
1. Make changes in Cursor
2. Test locally (npm run dev)
3. Commit to Git (git add . && git commit -m "...")
4. Push to GitHub (git push origin main)
5. Run deploy script (./deploy.sh)
6. Verify on therapair.com.au
```

---

## 🎨 Cursor + Claude Integration

### How Cursor Accelerated Development

**Agentic pair programming:**
- Claude reads entire codebase context
- Suggests architectural patterns
- Generates components from prompts
- Fixes bugs with full context
- Refactors code intelligently

**Example workflow:**
```
Tino: "Create a React component for displaying therapist cards 
       with warm design system colors and mobile-first layout"

Claude: [Generates TherapistCard.jsx with Tailwind, 
         following design system, responsive]

Tino: "Add hover effects and booking CTA"

Claude: [Updates component with transitions and onClick handler]
```

### Git Integration in Cursor
- Inline blame annotations
- Visual diff views
- AI-suggested commit messages
- Conflict resolution assistance
- Branch management UI

---

## 🔀 Git Workflow

### Branch Strategy
**Simple workflow (solo developer):**
- `main` — Production-ready code
- Feature branches when testing risky changes
- Hotfixes directly to main (with caution)

**Commit conventions:**
```
feat: Add therapist profile page
fix: Correct matching algorithm weighting
docs: Update security guide
chore: Refactor component structure
```

### Commit History Hygiene
- Descriptive messages
- Atomic commits (one feature/fix per commit)
- Regular pushes (don't lose work)
- `.gitignore` for sensitive data (`.env`, tokens)

**Critical lesson:** Git history can expose secrets
- Removed hardcoded Notion tokens with `git filter-branch`
- Now all tokens in `.env` (gitignored)

---

## 🔐 Security in Version Control

### What's gitignored
```
# Environment variables
.env
.env.local
.env.production

# Secrets
.secrets.encrypted
.encryption.key
*.key

# Node modules
node_modules/

# Build outputs
dist/
build/

# OS files
.DS_Store
```

### Secret Management
- All API tokens in `.env`
- Scripts check for `process.env.TOKEN`
- Deploy scripts use environment variables
- Never commit `.env` files

---

## 📊 Notion Database Integration

### Sync Strategy
**Challenge:** Therapist data lives in Notion, app needs JSON

**Solution:** Sync script
```javascript
// scripts/sync-from-notion.js
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Query therapists database
const response = await notion.databases.query({
  database_id: process.env.THERAPISTS_DATABASE_ID
});

// Transform to JSON
const therapists = response.results.map(page => ({
  id: page.id,
  name: page.properties['First Name'].title[0].text.content,
  // ... more fields
}));

// Write to src/data/therapists.json
fs.writeFileSync('src/data/therapists.json', JSON.stringify(therapists));
```

**Workflow:**
```
1. Update therapist profiles in Notion
2. Run: npm run sync-therapists
3. Commit updated therapists.json
4. Deploy
```

---

## 🧪 Testing & CI/CD

### Playwright Tests
```bash
# Run UI tests
npm run test

# Run with visual debugging
npm run test:ui

# Generate screenshots for docs
npm run test:screenshots
```

**Test coverage:**
- Question flow completion
- Matching algorithm results
- Form submissions
- Mobile responsiveness
- Design system adherence

### Future: GitHub Actions
**Planned CI/CD pipeline:**
```yaml
name: Deploy Therapair

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
      - run: npm run build
      - run: ./deploy.sh
```

---

## 🔄 Development Cycle Speed

### Iteration Velocity
**Traditional workflow:** Days to weeks per feature  
**With Cursor + Claude:** Hours to days

**Example:** Matching journey module
- **Day 1:** Scaffolding, design system, question flow
- **Day 2:** Matching algorithm, therapist cards
- **Day 3:** Form handling, confirmation flow
- **Day 4:** Testing, refinement, deployment

**Key accelerators:**
- No context switching (Cursor = editor + AI)
- Instant component generation
- Design system consistency
- Test automation

---

## ❓ Questions for Expansion

1. What was the total commit count per project?
2. Were there major refactors or architectural changes?
3. How often were deploy scripts run?
4. Any deployment failures or rollback situations?
5. What Git habits helped most?

---

## 🔗 Related Documents

- **[06_strategy_prompt_framework.md](./06_strategy_prompt_framework.md)** — How Claude shaped code
- **[08_lessons_and_principles.md](./08_lessons_and_principles.md)** — Development philosophy
- **[04_email_hosting_and_privacy.md](./04_email_hosting_and_privacy.md)** — Server setup

---

## 📸 Assets (to be added)

- [ ] Cursor screenshot showing Claude integration
- [ ] Git commit graph
- [ ] Deploy script in action
- [ ] Notion → JSON sync visualization

---

*This document is a living prompt. Expand it by feeding it back to Claude with additional context, commit history, or deployment logs.*
