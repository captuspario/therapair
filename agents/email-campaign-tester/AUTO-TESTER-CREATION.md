# 🤖 Automatic Tester Creation Feature

**Status:** ✅ Implemented  
**Date:** 2025-01-30

---

## 🎯 Overview

The email campaign tester now **automatically creates a tester entry** in the database when you suggest sending a test email to a new email address. This ensures every tester has a unique token for tracking all their actions.

---

## ✨ How It Works

When you suggest sending a test email to an email address:

1. **Check for existing tester**
   - The system searches the Notion database for an existing entry with that email
   - If found, uses the existing tester (with their token)

2. **Auto-create if needed**
   - If no tester exists, automatically creates one
   - Generates a unique token for tracking
   - Sets default attributes (name from email, profession: Therapist, region: Victoria)
   - Marks as "Test" in the Source field
   - Stores in the VIC Therapists database

3. **Send email**
   - Uses the tester's token for personalization
   - All actions are tracked via the token

---

## 📋 Usage Examples

### **Via CLI:**

```bash
# Send test email - automatically creates tester if needed
node index.js send-test-email \
  --email "newtester@example.com" \
  --email-number 1
```

### **Via Code (when suggesting emails):**

```javascript
import { sendEmail } from './lib/email-sender.js';

// Just provide email address - system auto-creates tester
await sendEmail('testuser@example.com', 1, false);
```

### **Via Direct Email Sender:**

The `sendEmail` function now accepts either:
- **Persona object** - Uses existing persona
- **Email string** - Auto-creates/finds tester

---

## 🔑 Features

### **Automatic Token Generation**

Every tester gets a unique JWT token containing:
- `therapist_id` - Unique ID for tracking
- `therapist_name` - Full name
- `first_name` - For personalization
- `email` - Email address
- `profession` - Profession (default: Therapist)
- `region` - Region (default: Victoria)
- `test_persona: true` - Marks as test user
- `exp` - Token expiration (30 days)

### **Database Entry**

Each tester is stored in Notion with:
- ✅ **First Name** - Extracted from name or email
- ✅ **Last Name** - Extracted from name
- ✅ **Email Address** - Primary identifier
- ✅ **Profession/Key Qualification/s** - Default: "Therapist"
- ✅ **Region** - Default: "Victoria"
- ✅ **Source** - Set to "Test" (marks as test persona)

### **Tracking**

All tester actions are tracked via:
- **Token** - Used in survey links, UTM parameters
- **Notion Database** - Stores tester profile
- **Webhook Events** - Tracks email opens, clicks
- **Journey Tracking** - Tracks email sequence completion

---

## 📊 Example Flow

### **1. User suggests: "Send test email to john@example.com"**

```bash
node index.js send-test-email --email "john@example.com" --email-number 1
```

### **2. System automatically:**

```
[2025-11-26] ℹ️ Email address provided: john@example.com. Checking for existing tester...
[2025-11-26] ℹ️ No tester found. Creating new tester entry for john@example.com...
[2025-11-26] ℹ️ Creating persona: John (john@example.com)
[2025-11-26] ✅ Persona created in Notion: abc123...
[2025-11-26] ✅ Tester entry created: John (john@example.com)
[2025-11-26] ℹ️ Token generated: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
[2025-11-26] ✅ Email sent successfully: email-id-123
```

### **3. Result:**

- ✅ Tester entry created in Notion database
- ✅ Unique token generated for tracking
- ✅ Email sent with personalized token link
- ✅ All future actions can be tracked via token

---

## 🔄 Reusing Existing Testers

If you send another email to the same address:

```
[2025-11-26] ℹ️ Email address provided: john@example.com. Checking for existing tester...
[2025-11-26] ✅ Using existing tester: John (john@example.com)
[2025-11-26] ✅ Email sent successfully
```

The system will:
- ✅ Find the existing tester
- ✅ Reuse the same token
- ✅ Track all actions together

---

## 🎯 Benefits

1. **No Manual Setup** - Just suggest an email, tester is auto-created
2. **Consistent Tracking** - Same token for all actions from that tester
3. **Database Integration** - All testers stored in Notion for reporting
4. **Token-based Analytics** - Track survey completion, link clicks, etc.
5. **Automatic Cleanup** - Test personas marked in database for easy filtering

---

## 📝 Notes

- **Name Extraction**: If no name provided, extracts from email (e.g., `john.doe@example.com` → "John Doe")
- **Defaults**: Uses "Therapist" and "Victoria" as defaults if not specified
- **Token Expiry**: Tokens expire in 30 days (configurable)
- **Database**: Uses the same VIC Therapists database with "Test" flag

---

**Ready to use!** Just suggest sending a test email to any address, and the system will handle the rest. 🚀

