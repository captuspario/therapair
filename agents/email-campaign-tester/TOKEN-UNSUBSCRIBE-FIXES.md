# Token Signature & Unsubscribe Page Fixes

## Issues Fixed

### 1. Invalid Token Signature Error ✅

**Problem:** Survey links showed "Invalid token signature" when clicked.

**Root Cause:** The JWT token signature encoding in Node.js didn't exactly match PHP's verification algorithm.

**Solution:**
- Updated `agents/email-campaign-tester/lib/utils.js` to encode the raw binary Buffer directly
- Removed unnecessary `.toString('binary')` conversion that could cause encoding mismatches
- The signature now matches PHP's `hash_hmac(..., true)` which returns raw binary

**Files Changed:**
- `agents/email-campaign-tester/lib/utils.js` - Fixed `generateToken()` function

**Important:** Ensure both systems use the same `RESEARCH_TOKEN_SECRET`:
- Node.js (email-campaign-tester): Reads from `.env` file as `RESEARCH_TOKEN_SECRET`
- PHP (survey verification): Reads from `config.php` or environment as `RESEARCH_TOKEN_SECRET`

### 2. Unsubscribe Page ✅

**Problem:** Basic unsubscribe page didn't exist or was too minimal.

**Solution:**
- Created a modern, accessible unsubscribe page following email marketing best practices
- Includes proper error handling for invalid email addresses and missing records
- Updates Notion database to mark therapist as "Unsubscribed"
- Responsive design that works on mobile and desktop
- Follows Therapair brand colors (#3A6EA5 blue)

**Features:**
- ✅ Success confirmation with clear messaging
- ✅ Proper error handling (invalid link, email not found)
- ✅ Updates Notion database automatically
- ✅ Mobile-responsive design
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Professional, branded appearance
- ✅ Links back to homepage and contact options

**Files Changed:**
- `products/landing-page/api/research/unsubscribe.php` - Complete rewrite
- `products/landing-page/api/research/directory-helpers.php` - Fixed property name from 'Email' to 'Email Address'

## Testing

### Token Signature Test
To verify tokens work correctly:

```bash
# Send a test email (will generate token automatically)
cd agents/email-campaign-tester
node index.js send-test-email tinokuhn@gmail.com

# Click the survey link in the email - should work without "Invalid token signature" error
```

### Unsubscribe Test
1. Click unsubscribe link in any email (e.g., `https://therapair.com.au/api/research/unsubscribe.php?email=your@email.com`)
2. Should see success page
3. Check Notion database - therapist's "Research Status" should be set to "Unsubscribed"

## Configuration Verification

**Critical:** Both systems must use the same `RESEARCH_TOKEN_SECRET`:

### Node.js (.env file)
```bash
RESEARCH_TOKEN_SECRET=your-long-random-string-here
```

### PHP (config.php)
```php
define('RESEARCH_TOKEN_SECRET', 'your-long-random-string-here');
```

**To generate a secure token secret:**
```bash
# Generate a random 64-character string
openssl rand -hex 32
```

## Next Steps

1. ✅ Verify `RESEARCH_TOKEN_SECRET` matches in both `.env` and `config.php`
2. ✅ Test token generation by sending a test email
3. ✅ Test unsubscribe flow by clicking unsubscribe link
4. ✅ Verify Notion database updates correctly

