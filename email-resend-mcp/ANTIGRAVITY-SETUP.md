# Using email-resend-mcp in Antigravity

Quick guide for setting up the Resend email MCP server in Google AI Studio (Antigravity).

## Prerequisites

- Node.js 18+ installed
- A Resend account and API key from [resend.com/api-keys](https://resend.com/api-keys)

## Setup Steps

### 1. Clone and Build

```bash
git clone https://github.com/captuspario/email-resend-mcp.git
cd email-resend-mcp
npm install
npm run build
```

### 2. Configure Antigravity

Create or edit `~/.gemini/antigravity/mcp_config.json`:

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/absolute/path/to/email-resend-mcp/build/index.js"
      ],
      "env": {
        "RESEND_API_KEY": "your_resend_api_key_here"
      }
    }
  }
}
```

**Important:** 
- Replace `/absolute/path/to/email-resend-mcp/build/index.js` with your actual path
- Replace `your_resend_api_key_here` with your Resend API key (starts with `re_`)

### 3. Restart Antigravity

Completely close and reopen your Antigravity session for the MCP server to load.

### 4. Test It

Ask Antigravity:
```
Send a test email to your@email.com with subject "Test" and body "It works!"
```

## Usage Examples

**Plain text email:**
```
Send an email to user@example.com with subject "Hello" and body "This is a test"
```

**HTML email:**
```
Send an HTML email to user@example.com with subject "Welcome" and HTML body "<h1>Welcome!</h1><p>Thanks for joining.</p>"
```

**Email with CC:**
```
Send an email to client@example.com with subject "Meeting", body "Notes here", and CC admin@example.com
```

## Troubleshooting

**MCP server not loading:**
- Verify the path to `build/index.js` is correct
- Check that Node.js is installed: `node --version`
- Ensure the MCP config JSON is valid

**Emails not sending:**
- Verify your Resend API key is correct
- Check your sender domain is verified in Resend dashboard
- Use `onboarding@resend.dev` for testing without domain verification

## Resources

- [Resend Documentation](https://resend.com/docs)
- [GitHub Repository](https://github.com/captuspario/email-resend-mcp)
