# 📁 Therapair V2 - Complete Project Structure

**Last Updated:** 2025-01-30  
**Location:** `/Users/tino/Projects/Therapair V2/`

---

## 🗂️ Root Directory Structure

```
Therapair V2/
├── agents/                    # Agent orchestrators
│   └── orchestrator/         # Database property management
├── archive/                   # Archived/old versions
├── backups/                   # Website backups
├── campaigns/                 # Marketing campaigns
│   ├── email-campaign/       # Email outreach (Resend MCP)
│   └── typebot-survey/       # Research surveys
├── case-studies/              # Project case studies
├── docs/                      # Documentation
│   ├── strategy/             # Business strategy docs
│   └── Therapair feedback widget/  # React feedback widget
├── email-resend-mcp/         # Resend MCP server (✅ Built)
├── products/                  # Main products
│   ├── landing-page/         # Main website (PHP/React)
│   ├── sandbox/              # Sandbox demo
│   └── widget/               # Embeddable widget
├── scripts/                   # Automation scripts
├── tests/                     # Test files
└── [various config files]
```

---

## 📦 Products

### 1. Landing Page (`products/landing-page/`)
**Purpose:** Main marketing website  
**Tech:** PHP, React, TypeScript  
**Config:** `config.php` (✅ Configured)

**Key Files:**
- `config.php` - Notion API & database config
- `api/research/` - Research API endpoints
  - `email-event.php` - Resend webhook handler
  - `unsubscribe.php` - Unsubscribe handler
  - `response.php` - Survey response handler

**Databases:**
- `NOTION_DB_USER_TESTING` - VIC Therapist Directory
- `NOTION_DB_SANDBOX` - Sandbox Feedback
- `NOTION_DB_SURVEY` - Survey Responses
- `NOTION_DB_EOI` - Expression of Interest

---

### 2. Sandbox Demo (`products/sandbox/`)
**Purpose:** Interactive therapist matching demo  
**Tech:** Vanilla JS, HTML, CSS  
**Feedback Widget:** `public/feedback-widget.js` (Web Component)

**Key Files:**
- `sandbox-demo.html` - Main demo page
- `public/feedback-widget.js` - Feedback web component
- `public/feedback-config.json` - Widget configuration
- `api/feedback.ts` - Feedback API endpoint

---

### 3. Widget (`products/widget/`)
**Purpose:** Embeddable therapist finder  
**Tech:** PHP, JavaScript  
**Config:** `therapair-widget/config.php` (✅ Configured)

**Key Files:**
- `therapair-widget/index.html` - Widget interface
- `therapair-widget/config.php` - Notion config
- `therapair-widget/submit-feedback.php` - Feedback handler
- `therapair-widget/submit-booking.php` - Booking handler

**Database:**
- `NOTION_DB_SANDBOX` - Sandbox Feedback

---

## 🗄️ Database Configuration

### Notion Databases

| Database | ID | Purpose | Config Location |
|----------|-----|---------|----------------|
| **VIC Therapist Directory** | `28c5c25944da80a48d85fd43119f4ec1` | 200+ therapists | `landing-page/config.php` |
| **Sandbox Feedback** | `2a75c25944da804cbd87d4daac0ae901` | User feedback | Both configs |
| **Survey Responses** | `2995c25944da80a5b5d1f0eb9db74a36` | Research surveys | `landing-page/config.php` |
| **Expression of Interest** | `2875c25944da80c0b14afbbdf2510bb0` | Form submissions | `landing-page/config.php` |

### Notion Token
- **Token:** `[Use environment variable NOTION_TOKEN]`
- **Status:** ✅ Configured in both config files

---

## 💬 Feedback Widgets

### 1. Sandbox Feedback Widget
**Location:** `products/sandbox/public/feedback-widget.js`  
**Type:** Web Component  
**Features:**
- Rating (1-5 emoji scale)
- Tags (bug, usability, speed, content, accessibility, other)
- Comments
- Offline queue support
- LocalStorage persistence

**Config:** `products/sandbox/public/feedback-config.json`

### 2. Widget Feedback Handler
**Location:** `products/widget/therapair-widget/submit-feedback.php`  
**Type:** PHP endpoint  
**Database:** Sandbox Feedback DB

### 3. React Feedback Widget (Docs)
**Location:** `docs/Therapair feedback widget/src/`  
**Type:** React component  
**Status:** Documentation/example

---

## 📧 Email Campaign

### Resend MCP Server
**Location:** `email-resend-mcp/`  
**Status:** ✅ Built and ready  
**Build:** `build/index.js` exists  
**Next:** Configure Cursor with API key

### Campaign Assets
**Location:** `campaigns/email-campaign/`  
- 5 email templates (plain text)
- Strategy documentation
- Setup guides

---

## 🔗 Git Repository

### Current Status
- **Remote:** `https://github.com/captuspario/email-resend-mcp.git` ⚠️ **WRONG**
- **Branch:** `main` (no commits yet)
- **Status:** New repository, needs proper remote

### Required Actions
1. Set correct remote (Therapair V2 repository)
2. Initial commit
3. Push to remote

---

## 🧪 Testing & Scripts

### Test Scripts
- `scripts/test-notion-connection.js` - Database connection tests
- `products/widget/scripts/test-notion-connection.js` - Widget DB test
- `tests/` - Various test files

### Automation
- `agents/orchestrator/` - Database property management
- `scripts/` - Deployment and automation

---

## 📊 Key Integrations

### 1. Notion API
- **Status:** ✅ Configured
- **Token:** Set in config files
- **Databases:** 4 databases connected

### 2. Resend Email
- **Status:** ⚠️ MCP built, needs API key
- **Webhook:** `email-event.php` ready
- **Tracking:** UTM parameters defined

### 3. Typebot Survey
- **Location:** `campaigns/typebot-survey/`
- **Integration:** Notion webhook ready

---

## 🚀 Deployment

### Landing Page
- **Host:** Hostinger
- **Deploy:** `deploy-to-hostinger.sh`

### Widget
- **Host:** Unison Mental Health
- **Deploy:** `products/widget/deploy-to-unison.sh`

### Sandbox
- **Host:** Hostinger
- **Path:** `/sandbox/sandbox-demo.html`

---

## 📝 Next Steps

1. **Git:** Fix remote repository URL
2. **Feedback Widgets:** Improve and standardize
3. **Database:** Test all connections
4. **Resend MCP:** Configure API key in Cursor

---

**Last Updated:** 2025-01-30  
**Maintained By:** Therapair Team

