# Typebot Survey - Master Index

## 📁 File Categories

### **🎯 Core Survey Files**
- `typebot-export-therapair-user-research-survey-v-1-6-g5oygeh.json` - **Latest working survey** (Q15 AI Trust removed)
- `typebot-export-example-dbkf48h.json` - **Reference example** for multi-select with "Other" pattern

### **📚 Documentation & Guides**
- `TYPEBOT-MASTER-GUIDE.md` - **Complete Typebot reference** (patterns, troubleshooting, examples)
- `NOTION-DATABASE-SCHEMA.md` - Database structure and property definitions
- `FINAL-SETUP-FOR-ZAPIER.md` - Complete setup instructions for Notion + Zapier

### **🔧 Scripts & Automation**
- `add-properties-via-curl.sh` - **Working script** to add Notion properties via curl
- `rename-properties-with-numbers.sh` - Script to number properties by survey order
- `TEMPLATE-add-notion-properties.sh` - Template for adding Notion properties

### **📋 Setup Instructions**
- `README.md` - Project overview and quick start guide

---

## 🎯 Quick Reference

### **For Typebot Development:**
1. **Pattern Reference:** `TYPEBOT-MASTER-GUIDE.md` - Copy working examples exactly
2. **Working Example:** `typebot-export-example-dbkf48h.json` - Multi-select with "Other" pattern
3. **Current Survey:** `typebot-export-therapair-user-research-survey-v-1-6-g5oygeh.json`

### **For Notion Setup:**
1. **Database Schema:** `NOTION-DATABASE-SCHEMA.md` - Property definitions
2. **Setup Guide:** `FINAL-SETUP-FOR-ZAPIER.md` - Complete instructions
3. **Working Script:** `add-properties-via-curl.sh` - Add properties via API

### **For Zapier Integration:**
1. **Setup Guide:** `FINAL-SETUP-FOR-ZAPIER.md` - Webhook configuration
2. **Database Schema:** `NOTION-DATABASE-SCHEMA.md` - Property mapping reference

---

## 🔄 Survey Flow

**19 Questions Total:**
1. Profession (with "Other" text input)
2. Years in Practice
3. Client Types (multi-select with "Other" conditional)
4. Therapy Modalities (multi-select with "Other" conditional)
5. How Clients Find You (multi-select with "Other" conditional)
6. Great Match Factors (multi-select with "Other" conditional)
7. Biggest Gap (text input)
8. Screening Clients (choice)
9. Open to Sharing (choice)
10. Which Questions Matter (multi-select with "Other" conditional)
11. Personality Test (choice)
12. Too Personal (multi-select with "Other" conditional)
13. Profile Detail Level (choice)
14. Onboarding Time (choice)
15. ~~AI Trust~~ (REMOVED)
16. Free Listing Interest (choice)
17. Future Contact (choice)
18. Email (conditional text input)
19. Comments (text input)

---

## 🚨 Critical Patterns

### **Multi-Select with "Other" Pattern:**
```
Multi-Select Block → Variable Storage → Condition Check → Routing
```

**Key Requirements:**
- `variableId` in both main block AND `options`
- `"content"` structure in conditions (not `"conditions"`)
- `"Contains"` operator with exact case matching
- Edge with `itemId` for condition path, no `itemId` for default path

### **Notion Property Addition:**
- Use `curl` scripts, not Node.js SDK
- Properties don't persist with programmatic creation
- Manual setup required for reliable results

---

## 📝 Maintenance Notes

- **Latest Survey:** `typebot-export-therapair-user-research-survey-v-1-6-g5oygeh.json`
- **Q15 Removed:** AI Trust question removed, flow connects Q14→Q16
- **Working Pattern:** Always copy `typebot-export-example-dbkf48h.json` structure exactly
- **Database ID:** `2995c25944da80a5b5d1f0eb9db74a36`

---

**Last Updated:** 2025-10-28  
**Status:** ✅ Ready for production
