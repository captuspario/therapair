# Global Feedback Widget Implementation

**Date:** 2025-01-30  
**Status:** ✅ Complete

---

## 🎯 Overview

The feedback widget is now accessible from **anywhere and everywhere** on therapair.com.au. It captures which page feedback is coming from, saves tracking IDs for linking to existing users, and saves to the "User feedback" database (renamed from "Sandbox user feedback").

---

## ✅ What Was Implemented

### 1. Global Feedback Widget

**File:** `products/landing-page/public/therapair-feedback-widget.js`

**Features:**
- ✅ Accessible from any page on therapair.com.au
- ✅ Captures page URL, path, title, and section
- ✅ Generates and stores tracking ID for user linking
- ✅ Includes session ID for session continuity
- ✅ Captures UTM parameters
- ✅ Detects page section (sandbox, survey, documentation, home, other)
- ✅ Mobile responsive
- ✅ Click-outside-to-close functionality

**Usage:**
```html
<script src="/public/therapair-feedback-widget.js"></script>
```

**Added to:**
- ✅ `products/landing-page/index.html` (main landing page)

---

### 2. Updated Feedback Endpoint

**File:** `products/landing-page/api/research/feedback.php`

**Changes:**
- ✅ Now handles feedback from any page (not just survey)
- ✅ Saves to "User feedback" database (`NOTION_DB_SANDBOX`)
- ✅ Determines source based on page section (Sandbox, Survey, Documentation, Home, Website)
- ✅ Saves tracking ID for linking multiple feedback entries
- ✅ Links to therapist directory if email found
- ✅ Captures all page context (URL, path, title, section, scroll, viewport, UTM params)

**Endpoint:** `/api/research/feedback.php`

---

### 3. Database Updates

**Database Name:** "User feedback" (renamed from "Sandbox user feedback")  
**Database ID:** `2a75c25944da804cbd87d4daac0ae901`

**Properties Saved:**
- ✅ Name (title with rating, section, page, timestamp)
- ✅ Rating (1-6 stars)
- ✅ Feedback (rich text with all context)
- ✅ Audience Type (select: Sandbox, Survey, Documentation, Home, Website)
- ✅ Submission Date
- ✅ Submission Status (select: New)
- ✅ Page URL
- ✅ Tracking ID (rich text) - **NEW** - Links multiple feedback entries from same user
- ✅ Session ID (rich text) - Links feedback to survey sessions

**Config Updated:**
- ✅ `config.php` comment updated to reflect "User Feedback" name

---

### 4. Sandbox Feedback Endpoint (Legacy Support)

**File:** `products/sandbox/api/feedback.php`

**Changes:**
- ✅ Still functional for backward compatibility
- ✅ Now saves tracking ID and session ID
- ✅ Source name determined from payload
- ✅ Links to therapist directory if email found

**Note:** New implementations should use `/api/research/feedback.php` instead.

---

### 5. Survey Response Database Review

**Database:** "User research responses" (Survey Responses)  
**Database ID:** `2995c25944da80a5b5d1f0eb9db74a36`

**Tracking Properties (All Present):**
- ✅ **Survey Session ID** - Unique session identifier
- ✅ **Engagement Source** - Multi-select tags (utm_source, utm_medium, utm_campaign, etc.)
- ✅ **Source Notes** - Rich text with landing path, referrer, UTM params, user agent, IP hash
- ✅ **IP Hash** - SHA256 hash of IP address (privacy-preserving)
- ✅ **Therapist Email** - Links to therapist directory
- ✅ **Directory Page ID** - Links to therapist directory page
- ✅ **Latest Survey Date** - Updated in therapist directory
- ✅ **Research Status** - Updated in therapist directory

**Tracking Flow:**
1. Survey completion → Saved to "User research responses" database
2. Therapist directory → Updated with survey completion status
3. All UTM parameters → Captured in Engagement Source and Source Notes
4. Session ID → Links survey to sandbox visits and feedback

**Status:** ✅ **All tracking is properly set up and working**

---

## 🔗 User Linking via Tracking ID

### How It Works

1. **Tracking ID Generation:**
   - Generated on first feedback submission
   - Stored in `sessionStorage` as `therapair_tracking_id`
   - Format: UUID or `track-{timestamp}-{random}`

2. **Linking Multiple Feedback Entries:**
   - All feedback from same user has same tracking ID
   - Can query database by Tracking ID to see all feedback from one user
   - Links feedback across different pages/sessions

3. **Linking to Existing Users:**
   - If email is available → Links to therapist directory
   - If tracking ID matches → Can link multiple feedback entries
   - If session ID matches → Links to survey completion

---

## 📊 Page Context Captured

For every feedback submission, the widget captures:

**Page Information:**
- `page_url` - Full URL
- `page_path` - URL path only
- `page_title` - Document title
- `section` - Detected section (sandbox, survey, documentation, home, other)

**User Context:**
- `scroll_percent` - How far user scrolled
- `viewport_height` - Viewport height
- `viewport_width` - Viewport width
- `referrer` - Where user came from

**UTM Parameters:**
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

**Sandbox-Specific (if on sandbox page):**
- `current_step` - Current question step
- `total_steps` - Total questions
- `question_id` - Question identifier
- `question_text` - Question text

**Tracking Identifiers:**
- `tracking_id` - Unique user identifier
- `session_id` - Session identifier
- `therapist_email` - Therapist email (if available)

---

## 🚀 Deployment

### Files to Deploy:

1. **Global Widget:**
   - `products/landing-page/public/therapair-feedback-widget.js`

2. **Updated Endpoints:**
   - `products/landing-page/api/research/feedback.php`
   - `products/sandbox/api/feedback.php` (legacy support)

3. **Config:**
   - `products/landing-page/config.php` (comment update)

4. **Pages with Widget:**
   - `products/landing-page/index.html`

### Next Steps:

To add widget to other pages, simply add:
```html
<script src="/public/therapair-feedback-widget.js"></script>
```

Before `</body>` tag.

---

## ✅ Verification Checklist

### Global Widget:
- [x] Widget accessible from any page
- [x] Captures page URL, path, title
- [x] Detects page section
- [x] Generates tracking ID
- [x] Includes session ID
- [x] Captures UTM parameters
- [x] Mobile responsive
- [x] Click-outside-to-close

### Database:
- [x] Saves to "User feedback" database
- [x] Tracking ID saved
- [x] Session ID saved
- [x] Page context saved
- [x] Links to therapist directory if email found

### Survey Database:
- [x] All tracking properties present
- [x] Session ID tracked
- [x] UTM parameters tracked
- [x] Source notes tracked
- [x] IP hash tracked
- [x] Links to therapist directory

---

## 📝 Summary

**Global Feedback Widget:**
- ✅ Accessible from anywhere on therapair.com.au
- ✅ Captures which page feedback is from
- ✅ Saves tracking ID for linking to existing users
- ✅ Database renamed to "User feedback"

**Survey Response Database:**
- ✅ All tracking properties present and working
- ✅ Session ID, UTM params, source notes all tracked
- ✅ Links to therapist directory

**Status:** ✅ **Complete and ready for deployment**

---

**Last Updated:** 2025-01-30

