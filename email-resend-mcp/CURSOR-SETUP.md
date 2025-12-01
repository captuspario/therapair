# Cursor Setup Guide for Resend MCP

## Quick Setup Steps

### 1. Get Your Resend API Key

1. Sign up at [resend.com](https://resend.com/) (if you haven't already)
2. Go to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Give it a name (e.g., "Therapair MCP")
5. Copy the key (starts with `re_`)

### 2. Verify Your Domain (Recommended)

1. In Resend dashboard, go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain: `therapair.com.au`
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually a few minutes)

### 3. Configure Cursor

1. **Open Cursor Settings:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Cursor Settings" and select it
   - Or go to: Cursor → Settings → Features → Model Context Protocol

2. **Add the MCP Server:**
   - Click "Add new global MCP server"
   - Paste this configuration:

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/Users/tino/Projects/Therapair V2/email-resend-mcp/build/index.js",
        "--key=YOUR_RESEND_API_KEY_HERE"
      ]
    }
  }
}
```

**Important:** Replace `YOUR_RESEND_API_KEY_HERE` with your actual Resend API key!

3. **Save and Restart:**
   - Save the configuration
   - Restart Cursor completely (quit and reopen)

### 4. Test the Integration

After restarting Cursor, test it by asking:

```
Send a test email to tinoman@me.com with subject "Test from Cursor" and body "This is a test email sent via Resend MCP!"
```

## Alternative: Using Environment Variable

If you prefer to keep your API key in an environment variable:

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/Users/tino/Projects/Therapair/email-resend-mcp/build/index.js"
      ],
      "env": {
        "RESEND_API_KEY": "YOUR_RESEND_API_KEY_HERE"
      }
    }
  }
}
```

## Troubleshooting

### MCP Server Not Appearing
- Make sure you've restarted Cursor completely
- Check that the path to `build/index.js` is correct
- Verify Node.js is installed: `node --version`

### "API key not found" Error
- Double-check the API key in your Cursor config
- Make sure there are no extra spaces or quotes
- Try using the environment variable method instead

### Emails Not Sending
- Check Resend dashboard for error logs
- Verify your sender email is verified
- Make sure you're using a verified domain or `onboarding@resend.dev`

## Example Use Cases

### Send Research Invitation
```
Send an email to therapist@example.com with subject "Therapair User Research Invitation", from contact@therapair.com.au, with HTML body: "<h1>Hi there!</h1><p>We'd love your input on our matching platform.</p><p><a href='https://therapair.com.au/research/survey/?token=abc123'>Take the survey</a></p>"
```

### Send Test Email
```
Send a test email to my email address with subject "MCP Test" and body "Testing the Resend MCP integration."
```

### Send with CC
```
Send an email to client@example.com with subject "Meeting Notes", body "Here are the notes.", and CC admin@therapair.com.au
```

## Next Steps

Once set up, you can:
- Send research invitation emails directly from Cursor
- Test email templates
- Send notifications and updates
- Automate email workflows

For more details, see the [README.md](./README.md)

