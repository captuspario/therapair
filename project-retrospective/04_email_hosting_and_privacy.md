# 04 — Email Hosting and Privacy

## 🎯 Purpose
Document how Therapair avoided external services and ensured privacy through self-hosted email and direct form submission.

---

## 🔒 Privacy-First Philosophy

### The Problem with Third-Party Services
**What we avoided and why:**

❌ **Google Forms / Typeform**
- Data stored on third-party servers
- Subject to their privacy policies
- Potential for data mining
- User trust concerns

❌ **Calendly / Acuity**
- Exposes therapist availability publicly
- Third-party sees booking patterns
- Adds complexity to simple introductions

❌ **Mailchimp / ConvertKit**
- Mental health inquiries shouldn't be in marketing tools
- Compliance concerns (HIPAA-adjacent)
- Surveillance capitalism model

### Our Approach
✅ **Direct email submission** — Forms go straight to inbox  
✅ **Hostinger email hosting** — We control the infrastructure  
✅ **No external databases** — No CRM, no tracking  
✅ **HIPAA-lite thinking** — Treat sensitive data with care  

---

## 📧 Email Infrastructure Setup

### Hostinger Email Configuration

**Domain:** `therapair.com.au`  
**Email:** `contact@therapair.com.au`

**Setup steps:**
1. Register domain on Hostinger
2. Enable email hosting (included in plan)
3. Create `contact@` mailbox
4. Configure SMTP settings for PHP

**SMTP Configuration:**
```php
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 587;
$smtp_user = 'contact@therapair.com.au';
$smtp_pass = getenv('SMTP_PASSWORD'); // Stored securely
```

### Email Routing
```
User submits form
  ↓
React app validates input
  ↓
POST to /api/booking-request.php
  ↓
PHP script uses Hostinger SMTP
  ↓
Email arrives at contact@therapair.com.au
  ↓
Tino triages & responds manually
```

---

## 📄 Form Submission PHP Handler

### `/api/booking-request.php`
```php
<?php
// booking-request.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Sanitize inputs
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
$therapist = filter_var($_POST['preferredTherapist'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

// Build email
$to = 'contact@therapair.com.au';
$subject = "New Therapist Match Request — $name";
$body = "
Name: $name
Email: $email
Phone: $phone
Preferred Therapist: $therapist

Message:
$message
";

// Send via Hostinger SMTP
$headers = "From: contact@therapair.com.au\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Email failed']);
}
?>
```

### Security Measures
- ✅ Input sanitization (`FILTER_SANITIZE_*`)
- ✅ CORS headers (restrict domains in production)
- ✅ No data logging (emails only)
- ✅ Environment variables for credentials
- ✅ HTTPS only (enforced by Hostinger)

---

## 🔐 Privacy Guarantees

### What We Tell Users
> "Your information goes directly to us. We don't use tracking scripts, sell data, or store it in third-party databases. You can request deletion anytime."

### Data Lifecycle
1. **Submission** — Form data sent via HTTPS
2. **Transit** — Encrypted SMTP (TLS)
3. **Storage** — Email inbox (Hostinger's encrypted servers)
4. **Access** — Only Tino has login credentials
5. **Deletion** — Email can be permanently deleted on request

### Compliance Considerations
- Not HIPAA-regulated (we're not a covered entity)
- But we follow **HIPAA-lite principles**:
  - Minimal data collection
  - Secure transmission
  - Limited access
  - User control over their data

---

## 📬 Email Templates

### Confirmation Email (Auto-response)
```
Subject: We've received your request — Therapair

Hi [Name],

Thank you for reaching out. We've received your request to connect with [Therapist Name].

We'll review your information and send an introduction within 1-2 business days. If you have any questions, reply to this email.

Warmly,
The Therapair Team

---
contact@therapair.com.au
therapair.com.au
```

### Therapist Introduction Email (Manual)
```
Subject: Introduction: [Client Name] + [Therapist Name]

Hi [Therapist Name],

I'd like to introduce you to [Client Name], who's looking for support with [brief context from form].

[Client Name], here's a bit about [Therapist]:
[Mini bio + expertise]

I'll let you both take it from here. [Client], feel free to reach out directly to schedule an initial session.

Warmly,
Tino
```

---

## 🚫 What We DON'T Do

### No Automated Booking
- ❌ No calendar syncing
- ❌ No automated appointment scheduling
- ❌ No payment processing

**Why:** Adds complexity and third-party dependencies. Manual introductions maintain the "concierge" feel.

### No Marketing Automation
- ❌ No drip campaigns
- ❌ No A/B testing on emails
- ❌ No behavioral tracking

**Why:** This is mental health support, not lead nurturing.

---

## 🛠️ Future Enhancements

### Considered but not yet implemented:
- **PGP encryption** for extra-sensitive inquiries
- **Self-hosted booking** (if volume scales)
- **Therapist portals** (update own profiles)
- **Client messaging** (in-platform, encrypted)

**Trade-off:** Complexity vs. privacy vs. user experience

---

## ❓ Questions for Expansion

1. How many emails are received per week?
2. What's the average response time?
3. Have there been any security incidents or concerns?
4. Do therapists reply directly or CC Therapair?
5. Is there a backup/archive system for emails?

---

## 🔗 Related Documents

- **[03_landing_page_and_forms.md](./03_landing_page_and_forms.md)** — Form architecture
- **[05_git_and_deployment.md](./05_git_and_deployment.md)** — How email config is deployed
- **[08_lessons_and_principles.md](./08_lessons_and_principles.md)** — Privacy philosophy

---

## 📸 Assets (to be added)

- [ ] Email flow diagram
- [ ] PHP script (sanitized version)
- [ ] Sample confirmation email
- [ ] Hostinger email dashboard screenshot

---

*This document is a living prompt. Expand it by feeding it back to Claude with additional context, code snippets, or compliance considerations.*
