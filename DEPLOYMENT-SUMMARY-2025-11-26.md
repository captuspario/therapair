# Deployment Summary - November 26, 2025

## ✅ All Changes Deployed Successfully

### Files Deployed

1. **Survey Page** (`research/survey/index.html`)
   - Added feedback widget (same as sandbox)
   - Updated sandbox CTA button text to "See sandbox-demo"
   - Feedback widget endpoint override for survey

2. **Survey Feedback Endpoint** (`api/research/feedback.php`)
   - New endpoint for survey feedback
   - Saves to user research database (`NOTION_DB_SURVEY`)
   - Also updates VIC Therapists directory if therapist email found

3. **Sandbox Feedback Widget** (`sandbox/public/unison-style-feedback.js`)
   - Added click-outside-to-close functionality
   - Modal closes when clicking outside (but not on toggle button)

4. **Sandbox Demo** (`sandbox/sandbox-demo.html`)
   - Booking form fields disabled and greyed out
   - "Send Booking Request" button disabled
   - "Book Now" buttons show "(Demo)" label with reduced opacity
   - Prominent dummy data notice in booking modal
   - All booking buttons updated with demo styling

5. **Sandbox Feedback API** (`sandbox/api/feedback.php`)
   - Updated to also save to VIC Therapists directory
   - Extracts therapist email from UTM parameters or payload
   - Appends feedback to "Sandbox Feedback" property

---

## 🧪 Testing Checklist

### Survey Page
- [ ] Visit: `https://therapair.com.au/research/survey/index.html?token=TEST`
- [ ] Complete survey submission
- [ ] Verify "See sandbox-demo" button appears on success page
- [ ] Click feedback widget button (bottom right)
- [ ] Verify feedback widget opens
- [ ] Click outside widget - should close
- [ ] Submit feedback - should save to user research database

### Sandbox Demo
- [ ] Visit: `https://therapair.com.au/sandbox/sandbox-demo.html`
- [ ] Complete questionnaire
- [ ] View results
- [ ] Click "Book Now" button - should show "(Demo)" label
- [ ] Verify booking form fields are disabled/greyed out
- [ ] Verify dummy data notice is visible
- [ ] Try to submit form - should show alert
- [ ] Click feedback widget - should open
- [ ] Click outside widget - should close
- [ ] Submit feedback - should save to both databases

### Feedback Widget
- [ ] Test on survey page
- [ ] Test on sandbox page
- [ ] Verify click-outside-to-close works
- [ ] Verify feedback saves correctly

---

## 📋 Configuration Notes

### Required Notion Properties

1. **VIC Therapists Directory** (`28c5c25944da80a48d85fd43119f4ec1`)
   - Property: `Sandbox Feedback` (Rich Text)
   - If not exists, add it or configure `NOTION_DIRECTORY_SANDBOX_FEEDBACK_PROPERTY` in config.php

2. **User Research Feedback Database** (`NOTION_DB_SURVEY`)
   - Should have: `Name`, `Rating`, `Feedback`, `Source`, `Submission Date`, `Email`, `Page URL`
   - Used for survey feedback

3. **Sandbox Feedback Database** (`NOTION_DB_SANDBOX`)
   - Existing database for sandbox feedback
   - Still used as primary storage

---

## 🎯 Best Practices Implemented

### Demo/Prototype Communication
- ✅ Multiple notices at different stages
- ✅ Disabled functionality prevents false expectations
- ✅ Visual indicators (greyed out, reduced opacity)
- ✅ Clear labels indicate demo state

### User Experience
- ✅ Users can explore interface
- ✅ "More Info" buttons still work
- ✅ Feedback widget available for research
- ✅ Click-outside-to-close improves UX

### Data Tracking
- ✅ Survey feedback → User research database
- ✅ Sandbox feedback → Sandbox database + VIC Therapists directory
- ✅ Page/part tracking for user testing team
- ✅ Therapist email extraction for directory updates

---

## 🔍 Verification Commands

```bash
# Check if files are deployed
curl -I https://therapair.com.au/research/survey/index.html
curl -I https://therapair.com.au/api/research/feedback.php
curl -I https://therapair.com.au/sandbox/public/unison-style-feedback.js
curl -I https://therapair.com.au/sandbox/sandbox-demo.html
curl -I https://therapair.com.au/sandbox/api/feedback.php
```

---

## 📝 Next Steps

1. **Test all functionality** using the checklist above
2. **Verify Notion databases** receive feedback correctly
3. **Check browser console** for any JavaScript errors
4. **Monitor feedback submissions** in Notion
5. **Add "Sandbox Feedback" property** to VIC Therapists directory if missing

---

## 🐛 Known Issues / Notes

- Survey page button visibility: If button doesn't show, try hard refresh (`Cmd+Shift+R`)
- Feedback widget: Click-outside listener is added dynamically when modal opens
- Sandbox booking: All functionality disabled as expected for demo
- Database properties: May need to add "Sandbox Feedback" property to VIC Therapists directory

---

**Deployment Date:** November 26, 2025  
**Deployed By:** Automated Script  
**Status:** ✅ All files deployed successfully

