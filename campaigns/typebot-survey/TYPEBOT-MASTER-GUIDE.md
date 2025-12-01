# Typebot Master Guide - Complete Reference

## 🎯 Core Principles

### 1. **ALWAYS Follow Working Examples Exactly**
- When given a working example, copy the structure 100% exactly
- Don't assume, don't "improve", just replicate
- Verify every field matches the working example

### 2. **Critical Success Pattern**
```
Multi-select Block → Variable Storage → Condition Check → Routing
```

## 📋 Multi-Select with "Other" Pattern

### ✅ **WORKING STRUCTURE** (Copy This Exactly)

#### 1. **Multi-Select Block Configuration**
```json
{
    "id": "choice_block_id",
    "type": "choice input",
    "variableId": "unique_variable_name",
    "items": [
        {
            "id": "option_1",
            "content": "Option 1"
        },
        {
            "id": "other_option",
            "content": "Other"  // ← Case sensitive!
        }
    ],
    "options": {
        "isMultipleChoice": true,
        "variableId": "unique_variable_name",  // ← CRITICAL: Must match above!
        "buttonLabel": "Continue"
    }
}
```

#### 2. **Condition Block Configuration**
```json
{
    "id": "condition_block_id",
    "type": "Condition",
    "items": [
        {
            "id": "check_other_item",
            "content": {
                "comparisons": [
                    {
                        "id": "contains_other_check",
                        "variableId": "unique_variable_name",  // ← Must match multi-select variable
                        "comparisonOperator": "Contains",
                        "value": "Other"  // ← Must match option content exactly (case sensitive)
                    }
                ]
            },
            "outgoingEdgeId": "edge_to_text_input"
        }
    ],
    "outgoingEdgeId": "edge_to_next_question"  // ← Default "else" path
}
```

#### 3. **Edge Configuration**
```json
{
    "id": "edge_to_text_input",
    "from": {
        "blockId": "condition_block_id",
        "itemId": "check_other_item"  // ← CRITICAL: Must include itemId
    },
    "to": {
        "groupId": "text_input_group_id"
    }
},
{
    "id": "edge_to_next_question",
    "from": {
        "blockId": "condition_block_id"  // ← No itemId for default path
    },
    "to": {
        "groupId": "next_question_group_id"
    }
}
```

## 🚨 Common Mistakes & Anti-Patterns

### ❌ **DON'T DO THESE**

1. **Missing variableId in options**
   ```json
   "options": {
       "isMultipleChoice": true,
       "buttonLabel": "Continue"
       // ❌ Missing: "variableId": "variable_name"
   }
   ```

2. **Case sensitivity mismatches**
   ```json
   "content": "Other"  // ❌ Wrong case
   "value": "other"   // ❌ Wrong case
   ```

3. **Missing itemId in edges**
   ```json
   "from": {
       "blockId": "condition_id"
       // ❌ Missing: "itemId": "condition_item_id"
   }
   ```

4. **Using "conditions" instead of "content"**
   ```json
   "conditions": {  // ❌ Wrong property name
       "comparisons": [...]
   }
   ```

5. **Multiple condition items instead of single + default**
   ```json
   "items": [
       {"id": "check_other", ...},
       {"id": "no_other", ...}  // ❌ Don't do this
   ]
   ```

## 🔧 Troubleshooting Checklist

### When Conditional Logic Doesn't Work:

1. **Check Variable Storage**
   - [ ] Multi-select block has `variableId` in main block
   - [ ] Multi-select block has `variableId` in `options`
   - [ ] Both variableIds match exactly

2. **Check Condition Logic**
   - [ ] Uses `"content"` not `"conditions"`
   - [ ] Uses `"Contains"` operator
   - [ ] Value matches option content exactly (case sensitive)

3. **Check Edge Routing**
   - [ ] Condition item edge has `itemId` in `from`
   - [ ] Default edge has NO `itemId` in `from`
   - [ ] Edge IDs are unique

4. **Check Variable Names**
   - [ ] Variable exists in `variables` array
   - [ ] Variable type is `"Array of strings"`
   - [ ] Variable name is unique

## 📚 Working Examples

### Example 1: Simple Multi-Select with Other
```json
// Multi-select block
{
    "id": "q018g9v2pzo219xbuobhk5yo",
    "type": "choice input",
    "variableId": "ai74t6sliwuqlg27xl5yvd1s",
    "items": [
        {"id": "ug3fa8ap3ul3br3q0f3qtk03", "content": "option 1"},
        {"id": "wgca4dv00qp5kqjf5hibw3b0", "content": "oprion 2"},
        {"id": "ct6macwqd0cs7aa552ig6tpb", "content": "option 3"},
        {"id": "wrod8j0igb21dee19n2u96ci", "content": "other"}
    ],
    "options": {
        "isMultipleChoice": true,
        "variableId": "ai74t6sliwuqlg27xl5yvd1s"
    }
}

// Condition block
{
    "id": "sqaoi8kyvd5gf6vvl47q7wwb",
    "type": "Condition",
    "items": [
        {
            "id": "nirymmobjt0evj2ayygvhudp",
            "content": {
                "comparisons": [
                    {
                        "id": "fazt2hs420bkv9bf2y133uz2",
                        "variableId": "ai74t6sliwuqlg27xl5yvd1s",
                        "comparisonOperator": "Contains",
                        "value": "other"
                    }
                ]
            },
            "outgoingEdgeId": "e7lz8ap27jp3sah1jqlzt4oz"
        }
    ],
    "outgoingEdgeId": "zcqn3a4tdu491la3nwfg97nj"
}

// Edges
{
    "id": "e7lz8ap27jp3sah1jqlzt4oz",
    "from": {
        "blockId": "sqaoi8kyvd5gf6vvl47q7wwb",
        "itemId": "nirymmobjt0evj2ayygvhudp"
    },
    "to": {
        "groupId": "vt6at56w3v9nznqojmmvzu42"
    }
},
{
    "id": "zcqn3a4tdu491la3nwfg97nj",
    "from": {
        "blockId": "sqaoi8kyvd5gf6vvl47q7wwb"
    },
    "to": {
        "groupId": "lro96rz8u4w0o3usbgtg9nkn"
    }
}
```

## 🎯 Best Practices

### 1. **Variable Naming**
- Use descriptive names: `q3_multiselect`, `q4_multiselect`
- Keep them unique across the entire flow
- Use consistent naming patterns

### 2. **ID Management**
- Make all IDs unique across the entire flow
- Use descriptive prefixes: `q3_choice`, `q3_condition`, `q3_other_input`
- Avoid generic names like `check_other` (use `q3_check_other`)

### 3. **Testing Strategy**
- Test one question at a time
- Verify both paths work (with "Other" and without "Other")
- Check that text input appears only when "Other" is selected

### 4. **Documentation**
- Keep working examples in the project
- Document any customizations or deviations
- Maintain a troubleshooting log

## 🔄 Process for Implementing Multi-Select with "Other"

1. **Create Variable**
   ```json
   {
       "id": "unique_variable_name",
       "name": "unique_variable_name",
       "type": "Array of strings"
   }
   ```

2. **Create Multi-Select Block**
   - Add `variableId` to main block
   - Add `variableId` to `options`
   - Include "Other" option with exact case

3. **Create Condition Block**
   - Use `"content"` structure
   - Use `"Contains"` operator
   - Match value exactly to option content

4. **Create Edges**
   - Condition item edge with `itemId`
   - Default edge without `itemId`

5. **Test**
   - Select "Other" → should go to text input
   - Select other options → should skip to next question

## 📝 Quick Reference Commands

### Validate JSON
```bash
python3 -m json.tool file.json > /dev/null && echo "✅ JSON is valid"
```

### Search for Patterns
```bash
grep -A 10 -B 5 "pattern" file.json
```

### Check Variable Usage
```bash
grep -n "variable_name" file.json
```

---

**Remember: When in doubt, copy a working example exactly. Don't assume, don't improve, just replicate.**
