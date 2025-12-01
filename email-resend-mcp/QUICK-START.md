# 🚀 Quick Start Guide

## 1. Get Resend API Key
👉 https://resend.com/api-keys

## 2. Add to Cursor Settings

Press `Cmd+Shift+P` → "Cursor Settings" → MCP → "Add new global MCP server"

```json
{
  "mcpServers": {
    "resend": {
      "command": "node",
      "args": [
        "/Users/tino/Projects/Therapair V2/email-resend-mcp/build/index.js",
        "--key=YOUR_KEY_HERE"
      ]
    }
  }
}
```

## 3. Restart Cursor

## 4. Test It

```
Send a test email to tinoman@me.com with subject "Test" and body "Hello!"
```

---

**Full docs:** See `CURSOR-SETUP.md` for detailed instructions.

