# 🚀 Typebot + Notion Quick Reference

**One-page cheat sheet for future projects**

---

## ✅ DO THIS

### Adding Notion Properties
```bash
curl -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{"Email":{"email":{}}}}'
```

### Updating Notion Pages
```javascript
// Filter out immutable properties FIRST
const updatable = filterUpdatableProperties(allProperties);
await notion.pages.update({ page_id, properties: updatable });
```

### Typebot Edges
```json
{"from": {"blockId": "specific_block"}, "to": {"blockId": "next_block"}}
```

---

## ❌ DON'T DO THIS

### Node.js SDK for Properties
```javascript
// This APPEARS to work but doesn't persist
await notion.databases.update({ properties: {...} });
```

### Updating Title Property
```javascript
// Title is IMMUTABLE - this fails
properties: {"Name": {"title": [...]}}
```

### Commas in Multi-select Options
```json
{"name": "Option (A, B, C)"}  // ❌ Fails
{"name": "Option (A B C)"}    // ✅ Works
```

---

## 📋 Property Types

| Type | Create | Update | Format |
|------|--------|--------|--------|
| `title` | ✅ | ❌ | `{"title": [{"text": {"content": "text"}}]}` |
| `rich_text` | ✅ | ✅ | `{"rich_text": [{"text": {"content(form | Format content | Formatting )}}]}` |
| `email` | ✅ | ✅ | `{"email": "email@example.com"}` |
| `select` | ✅ | ✅ | `{"select": {"name": "Option"}}` |
| `multi_select` | ✅ | ✅ | `{"multi_select": [{"name": "A"}, {"name": "B"}]}` |
| `number` | ✅ | ✅ | `{"number": 42}` |
| `checkbox` | ✅ | ✅ | `{"checkbox": true}` |
| `date` | ✅ | ✅ | `{"date": {"start": "2025-01-27"}}` |

---

## 🔧 Helper Functions

### Filter Immutable Properties
```javascript
function filterUpdatableProperties(props) {
    const filtered = {};
    for (const [name, value] of Object.entries(props)) {
        if (value.title) continue;  // Skip Title
        filtered[name] = value;
    }
    return filtered;
}
```

### Rate Limiting
```javascript
const DELAY = 300; // ms between requests
await new Promise(resolve => setTimeout(resolve, DELAY));
```

---

## 🎯 Common Workflows

### Create New Page
```javascript
const properties = buildProperties(data);  // Include Title
await notion.pages.create({ parent: { database_id }, properties });
```

### Update Existing Page
```javascript
const allProps = buildProperties(data);
const updatable = filterUpdatableProperties(allProps);  // Exclude Title
await notion.pages.update({ page_id, properties: updatable });
```

### Add Database Properties
```bash
# Use curl, NOT Node.js SDK
curl -X PATCH "https://api.notion.com/v1/databases/$DB_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"properties":{...}}'
```

---

## 📚 Full Documentation

- **Complete Guide:** `docs/strategy/TYPEBOT-AND-NOTION-COMPLETE-GUIDE.md`
- **Notion Properties:** `docs/strategy/NOTION-PROPERTY-WRITING-GUIDE.md`
- **Template Script:** `campaigns/typebot-survey/TEMPLATE-add-notion-properties.sh`

---

**Remember:** curl commands for properties, filter immutable properties for updates!


