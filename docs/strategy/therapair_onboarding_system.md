Here’s your complete, production-grade therapair_onboarding_system.md prompt file for use in Cursor. It covers:
	•	Backend and database setup
	•	Editable onboarding form
	•	Secure token access
	•	Email automation
	•	Image handling
	•	Consent logic
	•	Admin moderation
	•	Security logging

Everything is modular and ready for you to run inside Cursor.

⸻

📁 therapair_onboarding_system.md

# 📦 THERAPAIR ONBOARDING + PROFILE UPDATE SYSTEM

You are a senior full-stack engineer working inside Cursor. Build a complete onboarding and update system for Therapair, an inclusive mental health therapist directory currently in demo stage. The platform runs on Hostinger with Node.js and uses Git for versioning. No third-party automation or email platforms are used. All logic must be coded and deployed via Cursor.

---

## 🧱 OVERALL TECH STACK

- **Backend:** Node.js + Express or Next.js API Routes
- **Database:** PostgreSQL (using Prisma ORM)
- **Frontend:** HTML/JS or React (depending on routing preference)
- **Image Hosting:** Hostinger server `/public/uploads`
- **Email:** NodeMailer using SMTP credentials
- **Security:** Token-based authentication, IP logging, HTTPS endpoints

---

## 🎯 CORE FEATURES TO IMPLEMENT

### 1. Therapist CSV Import
- Parse the CSV into a PostgreSQL table: `therapists`
- Normalize fields (e.g. arrays for modalities, tags, locations)
- Store consent flags, but allow for future overrides

### 2. Secure Magic Link Access
- Generate a one-time or time-limited token for each therapist
- Store tokens in a `tokens` table with expiry, therapist_id, and usage logs
- Include this token in email onboarding link (e.g. `/onboarding/:token`)
- On visit:
  - Validate token
  - Load therapist profile (read-only)
  - Render editable fields
  - Allow data to be submitted for approval

### 3. Editable Onboarding Form
- Fields:
  - Bio / Public Description
  - Tag-based selections (identities supported, modalities, etc.)
  - Upload image (JPG/PNG, min 500px)
  - Consent flags:
    - ✅ Join Demo
    - 🔁 Keep Me Informed
    - ❌ Opt-out / Remove Me
  - Short optional survey (referral preferences, monetisation model interest)
- Image upload saved to `/public/uploads` and linked to profile

### 4. Form Submission & Admin Approval
- Submissions are saved to a `therapist_edits` table
- Admin dashboard displays pending edits
- Admin can approve or reject changes
- If approved:
  - Changes are merged into `therapists` table
  - Status updated to “published”
- Log all actions with timestamp, admin reviewer, and IP address

### 5. Email Invitation System
- Use NodeMailer to send personalised onboarding invitations
- Email includes:
  - Therapist name
  - Purpose and consent explanation
  - Secure onboarding link (`/onboarding/:token`)
  - Unsubscribe / opt-out option
- Save logs to `email_logs` table:
  - Sent_at, opened (via pixel or link), clicked, responded

### 6. Security & Audit Logging
- Store IP address and User-Agent on all submissions
- Log token use (who visited which link, and when)
- Rate-limit submissions per token/IP
- Allow permanent opt-out by email or link

---

## 🧩 DATABASE SCHEMA OVERVIEW

**`therapists`**
- id (UUID)
- full_name
- contact_email
- profession
- suburb, region
- modalities, tags (array)
- accessibility_features (array)
- image_url
- bio
- consent_to_list (bool)
- wants_updates (bool)
- created_at / updated_at

**`therapist_edits`**
- id
- therapist_id (FK)
- submitted_fields (JSON)
- consent_flags
- image_path
- status (pending / approved / rejected)
- submitted_at / reviewed_at
- reviewed_by (admin ID)

**`tokens`**
- id
- therapist_id (FK)
- token (secure string)
- expires_at
- used_at / used_ip

**`email_logs`**
- id
- therapist_id (FK)
- type (invite, reminder, opt-out)
- sent_at
- opened (bool)
- clicked (bool)

**`submissions_log`**
- id
- therapist_id
- ip_address
- user_agent
- token_used
- action (submitted_form, updated_consent, uploaded_image)
- timestamp

---

## 🔐 SECURITY & PRIVACY REQUIREMENTS

- Store no passwords
- Validate all inputs
- Limit upload formats and sizes
- Serve public data from a read-only endpoint
- Comply with Australian data privacy standards (APA/ACCC)

---

## 🔧 FILE STRUCTURE EXAMPLE

/src
/emails
sendOnboardingInvite.js
templates/
/routes
/onboarding
[token].js
/admin
index.js
/forms
onboardingForm.html / .jsx
/utils
parseCSV.js
imageUpload.js
/db
schema.prisma
seed.js
/public
/uploads
.env

---

## ✅ NEXT TASKS (Suggested Cursor Modules)

1. Create the `therapists` and `therapist_edits` tables using Prisma
2. Create the `/onboarding/:token` route to render pre-filled editable form
3. Create the image upload handler with sanitisation and server storage
4. Write `sendOnboardingInvite.js` using NodeMailer with secure link
5. Build `/admin` dashboard to view and approve therapist submissions

All code must be modular, commented, and production-ready. Prioritise security, clarity, and graceful fallback logic.



