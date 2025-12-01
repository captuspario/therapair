# User Research Tracking Analysis & Best Practices

**Date:** 2025-01-30  
**Status:** Current Implementation Review

---

## 📊 Current Tracking Flow

### 1. Survey Link Click → Survey Completion

**Tracking Method:**
- **Token-based identification**: Each email contains a unique JWT token
- **UTM parameters**: All survey links include UTM tracking
- **Session ID**: Generated client-side using `crypto.randomUUID()`

**What Gets Tracked:**
- ✅ Survey completion (saved to `NOTION_DB_SURVEY`)
- ✅ Therapist email/ID (from token)
- ✅ UTM parameters (source, medium, campaign, content)
- ✅ Session ID
- ✅ Survey responses (all fields)

**Database:** `2995c25944da80a5b5d1f0eb9db74a36` (Survey Responses)

**Link Format:**
```
https://therapair.com.au/research/survey/index.html?token={JWT}&utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=survey&utm_email={email}
```

---

### 2. Survey → Sandbox Demo Navigation

**Current Implementation:**
- Survey success page includes sandbox CTA with UTM parameters
- UTM parameters are preserved in the redirect URL
- **Issue**: Email/therapist ID is NOT automatically passed to sandbox

**Link Format:**
```
https://therapair.com.au/sandbox/sandbox-demo.html?utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=sandbox_demo&utm_term=survey_completion&survey_completed=true&session_id={sessionId}
```

**Missing:**
- ❌ Therapist email not in URL
- ❌ Therapist ID not in URL
- ❌ Token not passed (for security reasons, but email could be)

---

### 3. Sandbox Demo → Feedback Submission

**Current Implementation:**
- Feedback widget captures UTM parameters from URL
- Feedback saved to `NOTION_DB_SANDBOX` (Sandbox Feedback database)
- **Attempts** to link to therapist directory if email found in URL

**What Gets Tracked:**
- ✅ Rating (1-6 stars)
- ✅ Tags (Bug, Usability, Speed, Content, Accessibility, Other)
- ✅ Comments
- ✅ Page URL (with UTM parameters)
- ✅ Session ID (if available)
- ✅ Device type, viewport, user agent
- ✅ Timestamp

**Linking to Therapist Directory:**
- ✅ Checks for `email` parameter in URL
- ✅ Checks for `therapist_email` in payload
- ✅ If email found → looks up therapist in `THERAPIST_DIRECTORY_DATABASE_ID`
- ✅ If found → appends feedback to "Sandbox Feedback" property

**Database:** 
- Primary: `2a75c25944da804cbd87d4daac0ae901` (Sandbox Feedback)
- Secondary: `THERAPIST_DIRECTORY_DATABASE_ID` (if email match found)

---

## ⚠️ Current Gaps

### Gap 1: Email Not Passed to Sandbox
**Problem:** When user clicks "See the sandbox prototype" from survey, their email is not included in the URL.

**Impact:** 
- Sandbox feedback cannot be automatically linked to therapist directory
- Manual matching required using UTM parameters or session ID

**Solution Needed:**
- Add `utm_email` or `email` parameter to sandbox URL from survey success page
- Ensure email is passed through the entire flow

### Gap 2: Session ID Not Consistently Tracked
**Problem:** Session ID is generated in survey but may not persist to sandbox.

**Impact:**
- Cannot link survey completion to sandbox visit without manual matching

**Solution Needed:**
- Store session ID in sessionStorage when survey completes
- Read session ID from sessionStorage in sandbox
- Include session ID in all feedback submissions

### Gap 3: No Direct Survey → Sandbox → Feedback Link
**Problem:** No single identifier that links all three touchpoints.

**Impact:**
- Requires manual analysis to connect survey responses, sandbox visits, and feedback

**Solution Needed:**
- Use therapist email as primary identifier (already in survey)
- Pass email through entire flow
- Store email in sessionStorage for sandbox

---

## ✅ Best Practices for User Research Tracking

### 1. **Primary Identifier: Email Address**
**Why:** 
- Most reliable identifier
- Already captured in survey
- Can be used to link all touchpoints

**Implementation:**
- Include email in all URLs (as UTM parameter or query param)
- Store email in sessionStorage when survey completes
- Include email in all feedback submissions

### 2. **Session Continuity**
**Why:**
- Links multiple interactions in same session
- Helps understand user journey

**Implementation:**
- Generate session ID at first touchpoint (survey)
- Store in sessionStorage
- Pass through all URLs
- Include in all API calls

### 3. **UTM Parameter Strategy**
**Why:**
- Industry standard
- Works across different tools
- Easy to analyze

**Recommended Parameters:**
```
utm_source=email          # Traffic source
utm_medium=research       # Medium type
utm_campaign=therapist_research  # Campaign name
utm_content=sandbox_demo  # Specific content/CTA
utm_term=survey_completion # Context/trigger
utm_email={email}         # Therapist email (custom)
```

### 4. **Multi-Database Tracking**
**Why:**
- Different databases serve different purposes
- Allows for specialized analysis

**Current Setup:**
- **Survey Responses**: Detailed survey data
- **Sandbox Feedback**: User experience feedback
- **Therapist Directory**: Master record with all touchpoints

**Best Practice:**
- Save to specialized database first (survey/feedback)
- Then update master record (therapist directory)
- Use email as linking key

### 5. **Privacy & Consent**
**Why:**
- GDPR/privacy compliance
- User trust

**Implementation:**
- Only track with explicit consent
- Allow opt-out
- Anonymize data where possible
- Clear privacy policy

---

## 🔧 Recommended Improvements

### Priority 1: Pass Email Through Flow

**Survey Success Page → Sandbox:**
```javascript
// In survey success.html or main.js
const sandboxUrl = new URL('/sandbox/sandbox-demo.html', window.location.origin);
// Add email from survey state
if (state.therapist?.email) {
  sandboxUrl.searchParams.set('email', state.therapist.email);
  sandboxUrl.searchParams.set('utm_email', state.therapist.email);
}
```

**Sandbox → Store Email:**
```javascript
// In sandbox-demo.html
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email') || urlParams.get('utm_email');
if (email) {
  sessionStorage.setItem('therapair_research_email', email);
}
```

**Feedback Submission → Include Email:**
```javascript
// In feedback widget
const email = sessionStorage.getItem('therapair_research_email') || 
              urlParams.get('email') || 
              urlParams.get('utm_email');
if (email) {
  payload.therapist_email = email;
}
```

### Priority 2: Session ID Continuity

**Survey → Store Session ID:**
```javascript
// Already done in survey/main.js
state.sessionId = crypto.randomUUID();
sessionStorage.setItem('therapair_session_id', state.sessionId);
```

**Sandbox → Read Session ID:**
```javascript
// In sandbox-demo.html
const sessionId = sessionStorage.getItem('therapair_session_id') || 
                  urlParams.get('session_id') ||
                  crypto.randomUUID();
sessionStorage.setItem('therapair_session_id', sessionId);
```

**Feedback → Include Session ID:**
```javascript
// Already done in feedback widget
payload.session_id = sessionStorage.getItem('therapair_session_id');
```

### Priority 3: Therapist Directory Updates

**Current:** Feedback attempts to update directory if email found

**Enhancement:** Also update directory when:
- Survey completed
- Sandbox visited (track visit, not just feedback)
- Any engagement event

**Properties to Track:**
- `Research Status` - Survey completed, Sandbox visited, Feedback submitted
- `Latest Survey Date` - When survey was completed
- `Latest Sandbox Visit` - When sandbox was accessed
- `Sandbox Feedback` - All feedback entries
- `Research Source Notes` - UTM parameters, session info

---

## 📈 Tracking Checklist

### Survey Completion
- [x] Token identifies therapist
- [x] Survey responses saved
- [x] UTM parameters captured
- [x] Session ID generated
- [ ] Email passed to sandbox link
- [ ] Session ID passed to sandbox link

### Sandbox Visit
- [x] UTM parameters captured
- [ ] Email stored from URL
- [ ] Session ID stored from URL
- [ ] Visit tracked in therapist directory

### Feedback Submission
- [x] Feedback saved to sandbox database
- [x] Email lookup attempted
- [x] Directory update if email found
- [ ] Session ID included
- [ ] UTM parameters included

---

## 🎯 Summary

**Current State:**
- ✅ Survey tracking: Fully functional
- ✅ Feedback tracking: Functional but email linking is inconsistent
- ⚠️ Sandbox visit tracking: UTM captured but email not passed
- ⚠️ End-to-end linking: Requires manual matching

**Recommended Next Steps:**
1. Add email parameter to sandbox URL from survey
2. Store email in sessionStorage in sandbox
3. Include email in all feedback submissions
4. Update therapist directory on survey completion AND sandbox visit
5. Add "Sandbox Visit Date" property to therapist directory

**Best Practice:**
- Use email as primary identifier
- Maintain session continuity with session ID
- Track all touchpoints in master database (therapist directory)
- Preserve UTM parameters throughout journey

