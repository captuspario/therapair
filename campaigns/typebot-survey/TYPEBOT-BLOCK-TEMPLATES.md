# 🧱 Typebot Block Templates - Reference Library

## 📋 **Purpose**
This document contains verified, working Typebot v6.1 block templates based on the working Therapair Matching Flow export.

**Use this as your source of truth for creating Typebot JSON files.**

---

## 🏗️ **Core Structure**

### **Typebot File Structure**
```json
{
  "version": "6.1",
  "id": "unique-id",
  "name": "Typebot Name",
  "events": [...],
  "groups": [...],
  "edges": [...],
  "variables": [...],
  "theme": {...},
  "settings": {...},
  "createdAt": "ISO date",
  "updatedAt": "ISO date",
  "icon": null,
  "folderId": null,
  "publicId": null,
  "customDomain": null,
  "workspaceId": "",
  "resultsTablePreferences": null,
  "isArchived": false,
  "isClosed": false,
  "whatsAppCredentialsId": null,
  "riskLevel": null
}
```

---

## 🎯 **Block Type Templates**

### **1. Text Block**
```json
{
  "id": "unique_text_id",
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

**With Bold Text:**
```json
{
  "id": "unique_text_id",
  "type": "text",
  "content": {
    "richText": [
      {
        "type": "p",
        "children": [
          {
            "bold": true,
            "text": "Bold text here"
          }
        ]
      }
    ]
  }
}
```

**With Multiple Paragraphs:**
```json
{
  "id": "unique_text_id",
  "type": "text",
  "content": {
    "richText": [
      {
        "type": "p",
        "children": [
          {
            "text": "First paragraph"
          }
        ]
      },
      {
        "type": "p",
        "children": [
          {
            "text": "Second paragraph"
          }
        ]
      }
    ]
  }
}
```

**With Bullet List:**
```json
{
  "id": "unique_text_id",
  "type": "text",
  "content": {
    "richText": [
      {
        "type": "p",
        "children": [
          {
            "text": "Introduction text"
          }
        ]
      },
      {
        "type": "ul",
        "children": [
          {
            "type": "li",
            "children": [
              {
                "text": "First bullet point"
              }
            ]
          },
          {
            "type": "li",
            "children": [
              {
                "text": "Second bullet point"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

---

### **2. Choice Input Block (Buttons)**
```json
{
  "id": "unique_choice_id",
  "type": "choice input",
  "items": [
    {
      "id": "choice_item_1",
      "outgoingEdgeId": "edge_to_next_group",
      "content": "Button Text"
    },
    {
      "id": "choice_item_2",
      "outgoingEdgeId": "edge_to_another_group",
      "content": "Another Button"
    }
  ]
}
```

**Key Points:**
- Each item needs an `id`, `outgoingEdgeId`, and `content`
- `outgoingEdgeId` connects to the next group or block
- No `options` object needed for simple choice inputs

---

### **3. Text Input Block**
```json
{
  "id": "unique_input_id",
  "type": "input",
  "placeholder": "Enter your text here"
}
```

**Note:** Simple text inputs don't need `options` object in v6.1

---

### **4. Email Input Block**
```json
{
  "id": "unique_email_id",
  "type": "email input",
  "placeholder": "Enter your email"
}
```

---

### **5. Rating Input Block**
```json
{
  "id": "unique_rating_id",
  "type": "rating input",
  "options": {
    "buttonLabel": "Continue",
    "length": 5,
    "type": "numbers"
  }
}
```

---

### **6. Set Variable Block**
```json
{
  "id": "unique_set_var_id",
  "outgoingEdgeId": "edge_to_next_group",
  "type": "Set variable",
  "options": {
    "variableId": "variable_name",
    "expressionToEvaluate": "true",
    "isCode": true,
    "type": "Custom"
  }
}
```

---

### **7. Condition Block**
```json
{
  "id": "unique_condition_id",
  "outgoingEdgeId": "edge_if_false",
  "type": "Condition",
  "items": [
    {
      "id": "condition_item_1",
      "outgoingEdgeId": "edge_if_true",
      "content": {
        "logicalOperator": "AND",
        "comparisons": [
          {
            "id": "comparison_1",
            "variableId": "variable_name",
            "comparisonOperator": "Equal to",
            "value": "true"
          }
        ]
      }
    }
  ]
}
```

---

## 🏛️ **Group Structure**

### **Standard Group Template**
```json
{
  "id": "group_unique_name",
  "title": "Group Title",
  "graphCoordinates": {
    "x": 0,
    "y": 0
  },
  "blocks": [
    // Block 1,
    // Block 2,
    // etc.
  ]
}
```

**Positioning Guidelines:**
- Start at x: -1500 for first group
- Increment by 500-800 for each group
- Keep y relatively consistent (around -300)

---

## 🔗 **Edge Structure**

### **Edge from Start Event**
```json
{
  "id": "edge_start_to_group",
  "from": {
    "eventId": "start"
  },
  "to": {
    "groupId": "group_name"
  }
}
```

### **Edge from Choice Item**
```json
{
  "id": "edge_choice_to_group",
  "from": {
    "blockId": "choice_block_id",
    "itemId": "choice_item_id"
  },
  "to": {
    "groupId": "next_group_name"
  }
}
```

### **Edge from Block**
```json
{
  "id": "edge_block_to_group",
  "from": {
    "blockId": "block_id"
  },
  "to": {
    "groupId": "next_group_name"
  }
}
```

---

## 🎨 **Theme Template**

### **Basic Theme**
```json
{
  "general": {
    "background": {
      "type": "Color",
      "content": "#ffffff"
    },
    "progressBar": {
      "isEnabled": true,
      "color": "#10b981"
    }
  },
  "chat": {
    "guestBubbles": {
      "backgroundColor": "#f7fafc"
    },
    "buttons": {
      "backgroundColor": "#10b981"
    }
  }
}
```

---

## 📊 **Variables Template**

### **Variable Structure**
```json
{
  "id": "variable_id",
  "name": "variable_name",
  "isSessionVariable": false
}
```

---

## ⚙️ **Settings Template**

```json
{
  "general": {
    "isBrandingEnabled": true
  }
}
```

---

## 🚀 **Start Event Template**

```json
{
  "id": "start",
  "outgoingEdgeId": "edge_start_to_first_group",
  "graphCoordinates": {
    "x": -1800,
    "y": -300
  },
  "type": "start"
}
```

---

## 📝 **Naming Conventions**

### **IDs**
- Groups: `group_` + descriptive name (e.g., `group_intro`)
- Blocks: `block_` + descriptive name (e.g., `intro_welcome`)
- Edges: `edge_` + from + `_to_` + to (e.g., `edge_intro_to_q1`)
- Variables: descriptive name (e.g., `var_pref_male`)

### **Graph Coordinates**
- First group: x: -1500, y: -300
- Increment x by 500-800 for each group
- Keep y relatively constant (-300 to -350)

---

## ✅ **Validation Checklist**

Before exporting any Typebot JSON, verify:

- [ ] Version is "6.1"
- [ ] All block types are correct (text, choice input, input, email input, rating input, Set variable, Condition)
- [ ] All blocks have unique IDs
- [ ] All groups have unique IDs
- [ ] All edges have unique IDs
- [ ] All choice items have `outgoingEdgeId`
- [ ] All edges connect properly
- [ ] Graph coordinates are set for all groups
- [ ] Start event is present
- [ ] Theme is configured
- [ ] Settings are configured

---

## 🎯 **Common Patterns**

### **Pattern 1: Simple Question Flow**
```
Start → Intro (text + choice) → Question 1 (text + choice) → Question 2 → etc.
```

### **Pattern 2: Question with Variable Setting**
```
Start → Question (choice) → Set Variable → Next Question
```

### **Pattern 3: Conditional Routing**
```
Start → Question (choice) → Condition Block → Route A or Route B
```

---

## 🔧 **Troubleshooting**

### **Error: Invalid discriminator value**
- Check block `type` field matches exactly (case-sensitive)
- Verify block structure matches template

### **Error: Required field missing**
- Check all required fields are present
- Verify `id` fields are unique
- Check `outgoingEdgeId` exists for choice items

### **Error: Cannot find edge**
- Verify edge IDs match between blocks and edges array
- Check edge `from` and `to` references are correct

---

## 📚 **Reference**

**Based on:** `typebot-export-therapair-matching-flow-2jehhk9.json`  
**Version:** Typebot v6.1  
**Last Updated:** 2025-10-17

---

**Use these templates to build any Typebot survey correctly!** 🚀
