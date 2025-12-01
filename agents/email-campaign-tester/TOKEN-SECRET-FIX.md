# Fixing "Invalid Token Signature" Error

## Problem
Survey links show "Invalid token signature" error when clicked, even though token generation algorithm is correct.

## Root Cause
The `RESEARCH_TOKEN_SECRET` in Node.js `.env` file **does not match** the `RESEARCH_TOKEN_SECRET` in PHP `config.php` file.

## Solution

### Step 1: Check Current Secrets

**Node.js (.env file):**
```bash
cd /Users/tino/Projects/Therapair\ V2
grep RESEARCH_TOKEN_SECRET .env
```

**PHP (config.php file):**
```bash
cd /Users/tino/Projects/Therapair\ V2/products/landing-page
grep RESEARCH_TOKEN_SECRET config.php
```

### Step 2: Generate a Secure Secret

```bash
# Generate a 64-character random hex string
openssl rand -hex 32
```

### Step 3: Update Both Files

**1. Update Node.js .env:**
```bash
RESEARCH_TOKEN_SECRET=your-generated-secret-here
```

**2. Update PHP config.php:**
```php
define('RESEARCH_TOKEN_SECRET', 'your-generated-secret-here');
```

**⚠️ CRITICAL:** Both must be **EXACTLY** the same string (including any quotes in PHP).

### Step 4: Regenerate Tokens

After updating the secret, you need to regenerate tokens for existing testers:

```bash
cd agents/email-campaign-tester
node index.js send-test-email tinokuhn@gmail.com
```

This will create a new token with the correct secret.

### Step 5: Verify

1. Send test email
2. Click survey link
3. Should work without "Invalid token signature" error

## Testing

Run the verification test:
```bash
cd agents/email-campaign-tester
node test-token-verification.mjs
```

This will verify that:
- Token generation works
- Signature matches PHP verification algorithm
- Secret is configured correctly

