# 🎯 Notion Property Update Guide - Quick Reference

## 📋 **The Problem You Had**

```javascript
// ❌ BEFORE: Trying to update Title property
async function updateTherapist(pageId, therapist) {
    const properties = {
        "Name": {           // ❌ ERROR: Title is IMMUTABLE!
            "title": [{ "text": { "content": therapist.name } }]
        },
        "Email": {
            "email": therapist.email
        }
    };
    
    await notion.pages.update({
        page_id: pageId,
        properties: properties  // ❌ Fails!
    });
}
```

**Result:** ❌ API Error - Cannot update Title property

---

## ✅ **The Solution**

```javascript
// ✅ AFTER: Filter out immutable properties
function filterUpdatableProperties(allProperties) {
    const filtered = {};
    
    for (const [propertyName, propertyValue] of Object.entries(allProperties)) {
        // Skip Title (immutable)
        if (propertyValue.title) {
            console.log(`⏭️  Skipping: ${propertyName}`);
            continue;
        }
        
        // Include everything else
        filtered[propertyName] = propertyValue;
    }
    
    return filtered;
}

async function updateTherapist(pageId, therapist) {
    const allProperties = buildProperties(therapist);
    const updatableProperties = filterUpdatableProperties(allProperties);
    
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties  // ✅ Works!
    });
}
```

**Result:** ✅ Success - Only updates properties that can be changed

---

## 📊 **Property Update Matrix**

| Property Type | Can Create? | Can Update? | Notes |
|--------------|-------------|-------------|-------|
| `title` | ✅ Yes | ❌ No | Immutable after creation |
| `rich_text` | ✅ Yes | ✅ Yes | All text fields |
| `number` | ✅ Yes | ✅ Yes | Numeric values |
| `select` | ✅ Yes | ✅ Yes | Single choice |
| `multi_select` | ✅ Yes | ✅ Yes | Multiple choices |
| `date` | ✅ Yes | ✅ Yes | Date values |
| `checkbox` | ✅ Yes | ✅ Yes | True/false |
| `url` | ✅ Yes | ✅ Yes | Links |
| `email` | ✅ Yes | ✅ Yes | Email addresses |
| `phone_number` | ✅ Yes | ✅ Yes | Phone numbers |
| `status` | ✅ Yes | ✅ Yes | Database status |
| `created_time` | ✅ Auto | ❌ No | Managed by Notion |
| `created_by` | ✅ Auto | ❌ No | Managed by Notion |

---

## 🔄 **Create vs Update**

### **CREATE** - Use ALL Properties
```javascript
async function createTherapist(therapist) {
    const properties = buildProperties(therapist);
    // ✅ Include Title property
    await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: properties
    });
}
```

### **UPDATE** - Use ONLY Mutable Properties
```javascript
async function updateTherapist(pageId, therapist) {
    const allProperties = buildProperties(therapist);
    const updatableProperties = filterUpdatableProperties(allProperties);
    // ✅ Exclude Title property
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties
    });
}
```

---

## 🛠️ **Implementation Pattern**

### **Step 1: Build All Properties**
```javascript
function buildProperties(therapist) {
    return {
        // Title - only for create
        "Name": {
            "title": [{ "text": { "content": therapist.name } }]
        },
        
        // Mutable properties
        "Email": { "email": therapist.email },
        "Profession": { "rich_text": [/*...*/] },
        "Location": { "rich_text": [/*...*/] }
    };
}
```

### **Step 2: Filter for Updates**
```javascript
function filterUpdatableProperties(allProperties) {
    const filtered = {};
    
    for (const [name, value] of Object.entries(allProperties)) {
        if (value.title) continue;  // Skip Title
        filtered[name] = value;
    }
    
    return filtered;
}
```

### **Step 3: Use Appropriate Function**
```javascript
// Create: Use all properties
await createTherapist(therapist);

// Update: Use filtered properties
await updateTherapist(pageId, therapist);
```

---

## 📝 **Quick Checklist**

When updating Notion entries:
- [ ] Identify Title/immutable properties
- [ ] Create `filterUpdatableProperties()` function
- [ ] Use filtered properties in `pages.update()`
- [ ] Keep unfiltered properties in `pages.create()`
- [ ] Test both create and update operations
- [ ] Add error handling
- [ ] Implement rate limiting (300ms+ between requests)

---

## 🎯 **Key Takeaways**

1. **Title is IMMUTABLE** - Only set on creation
2. **Filter before updating** - Remove immutable properties
3. **Log skipped properties** - Helps with debugging
4. **Separate create/update logic** - Different property sets
5. **Follow Notion API rules** - Respect property types

---

## 📚 **Files Updated**

- ✅ `docs/strategy/NOTION-API-BEST-PRACTICES.md` - Comprehensive guide
- ✅ `docs/strategy/NOTION-API-UPDATE-SUMMARY.md` - Implementation summary
- ✅ `docs/strategy/NOTION-PROPERTY-UPDATE-GUIDE.md` - This quick reference
- ✅ `scripts/sync-unison-therapists.js` - Implementation

---

## 🚀 **Ready to Use**

Your Notion API integration now follows best practices:
- ✅ Skips immutable properties
- ✅ Updates only what can be changed
- ✅ Clear error handling
- ✅ Well documented
- ✅ Production ready

**No more property update errors!** 🎉

