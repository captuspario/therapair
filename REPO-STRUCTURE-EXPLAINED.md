# Repository Structure - Explained

## 🎯 **Quick Answer:**

### **YES - All products are in the therapair folder:**
```
/Users/tino/Projects/therapair/
├── products/landing-page/    ✅ Local folder
├── products/sandbox/         ✅ Local folder
└── products/widget/          ✅ Local folder
```

### **YES - Each has its own Git repo link:**
- `products/landing-page/` → https://github.com/captuspario/therapair-landing.git
- `products/sandbox/` → https://github.com/captuspario/therapair-sandbox.git
- `products/widget/` → https://github.com/captuspario/therapair-widget-unison.git

---

## 📦 **What's Uploaded to Each Repo:**

### **1. Main Repo: `therapair` (GitHub)**
**URL:** https://github.com/captuspario/therapair.git

**Contains:**
```
therapair/ (main repo)
├── 📄 README.md                    ← Main project overview
├── 📄 WORKSPACE-GUIDE.md           ← Daily workflow
├── 📄 .gitignore                   ← Ignore rules
├── 📄 .gitmodules                  ← Submodule config (references only)
│
├── 📁 products/                    ← Git submodules (references only)
│   ├── landing-page/              ← Points to therapair-landing repo
│   ├── sandbox/                   ← Points to therapair-sandbox repo
│   └── widget/                    ← Points to therapair-widget-unison repo
│
├── 📁 campaigns/                   ← Actual files
│   ├── email-campaign/
│   │   ├── therapist-outreach-email.html
│   │   ├── therapist-outreach-email-plain.txt
│   │   ├── EMAIL-CAMPAIGN-SETUP-GUIDE.md
│   │   └── README.md
│   └── typebot-survey/
│       ├── therapair-research-survey-FINAL.json
│       ├── TYPEBOT-CREATION-GUIDE.md
│       ├── NOTION-DATABASE-SCHEMA.md
│       └── (all survey files)
│
├── 📁 docs/                        ← Actual files
│   └── strategy/
│       ├── executive/
│       │   ├── executive-summary.md
│       │   └── EXECUTIVE-REPORT-COMPLETE.md
│       ├── legal/
│       │   ├── PRIVACY-POLICY.md
│       │   ├── TERMS-AND-CONDITIONS.md
│       │   └── THERAPIST-TERMS-OF-PARTICIPATION.md
│       ├── project-management/
│       │   ├── DEPLOYMENT-GUIDE.md
│       │   └── TEAM-MEMBERS.md
│       ├── business-model.md
│       ├── THERAPAIR-README.md
│       └── (all strategy docs)
│
├── 📁 scripts/                     ← Actual files
│   ├── setup-all.sh
│   ├── update-all-submodules.sh
│   ├── test-all.sh
│   ├── deploy-all.sh
│   └── (all other scripts)
│
├── 📁 tests/                       ← Actual files
│   ├── e2e/
│   └── integration/
│
├── 📁 case-studies/                ← Actual files
├── 📁 project-retrospective/       ← Actual files
├── 📁 therapair-strategy/          ← Actual files
└── 📁 archive/                     ← Actual files
```

**What's NOT uploaded:**
- ❌ Product code (landing-page, sandbox, widget source code)
- ❌ Product dependencies (node_modules)
- ❌ Product build files (dist, build)

**What IS uploaded:**
- ✅ All documentation and strategy
- ✅ Campaign materials (emails, surveys)
- ✅ Shared scripts
- ✅ Project management files
- ✅ **References** to product repos (via .gitmodules)

---

### **2. Landing Page Repo: `therapair-landing` (GitHub)**
**URL:** https://github.com/captuspario/therapair-landing.git

**Contains:**
```
therapair-landing/ (product repo)
├── src/
│   ├── components/
│   ├── pages/
│   └── styles/
├── public/
├── package.json
├── README.md
├── vite.config.ts
└── (all landing page code)
```

**What's uploaded:**
- ✅ All React/TypeScript source code
- ✅ Components, pages, styles
- ✅ Public assets
- ✅ Configuration files
- ✅ Dependencies (package.json)

---

### **3. Sandbox Repo: `therapair-sandbox` (GitHub)**
**URL:** https://github.com/captuspario/therapair-sandbox.git

**Contains:**
```
therapair-sandbox/ (product repo)
├── packages/
│   └── core/
├── public/
├── scripts/
├── sandbox-demo.html
├── package.json
├── SANDBOX-DEMO-GUIDE.md
└── (all sandbox code)
```

**What's uploaded:**
- ✅ All JavaScript/HTML source code
- ✅ Therapist profiles
- ✅ Matching algorithm
- ✅ Configuration files
- ✅ Documentation

---

### **4. Widget Repo: `therapair-widget-unison` (GitHub)**
**URL:** https://github.com/captuspario/therapair-widget-unison.git

**Contains:**
```
therapair-widget-unison/ (product repo)
├── src/
├── therapair-widget/
├── tests/
├── package.json
├── WIDGET-DOCUMENTATION.md
└── (all widget code)
```

**What's uploaded:**
- ✅ All widget source code
- ✅ PHP files
- ✅ JavaScript files
- ✅ Tests
- ✅ Documentation

---

## 🔗 **How Git Submodules Work:**

### **In the Main Repo (`therapair`):**
```bash
# .gitmodules file contains:
[submodule "products/landing-page"]
    path = products/landing-page
    url = https://github.com/captuspario/therapair-landing.git
    branch = main
```

### **What This Means:**
1. **Local folder exists:** `products/landing-page/` is a real folder on your computer
2. **Points to separate repo:** It's linked to `therapair-landing` GitHub repo
3. **Main repo tracks reference:** Main repo only stores which commit to use
4. **Not the actual code:** Main repo does NOT contain landing page source code

---

## 📊 **Visual Breakdown:**

```
┌─────────────────────────────────────────────────────────────┐
│  MAIN REPO: therapair (GitHub)                              │
│  https://github.com/captuspario/therapair.git               │
│                                                              │
│  ✅ Contains:                                                │
│  - Documentation (docs/)                                     │
│  - Campaigns (campaigns/)                                    │
│  - Scripts (scripts/)                                        │
│  - Tests (tests/)                                            │
│  - References to products (products/*)                       │
│                                                              │
│  ❌ Does NOT contain:                                        │
│  - Landing page code                                         │
│  - Sandbox code                                              │
│  - Widget code                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ References
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  PRODUCT REPOS (GitHub)                                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ therapair-landing                                     │   │
│  │ https://github.com/captuspario/therapair-landing.git  │   │
│  │ ✅ Contains: All landing page code                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ therapair-sandbox                                     │   │
│  │ https://github.com/captuspario/therapair-sandbox.git  │   │
│  │ ✅ Contains: All sandbox code                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ therapair-widget-unison                               │   │
│  │ https://github.com/captuspario/therapair-widget-...   │   │
│  │ ✅ Contains: All widget code                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 **Summary:**

### **Main Repo (`therapair`):**
- ✅ Contains: Documentation, campaigns, scripts, tests
- ✅ References: Product repos via submodules
- ❌ Does NOT contain: Product source code

### **Product Repos (separate):**
- ✅ Landing Page: All React/TypeScript code
- ✅ Sandbox: All JavaScript/HTML code
- ✅ Widget: All widget code

### **Local Structure:**
```
/Users/tino/Projects/therapair/
├── products/landing-page/    ← Local folder, linked to GitHub repo
├── products/sandbox/         ← Local folder, linked to GitHub repo
├── products/widget/          ← Local folder, linked to GitHub repo
├── campaigns/                ← Actual files in main repo
├── docs/                     ← Actual files in main repo
└── scripts/                  ← Actual files in main repo
```

---

## ✅ **To Answer Your Questions:**

**Q: Are all products in the therapair folder?**
✅ **YES** - All products are in `/Users/tino/Projects/therapair/products/`

**Q: Do they have their own Git repo links?**
✅ **YES** - Each product links to its own GitHub repo

**Q: What file structure is uploaded to therapair main git repo?**
✅ **Main repo contains:**
- Documentation (docs/)
- Campaigns (campaigns/)
- Scripts (scripts/)
- Tests (tests/)
- References to products (products/*)
- ❌ **NOT** product source code (that's in separate repos)

---

**Clear now?** 🎯
