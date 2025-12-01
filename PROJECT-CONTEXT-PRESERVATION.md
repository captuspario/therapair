# Project Context Preservation System
## Prevents Loss of Context When Window is Reopened

---

## 🎯 **Purpose**
This document preserves critical project context, deployment systems, and git setup to prevent information loss when the Cursor window is closed and reopened.

---

## 🚀 **Deployment System (Already Configured)**

### **Widget Deployment to Hostinger:**
- **Deploy Script**: `auto-deploy-widget.sh` (main deployment script)
- **Alternative Script**: `deploy-widget-to-hostinger.sh` (backup)
- **Target**: Hostinger hosting service
- **Method**: SSH + SCP file transfer
- **Location**: `/public_html/therapair-widget-unison/`

### **Deployment Commands:**
```bash
# Main deployment (recommended)
bash auto-deploy-widget.sh

# Alternative deployment
bash deploy-widget-to-hostinger.sh
```

### **Deployment Features:**
- ✅ Automated SSH connection
- ✅ File backup before deployment
- ✅ SCP file transfer
- ✅ Permission setting
- ✅ Error handling and logging

---

## 📁 **Git System (Already Configured)**

### **Git Status:**
- **Repository**: Main branch up to date with origin/main
- **Remote**: Connected to GitHub
- **Status**: Clean working directory (except sandbox submodule)

### **Git Commands:**
```bash
# Check status
git status

# Push changes
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🧩 **Key Project Components**

### **1. Widget System:**
- **Location**: `products/widget/`
- **Main File**: `products/widget/therapair-widget/index.html`
- **Deployment**: Automated to Hostinger
- **Features**: Therapist matching quiz, booking system

### **2. Typebot Survey System:**
- **Location**: `campaigns/typebot-survey/`
- **Working JSON**: `therapair-survey-COMPLETE-FIXED.json`
- **Instructions**: `TYPEBOT-JSON-GENERATOR-INSTRUCTIONS-WORKING.md`

### **3. Landing Page:**
- **Location**: `products/landing-page/`
- **Framework**: React/TypeScript
- **Status**: Complete and functional

### **4. Notion Integration:**
- **Database ID**: `28c5c25944da80a48d85fd43119f4ec1`
- **Token**: Stored securely in environment
- **Purpose**: Therapist data management

---

## 🔧 **Environment Setup**

### **Required Environment Variables:**
- `NOTION_TOKEN`: Notion API access token
- `NOTION_DATABASE_ID`: Therapist database ID
- `HOSTINGER_HOST`: Hostinger server details
- `HOSTINGER_USER`: SSH username
- `HOSTINGER_PASS`: SSH password

### **Environment Files:**
- `.env`: Main environment file
- `products/widget/env.example.txt`: Template file

---

## 📋 **Working Files and Scripts**

### **Deployment Scripts:**
- ✅ `auto-deploy-widget.sh` - Main deployment
- ✅ `deploy-widget-to-hostinger.sh` - Alternative deployment
- ✅ `products/widget/deploy-config.sh` - Configuration

### **Typebot Scripts:**
- ✅ `TYPEBOT-JSON-GENERATOR-INSTRUCTIONS-WORKING.md` - Error-free instructions
- ✅ `campaigns/typebot-survey/therapair-survey-COMPLETE-FIXED.json` - Working example

### **Notion Scripts:**
- ✅ `scripts/setup-therapist-database.js` - Database setup
- ✅ `scripts/add-unison-therapists.js` - Add therapists
- ✅ `scripts/test-notion-connection.js` - Test connection

---

## 🎯 **Current Status**

### **✅ Completed Systems:**
1. **Widget Deployment**: Fully automated to Hostinger
2. **Git Integration**: Connected and working
3. **Typebot Scripts**: Error-free generation system
4. **Notion Integration**: Database connected and populated
5. **Landing Page**: Complete and functional

### **🔧 Active Components:**
1. **Widget**: Live at Hostinger with therapist matching
2. **Survey System**: Working Typebot JSON generation
3. **Database**: 202+ therapist entries in Notion
4. **Deployment**: Automated scripts ready to use

---

## 🚨 **Critical Information to Remember**

### **Deployment:**
- **DO NOT** recreate deployment scripts - they already exist and work
- **USE** `auto-deploy-widget.sh` for widget deployment
- **TARGET** is Hostinger hosting service

### **Git:**
- **DO NOT** reinitialize git - repository is already configured
- **STATUS** is clean and up to date
- **REMOTE** is connected to GitHub

### **Typebot:**
- **USE** `TYPEBOT-JSON-GENERATOR-INSTRUCTIONS-WORKING.md` for error-free scripts
- **VERSION** must be "6.1" (not "3.3")
- **BLOCK TYPES** must use exact valid types (e.g., "text input", not "textInput")

### **Notion:**
- **DATABASE ID**: `28c5c25944da80a48d85fd43119f4ec1`
- **TOKEN**: Already configured in environment
- **STATUS**: 202+ therapist entries already populated

---

## 📞 **Quick Reference Commands**

### **Deployment:**
```bash
# Deploy widget to Hostinger
bash auto-deploy-widget.sh
```

### **Git:**
```bash
# Check status
git status

# Push changes
git add . && git commit -m "Update" && git push
```

### **Typebot:**
```bash
# Use the working instructions file
# TYPEBOT-JSON-GENERATOR-INSTRUCTIONS-WORKING.md
```

### **Notion:**
```bash
# Test connection
node scripts/test-notion-connection.js

# Add therapists
node scripts/add-unison-therapists.js
```

---

## 🔄 **Context Restoration Process**

When reopening the project:

1. **Check this file first** - `PROJECT-CONTEXT-PRESERVATION.md`
2. **Verify deployment scripts exist** - `auto-deploy-widget.sh`
3. **Check git status** - `git status`
4. **Confirm environment setup** - Check `.env` file
5. **Test key systems** - Run deployment and connection tests

---

**This document ensures no context is lost when the Cursor window is reopened. All systems are already configured and working.**
