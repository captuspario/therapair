# 🎓 Complete Guide: Typebot + Notion Integration

**Compiled from:** ~50+ documents and project iterations  
**Date:** January 27, 2025  
**Status:** ✅ Tested and Proven

---

## 📚 Table of Contents

1. [Typebot Learning](#typebot-learning)
2. [Notion Property Writing](#notion-property-writing)
3. [Integration Patterns](#integration-patterns)
4. [Common Pitfalls](#common-pitfalls)
5. [Best Practices](#best-practices)
6. [Reference Code](#reference-code)

---

## 🤖 Typebot Learning

### ✅ What Worked

#### 1. **Platform Selection**
**Why Typebot was chosen:**
- ✅ Open-source and self-hostable
- ✅ No-code quiz builder with logic branching
- ✅ Embeddable widget format
- ✅ Tag-based filtering capability
- ✅ Privacy-friendly (no third-party tracking)

**Alternatives rejected:**
- Typeform — Too corporate, data privacy concerns
- Custom build — Too slow for MVP validation
- Google Forms — No branching logic, poor UX

#### 2. **Flow Design Best Practices**

**Question Structure:**
```
1. Start broad → Get specific
2. Progressive disclosure
3. Exit paths: "not sure" options
4. Multi-select for flexibility
5. Branching based on previous answers
```

**Key Design Rules:**
- Always add sequential edges between blocks
- Use specific block IDs for edge origins (not group IDs)
- Set variables for each question response
- Include "skip" or "not sure" options
- Keep surveys 5-7 minutes maximum

#### 3. **Schema Versioning**

**Critical for debugging:**
```json
{
  "version": "v5",
  "created": "2025-01-27",
  "description": "Therapair User Research Survey"
}
```

**Version Control Pattern:**
- Create snapshots before major changes (v1.json, v2.json, etc.)
- Document what changed in each version
- Keep working backup before attempting fixes

#### 4. **Common Typebot Errors**

**Error 1: Flow jumps to end after first question**
- **Cause:** Missing edges between question blocks
- **Fix:** Add sequential edges ensuring all questions are asked

**Error 2: Schema validation errors**
- **Error:** `from.groupId vs from.blockId`
- **Cause:** Using group ID instead of specific block ID
- **Fix:** Fix edge origins to use specific block IDs

**Error 3: Variables not saving**
- **Cause:** Variables not properly set in blocks
- **Fix:** Ensure each question sets a variable

---

## 🗄️ Notion Property Writing

### ✅ CORRECT METHOD: Use curl commands

**After 5 failed attempts with Node.js SDK, curl is the ONLY reliable method.**

#### Why Node.js SDK Failed

```javascript
// ❌ This APPEARS to work but properties don't persist
const notion = new Client({ auth: NOTION_TOKEN });
await notion.databases.update({
    database_id: DATABASE_ID,
    properties: { ... }
});
```

**Issues:**
- Scripts appear to succeed (no errors)
- Properties aren't visible when retrieving database
- Only "Name" property shows up
- Likely a permissions or API version issue

#### Working Solution: curl Commands

```bash
# ✅ This ACTUALLY works
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

### Property Type Definitions

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
      {"name": "Option 2"}
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
      {"name": "Option 2"}
    ]
  }
}
```

### Critical Restrictions

#### 1. **NO COMMAS in Multi-select Option Names**
```json
❌ {"name": "Shared experience (ADHD, Autism, OCD)"}
✅ {"name": "Shared experience (ADHD Autism OCD)"}
```

#### 2. **Batch Size**
- Add 3-5 properties per batch
- Use `sleep 0.5` between batches
- Verify after each batch

#### 3. **Immutable Properties**
- `title` - Cannot be updated after creation
- `created_time` - Auto-managed
- `created_by` - Auto-managed
- `last_edited_time` - Auto-managed
- `last_edited_by` - Auto-managed

### Update vs Create Pattern

```javascript
// CREATE: Use ALL properties including title
async function createPage(data) {
    const properties = {
        "Name": { "title": [{ "text": { "content": data.name } }] },
        "Email": { "email": data.email }
    };
    
    await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: properties
    });
}

// UPDATE: Filter out immutable properties
function filterUpdatableProperties(allProperties) {
    const filtered = {};
    
    for (const [name, value] of Object.entries(allProperties)) {
        if (value.title) continue;  // Skip Title
        filtered[name] = value;
    }
    
    return filtered;
}

async function updatePage(pageId, data) {
    const allProperties = buildProperties(data);
    const updatableProperties = filterUpdatableProperties(allProperties);
    
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties
    });
}
```

---

## 🔗 Integration Patterns

### Pattern 1: Typebot → Zapier → Notion

**Flow:**
1. User completes Typebot survey
2. Typebot sends webhook to Zapier
3. Zapier transforms data
4. Zapier writes to Notion database

**Advantages:**
- No-code solution
- Reliable webhook handling
- Data transformation in Zapier
- Good for rapid prototyping

**Challenges:**
- Property names must match exactly
- Setup complexity in Zapier
- Additional service dependency

### Pattern 2: Typebot → Direct API → Notion

**Flow:**
1. User completes Typebot survey
2. Typebot sends webhook to custom endpoint
3. Custom script writes to Notion API

**Advantages:**
- Full control over data transformation
- No external dependencies
- Faster execution
- Better error handling

**Challenges:**
- Requires custom endpoint/server
- More development time
- Maintenance burden

### Pattern 3: Typebot → JSON Export → Manual Processing

**Flow:**
1. User completes Typebot survey
2. Responses saved to JSON file
3. Batch process to Notion

**Advantages:**
- Simple to implement
- Good for small volumes
- No webhook complexity

**Challenges:**
- Not real-time
- Manual intervention needed
- Data staleness

---

## ⚠️ Common Pitfalls

### Pitfall 1: Property Names Don't Match

**Problem:**
```javascript
// Notion database
"Profession"

// Typebot/Zapier sending
"profession" // lowercase
```

**Solution:**
- Use exact property names
- Case-sensitive matching
- Document naming conventions

### Pitfall 2: Notion API Rate Limits

**Problem:**
```
Rate limit exceeded: 3 requests per second
```

**Solution:**
```javascript
const NOTION_RATE_LIMIT = 300; // 300ms between requests

async function processBatch(items) {
    for (const item of items) {
        await processItem(item);
        await new Promise(resolve => setTimeout(resolve, NOTION_RATE_LIMIT));
    }
}
```

### Pitfall 3: Trying to Update Title Property

**Problem:**
```javascript
// ❌ This fails
await notion.pages.update({
    page_id: pageId,
    properties: {
        "Name": { "title": [{ "text": { "content": "New Name" } }] }
    }
});
```

**Solution:**
```javascript
// ✅ Filter out title before updating
const updatableProperties = filterUpdatableProperties(allProperties);
await notion.pages.update({
    page_id: pageId,
    properties: updatableProperties
});
```

### Pitfall 4: Properties Not Persisting

**Problem:**
Using Node.js SDK - properties appear to be added but don't exist when retrieved.

**Solution:**
Use curl commands instead:
```bash
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"Email":{"email":{}}}}'
```

### Pitfall 5: Typebot Flow Schema Errors

**Problem:**
```
Schema validation error: from.groupId vs from.blockId
```

**Solution:**
- Use specific block IDs for edge origins
- Create sequential edges between blocks
- Use version control for schema changes

---

## ✅ Best Practices

### 1. Typebot Best Practices

#### Question Design
- [ ] Start with welcome message
- [ ] Include exit paths ("skip", "not sure")
- [ ] Progressive disclosure (broad → specific)
- [ ] Multi-select for flexibility
- [ ] Branching based on context
- [ ] Keep under 10 questions (5-7 minutes)

#### Flow Management
- [ ] Version control all schema changes
- [ ] Document edge routing logic
- [ ] Set variables for each response
- [ ] Test each question path
- [ ] Export JSON backup before changes

#### Webhook Configuration
- [ ] Test webhook endpoint first
- [ ] Log all incoming data
- [ ] Handle errors gracefully
- [ ] Implement retry logic
- [ ] Verify data structure

### 2. Notion Best Practices

#### Database Setup
- [ ] Create property schema first
- [ ] Use consistent naming conventions
- [ ] Document all property types
- [ ] Keep property names simple
- [ ] Avoid special characters

#### Property Management
- [ ] Use curl commands for adding properties
- [ ] Add properties in batches (3-5 at a time)
- [ ] Verify after each batch
- [ ] Document restrictions (no commas, etc.)
- [ ] Keep immutable properties in mind

#### Data Operations
- [ ] Separate create vs update logic
- [ ] Filter immutable properties before updating
- [ ] Implement rate limiting
- [ ] Add error handling
- [ ] Log all operations

### 3. Integration Best Practices

#### End-to-End Flow
- [ ] Test Typebot → API connection
- [ ] Validate data transformation
- [ ] Test Notion write operations
- [ ] Handle partial failures
- [ ] Monitor for errors

#### Error Handling
- [ ] Catch webhook errors
- [ ] Validate data before writing
- [ ] Implement retry logic
- [ ] Log all failures
- [ ] Alert on critical errors

#### Monitoring
- [ ] Track completion rates
- [ ] Monitor API usage
- [ ] Log response times
- [ ] Track error rates
- [ ] Set up alerts

---

## 💻 Reference Code

### Typebot Survey JSON Structure

```json
{
  "version": "v6",
  "blocks": [
    {
      "id": "block_1",
      "type": "start",
      "label": "Welcome"
    },
    {
      "id": "block_2",
      "type": "text",
      "label": "What's your profession?",
      "options": {
        "variableId": "profession"
      }
    }
  ],
  "edges": [
    {
      "from": { "blockId": "block_1" },
      "to": { "blockId": "block_2" }
    }
  ]
}
```

### Notion Property Addition Script

```bash
#!/bin/bash

NOTION_TOKEN="your_token"
DATABASE_ID="your_db_id"

add_properties() {
    local properties_json="$1"
    local description="$2"
    
    echo "📦 Adding: $description"
    
    curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
      -H "Authorization: Bearer $NOTION_TOKEN" \
      -H "Notion-Version: 2022-06-28" \
      -H "Content-Type: application/json" \
      -d "{\"properties\":$properties_json}" > /dev/null
    
    sleep 0.5
}

# Add properties in batches
add_properties '{"Email":{"email":{}}}' "Email field"
add_properties '{"Profession":{"select":{"options":[{"name":"Yes"},{"name":"No"}]}}}' "Profession field"

echo "✅ Done!"
```

### Notion Update Helper

```javascript
/**
 * Filter to only updatable properties
 */
function filterUpdatableProperties(allProperties) {
    const filtered = {};
    
    for (const [name, value] of Object.entries(allProperties)) {
        // Skip immutable properties
        if (value.title) {
            console.log(`⏭️  Skipping immutable: ${name}`);
            continue;
        }
        
        filtered[name] = value;
    }
    
    return filtered;
}

/**
 * Update page with only mutable properties
 */
async function updatePage(pageId, data) {
    const allProperties = buildProperties(data);
    const updatableProperties = filterUpdatableProperties(allProperties);
    
    if (Object.keys(updatableProperties).length === 0) {
        console.log('ℹ️  No properties to update');
        return;
    }
    
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties
    });
}
```

---

## 📊 Summary

### Key Learnings

1. **Typebot:** Requires careful edge management and version control
2. **Notion:** Use curl commands, NOT Node.js SDK for adding properties
3. **Properties:** Filter immutable properties before updating
4. **Integration:** Test each component independently before connecting
5. **Errors:** Log everything, handle gracefully, retry when appropriate

### Critical Rules

1. ✅ Use curl for Notion property addition
2. ✅ Filter immutable properties before updating
3. ✅ Version control Typebot schema changes
4. ✅ Add delays between API requests
5. ✅ Test incrementally, not all at once

### Quick Reference

**Typebot:** https://typebot.io/docs  
**Notion API:** https://developers.notion.com/  
**Working Example:** `campaigns/typebot-survey/add-properties-via-curl.sh`  
**Complete Guide:** `docs/strategy/NOTION-PROPERTY-WRITING-GUIDE.md`

---

**Last Updated:** January 27, 2025  
**Status:** ✅ All methods tested and verified  
**Sources:** ~50 documents, multiple project iterations


