# ✅ Page/Part Tracking - Deployed

**Date:** 2025-11-26  
**Status:** ✅ Deployed

---

## ✅ Feature Complete

The feedback widget now tracks **which page/part** feedback was initiated from, helping the user testing team understand context.

---

## 📊 What Gets Tracked

### Automatically Captured:
1. **Page URL** - Full URL where feedback was submitted
2. **Page Title** - Document title
3. **Section** - Current section (questionnaire, results, therapist_profile)
4. **Scroll Position** - Percentage scrolled (0-100%)
5. **Viewport Height** - Browser window height

### Step/Question Tracking (if on questionnaire):
6. **Current Step** - Step number (e.g., 1, 2, 3...)
7. **Total Steps** - Total number of steps (e.g., 10)
8. **Question ID** - Unique identifier (e.g., "who", "location")
9. **Question Text** - Full question text

---

## 📋 How It Works

1. **When user opens feedback modal:**
   - Context is automatically captured
   - Stored in memory

2. **When user submits feedback:**
   - All context is included in the submission
   - Sent to API along with rating/comment

3. **In Notion database:**
   - Context appears in Feedback field
   - Name/title includes step info

---

## 🎨 Notion Display Example

**Name:**
```
Feedback - 5⭐ - Step 2/10 - location - 2025-11-26 10:30:00
```

**Feedback Field:**
```
User's comment here...

📍 Feedback Location:
Step: 2 of 10 | Question ID: location | Question: How would you prefer to meet? | Section: questionnaire | Scroll: 25% | Page: Therapair Sandbox Demo
```

---

## 📁 Files Deployed

1. ✅ `public/unison-style-feedback.js`
   - Added `getPageContext()` function
   - Captures context on modal open
   - Includes in submission

2. ✅ `api/feedback.php`
   - Parses tracking fields
   - Formats for Notion
   - Updates title

3. ✅ `sandbox-demo.html`
   - Cache-busting: `v=20251126-tracking`

---

## 🚀 Production URL

https://therapair.com.au/sandbox/sandbox-demo.html

**Hard refresh** to see changes: `Ctrl+Shift+R` or `Cmd+Shift+R`

---

## ✅ Benefits

1. **Context**: Know exactly which step triggered feedback
2. **Patterns**: Identify problematic questions
3. **Location**: Understand where users were on page
4. **Testing**: Better data for user testing analysis

---

**Status:** ✅ Deployed and Ready





