# Therapair Project Restructure Plan

## 🎯 **Goal**
Create a unified `therapair` workspace with all products organized as subdirectories, each linked to their respective GitHub repositories.

---

## 📁 **Current Structure**

```
/Users/tino/Projects/
├── therapair/                    # Main coordination hub
├── therapair-landing-page/       # Separate repo
├── therapair-sandbox/            # Separate repo
└── therapair-widget-unison/      # Separate repo
```

---

## 🏗️ **Proposed New Structure**

```
/Users/tino/Projects/therapair/
├── README.md                      # Main project overview
├── .gitignore                     # Global gitignore
├── docs/                          # Shared documentation
│   ├── strategy/
│   ├── architecture/
│   ├── design-system/
│   └── deployment/
├── products/
│   ├── landing-page/              # Git submodule → therapair-landing-page repo
│   ├── sandbox/                   # Git submodule → therapair-sandbox repo
│   ├── widget/                    # Git submodule → therapair-widget-unison repo
│   └── email-campaign/            # Current email campaign (keep as-is)
├── campaigns/                     # Marketing & outreach
│   ├── email-campaign/            # Move from root
│   └── typebot-survey/            # Move from root
├── scripts/                       # Shared scripts
│   ├── deploy-all.sh
│   ├── update-all-submodules.sh
│   └── sync-docs.sh
└── tests/                         # Integration tests
    ├── e2e/
    └── integration/
```

---

## 🔧 **Implementation Steps**

### **Step 1: Backup Current State**
```bash
# Create backups of all repos
cd /Users/tino/Projects
cp -r therapair therapair-backup-$(date +%Y%m%d)
cp -r therapair-landing-page therapair-landing-page-backup-$(date +%Y%m%d)
cp -r therapair-sandbox therapair-sandbox-backup-$(date +%Y%m%d)
cp -r therapair-widget-unison therapair-widget-unison-backup-$(date +%Y%m%d)
```

### **Step 2: Create New Structure**
```bash
cd /Users/tino/Projects/therapair

# Create new directory structure
mkdir -p products/{landing-page,sandbox,widget,email-campaign}
mkdir -p campaigns/{email-campaign,typebot-survey}
mkdir -p docs/{strategy,architecture,design-system,deployment}
mkdir -p scripts
mkdir -p tests/{e2e,integration}
```

### **Step 3: Move Existing Content**
```bash
# Move email campaign
mv email-campaign/* campaigns/email-campaign/
rmdir email-campaign

# Move typebot survey
mv typebot-survey/* campaigns/typebot-survey/
rmdir typebot-survey

# Move docs
mv docs/* docs/strategy/
```

### **Step 4: Convert Repositories to Git Submodules**
```bash
cd /Users/tino/Projects/therapair

# Initialize submodules
git submodule add https://github.com/your-username/therapair-landing-page.git products/landing-page
git submodule add https://github.com/your-username/therapair-sandbox.git products/sandbox
git submodule add https://github.com/your-username/therapair-widget-unison.git products/widget
```

### **Step 5: Create Shared Documentation**
```bash
# Create main README
cat > README.md << 'EOF'
# Therapair - Unified Project

## Overview
Therapair is a non-profit initiative by Unison Mental Health that helps people find the right therapist through personality, values, and lived experience alignment.

## Project Structure
- `products/` - Individual product repositories (Git submodules)
- `campaigns/` - Marketing and outreach campaigns
- `docs/` - Shared documentation and strategy
- `scripts/` - Shared automation scripts
- `tests/` - Integration and E2E tests

## Quick Start
1. Clone this repository: `git clone --recursive <repo-url>`
2. Initialize submodules: `git submodule update --init --recursive`
3. Follow product-specific READMEs in each `products/` subdirectory

## Products
- [Landing Page](./products/landing-page/) - Main marketing website
- [Sandbox Demo](./products/sandbox/) - Interactive therapist matching demo
- [Widget](./products/widget/) - Embeddable therapist finder widget
- [Email Campaign](./campaigns/email-campaign/) - Outreach campaigns

## Development
See [docs/development.md](./docs/development.md) for setup instructions.
EOF
```

### **Step 6: Create Shared Scripts**
```bash
# Create deployment script
cat > scripts/deploy-all.sh << 'EOF'
#!/bin/bash
# Deploy all Therapair products

echo "🚀 Deploying all Therapair products..."

# Landing Page
echo "📄 Deploying landing page..."
cd products/landing-page
npm run deploy
cd ../..

# Sandbox
echo "🎨 Deploying sandbox..."
cd products/sandbox
npm run deploy
cd ../..

# Widget
echo "🔧 Deploying widget..."
cd products/widget
npm run deploy
cd ../..

echo "✅ All products deployed!"
EOF

chmod +x scripts/deploy-all.sh
```

### **Step 7: Create .gitignore**
```bash
cat > .gitignore << 'EOF'
# Node modules
node_modules/
**/node_modules/

# Build outputs
dist/
build/
**/dist/
**/build/

# Environment files
.env
.env.local
**/.env
**/.env.local

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Test results
test-results/
playwright-report/
coverage/

# Temporary files
*.tmp
*.temp
.cache/

# Backups
*-backup-*
EOF
```

### **Step 8: Create Main Git Repository**
```bash
cd /Users/tino/Projects/therapair

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Unified Therapair project structure"

# Create GitHub repository and push
# (Do this manually on GitHub first, then:)
git remote add origin https://github.com/your-username/therapair-unified.git
git push -u origin main
```

---

## 🔗 **Git Submodule Workflow**

### **Working with Submodules**

```bash
# Clone the main repo with submodules
git clone --recursive https://github.com/your-username/therapair-unified.git

# Update all submodules to latest
git submodule update --remote

# Make changes in a submodule
cd products/landing-page
# Make your changes
git add .
git commit -m "Update landing page"
git push

# Update main repo to reference new submodule commit
cd ../..
git add products/landing-page
git commit -m "Update landing page submodule"
git push
```

---

## 📋 **Benefits of This Structure**

### **1. Single Source of Truth**
- All Therapair code in one workspace
- Easy to navigate and understand project structure
- Shared documentation and scripts

### **2. Clean Separation**
- Each product maintains its own GitHub repo
- Independent versioning and deployment
- Clear boundaries between products

### **3. Easy Collaboration**
- Team members clone one repo
- Submodules automatically pull in all products
- Shared docs and scripts available to all

### **4. Flexible Development**
- Work on multiple products simultaneously
- Shared utilities and documentation
- Easy to add new products

### **5. Deployment Flexibility**
- Deploy all products at once
- Or deploy individual products
- Shared deployment scripts

---

## 🚀 **Alternative: Monorepo Approach**

If you prefer a true monorepo (all code in one repository):

### **Structure:**
```
/Users/tino/Projects/therapair/
├── packages/
│   ├── landing-page/      # No separate repo
│   ├── sandbox/           # No separate repo
│   ├── widget/            # No separate repo
│   └── shared/            # Shared utilities
├── apps/
│   ├── email-campaign/
│   └── typebot-survey/
├── docs/
└── scripts/
```

### **Pros:**
- Simpler setup (no submodules)
- Easier code sharing
- Single version control
- Faster development

### **Cons:**
- All code in one repo
- Harder to separate concerns
- Larger repository size

---

## 🎯 **Recommendation**

**Use the Git Submodule approach** because:
1. ✅ You already have separate GitHub repos
2. ✅ Each product can be deployed independently
3. ✅ Clean separation of concerns
4. ✅ Easy to open individual products in separate windows
5. ✅ Can still share docs and scripts

---

## 📝 **Next Steps**

1. **Review this plan** - Make sure it fits your workflow
2. **Backup everything** - Safety first!
3. **Create new structure** - Follow Step 2
4. **Move content** - Follow Step 3
5. **Set up submodules** - Follow Step 4
6. **Test everything** - Make sure all products still work
7. **Update documentation** - Reflect new structure

---

## 🔧 **Commands Summary**

```bash
# One-time setup
cd /Users/tino/Projects/therapair
mkdir -p products/{landing-page,sandbox,widget,email-campaign}
mkdir -p campaigns/{email-campaign,typebot-survey}
mkdir -p docs/{strategy,architecture,design-system,deployment}
mkdir -p scripts tests/{e2e,integration}

# Move existing content
mv email-campaign/* campaigns/email-campaign/
mv typebot-survey/* campaigns/typebot-survey/

# Add submodules (replace URLs with your actual GitHub repos)
git submodule add https://github.com/your-username/therapair-landing-page.git products/landing-page
git submodule add https://github.com/your-username/therapair-sandbox.git products/sandbox
git submodule add https://github.com/your-username/therapair-widget-unison.git products/widget

# Commit changes
git add .
git commit -m "Restructure: Unified project with submodules"
git push
```

---

**Questions?** Let me know if you want me to:
1. Create the actual scripts for you
2. Help with the migration
3. Adjust the structure
4. Set up the GitHub repositories

---

**Last Updated:** October 17, 2025
