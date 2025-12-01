# 🎯 Notion API Best Practices - Property Updates

## 📋 **Core Principles**

### 1. **Immutable Properties**
**You CANNOT update these property types after creation:**
- ✅ `title` - Database page title (set only on `pages.create`)
- ✅ `created_time` - Automatically managed by Notion
- ✅ `created_by` - Automatically managed by Notion
- ✅ `last_edited_time` - Automatically managed by Notion
- ✅ `last_edited_by` - Automatically managed by Notion

### 2. **Mutable Properties** 
**You CAN update these property types:**
- ✅ `rich_text` - Text content
- ✅ `number` - Numeric values
- ✅ `select` - Single select from options
- ✅ `multi_select` - Multiple selects from options
- ✅ `date` - Date values
- ✅ `checkbox` - Boolean values
- ✅ `url` - URL links
- ✅ `email` - Email addresses
- ✅ `phone_number` - Phone numbers
- ✅ `status` - Database status (new API property type)
- ✅ `formula` - Read-only, calculated by Notion
- ✅ `relation` - Related database entries
- ✅ `rollup` - Read-only aggregated data

---

## 🔄 **Update Operation Best Practices**

### **✅ DO: Only Update Mutable Properties**

```javascript
// CORRECT: Only update properties that can be changed
async function updateTherapist(pageId, therapist) {
    const properties = {
        // ✅ Mutable properties only
        "Email": {
            "email": therapist.email
        },
        "Profession": {
            "rich_text": [{ "text": { "content": therapist.profession } }]
        },
        "Modalities": {
            "rich_text": [{ "text": { "content": therapist.modalities.join(', ') } }]
        },
        "Location": {
            "rich_text": [{ "text": { "content": therapist.location } }]
        },
        "Accepting New Clients": {
            "checkbox": therapist.acceptingNewClients
        }
    };
    
    await notion.pages.update({
        page_id: pageId,
        properties: properties
    });
}
```

### **❌ DON'T: Try to Update Immutable Properties**

```javascript
// INCORRECT: Trying to update title
async function updateTherapist(pageId, therapist) {
    const properties = {
        "Name": {                    // ❌ Title fields cannot be updated!
            "title": [{ "text": { "content": therapist.name } }]
        },
        "Email": {
            "email": therapist.email
        }
    };
    
    await notion.pages.update({
        page_id: pageId,
        properties: properties
    });
}
```

---

## 🛠️ **Implementation Pattern**

### **Step 1: Create Helper Function to Filter Properties**

```javascript
/**
 * Filter properties to only include updatable ones
 * 
 * @param {Object} allProperties - All properties from buildProperties()
 * @param {Object} currentPage - Current page object from Notion
 * @returns {Object} - Filtered properties (only updatable)
 */
function filterUpdatableProperties(allProperties, currentPage) {
    const filtered = {};
    
    for (const [propertyName, propertyValue] of Object.entries(allProperties)) {
        const existingProperty = currentPage.properties[propertyName];
        
        if (!existingProperty) {
            // Property doesn't exist yet, check if it's mutable
            if (!isImmutableProperty(propertyValue)) {
                filtered[propertyName] = propertyValue;
            }
            continue;
        }
        
        // Skip immutable properties
        if (isImmutableProperty(propertyValue)) {
            console.log(`   ⏭️  Skipping immutable property: ${propertyName}`);
            continue;
        }
        
        // Include mutable properties
        filtered[propertyName] = propertyValue;
    }
    
    return filtered;
}

/**
 * Check if a property is immutable
 */
function isImmutableProperty(propertyValue) {
    // Check if it has 'title' key (immutable)
    if (propertyValue.title) {
        return true;
    }
    
    // Other immutable types can be added here
    return false;
}
```

### **Step 2: Update Only What Changed**

```javascript
/**
 * Update therapist properties efficiently
 */
async function updateTherapist(pageId, therapist, currentPage) {
    const allProperties = buildProperties(therapist);
    const updatableProperties = filterUpdatableProperties(allProperties, currentPage);
    
    // Only update if there are properties to update
    if (Object.keys(updatableProperties).length === 0) {
        console.log('   ℹ️  No updatable properties to change');
        return;
    }
    
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties
    });
}
```

---

## 📊 **Property Format Reference**

### **Correct Property Formats**

```javascript
// Rich Text
"Profession": {
    "rich_text": [{ "text": { "content": "Therapist" } }]
}

// Select
"Status": {
    "select": { "name": "Active" }
}

// Multi-select
"Specialties": {
    "multi_select": [
        { "name": "CBT" },
        { "name": "EMDR" }
    ]
}

// Number
"Years Experience": {
    "number": 10
}

// Checkbox
"Accepting New Clients": {
    "checkbox": true
}

// Date
"Session Date": {
    "date": { "start": "2025-01-27" }
}

// URL
"Booking URL": {
    "url": "https://example.com/book"
}

// Email
"Email": {
    "email": "therapist@example.com"
}
```

---

## 🚀 **Rate Limiting Best Practices**

### **Respect API Rate Limits**

```javascript
// Notion API Rate Limit: 3 requests per second
const NOTION_RATE_LIMIT = 300; // 300ms between requests (conservative)

async function processBatch(items) {
    for (const item of items) {
        await processItem(item);
        
        // Wait between requests
        await new Promise(resolve => setTimeout(resolve, NOTION_RATE_LIMIT));
    }
}
```

### **Batch Operations**

```javascript
// Process in smaller batches
const BATCH_SIZE = 10;

async function processAll(items) {
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
        const batch = items.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(item => processHeavyOperation(item)));
        
        // Wait between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
```

---

## 🔍 **Error Handling**

### **Handle Specific Notion Errors**

```javascript
async function updateWithErrorHandling(pageId, properties) {
    try {
        await notion.pages.update({
            page_id: pageId,
            properties: properties
        });
    } catch (error) {
        if (error.code === 'object_not_found') {
            console.error('❌ Page not found or not accessible');
        } else if (error.code === 'validation_error') {
            console.error('❌ Invalid property value:', error.message);
        } else if (error.code === 'rate_limited') {
            console.error('❌ Rate limit exceeded, waiting...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Retry once
            return updateWithErrorHandling(pageId, properties);
        } else {
            console.error('❌ Unexpected error:', error.message);
        }
        throw error;
    }
}
```

---

## 📝 **Complete Implementation Example**

```javascript
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * Immutable property types that cannot be updated
 */
const IMMUTABLE_PROPERTY_TYPES = ['title', 'created_time', 'created_by', 'last_edited_time', 'last_edited_by'];

/**
 * Check if property is immutable
 */
function isImmutableProperty(propertyValue) {
    // Check for title property (most common immutable)
    if (propertyValue.title) return true;
    
    // Add checks for other immutable types
    return false;
}

/**
 * Filter to only updatable properties
 */
function filterUpdatableProperties(allProperties, existingPage = null) {
    const filtered = {};
    
    for (const [propName, propValue] of Object.entries(allProperties)) {
        // Skip immutable properties
        if (isImmutableProperty(propValue)) {
            console.log(`   ⏭️  Skipping immutable: ${propName}`);
            continue;
        }
        
        // Include mutable properties
        filtered[propName] = propValue;
    }
    
    return filtered;
}

/**
 * Build properties object
 */
function buildProperties(therapist) {
    return {
        // ❌ Title - immutable, only for create
        "Name": {
            "title": [{ "text": { "content": therapist.name } }]
        },
        
        // ✅ Mutable properties
        "Email": {
            "email": therapist.email
        },
        "Profession": {
            "rich_text": [{ "text": { "content": therapist.profession } }]
        },
        "Modalities": {
            "rich_text": [{ "text": { "content": therapist.modalities.join(', ') } }]
        },
        "Location": {
            "rich_text": [{ "text": { "content": therapist.location } }]
        },
        "Accepting New Clients": {
            "checkbox": therapist.acceptingNewClients
        }
    };
}

/**
 * Create new page
 */
async function createTherapist(therapist) {
    const properties = buildProperties(therapist);
    
    await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: properties
    });
}

/**
 * Update existing page (only mutable properties)
 */
async function updateTherapist(pageId, therapist) {
    const allProperties = buildProperties(therapist);
    const updatableProperties = filterUpdatableProperties(allProperties);
    
    if (Object.keys(updatableProperties).length === 0) {
        console.log('   ℹ️  No properties to update');
        return;
    }
    
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties
    });
}

/**
 * Main sync function
 */
async function syncTherapist(therapist) {
    // Check if exists
    const search = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'Name',
            title: { contains: therapist.name }
        }
    });
    
    if (search.results.length > 0) {
        // Update existing
        await updateTherapist(search.results[0].id, therapist);
    } else {
        // Create new
        await createTherapist(therapist);
    }
}
```

---

## ✅ **Checklist: Property Update Implementation**

- [ ] Identify which properties are immutable (usually just Title)
- [ ] Create `filterUpdatableProperties()` function
- [ ] Use separate functions for `create` vs `update` operations
- [ ] Implement rate limiting (300ms+ between requests)
- [ ] Add proper error handling for Notion API errors
- [ ] Log skipped properties for debugging
- [ ] Test with existing entries to verify updates work
- [ ] Test with new entries to verify creation works

---

## 🎯 **Summary**

**Key Rule:** Title properties (`name` field) are **IMMUTABLE** and can only be set during page creation. All other properties are mutable and can be updated.

**Best Practice:** Always filter out immutable properties before calling `pages.update()`.

**Implementation:** Use `filterUpdatableProperties()` to ensure only updatable properties are sent to the API.

