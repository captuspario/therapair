# ✅ Page/Part Tracking Feature

**Date:** 2025-11-26  
**Status:** ✅ Implemented and Deployed

---

## 🎯 Feature Overview

The feedback widget now tracks **which page/part** the feedback was initiated from, helping the user testing team determine what detail the feedback relates to.

---

## 📊 Tracked Information

### Page Context
- `page_url` - Full URL where feedback was submitted
- `page_title` - Page title
- `section` - Current section (questionnaire, results, therapist_profile, unknown)
- `scroll_percent` - Scroll position (0-100%)
- `viewport_height` - Viewport height in pixels

### Step/Question Context (for questionnaire)
- `current_step` - Current step number (1-based)
- `total_steps` - Total number of steps
- `question_id` - Unique question identifier (e.g., "who", "location")
- `question_text` - Full question text

---

## 🔧 Implementation

### Frontend (Widget)
**File:** `public/unison-style-feedback.js`

- `getPageContext()` function captures all context when modal opens
- Context stored in `feedbackPageContext` variable
- Included in payload when submitting feedback

**Key Functions:**
```javascript
// Captures context when modal opens
window.sandboxFeedbackToggle()

// Includes context in submission
window.sandboxFeedbackSubmit()
```

### Backend (API)
**File:** `api/feedback.php`

- Receives all tracking fields
- Formats page context for Notion
- Appends to Feedback field with 📍 emoji
- Updates Name/title to include step info

**Format in Notion:**
```
📍 Feedback Location:
Step: 2 of 10 | Question ID: location | Question: How would you prefer to meet? | Section: questionnaire | Scroll: 25% | Page: Therapair Sandbox Demo
```

---

## 📋 Example Tracking Data

### During Questionnaire (Step 2):
```json
{
  "current_step": 2,
  "total_steps": 10,
  "question_id": "location",
  "question_text": "How would you prefer to meet with your therapist?",
  "section": "questionnaire",
  "scroll_percent": 15,
  "viewport_height": 900
}
```

### On Results Page:
```json
{
  "section": "results",
  "scroll_percent": 0,
  "question_id": null,
  "current_step": null
}
```

---

## 🧪 Testing

**Test File:** `tests/sandbox-feedback-tracking-test.spec.js`

**Tests:**
1. ✅ Tracks page context when opening modal
2. ✅ Tracks step/question during questionnaire
3. ✅ Tracks scroll position and viewport

**Run:**
```bash
npx playwright test tests/sandbox-feedback-tracking-test.spec.js
```

---

## 📁 Files Changed

1. ✅ `public/unison-style-feedback.js`
   - Added `getPageContext()` function
   - Capture context on modal open
   - Include in submission payload

2. ✅ `api/feedback.php`
   - Parse tracking fields
   - Format for Notion
   - Update title with step info

3. ✅ `sandbox-demo.html`
   - Cache-busting updated: `v=20251126-tracking`

---

## 🎨 Notion Database Display

**Name Field:**
- `Feedback - 5⭐ - Step 2/10 - location - 2025-11-26 10:30:00`

**Feedback Field:**
- User's comment
- `📍 Feedback Location:` section with all tracking info

---

## 🚀 Deployment

**Files Deployed:**
- ✅ `unison-style-feedback.js`
- ✅ `api/feedback.php`
- ✅ `sandbox-demo.html`

**URL:** https://therapair.com.au/sandbox/sandbox-demo.html

---

## ✅ Benefits for User Testing Team

1. **Context**: Know exactly which step/question triggered feedback
2. **Patterns**: Identify problematic steps/questions
3. **Location**: Understand where users were on the page
4. **Scroll**: See if visibility issues affect feedback

---

**Status:** ✅ Deployed and Tested





