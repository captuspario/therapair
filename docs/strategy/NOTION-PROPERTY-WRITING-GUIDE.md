# 📝 How to Write Properties to Notion Databases - Correct Method

**Date:** January 27, 2025  
**Status:** ✅ Tested and Working  
**Context:** After 5 failed attempts with Node.js scripts, this is the verified approach

---

## ❌ What Didn't Work

### Failed Approach: Node.js Scripts
```javascript
await notion.databases.update({
    database_id: DATABASE_ID,
    properties: { ... }
});
```

**Why it failed:**
- Properties appeared to be added successfully (no errors)
- But when retrieving the database, properties weren't visible
- API returned only the "Name" property (title)
- Likely a permissions or API version issue

---

## ✅ What Actually Works

### Verified Method: Direct curl Commands

Use **curl** commands directly to the Notion API. This is the only method that successfully adds properties and they remain visible when retrieving the database.

---

## 🎯 Step-by-Step Instructions

### 1. Set Up Your Variables

```bash
NOTION_TOKEN="your_notion_token_here"
DATABASE_ID="your_database_id_here"
```

### 2. Use curl to Add Properties

#### Format for Single Property
```bash
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"PropertyName":{"type_definition":{}}}}'
```

#### Format for Multiple Properties
```bash
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "properties": {
      "Property1": {"type": {}},
      "Property2": {"type": {}}
    }
  }'
```

### 3. Property Type Definitions

#### Rich Text
```json
{"rich_text": {}}
```

#### Email
```json
{"email": {}}
```

#### Select (with options)
```json
{
  "select": {
    "options": [
      {"name": "Option 1"},
      {"name": "Option 2"},
      {"name": "Option 3"}
    ]
  }
}
```

#### Multi-select (with options)
```json
{
  "multi_select": {
    "options": [
      {"name": "Option 1"},
      {"name": "Option 2"},
      {"name": "Option 3"}
    ]
  }
}
```

#### Number
```json
{"number": {}}
```

#### Date
```json
{"date": {}}
```

#### Checkbox
```json
{"checkbox": {}}
```

---

## ⚠️ Critical Restrictions

### 1. **No Commas in Multi-select Option Names**
❌ **FAILS:**
```json
{"name": "Shared experience of a diagnosis (ADHD, Autism, OCD, Addiction, etc)"}
```

✅ **WORKS:**
```json
{"name": "Shared experience of diagnosis (ADHD Autism OCD Addiction etc)"}
```

### 2. **No Special Characters**
- Avoid commas, semicolons, and other special characters in option names
- Use hyphens or spaces instead

### 3. **Property Name Restrictions**
- Must be unique within the database
- Cannot conflict with reserved names
- Should be descriptive but concise

---

## 📦 Batch Processing

Add properties in batches to avoid API rate limits:

```bash
#!/bin/bash

NOTION_TOKEN="your_token"
DATABASE_ID="your_db_id"

# Batch 1
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"Property1":{"rich_text":{}},"Property2":{"email":{}}}}'

sleep 0.5

# Batch 2
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"Property3":{"select":{"options":[{"name":"Yes"},{"name":"No"}]}}}}'

# Continue with more batches...
```

---

## ✅ Verification

### Check What Properties Were Added
```bash
curl -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" | jq '.properties | keys'
```

### Count Properties
```bash
curl -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" | jq '.properties | keys | length'
```

### List All Properties with Types
```bash
curl -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" | jq -r '.properties | to_entries[] | "\(.key): \(.value.type)"'
```

---

## 🔧 Complete Example

Adding all survey properties to a database:

```bash
#!/bin/bash

NOTION_TOKEN="${NOTION_TOKEN:-}"
DATABASE_ID="2995c25944da80a5b5d1f0eb9db74a36"

echo "🚀 Adding properties..."

# Email field
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"Email":{"email":{}}}}' > /dev/null

sleep 0.5

# Profession with options
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "properties": {
      "Profession": {
        "select": {
          "options": [
            {"name": "Psychologist"},
            {"name": "Counsellor"},
            {"name": "Social Worker"},
            {"name": "Psychiatrist"},
            {"name": "Psychotherapist"},
            {"name": "Art Therapist"},
            {"name": "Other"}
          ]
        }
      },
      "Profession Other": {"rich_text": {}}
    }
  }' > /dev/null

echo "✅ Done!"
```

---

## 📋 Best Practices

### 1. **Add Properties in Logical Batches**
- Group related properties together
- Add 3-5 properties per batch
- Add small delays between batches (0.5 seconds)

### 2. **Test Each Batch**
- Verify properties after each batch
- Catch errors early
- Easier to debug issues

### 3. **Document Your Properties**
- Keep a list of property names and types
- Note any restrictions or modifications
- Save your curl commands for reference

### 4. **Error Handling**
```bash
if curl -X PATCH ... > response.json; then
    echo "✅ Success"
else
    echo "❌ Failed"
    cat response.json | jq '.'
fi
```

### 5. **Validate Before Adding**
- Check existing properties first
- Avoid duplicates
- Ensure property names don't conflict

---

## 🐛 Troubleshooting

### Properties Not Showing Up
- **Solution:** Use curl instead of Node.js SDK
- **Verification:** Always check with GET request after adding

### Validation Errors
- **Cause:** Invalid property type or option names
- **Solution:** Check for commas, special characters
- **Fix:** Simplify option names

### API Rate Limits
- **Cause:** Too many requests too quickly
- **Solution:** Add delays between batches (sleep 0.5)
- **Fix:** Reduce batch size

### Permission Errors
- **Cause:** Token doesn't have access to database
- **Solution:** Check token permissions
- **Fix:** Share database with integration

---

## 📊 Summary

### ✅ DO:
- Use curl commands directly
- Add properties in batches
- Verify after each batch
- Document property names
- Handle errors gracefully
- Check for API restrictions

### ❌ DON'T:
- Rely on Node.js SDK for property addition
- Add too many properties at once
- Include commas in multi-select options
- Skip verification steps
- Ignore error messages

---

## 🔗 Related Files

- `campaigns/typebot-survey/add-properties-via-curl.sh` - Working example script
- `campaigns/typebot-survey/DATABASE-UPDATE-SUMMARY.md` - Update documentation
- `docs/strategy/NOTION-API-BEST-PRACTICES.md` - General Notion API guide

---

## 💡 Key Takeaway

**When writing properties to Notion databases, curl commands are the only reliable method.** The Node.js SDK appears to add properties but they don't persist or aren't visible when retrieving the database. Always use curl and verify with GET requests.

---

**Last Updated:** January 27, 2025  
**Tested With:** Notion API version 2022-06-28  
**Status:** ✅ Verified Working


