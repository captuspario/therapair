# 🤖 Typebot Survey Setup Guide

## 🎯 Overview

This guide will help you set up the Therapair User Research Survey in Typebot and connect it to your Notion database.

---

## 📋 Prerequisites

- [ ] Typebot account (free at https://typebot.io)
- [ ] Notion workspace with database created
- [ ] Notion integration token
- [ ] Notion database ID

---

## 🚀 Step 1: Create Typebot Account

### 1.1 Sign Up
1. Go to https://typebot.io
2. Click **Sign up**
3. Choose **Continue with Google** (recommended) or email
4. Verify your email if required

### 1.2 Create Workspace
1. Name your workspace: "Therapair"
2. Choose workspace URL: `therapair` (or your preference)
3. Click **Create workspace**

---

## 📝 Step 2: Import Survey

### 2.1 Create New Typebot
1. Click **+ New typebot**
2. Name it: "Therapair Research Survey"
3. Click **Create**

### 2.2 Import Survey JSON
1. Click **...** (three dots) → **Import**
2. Select **Import from JSON**
3. Open `therapair-research-survey.json`
4. Copy entire JSON content
5. Paste into Typebot import field
6. Click **Import**

### 2.3 Verify Import
You should see:
- ✅ 6 groups (Welcome, About You, Matching Experience, etc.)
- ✅ All questions and options
- ✅ Flow connections between groups

---

## 🎨 Step 3: Customize Survey

### 3.1 Update Branding
1. Click **Settings** (gear icon)
2. Go to **General** tab
3. Update:
   - **Name:** "Therapair Research Survey"
   - **Description:** "5-7 minute survey for therapists"
   - **Avatar:** Upload Therapair logo (optional)
   - **Font:** Inter (already set)

### 3.2 Update Theme
1. Click **Settings** → **Theme**
2. Update colors:
   - **Primary color:** #10b981 (Therapair green)
   - **Background:** #ffffff
   - **Text color:** #1a202c
3. Click **Save**

### 3.3 Update Links
1. Find **"Read about the project"** button in Welcome group
2. Update URL to: `https://therapair.com.au/documentation.html`
3. Find **"See Sandbox Demo"** button in Closing group
4. Update URL to: `https://therapair.com.au/quiz`
5. Find **"Visit Documentation"** button in Closing group
6. Update URL to: `https://therapair.com.au/documentation.html`

---

## 🔗 Step 4: Connect to Notion

### 4.1 Get Notion Integration Token
1. Go to https://notion.so/my-integrations
2. Click **+ New integration**
3. Name: "Therapair Typebot Integration"
4. Select your workspace
5. Click **Submit**
6. **Copy the Internal Integration Token** (starts with `secret_`)

### 4.2 Share Database with Integration
1. Open your "Therapist Research Survey Responses" database in Notion
2. Click **...** (three dots) → **Add connections**
3. Select "Therapair Typebot Integration"
4. Click **Confirm**

### 4.3 Get Database ID
1. Open your database in Notion
2. Look at the URL: `https://notion.so/workspace/DATABASE_ID?v=...`
3. **Copy the DATABASE_ID** (32-character hex string)

### 4.4 Add Webhook Block
1. In Typebot, go to **Participation** group
2. Click **+** after the last block
3. Select **Webhook** block
4. Configure:

**URL:**
```
https://api.notion.com/v1/pages
```

**Method:** POST

**Headers:**
```
Authorization: Bearer YOUR_INTEGRATION_TOKEN
Notion-Version: 2022-06-28
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "parent": {
    "database_id": "YOUR_DATABASE_ID"
  },
  "properties": {
    "Profession": {
      "select": {
        "name": "{{profession}}"
      }
    },
    "Years in Practice": {
      "select": {
        "name": "{{years_practice}}"
      }
    },
    "Client Types": {
      "multi_select": {{client_types}}
    },
    "Modalities": {
      "rich_text": [
        {
          "text": {
            "content": "{{modalities}}"
          }
        }
      ]
    },
    "How Clients Find You": {
      "multi_select": {{how_clients_find_you}}
    },
    "Great Match Definition": {
      "rich_text": [
        {
          "text": {
            "content": "{{great_match}}"
          }
        }
      ]
    },
    "Biggest Gap": {
      "rich_text": [
        {
          "text": {
            "content": "{{biggest_gap}}"
          }
        }
      ]
    },
    "Screens Clients": {
      "checkbox": {{screens_clients}}
    },
    "Open to Sharing": {
      "select": {
        "name": "{{open_to_sharing}}"
      }
    },
    "Too Personal": {
      "multi_select": {{too_personal}}
    },
    "Profile Detail Level": {
      "number": {{profile_detail_level}}
    },
    "Onboarding Time": {
      "select": {
        "name": "{{onboarding_time}}"
      }
    },
    "Trust AI Matching": {
      "select": {
        "name": "{{trust_ai}}"
      }
    },
    "Free Listing Interest": {
      "select": {
        "name": "{{free_listing}}"
      }
    },
    "Future Contact": {
      "checkbox": {{future_contact}}
    },
    "Comments": {
      "rich_text": [
        {
          "text": {
            "content": "{{comments}}"
          }
        }
      ]
    },
    "Email": {
      "email": "{{email}}"
    },
    "Consent Status": {
      "select": {
        "name": "Granted"
      }
    },
    "Processing Status": {
      "select": {
        "name": "New"
      }
    }
  }
}
```

**Important:** Replace:
- `YOUR_INTEGRATION_TOKEN` with your actual Notion token
- `YOUR_DATABASE_ID` with your actual database ID

### 4.5 Connect Webhook to Survey
1. Drag connection from **Email Capture** block to **Webhook** block
2. This ensures data is sent after email is captured

---

## 🧪 Step 5: Test Survey

### 5.1 Preview Mode
1. Click **Preview** button (top right)
2. Complete the survey as a test user
3. Check:
   - [ ] All questions display correctly
   - [ ] All buttons work
   - [ ] Links open correctly
   - [ ] Survey flows smoothly
   - [ ] Thank you message appears

### 5.2 Test Notion Integration
1. Complete survey in preview mode
2. Go to your Notion database
3. Check that new entry was created
4. Verify all data fields are populated correctly

### 5.3 Test Email Links
1. Click "See Sandbox Demo" button
2. Verify it opens: `https://therapair.com.au/quiz`
3. Click "Visit Documentation" button
4. Verify it opens: `https://therapair.com.au/documentation.html`

---

## 📤 Step 6: Publish Survey

### 6.1 Publish Typebot
1. Click **Publish** button (top right)
2. Choose **Public** (or **Private** if you prefer)
3. Click **Publish**

### 6.2 Get Survey URL
1. After publishing, you'll see a URL like:
   ```
   https://typebot.io/therapair-research-survey
   ```
2. **Copy this URL** - you'll need it for the email campaign

### 6.3 Update Email Campaign
1. Open `therapist-outreach-email.html`
2. Find the survey link
3. Replace `https://typebot.io/therapair-research` with your actual URL
4. Save file

---

## 📊 Step 7: Set Up Analytics

### 7.1 Google Analytics (Optional)
1. In Typebot, go to **Settings** → **Analytics**
2. Add your Google Analytics Measurement ID
3. Click **Save**

### 7.2 Typebot Analytics
1. Go to **Analytics** tab in Typebot dashboard
2. View:
   - Total starts
   - Completion rate
   - Average time to complete
   - Drop-off points

---

## 🔔 Step 8: Email Notifications (Optional)

### 8.1 Set Up Email Notifications
1. Go to **Settings** → **Notifications**
2. Enable **Email notifications**
3. Add your email address
4. Choose when to receive notifications:
   - New response
   - Daily summary
   - Weekly summary

---

## ✅ Pre-Launch Checklist

Before sending survey to therapists:

- [ ] Survey imported and customized
- [ ] All links updated (sandbox demo, documentation)
- [ ] Theme matches Therapair branding
- [ ] Notion integration configured and tested
- [ ] Test survey completed successfully
- [ ] Data appears in Notion database
- [ ] Survey published and URL obtained
- [ ] Email campaign updated with survey URL
- [ ] Analytics configured (optional)
- [ ] Email notifications set up (optional)

---

## 🚀 Launch

Once checklist is complete:

1. **Update email campaign** with survey URL
2. **Send test email** to yourself
3. **Complete survey** from test email
4. **Verify data** appears in Notion
5. **Send campaign** to therapist list

---

## 📈 Monitoring

### Track These Metrics

1. **Survey Starts**
   - How many clicked survey link
   - Target: >30% of email opens

2. **Completion Rate**
   - Completed / Started
   - Target: >80%

3. **Average Time**
   - How long to complete
   - Target: 5-7 minutes

4. **Drop-off Points**
   - Where people stop
   - Optimize these sections

5. **Notion Entries**
   - Total responses in database
   - Review daily for first week

---

## 🛠️ Troubleshooting

### Survey Not Loading
- **Clear browser cache**
- **Try incognito mode**
- **Check Typebot status page**

### Data Not Appearing in Notion
- **Check integration token** is correct
- **Verify database ID** is correct
- **Check database permissions** (must be shared with integration)
- **Review Typebot webhook logs** for errors

### Links Not Working
- **Test all links** in preview mode
- **Check URLs** for typos
- **Ensure survey is published**

---

## 📞 Support

- **Typebot Docs:** https://docs.typebot.io/
- **Typebot Community:** https://discord.gg/typebot
- **Notion API Docs:** https://developers.notion.com/

---

## 🎉 You're Ready!

Your Typebot survey is set up and ready to collect responses from therapists!

**Next step:** Update email campaign with survey URL and send! 🚀
