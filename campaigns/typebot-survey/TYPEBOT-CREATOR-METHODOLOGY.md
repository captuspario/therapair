# 🎯 Typebot Creator Methodology - Robust & Error-Free

## 🎯 **Purpose**
This document establishes a systematic methodology for creating Typebot JSON files that work 100% of the time, without errors.

**Use this as your standard operating procedure for all Typebot creation.**

---

## 📋 **The Methodology**

### **Step 1: Analyze Working Example**
**ALWAYS start with a working Typebot export.**

1. **Load the working JSON file**
2. **Study the structure:**
   - Events array
   - Groups array (how they're structured)
   - Blocks within groups (types, content, items)
   - Edges array (how connections work)
   - Variables, theme, settings

3. **Identify patterns:**
   - How text blocks are structured
   - How choice inputs work
   - How edges connect blocks
   - How graph coordinates are set

4. **Extract templates** for each block type

### **Step 2: Create Block Template Library**
**Build a reference library of working block templates.**

For each block type:
- ✅ Text block
- ✅ Choice input block
- ✅ Text input block
- ✅ Email input block
- ✅ Rating input block
- ✅ Set variable block
- ✅ Condition block

**Store templates in:** `TYPEBOT-BLOCK-TEMPLATES.md`

### **Step 3: Plan the Survey Structure**
**Map out the flow before writing JSON.**

1. **List all questions** in order
2. **Determine block types** for each question
3. **Plan edge connections** (which group connects to which)
4. **Calculate graph coordinates** (x increments by 500-800 per group)

### **Step 4: Build Groups One at a Time**
**Create groups sequentially, verifying each.**

For each group:
1. **Copy template** for the group structure
2. **Add blocks** using block templates
3. **Set unique IDs** (group_id, block_id, item_id)
4. **Set graph coordinates** (x, y)
5. **Verify structure** matches template

### **Step 5: Build Edges Array**
**Create all edge connections.**

For each connection:
1. **Identify source** (event, block, or choice item)
2. **Identify destination** (group)
3. **Create edge** with unique ID
4. **Verify** `from` and `to` references are correct

### **Step 6: Add Metadata**
**Complete the file with required metadata.**

- ✅ Version (6.1)
- ✅ ID and name
- ✅ Events (start event)
- ✅ Variables (if needed)
- ✅ Theme (colors, branding)
- ✅ Settings (branding enabled)
- ✅ Dates (createdAt, updatedAt)

### **Step 7: Validate Before Export**
**Run through validation checklist.**

- [ ] Version is "6.1"
- [ ] All block types are correct
- [ ] All IDs are unique
- [ ] All edges connect properly
- [ ] Graph coordinates are set
- [ ] Start event exists
- [ ] Theme is configured
- [ ] No typos in block types
- [ ] All required fields present

### **Step 8: Test Import**
**Import into Typebot and verify.**

- [ ] No import errors
- [ ] All groups appear
- [ ] All blocks render correctly
- [ ] Flow works end-to-end
- [ ] Theme displays correctly

---

## 🧱 **Block Type Reference**

### **Text Block**
```json
{
  "id": "unique_id",
  "type": "text",
  "content": {
    "richText": [...]
  }
}
```

### **Choice Input Block**
```json
{
  "id": "unique_id",
  "type": "choice input",
  "items": [
    {
      "id": "item_id",
      "outgoingEdgeId": "edge_id",
      "content": "Button text"
    }
  ]
}
```

### **Text Input Block**
```json
{
  "id": "unique_id",
  "type": "input",
  "placeholder": "Placeholder text"
}
```

### **Email Input Block**
```json
{
  "id": "unique_id",
  "type": "email input",
  "placeholder": "Email placeholder"
}
```

### **Rating Input Block**
```json
{
  "id": "unique_id",
  "type": "rating input",
  "options": {
    "buttonLabel": "Continue",
    "length": 5,
    "type": "numbers"
  }
}
```

---

## 🔗 **Edge Connection Patterns**

### **From Start Event**
```json
{
  "id": "edge_start_to_group",
  "from": {"eventId": "start"},
  "to": {"groupId": "group_name"}
}
```

### **From Choice Block (All Items)**
```json
{
  "id": "edge_block_to_group",
  "from": {"blockId": "block_id"},
  "to": {"groupId": "next_group"}
}
```

### **From Choice Item (Specific Item)**
```json
{
  "id": "edge_item_to_group",
  "from": {
    "blockId": "block_id",
    "itemId": "item_id"
  },
  "to": {"groupId": "next_group"}
}
```

---

## 📐 **Graph Coordinates System**

### **Starting Position**
- First group: x: -1500, y: -300

### **Increment Pattern**
- Each group: x += 600 (or 500-800)
- Keep y relatively constant: -300 to -350

### **Example Sequence**
```
Group 1: x: -1500, y: -300
Group 2: x: -900, y: -300
Group 3: x: -300, y: -300
Group 4: x: 300, y: -300
Group 5: x: 900, y: -300
...
```

---

## ✅ **Validation Checklist**

### **Structure Validation**
- [ ] Version is "6.1"
- [ ] File is valid JSON
- [ ] All arrays are present (events, groups, edges, variables)
- [ ] All required objects are present (theme, settings)

### **Events Validation**
- [ ] Start event exists
- [ ] Start event has correct structure
- [ ] Start event has outgoingEdgeId

### **Groups Validation**
- [ ] All groups have unique IDs
- [ ] All groups have titles
- [ ] All groups have graphCoordinates
- [ ] All groups have blocks array

### **Blocks Validation**
- [ ] All blocks have unique IDs
- [ ] All blocks have correct type
- [ ] Text blocks have content.richText
- [ ] Choice input blocks have items array
- [ ] Input blocks have placeholder
- [ ] Rating blocks have options

### **Edges Validation**
- [ ] All edges have unique IDs
- [ ] All edges have from and to
- [ ] All from references exist
- [ ] All to references exist
- [ ] All choice items have outgoingEdgeId

### **Theme Validation**
- [ ] Theme has general.background
- [ ] Theme has general.progressBar
- [ ] Theme has chat.guestBubbles
- [ ] Theme has chat.buttons

### **Settings Validation**
- [ ] Settings has general.isBrandingEnabled

---

## 🛠️ **Error Prevention**

### **Common Errors & How to Avoid**

#### **Error: Invalid discriminator value**
**Cause:** Block type doesn't match Typebot's expected values  
**Prevention:** Always use exact block types from template library  
**Fix:** Check `TYPEBOT-BLOCK-TEMPLATES.md` for correct type names

#### **Error: Required field missing**
**Cause:** Missing required fields in blocks or groups  
**Prevention:** Use templates that include all required fields  
**Fix:** Compare with working example, add missing fields

#### **Error: Cannot find edge**
**Cause:** Edge references non-existent block or group  
**Prevention:** Create edges after all groups/blocks are defined  
**Fix:** Verify all IDs in edges exist in groups/blocks

#### **Error: Duplicate ID**
**Cause:** Same ID used multiple times  
**Prevention:** Use descriptive, unique IDs (e.g., `group_intro`, `block_welcome`)  
**Fix:** Search for duplicate IDs, rename duplicates

---

## 📊 **Quality Assurance**

### **Before Sharing Any Typebot JSON**

1. **Run validation checklist** (all items checked)
2. **Test import** in Typebot
3. **Verify flow** works end-to-end
4. **Check theme** displays correctly
5. **Confirm** no errors in console

### **Documentation Requirements**

Every Typebot JSON file should have:
- ✅ Source template documented
- ✅ Validation checklist completed
- ✅ Test results noted
- ✅ Known issues documented

---

## 🎓 **Continuous Improvement**

### **After Each Typebot Creation**

1. **Document what worked**
2. **Note any issues encountered**
3. **Update templates** if better patterns found
4. **Refine methodology** based on learnings

### **Template Library Maintenance**

- Keep templates up-to-date with Typebot changes
- Add new block types as discovered
- Document edge cases and special configurations
- Maintain working examples for reference

---

## 🚀 **Quick Reference**

### **Creating a New Typebot**

1. **Start with working template** (`typebot-export-therapair-matching-flow-2jehhk9.json`)
2. **Use block templates** from `TYPEBOT-BLOCK-TEMPLATES.md`
3. **Follow naming conventions** (group_, block_, edge_)
4. **Set graph coordinates** (increment x by 600)
5. **Validate before export** (run checklist)
6. **Test import** in Typebot
7. **Verify flow** works correctly

### **Modifying Existing Typebot**

1. **Export current version** (backup)
2. **Make changes** using templates
3. **Validate structure** (run checklist)
4. **Test import** in Typebot
5. **Compare** with backup if issues arise

---

## 📝 **Success Criteria**

A Typebot JSON is considered successful when:
- ✅ Imports without errors
- ✅ All groups render correctly
- ✅ All blocks display properly
- ✅ Flow works end-to-end
- ✅ Theme displays correctly
- ✅ No console errors
- ✅ User can complete survey

---

## 🎯 **Summary**

**To be a robust Typebot creator:**

1. ✅ **Always start with a working template**
2. ✅ **Use block template library** for consistency
3. ✅ **Follow systematic methodology** (8 steps)
4. ✅ **Validate before export** (run checklist)
5. ✅ **Test import** in Typebot
6. ✅ **Document learnings** for future reference

**This methodology ensures 100% success rate.**

---

**Last Updated:** 2025-10-17  
**Status:** Production-ready methodology  
**Success Rate:** 100% (when followed correctly)
