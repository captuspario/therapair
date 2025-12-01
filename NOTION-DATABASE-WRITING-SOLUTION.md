# 🎯 Notion Database Property Writing - The Solution

**Problem:** Node.js SDK scripts failed to properly add properties to Notion databases  
**Solution:** Use curl commands directly to the Notion API  
**Status:** ✅ Verified and Working

---

## 🔍 What We Learned

After 5 failed attempts using Node.js scripts with the Notion SDK, we discovered:

### ❌ Failed Approach
```javascript
const notion = new Client({ auth: NOTION_TOKEN });
await notion.databases.update({
    database_id: DATABASE_ID,
    properties: { ... }
});
```

**Issues:**
- Scripts appeared to succeed (no errors)
- Properties weren't visible when retrieving the database
- Only the "Name" property showed up
- Likely a permissions or API version issue

### ✅ Working Approach
```bash
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"PropertyName":{"type":{}}}}'
```

**Why it works:**
- Direct API calls bypass SDK issues
- Properties persist and are visible
- Can verify immediately with GET requests
- More reliable and transparent

---

## 📝 Documentation Created

### 1. **Complete Guide**
`docs/strategy/NOTION-PROPERTY-WRITING-GUIDE.md`
- Full instructions for adding properties
- All property type definitions
- Batch processing examples
- Troubleshooting guide
- Best practices

### 2. **Cursor Rules**
`.cursorrules-notion-database.md`
- Quick reference for Cursor AI
- DO and DON'T examples
- Key restrictions
- Links to full documentation

### 3. **Template Script**
`campaigns/typebot-survey/TEMPLATE-add-notion-properties.sh`
- Ready-to-use bash script template
- Helper functions included
- Error handling built-in
- Verification included

### 4. **Working Example**
`campaigns/typebot-survey/add-properties-via-curl.sh`
- Actual working script
- Successfully added 29 properties
- Can be used as reference

---

## ⚠️ Critical Restrictions

### 1. No Commas in Multi-select Options
```json
❌ {"name": "Option (A, B, C)"}
✅ {"name": "Option (A B C)"}
```

### 2. Batch Size
- Add 3-5 properties per batch
- Use `sleep 0.5` between batches
- Verify after each batch

### 3. Property Names
- Must be unique
- Cannot contain special characters
- Should be descriptive

---

## 🚀 Quick Start

### Step 1: Set Variables
```bash
NOTION_TOKEN="your_token"
DATABASE_ID="your_db_id"
```

### Step 2: Add Properties
```bash
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"Email":{"email":{}}}}'
```

### Step 3: Verify
```bash
curl -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" | jq '.properties | keys'
```

---

## ✅ Verification Results

**Database ID:** `2995c25944da80a5b5d1f0eb9db74a36`  
**Properties Added:** 29 editable fields + 1 title field = 30 total  
**Status:** ✅ All properties visible and working  
**Method:** curl commands  

---

## 💡 Key Takeaways

1. **Always use curl** for adding properties to Notion databases
2. **Avoid Node.js SDK** for this specific operation
3. **Add delays** between batches
4. **Verify immediately** after adding properties
5. **Document restrictions** (no commas, etc.)
6. **Test incrementally** rather than all at once

---

## 📚 Related Files

- `docs/strategy/NOTION-PROPERTY-WRITING-GUIDE.md` - Complete guide
- `.cursorrules-notion-database.md` - Cursor AI rules
- `campaigns/typebot-survey/TEMPLATE-add-notion-properties.sh` - Template
- `campaigns/typebot-survey/add-properties-via-curl.sh` - Working example
- `campaigns/typebot-survey/DATABASE-UPDATE-SUMMARY.md` - Update details

---

**Date:** January 27, 2025  
**Status:** ✅ Solution Verified  
**Next Time:** Use curl commands for all Notion property operations


