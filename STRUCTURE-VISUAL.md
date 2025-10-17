# Therapair Project Structure - Visual Guide

## 🎯 Before vs After

### **BEFORE** (Separate Repos)
```
/Users/tino/Projects/
├── therapair/                    # Coordination hub
├── therapair-landing-page/       # Separate repo
├── therapair-sandbox/            # Separate repo
└── therapair-widget-unison/      # Separate repo
```

### **AFTER** (Unified Workspace)
```
/Users/tino/Projects/therapair/
├── products/                     # All products in one place
│   ├── landing-page/            # Git submodule
│   ├── sandbox/                 # Git submodule
│   ├── widget/                  # Git submodule
│   └── email-campaign/          # Local content
├── campaigns/                    # Marketing & outreach
│   ├── email-campaign/          # Email templates
│   └── typebot-survey/          # User research
├── docs/                         # Shared documentation
│   ├── strategy/
│   ├── architecture/
│   ├── design-system/
│   └── deployment/
├── scripts/                      # Shared automation
└── tests/                        # Integration tests
```

---

## 📁 Current Structure

```
therapair/
│
├── 📄 README.md                  # Main project overview
├── 📄 WORKSPACE-GUIDE.md         # Daily workflow guide
├── 📄 RESTRUCTURE-COMPLETE.md    # Migration summary
├── 📄 PROJECT-RESTRUCTURE-PLAN.md # Restructure plan
├── 📄 .gitignore                 # Global ignore rules
├── 📄 .gitmodules                # Submodule config
│
├── 📦 products/                  # All Therapair products
│   ├── landing-page/            # 🌐 Main website (Git submodule)
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── sandbox/                 # 🎨 Demo application (Git submodule)
│   │   ├── packages/
│   │   ├── public/
│   │   ├── package.json
│   │   └── SANDBOX-DEMO-GUIDE.md
│   │
│   ├── widget/                  # 🔧 Embeddable widget (Git submodule)
│   │   ├── src/
│   │   ├── therapair-widget/
│   │   ├── package.json
│   │   └── WIDGET-DOCUMENTATION.md
│   │
│   └── email-campaign/          # 📧 Email campaigns (local)
│       └── (empty - placeholder)
│
├── 📧 campaigns/                 # Marketing & outreach
│   ├── email-campaign/          # Email templates
│   │   ├── therapist-outreach-email.html
│   │   ├── therapist-outreach-email-plain.txt
│   │   ├── EMAIL-CAMPAIGN-SETUP-GUIDE.md
│   │   └── README.md
│   │
│   └── typebot-survey/          # User research
│       ├── therapair-research-survey-FINAL.json
│       ├── TYPEBOT-CREATION-GUIDE.md
│       ├── TYPEBOT-BLOCK-TEMPLATES.md
│       └── QUESTIONNAIRE-CONTENT.md
│
├── 📚 docs/                      # Shared documentation
│   ├── strategy/                # Business strategy
│   │   ├── executive-summary.md
│   │   ├── business-model.md
│   │   ├── positioning.md
│   │   └── audience-jtbd.md
│   │
│   ├── architecture/            # Technical architecture (empty)
│   ├── design-system/           # Design guidelines (empty)
│   └── deployment/              # Deployment guides (empty)
│
├── 🔧 scripts/                   # Shared automation
│   ├── setup-all.sh            # Setup all products
│   ├── update-all-submodules.sh # Update submodules
│   ├── test-all.sh              # Test all products
│   └── deploy-all.sh            # Deploy all products
│
└── 🧪 tests/                     # Integration tests
    ├── e2e/                     # End-to-end tests (empty)
    └── integration/             # Integration tests (empty)
```

---

## 🔗 Git Submodule Structure

```
therapair/ (main repository)
│
├── .git/
│   └── modules/                 # Submodule metadata
│       ├── products/landing-page/
│       ├── products/sandbox/
│       └── products/widget/
│
├── products/
│   ├── landing-page/           # → GitHub: therapair-landing
│   ├── sandbox/                # → GitHub: therapair-sandbox
│   └── widget/                 # → GitHub: therapair-widget-unison
│
└── .gitmodules                 # Submodule configuration
```

---

## 📊 File Counts

### **Products**
- **landing-page:** 29 files/directories
- **sandbox:** 29 files/directories
- **widget:** 25 files/directories
- **email-campaign:** 2 files (placeholder)

### **Campaigns**
- **email-campaign:** 6 files
- **typebot-survey:** 23 files

### **Documentation**
- **strategy:** 22 files
- **architecture:** 0 files (ready for content)
- **design-system:** 0 files (ready for content)
- **deployment:** 0 files (ready for content)

### **Scripts**
- **4 shell scripts** (all executable)

---

## 🎯 Key Directories

### **products/** - All Therapair Products
Each product is a Git submodule linked to its own GitHub repository:
- ✅ Independent version control
- ✅ Separate deployment
- ✅ Clear boundaries
- ✅ Easy to navigate

### **campaigns/** - Marketing & Outreach
Centralized location for all marketing activities:
- ✅ Email campaigns
- ✅ User research surveys
- ✅ Campaign documentation

### **docs/** - Shared Documentation
Common documentation across all products:
- ✅ Business strategy
- ✅ Technical architecture
- ✅ Design system
- ✅ Deployment guides

### **scripts/** - Automation
Shared scripts for common tasks:
- ✅ Setup all products
- ✅ Update all submodules
- ✅ Test all products
- ✅ Deploy all products

---

## 🚀 Quick Navigation

### **Work on Landing Page**
```bash
cd products/landing-page
```

### **Work on Sandbox**
```bash
cd products/sandbox
```

### **Work on Widget**
```bash
cd products/widget
```

### **Check Email Campaign**
```bash
cd campaigns/email-campaign
```

### **Check Typebot Survey**
```bash
cd campaigns/typebot-survey
```

### **View Strategy Docs**
```bash
cd docs/strategy
```

### **Run All Scripts**
```bash
./scripts/setup-all.sh
./scripts/update-all-submodules.sh
./scripts/test-all.sh
./scripts/deploy-all.sh
```

---

## 📝 File Types

### **Documentation**
- `.md` files (Markdown)
- `.txt` files (Plain text)
- `.html` files (HTML documentation)

### **Code**
- `.ts` / `.tsx` files (TypeScript/React)
- `.js` files (JavaScript)
- `.css` files (Stylesheets)
- `.json` files (Configuration)

### **Configuration**
- `.gitignore` (Git ignore rules)
- `.gitmodules` (Submodule config)
- `package.json` (Node.js dependencies)
- `playwright.config.js` (Testing config)

---

## ✅ Migration Checklist

- ✅ Backups created
- ✅ New directory structure created
- ✅ Content moved to new locations
- ✅ Git submodules added
- ✅ Shared scripts created
- ✅ Documentation updated
- ✅ README created
- ✅ .gitignore created
- ✅ .gitmodules created
- ✅ Workspace guide created

---

## 🎉 Success!

Your Therapair project is now:
- ✅ Unified in one workspace
- ✅ Organized with clear structure
- ✅ Using Git submodules for products
- ✅ Ready for team collaboration
- ✅ Easy to maintain and extend

---

**Last Updated:** October 17, 2025  
**Status:** ✅ Complete  
**Structure:** ✅ Validated
