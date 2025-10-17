# Typebot Creation Guide - Validated Process

## ✅ **This Process is 100% Validated and Working**

This guide ensures you create Typebot JSON files that import successfully every time.

---

## 📋 **Quick Reference: Valid Block Types**

### **ONLY Use These Block Types:**

1. **`"type": "text"`** - For all text content
2. **`"type": "choice input"`** - For all questions with options
3. **`"type": "Set variable"`** - For storing variables
4. **`"type": "Condition"`** - For conditional logic

### **NEVER Use These (They Don't Work):**

- ❌ `"type": "input"` - INVALID
- ❌ `"type": "text input"` - INVALID
- ❌ `"type": "email input"` - INVALID
- ❌ `"type": "rating input"` - INVALID
- ❌ `"type": "number input"` - INVALID
- ❌ `"type": "buttons"` - INVALID

---

## 🎯 **Step-by-Step Creation Process**

### **Step 1: Start with the Template**

Always start by copying the validated template:

```bash
# Reference this file:
/Users/tino/Projects/therapair/typebot-survey/TYPEBOT-VALIDATED-TEMPLATE.json
```

### **Step 2: Update Basic Info**

```json
{
    "version": "6.1",  // ALWAYS use 6.1
    "id": "your-survey-id",  // Unique ID
    "name": "Your Survey Name"  // Display name
}
```

### **Step 3: Create Groups**

Each group = one screen/page in the survey.

**Group Structure:**
```json
{
    "id": "group_question_name",
    "title": "Question Name",
    "graphCoordinates": {
        "x": 1000,  // Increment by 600 for each group
        "y": -300   // Keep consistent
    },
    "blocks": [
        // Your blocks here
    ]
}
```

**Coordinate System:**
- Start: `x: -1500`
- Each group: Add 600 to x
- Example progression: -1500, -900, -300, 300, 900, 1500...

### **Step 4: Add Text Blocks**

```json
{
    "id": "text_block_id",
    "type": "text",
    "content": {
        "richText": [
            {
                "type": "p",
                "children": [
                    {
                        "text": "Your text here"
                    }
                ]
            }
        ]
    }
}
```

**Text Formatting Options:**
```json
// Bold text
{
    "bold": true,
    "text": "Bold text"
}

// Plain text
{
    "text": "Plain text"
}

// Bullet list
{
    "type": "ul",
    "children": [
        {
            "type": "li",
            "children": [
                {
                    "text": "List item"
                }
            ]
        }
    ]
}
```

### **Step 5: Add Choice Input Blocks**

```json
{
    "id": "choice_block_id",
    "type": "choice input",
    "items": [
        {
            "id": "option_1",
            "outgoingEdgeId": "edge_to_next_group",
            "content": "Option 1"
        },
        {
            "id": "option_2",
            "outgoingEdgeId": "edge_to_next_group",
            "content": "Option 2"
        }
    ]
}
```

**Important:**
- Each item needs a unique `id`
- Each item needs an `outgoingEdgeId` (can be the same for all)
- `content` is the text displayed to users

### **Step 6: Create Edges (Connections)**

Connect groups together:

```json
{
    "id": "edge_start_to_first",
    "from": {
        "eventId": "start"  // From the start event
    },
    "to": {
        "groupId": "group_intro"  // To first group
    }
}
```

```json
{
    "id": "edge_to_next_group",
    "from": {
        "blockId": "choice_block_id"  // From a choice block
    },
    "to": {
        "groupId": "group_next"  // To next group
    }
}
```

**Edge Rules:**
- Start event → First group
- Each choice block → Next group
- Last group → No outgoing edges needed

### **Step 7: Configure Theme**

```json
"theme": {
    "general": {
        "background": {
            "type": "Color",
            "content": "#ffffff"  // White background
        },
        "progressBar": {
            "isEnabled": true,
            "color": "#10b981"  // Therapair green
        }
    },
    "chat": {
        "guestBubbles": {
            "backgroundColor": "#f7fafc"  // Light gray
        },
        "buttons": {
            "backgroundColor": "#10b981"  // Therapair green
        }
    }
}
```

### **Step 8: Final Settings**

```json
"settings": {
    "general": {
        "isBrandingEnabled": true
    }
}
```

---

## 🔍 **Validation Checklist**

Before exporting, verify:

- [ ] `"version": "6.1"`
- [ ] All block types are valid (`text`, `choice input`, `Set variable`, `Condition`)
- [ ] No invalid block types (`input`, `email input`, `rating input`, etc.)
- [ ] All groups have unique IDs
- [ ] All blocks have unique IDs
- [ ] All edges have unique IDs
- [ ] All `graphCoordinates` are set
- [ ] All `outgoingEdgeId` values match edge IDs
- [ ] Start event has an outgoing edge
- [ ] All choice items have `outgoingEdgeId`
- [ ] Theme colors are valid hex codes
- [ ] JSON is valid (no syntax errors)

---

## 🚀 **How to Use This Guide**

### **For Creating New Surveys:**

1. **Copy the template:**
   ```bash
   cp TYPEBOT-VALIDATED-TEMPLATE.json my-new-survey.json
   ```

2. **Follow the step-by-step process above**

3. **Validate using the checklist**

4. **Test import in Typebot**

### **For AI/ChatGPT:**

**Use this prompt:**

```
I need to create a Typebot survey. Please use the validated template and follow these rules:

1. Start with: /Users/tino/Projects/therapair/typebot-survey/TYPEBOT-VALIDATED-TEMPLATE.json

2. ONLY use these block types:
   - "type": "text" (for text content)
   - "type": "choice input" (for questions)
   - "type": "Set variable" (for variables)
   - "type": "Condition" (for logic)

3. NEVER use: input, email input, rating input, text input, buttons

4. Follow the TYPEBOT-CREATION-GUIDE.md process

5. Validate against the checklist before outputting

Create a survey for: [YOUR SURVEY PURPOSE]
```

---

## 📚 **Reference Files**

- **Template:** `TYPEBOT-VALIDATED-TEMPLATE.json`
- **Working Example:** `therapair-research-survey-CORRECTED.json`
- **User Template:** `typebot-export-therapair-matching-flow-2jehhk9.json`
- **This Guide:** `TYPEBOT-CREATION-GUIDE.md`

---

## ⚠️ **Common Mistakes to Avoid**

1. **Using wrong block types** - Only use the 4 validated types
2. **Missing outgoingEdgeId** - Every choice item needs one
3. **Duplicate IDs** - All IDs must be unique
4. **Wrong version** - Always use "6.1"
5. **Invalid coordinates** - Follow the coordinate system
6. **Missing edges** - Every connection needs an edge
7. **Invalid JSON** - Always validate syntax

---

## ✅ **Success Criteria**

A valid Typebot JSON file will:
- ✅ Import without errors in Typebot
- ✅ Display all text correctly
- ✅ Show all choice options
- ✅ Navigate between groups properly
- ✅ Display the correct theme colors
- ✅ Show progress bar

---

## 🎓 **Learning from Mistakes**

**What We Learned:**
- Typebot v6.1 has specific block types
- Not all "input" types are valid
- The working template is the source of truth
- Validation checklist prevents errors

**What to Do:**
- Always start with validated template
- Follow the step-by-step process
- Use the validation checklist
- Test import before finalizing

---

## 🔗 **Quick Links**

- Typebot Documentation: https://docs.typebot.io
- Therapair Typebot Folder: `/Users/tino/Projects/therapair/typebot-survey/`
- Template File: `TYPEBOT-VALIDATED-TEMPLATE.json`
- This Guide: `TYPEBOT-CREATION-GUIDE.md`

---

**Last Updated:** October 17, 2025
**Validated:** ✅ Working with Typebot v6.1
**Status:** Production Ready
