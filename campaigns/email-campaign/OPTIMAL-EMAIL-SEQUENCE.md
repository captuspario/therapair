# 📧 Optimal Email Campaign Sequence - Single-CTA Research + Sandbox Track

## 🎯 Recommended Approach: **Research First (Survey Only), Then Sandbox**

- Each research email has **one behavioural CTA**: the survey
- Every email includes a **soft 'Learn more about Therapair'** link
- Sandbox has its **own track** after (or alongside) research

---

## 📬 Email Sequence Structure

### **Email 1: Research Invitation (Day 0)**
**Goal:** Maximize survey participation  
**Priority:** Survey (primary) + Learn more (soft)

**Structure:**
1. Opening: Personal, peer-to-peer introduction
2. Problem: Matching challenge therapists face
3. Solution: Therapair's approach (brief)
4. Ask: Research participation (PRIMARY CTA)
5. Future: Mention free listing offer

**CTAs:**
1. 🔵 **Primary:** "Join the Research Survey" (5-7 minutes)
2. 🔗 **Soft:** "Learn more about Therapair" → documentation/landing page

**No sandbox CTA in this email.** Sandbox is introduced later in a separate track.

---

### **Email 2: Follow-up Non-Responder (Day 3)**
**Audience:** Did not open Email 1  
**Goal:** Re-engage with the survey  
**Priority:** Survey only + Learn more (soft)

**Structure:**
- Short, direct reminder
- Re-state the value of their input
- Single behavioural CTA (survey)

**CTAs:**
1. 🔵 **Primary:** "Join the Research Survey" (5-7 minutes)
2. 🔗 **Soft:** "Learn more about Therapair"

---

### **Email 3: Follow-up No-Click (Day 7)**
**Audience:** Opened Email 1 but didn't click  
**Goal:** Convert interest into survey starts  
**Priority:** Survey only + Learn more (soft)

**Structure:**
- Acknowledge they opened the email
- Emphasize the low time cost (5-7 minutes)
- Clarify what insights you're seeking

**CTAs:**
1. 🔵 **Primary:** "Join the Research Survey" (5-7 minutes)
2. 🔗 **Soft:** "Learn more about Therapair"

---

### **Email 4: Follow-up Incomplete (Day 14)**
**Audience:** Started survey but did not complete  
**Goal:** Survey completion  
**Priority:** Survey only + Learn more (soft)

**Structure:**
- Acknowledge they started the survey
- "2 minutes left" framing
- Direct survey completion link

**CTAs:**
1. 🔵 **Primary:** "Complete the survey" (2 minutes)
2. 🔗 **Soft:** "Learn more about Therapair"

---

### **Email 5: Thank You + Next Steps (Immediate)**
**Audience:** Completed survey  
**Goal:** Reward, introduce sandbox & platform  
**Priority:** Sandbox → Platform → Future research

**Structure:**
- Thank them for their time
- Explain what you're doing with their input
- Offer sandbox demo as a way to see the concept
- Mention free listing / future communication

**CTAs:**
1. 🔵 **Primary:** "Try the Sandbox Demo" (see the concept)
2. ⚪ **Secondary:** Platform listing (via future onboarding, not a live CTA yet)
3. 🔗 **Soft:** "Learn more about Therapair"

---

## 🟩 Sandbox Track (Separate from Research)

### **Email B1: Sandbox Invitation**
**File:** `EMAIL-B1-SANDBOX-INVITE-PLAIN.txt`  
**Audience:**
- Survey completers (as value/reward), and/or
- A later re-engagement segment

**Goal:** Encourage therapists to explore the sandbox demo  
**Priority:** Sandbox → Learn more

**Structure:**
- Acknowledge their interest/support
- Explain what the sandbox is and what they can see
- Single behavioural CTA: sandbox demo
- Soft link to learn more

**CTAs:**
1. 🔵 **Primary:** "Try the Sandbox Demo"
2. 🔗 **Soft:** "Learn more about Therapair"

**Follow-ups for Sandbox (Optional):**
- You can add **Email B2** later if you see strong interest but low click-through:
  - Audience: Opened B1 but didn't click
  - Goal: Gentle reminder to explore the demo
  - CTAs: Same as B1 (Sandbox + Learn more)

At this stage, **B1 only** is created. B2 is optional and can be added after initial results.

---

## 🔗 Link Priority & Placement (Updated)

### **Research Emails (1–4):**

- **Top / Middle:** Survey CTA (button or bold link) — **only behavioural CTA**
- **Footer:** "Learn more about Therapair" link (small, secondary)

Example (Email 1):
```text
JOIN THE RESEARCH SURVEY (5-7 minutes)
https://therapair.com.au/research/survey/index.html?token={{token}}&utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=survey&utm_email=1

LEARN MORE ABOUT THERAPAIR
https://therapair.com.au/documentation.html?utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=learn_more&utm_email=1
```

### **Sandbox Emails (Email 5 + B1):**

- **Top / Middle:** Sandbox CTA
- **Footer:** "Learn more about Therapair" link

---

## 🧠 Why This Updated Sequence Is Best

1. **Single primary CTA per email** → higher conversion on the research goal
2. **Research-first** → aligns with your core purpose (learning before building)
3. **Sandbox separated** → avoids splitting attention in early emails
4. **Consistent "Learn more" link** → always a path to deeper context
5. **Flexible sandbox track** → can be expanded with follow-ups if engagement is high

---

## 🧩 How It Maps to Files

- `EMAIL-1-RESEARCH-INVITATION-PLAIN.txt` – Research invite (survey-only CTA)
- `EMAIL-2-FOLLOWUP-NONRESPONDER-PLAIN.txt` – Non-responder follow-up
- `EMAIL-3-FOLLOWUP-NOCLICK-PLAIN.txt` – Opened but no click
- `EMAIL-4-FOLLOWUP-INCOMPLETE-PLAIN.txt` – Incomplete survey
- `EMAIL-5-THANKYOU-SURVEY-COMPLETE-PLAIN.txt` – Thank you & next steps
- `EMAIL-B1-SANDBOX-INVITE-PLAIN.txt` – Standalone sandbox invitation

---

**Last Updated:** 2025-01-17  
**Status:** Sequence updated to single-CTA research + sandbox track
