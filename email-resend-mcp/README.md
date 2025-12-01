# Resend Email MCP Server

A Model Context Protocol (MCP) server for sending emails via [Resend](https://resend.com/).

## Features

- Send emails via Resend API
- Support for HTML and plain text emails
- CC, BCC, and reply-to support
- Integrates with Cursor and other MCP clients

## Prerequisites

- Node.js 18+ installed
- A Resend account and API key ([Sign up here](https://resend.com/))
- A verified sender email address in Resend

## Installation

1. **Clone and install dependencies:**

```bash
cd email-resend-mcp
npm install
```

2. **Build the project:**

```bash
npm run build
```

3. **Get your Resend API key:**

- Sign up at [resend.com](https://resend.com/)
- Go to [API Keys](https://resend.com/api-keys)
- Create a new API key
- Copy the key (starts with `re_`)

4. **Verify your domain (optional but recommended):**

- In Resend dashboard, go to Domains
- Add and verify your domain (e.g., `therapair.com.au`)
- This allows you to send from `contact@therapair.com.au`

## Configuration in Cursor

1. **Open Cursor Settings:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows)
   - Type "Cursor Settings" and select it

2. **Add MCP Server:**
   - Navigate to "MCP" section
   - Click "Add new global MCP server"
   - Add this configuration:

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/absolute/path/to/email-resend-mcp/build/index.js",
        "--key=YOUR_RESEND_API_KEY"
      ]
    }
  }
}
```

**Replace:**
- `/absolute/path/to/email-resend-mcp/build/index.js` with the actual path to your built file
- `YOUR_RESEND_API_KEY` with your Resend API key

**Alternative (using environment variable):**

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": ["/absolute/path/to/email-resend-mcp/build/index.js"],
      "env": {
        "RESEND_API_KEY": "YOUR_RESEND_API_KEY"
      }
    }
  }
}
```

3. **Restart Cursor** to apply changes

## Usage

Once configured, you can use the MCP server in Cursor:

### Example 1: Simple Email

```
Send an email to tinoman@me.com with subject "Test Email" and body "This is a test message."
```

### Example 2: HTML Email

```
Send an HTML email to user@example.com with subject "Welcome" and HTML body "<h1>Welcome!</h1><p>Thanks for joining.</p>"
```

### Example 3: Email with CC

```
Send an email to client@example.com with subject "Meeting Notes", body "Here are the notes from our meeting.", and CC admin@example.com
```

## API Reference

### Tool: `send_email`

Sends an email via Resend.

**Required parameters:**
- `to` (string): Recipient email address
- `subject` (string): Email subject line
- `body` (string): Email body (plain text or HTML)

**Optional parameters:**
- `from` (string): Sender email (must be verified in Resend). Defaults to `onboarding@resend.dev`
- `reply_to` (string): Reply-to email address
- `cc` (array of strings): CC recipients
- `bcc` (array of strings): BCC recipients
- `html` (string): HTML content (if different from body)

## Troubleshooting

### "Resend API key not found"
- Make sure you've set the API key in the Cursor MCP configuration
- Or set `RESEND_API_KEY` environment variable

### "Email not delivered"
- Check Resend dashboard for delivery status
- Verify your sender email is verified in Resend
- Check spam folder
- Review Resend logs for errors

### "Domain not verified"
- Go to Resend dashboard → Domains
- Add your domain and complete DNS verification
- Wait for verification (usually a few minutes)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode (auto-rebuild on changes)
npm run dev

# Run server
npm start
```

## License

MIT

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Cursor MCP Documentation](https://docs.cursor.com/context/model-context-protocol)

