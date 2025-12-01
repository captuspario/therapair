# ✅ Feedback Widget Tracking & Labelling Implementation

**Date:** 2025-01-30  
**Status:** ✅ Complete

---

## 🎯 What Was Added

### 1. Comprehensive Tracking Parameters

#### UTM Parameters
- `utm_source` - Traffic source (email, google, direct, etc.)
- `utm_medium` - Medium (sandbox, email, social, etc.)
- `utm_campaign` - Campaign name
- `utm_content` - Content identifier
- `utm_term` - Search term (if applicable)

#### Source Tracking
- `source` - Determined source (therapair, google, facebook, direct, etc.)
- `referrer` - Full referrer URL
- `referrer_domain` - Referrer domain only
- `landing_page` - First page visited in session

#### Session Tracking
- `session_id` - Unique session identifier
- `is_first_visit` - Boolean for first visit in session
- `visit_count` - Total visit count (localStorage)

#### Page Context
- `page_url` - Full URL
- `page_path` - URL path only
- `page_title` - Document title
- `page_context` - Context (sandbox_demo, survey, research, etc.)

#### Device & Browser
- `user_agent` - Full user agent string
- `viewport_w` / `viewport_h` - Viewport dimensions
- `screen_w` / `screen_h` - Screen dimensions
- `device_type` - mobile, tablet, or desktop

#### Timestamps
- `created_at` - ISO timestamp
- `timezone` - User timezone
- `local_time` - Localized timestamp

#### Widget Metadata
- `widget_version` - Widget version
- `widget_position` - Position (right, left)
- `widget_inline` - Inline mode flag

---

## 📊 Tracking Logic

### Source Detection
1. **UTM Source** (highest priority) - From URL parameter
2. **Referrer Domain** - Parsed from referrer
   - therapair.com.au → 'therapair'
   - google.com → 'google'
   - facebook.com → 'facebook'
   - linkedin.com → 'linkedin'
   - twitter.com/x.com → 'twitter'
3. **Direct** - No referrer

### Page Context Detection
- `/sandbox` → 'sandbox_demo'
- `/survey` → 'survey'
- `/research` → 'research'
- Other → 'unknown'

### Device Type Detection
- Width < 768px → 'mobile'
- Width < 1024px → 'tablet'
- Width >= 1024px → 'desktop'

---

## 🔧 Configuration

### feedback-config.json
```json
{
  "tracking": {
    "enabled": true,
    "trackUtm": true,
    "trackReferrer": true,
    "trackSession": true,
    "trackDevice": true,
    "defaultSource": "sandbox",
    "defaultMedium": "sandbox",
    "defaultCampaign": "sandbox_feedback"
  }
}
```

---

## 📝 Example Payload

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "rating": 5,
  "tags": ["usability", "content"],
  "comment": "Great experience!",
  "page_url": "https://therapair.com.au/sandbox/sandbox-demo.html?utm_source=email&utm_campaign=research",
  "page_path": "/sandbox/sandbox-demo.html",
  "page_title": "Therapair Sandbox Demo",
  "page_context": "sandbox_demo",
  "utm_source": "email",
  "utm_medium": "sandbox",
  "utm_campaign": "research",
  "utm_content": "",
  "utm_term": "",
  "source": "email",
  "referrer": "https://mail.google.com/",
  "referrer_domain": "mail.google.com",
  "landing_page": "https://therapair.com.au/sandbox/sandbox-demo.html",
  "session_id": "session-1234567890-abc123",
  "is_first_visit": true,
  "visit_count": 1,
  "user_agent": "Mozilla/5.0...",
  "viewport_w": 1920,
  "viewport_h": 1080,
  "screen_w": 1920,
  "screen_h": 1080,
  "device_type": "desktop",
  "created_at": "2025-01-30T12:00:00.000Z",
  "timezone": "Australia/Melbourne",
  "local_time": "30/01/2025, 11:00:00 PM",
  "widget_version": "1.0.0",
  "widget_position": "right",
  "widget_inline": false
}
```

---

## 🎯 Use Cases

### 1. Campaign Tracking
Track which email campaigns drive feedback:
- `utm_source=email&utm_campaign=research` → Email campaign feedback
- `utm_source=email&utm_campaign=therapist_research` → Therapist research campaign

### 2. Source Analysis
Understand where users come from:
- `source=google` → Organic search
- `source=facebook` → Social media
- `source=direct` → Direct visits

### 3. User Journey
Track user behavior:
- `is_first_visit=true` → New users
- `visit_count` → Returning users
- `landing_page` → Entry point

### 4. Device Optimization
Optimize for device types:
- `device_type=mobile` → Mobile users
- `device_type=desktop` → Desktop users

---

## ✅ Files Modified

1. **`products/sandbox/public/feedback-widget.js`**
   - Added comprehensive tracking payload
   - Added tracking helper methods
   - Enhanced source detection

2. **`products/sandbox/public/feedback-config.json`**
   - Added tracking configuration section

3. **`products/sandbox/api/feedback.ts`**
   - Updated TypeScript interface for tracking fields

---

## 🚀 Next Steps

1. **Test Tracking:**
   - Submit feedback with UTM parameters
   - Verify all fields are captured
   - Check database storage

2. **Analytics Integration:**
   - Connect to analytics dashboard
   - Create tracking reports
   - Set up alerts for low ratings

3. **Labeling System:**
   - Create Notion database labels
   - Auto-categorize feedback
   - Set up filtering views

---

**Last Updated:** 2025-01-30  
**Status:** ✅ Ready for testing

