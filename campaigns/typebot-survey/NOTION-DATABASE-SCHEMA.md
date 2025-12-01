# 📊 Notion Database Schema for Therapist Research Survey

**Last Updated:** 2025-01-27  
**Status:** ✅ Updated to match working survey  
**Reference:** See `NOTION-DATABASE-UPDATE.md` for changes summary

---

## 🎯 Database Setup

### Create New Database in Notion

1. **Open Notion** and navigate to your workspace
2. **Create new page** called "Therapair Research Survey Responses"
3. **Add a database** → **Table view**
4. **Name it:** "Therapist Research Survey Responses"

---

## 📋 Database Properties

Create the following properties (columns) in your Notion database:

### **1. Respondent ID** (Title)
- **Type:** Title
- **Purpose:** Unique identifier for each response
- **Auto-generated:** Yes (Notion will auto-increment)

### **2. Timestamp** (Date)
- **Type:** Created time
- **Format:** Date & Time
- **Purpose:** When the survey was completed
- **Auto-generated:** Yes

### **3. Email** (Email)
- **Type:** Email
- **Purpose:** Contact for follow-up
- **Required:** No (optional in survey)

### **4. Profession** (Select)
- **Type:** Select
- **Options:**
  - Psychologist
  - Counsellor
  - Social Worker
  - Psychiatrist
  - Psychotherapist
  - Art Therapist
  - Other
- **Purpose:** Professional background

### **4b. Profession Other** (Text)
- **Type:** Text
- **Purpose:** Custom profession if "Other" selected
- **Required:** No

### **5. Years in Practice** (Select)
- **Type:** Select
- **Options:**
  - 0-2 years
  - 3-5 years
  - 6-10 years
  - 10+ years
- **Purpose:** Experience level

### **6. Client Types** (Multi-select)
- **Type:** Multi-select
- **Options:**
  - Adults
  - Teens
  - Couples
  - LGBTQ+
  - Trauma-focused
  - Neurodivergent
  - Other
- **Purpose:** Types of clients they work with

### **6b. Client Types Other** (Text)
- **Type:** Text
- **Purpose:** Custom client types if "Other" selected
- **Required:** No

### **7. Modalities** (Multi-select)
- **Type:** Multi-select
- **Options:**
  - CBT
  - DBT
  - ACT
  - EMDR
  - Person-Centred
  - Somatic
  - Gestalt
  - Psychodynamic
  - Relationship Therapy
  - Art Therapy
  - Other
- **Purpose:** Therapy approaches used

### **7b. Modalities Other** (Text)
- **Type:** Text
- **Purpose:** Custom modalities if "Other" selected
- **Required:** No

### **8. How Clients Find You** (Multi-select)
- **Type:** Multi-select
- **Options:**
  - Referrals
  - Directories
  - Word of mouth
  - Online search
  - Social media
  - Other
- **Purpose:** Current client acquisition channels

### **8b. How Clients Find You Other** (Text)
- **Type:** Text
- **Purpose:** Custom acquisition method if "Other" selected
- **Required:** No

### **9. Great Match Factors** (Multi-select)
- **Type:** Multi-select
- **Options:**
  - Shared core values
  - Similar communication style
  - Trust
  - Life goal alignment
  - Lived experience
  - Shared religious beliefs/background
  - Shared cultural background
  - Shared experience of a diagnosis (ADHD, Autism, OCD, Addiction, etc)
  - Other
- **Purpose:** What makes a great match

### **9b. Great Match Other** (Text)
- **Type:** Text
- **Purpose:** Custom match factors if "Other" selected
- **Required:** No

### **10. Biggest Gap** (Text)
- **Type:** Text
- **Purpose:** Frustrations with current systems
- **Format:** Long text

### **11. Screening Clients** (Select)
- **Type:** Select
- **Options:**
  - Yes
  - No
- **Purpose:** Do they currently screen clients for fit

### **12. Open to Sharing** (Select)
- **Type:** Select
- **Options:**
  - Yes
  - Maybe
  - No
- **Purpose:** Willingness to share personality traits, values, lived experiences

### **13. Which Questions Matter** (Multi-select)
- **Type:** Multi-select
- **Options:**
  - Communication style
  - Relationship style
  - Personality traits
  - Lived experience
  - Values and beliefs
  - Therapeutic work style and boundaries
  - All of the above
  - None
  - Other
- **Purpose:** Which questions create deepest personalisation

### **13b. Which Questions Matter Other** (Text)
- **Type:** Text
- **Purpose:** Custom attributes if "Other" selected
- **Required:** No

### **14. Personality Test** (Select)
- **Type:** Select
- **Options:**
  - Yes
  - No
  - Maybe
- **Purpose:** Willingness to take personality test (Big Five, HEXACO)

### **15. Too Personal** (Multi-select)
- **Type:** Multi-select
- **Options:**
  - Trauma history
  - Religious beliefs/background
  - Political views
  - Personal relationships
  - Financial situation
  - Cultural background
  - None
  - Other
- **Purpose:** What they consider too personal to share

### **15b. Too Personal Other** (Text)
- **Type:** Text
- **Purpose:** Custom "too personal" items if "Other" selected
- **Required:** No

### **16. Profile Detail Level** (Select)
- **Type:** Select
- **Options:**
  - 1 - Simple (a few basic details)
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
  - 9
  - 10 - Very detailed (a full understanding of you as a therapist and as a person)
- **Purpose:** How detailed should profiles be (1-10 scale)

### **17. Onboarding Time** (Select)
- **Type:** Select
- **Options:**
  - 2-3 min
  - 5 min
  - 10 min
  - 15 min+
  - As long as it takes to get the best matches with clients
- **Purpose:** Acceptable onboarding duration

### **18. Trust AI Matching** (Select)
- **Type:** Select
- **Options:**
  - Yes
  - Maybe
  - No
  - I'm unsure about AI
- **Purpose:** Comfort with AI-powered matching

### **19. Free Listing Interest** (Select)
- **Type:** Select
- **Options:**
  - Yes
  - Maybe later
  - No
- **Purpose:** Interest in one-year free listing

### **20. Future Contact** (Select)
- **Type:** Select
- **Options:**
  - Yes
  - No
- **Purpose:** Can we contact for future research

### **21. Comments** (Text)
- **Type:** Text
- **Purpose:** Additional feedback
- **Format:** Long text

### **22. Consent Status** (Select)
- **Type:** Select
- **Options:**
  - Pending
  - Granted
  - Withdrawn
- **Purpose:** GDPR compliance tracking

### **23. Processing Status** (Select)
- **Type:** Select
- **Options:**
  - New
  - In Review
  - Processed
  - Follow-up Needed
- **Purpose:** Internal workflow tracking

### **24. Notes** (Text)
- **Type:** Text
- **Purpose:** Internal notes and observations
- **Format:** Long text

---

## 🔗 Typebot Integration

### Step 1: Get Notion Integration Token

1. Go to https://www.notion.so/my-integrations
2. Click **+ New integration**
3. Name: "Therapair Typebot Integration"
4. Select your workspace
5. Click **Submit**
6. **Copy the Internal Integration Token** (starts with `secret_`)

### Step 2: Share Database with Integration

1. Open your "Therapist Research Survey Responses" database
2. Click **...** (three dots) → **Add connections**
3. Select "Therapair Typebot Integration"
4. Click **Confirm**

### Step 3: Get Database ID

1. Open your database in Notion
2. Look at the URL: `https://notion.so/workspace/DATABASE_ID?v=...`
3. **Copy the DATABASE_ID** (32-character hex string)

### Step 4: Configure Typebot Webhook

In Typebot, add a **Webhook** block at the end of your survey:

**Webhook URL:**
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
    "Which Questions Matter": {
      "multi_select": {{which_questions_matter}}
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

---

## 📊 Data Analysis Views

### Create Filtered Views

#### **1. New Responses**
- **Filter:** Processing Status = "New"
- **Sort:** Timestamp (newest first)
- **Purpose:** Review new survey responses

#### **2. Free Listing Interested**
- **Filter:** Free Listing Interest = "Yes, include me"
- **Sort:** Timestamp (newest first)
- **Purpose:** Follow up with therapists interested in listing

#### **3. High Experience**
- **Filter:** Years in Practice = "10+ years"
- **Sort:** Timestamp
- **Purpose:** Insights from experienced practitioners

#### **4. Open to Sharing**
- **Filter:** Open to Sharing = "Yes" OR "Maybe"
- **Sort:** Timestamp
- **Purpose:** Willingness to share personal traits

#### **5. Trust AI**
- **Filter:** Trust AI Matching = "Yes" OR "Maybe"
- **Sort:** Timestamp
- **Purpose:** Comfort with AI-powered matching

---

## 📈 Analytics & Insights

### Key Metrics to Track

1. **Response Rate**
   - Total responses / Total emails sent
   - Target: >10% (industry average: 5-10%)

2. **Completion Rate**
   - Completed surveys / Started surveys
   - Target: >80%

3. **Free Listing Interest**
   - "Yes, include me" / Total responses
   - Target: >30%

4. **Profile Detail Preference**
   - Average of Profile Detail Level (1-5)
   - Target: 3-4 (moderate detail)

5. **Onboarding Time Tolerance**
   - Most selected option
   - Expected: 5-10 minutes

6. **AI Trust Level**
   - "Yes" / Total responses
   - Target: >40%

### Create Summary Dashboard

Add a **Dashboard** view with:
- Total responses (count)
- Average profile detail level (number)
- Free listing interest rate (%)
- AI trust rate (%)
- Most common profession
- Most common client types

---

## 🔒 Privacy & Compliance

### GDPR Compliance

1. **Data Minimization**
   - Only collect necessary information
   - Email is optional

2. **Consent Tracking**
   - Track consent status in database
   - Allow withdrawal via email

3. **Data Retention**
   - Review responses quarterly
   - Delete after 2 years (or as required)

4. **Access Control**
   - Limit database access to authorized team members
   - Use Notion's permission system

### Data Export

1. **Export to CSV**
   - Database → Export → CSV
   - Use for analysis in Excel/Google Sheets

2. **Backup**
   - Export monthly
   - Store in secure location

---

## 🚀 Next Steps

1. ✅ Create Notion database with all properties
2. ✅ Create Typebot integration
3. ✅ Share database with integration
4. ✅ Configure Typebot webhook
5. ✅ Test survey end-to-end
6. ✅ Verify data appears in Notion
7. ✅ Create filtered views for analysis
8. ✅ Set up dashboard for key metrics

---

## 📞 Support

- **Notion Help:** https://notion.so/help
- **Typebot Docs:** https://docs.typebot.io/
- **Notion API:** https://developers.notion.com/

---

**Your Notion database is ready to receive survey responses!** 🎉
