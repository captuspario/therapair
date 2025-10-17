# Therapair Workspace Guide

## 🎯 Quick Reference

### **Main Project Location**
```
/Users/tino/Projects/therapair/
```

### **Product Locations**
```
products/landing-page/    → Main website
products/sandbox/         → Demo application
products/widget/          → Embeddable widget
campaigns/email-campaign/ → Email outreach
campaigns/typebot-survey/ → User research
```

---

## 🚀 Daily Workflow

### **Starting Work**

```bash
# Navigate to main project
cd /Users/tino/Projects/therapair

# Update all submodules to latest
./scripts/update-all-submodules.sh

# Work on specific product
cd products/landing-page
# or
cd products/sandbox
# or
cd products/widget
```

### **Making Changes**

```bash
# In any product directory
cd products/landing-page

# Make your changes
# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Your changes"
git push

# Update main project reference
cd ../..
git add products/landing-page
git commit -m "Update landing page submodule"
git push
```

### **Ending Work**

```bash
# Commit any main project changes
git add .
git commit -m "Update documentation"
git push
```

---

## 📦 Product Details

### **Landing Page**
- **Location:** `products/landing-page/`
- **Repo:** https://github.com/captuspario/therapair-landing.git
- **Tech:** React, TypeScript, Tailwind CSS
- **Commands:**
  ```bash
  cd products/landing-page
  npm install
  npm run dev
  npm run build
  npm run deploy
  ```

### **Sandbox Demo**
- **Location:** `products/sandbox/`
- **Repo:** https://github.com/captuspario/therapair-sandbox.git
- **Tech:** Vanilla JavaScript, HTML, CSS
- **Commands:**
  ```bash
  cd products/sandbox
  npm install
  npm run dev
  npm run build
  npm run deploy
  ```

### **Widget**
- **Location:** `products/widget/`
- **Repo:** https://github.com/captuspario/therapair-widget-unison.git
- **Tech:** Vanilla JavaScript, PHP
- **Commands:**
  ```bash
  cd products/widget
  npm install
  npm test
  npm run deploy
  ```

---

## 🔧 Shared Scripts

All scripts are in `scripts/` directory:

```bash
# Setup all products
./scripts/setup-all.sh

# Update all submodules
./scripts/update-all-submodules.sh

# Test all products
./scripts/test-all.sh

# Deploy all products
./scripts/deploy-all.sh
```

---

## 📚 Documentation

### **Main Documentation**
- **README:** [README.md](./README.md) - Project overview
- **Workspace Guide:** [WORKSPACE-GUIDE.md](./WORKSPACE-GUIDE.md) - This file
- **Restructure:** [RESTRUCTURE-COMPLETE.md](./RESTRUCTURE-COMPLETE.md) - Migration details

### **Product Documentation**
- **Landing Page:** [products/landing-page/README.md](./products/landing-page/README.md)
- **Sandbox:** [products/sandbox/SANDBOX-DEMO-GUIDE.md](./products/sandbox/SANDBOX-DEMO-GUIDE.md)
- **Widget:** [products/widget/WIDGET-DOCUMENTATION.md](./products/widget/WIDGET-DOCUMENTATION.md)

### **Strategy Documentation**
- **Strategy:** [docs/strategy/](./docs/strategy/)
- **Campaigns:** [campaigns/](./campaigns/)

---

## 🎨 Design System

### **Colors**
- **Primary Blue:** `#2563eb`
- **Light Blue:** `#E8F4FF`
- **Background:** `#ffffff`

### **Typography**
- **Headings:** DM Sans
- **Body:** Inter

---

## 🔗 Quick Links

- **Website:** https://therapair.com.au
- **Sandbox Demo:** https://therapair.com.au/sandbox-demo.html
- **GitHub Landing:** https://github.com/captuspario/therapair-landing.git
- **GitHub Sandbox:** https://github.com/captuspario/therapair-sandbox.git
- **GitHub Widget:** https://github.com/captuspario/therapair-widget-unison.git

---

## 📝 Common Tasks

### **Add a New Product**

```bash
# Create directory
mkdir products/new-product

# Initialize git
cd products/new-product
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/captuspario/new-product.git
git push -u origin main

# Add as submodule to main project
cd ../..
git submodule add https://github.com/captuspario/new-product.git products/new-product
git add .gitmodules products/new-product
git commit -m "Add new-product submodule"
git push
```

### **Update All Products**

```bash
# Update all submodules to latest
./scripts/update-all-submodules.sh

# Or manually
git submodule update --remote
```

### **Clone for New Team Member**

```bash
# Clone with all submodules
git clone --recursive https://github.com/captuspario/therapair-unified.git

# Or if already cloned
git submodule update --init --recursive
```

### **Remove a Submodule**

```bash
# Deinitialize submodule
git submodule deinit products/old-product

# Remove from git
git rm products/old-product

# Commit
git commit -m "Remove old-product submodule"
git push
```

---

## ⚠️ Important Notes

1. **Always commit submodule changes separately** - Submodules have their own git history
2. **Update main project after submodule changes** - Reference new commits in main repo
3. **Use shared scripts** - Don't duplicate setup/deploy logic
4. **Keep documentation updated** - Update READMEs when structure changes

---

## 🆘 Troubleshooting

### **Submodule shows as untracked**
```bash
git submodule update --init --recursive
```

### **Submodule out of date**
```bash
git submodule update --remote
```

### **Can't push to submodule**
```bash
cd products/landing-page
git push
cd ../..
```

### **Main project shows submodule changes**
```bash
git add products/landing-page
git commit -m "Update submodule reference"
git push
```

---

**Last Updated:** October 17, 2025  
**Status:** Active  
**Version:** 1.0.0
