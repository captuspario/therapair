#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Resend } from "resend";

// Get API key from environment or command line argument
const getApiKey = (): string => {
  // Check command line arguments
  const keyArg = process.argv.find((arg) => arg.startsWith("--key="));
  if (keyArg) {
    return keyArg.split("=")[1];
  }

  // Check environment variable
  if (process.env.RESEND_API_KEY) {
    return process.env.RESEND_API_KEY;
  }

  throw new Error(
    "Resend API key not found. Set RESEND_API_KEY environment variable or use --key=YOUR_KEY"
  );
};

const apiKey = getApiKey();
const resend = new Resend(apiKey);

// Define available tools
const tools: Tool[] = [
  {
    name: "send_email",
    description:
      "Send an email using Resend. Requires 'to' (recipient email), 'subject', and 'body' (HTML or plain text). Optionally include 'from' (sender email, must be verified), 'reply_to', 'cc', 'bcc', and 'html' (for HTML content).",
    inputSchema: {
      type: "object",
      properties: {
        to: {
          type: "string",
          description: "Recipient email address",
        },
        subject: {
          type: "string",
          description: "Email subject line",
        },
        body: {
          type: "string",
          description: "Email body (plain text or HTML)",
        },
        from: {
          type: "string",
          description:
            "Sender email address (must be verified in Resend). Defaults to 'onboarding@resend.dev' if not provided.",
        },
        reply_to: {
          type: "string",
          description: "Reply-to email address",
        },
        cc: {
          type: "array",
          items: { type: "string" },
          description: "CC recipients",
        },
        bcc: {
          type: "array",
          items: { type: "string" },
          description: "BCC recipients",
        },
        html: {
          type: "string",
          description: "HTML content (if different from body)",
        },
      },
      required: ["to", "subject", "body"],
    },
  },
];

// Create MCP server
const server = new Server(
  {
    name: "resend-email-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "send_email") {
    try {
      const {
        to,
        subject,
        body,
        from = "onboarding@resend.dev",
        reply_to,
        cc,
        bcc,
        html,
      } = args as {
        to: string;
        subject: string;
        body: string;
        from?: string;
        reply_to?: string;
        cc?: string[];
        bcc?: string[];
        html?: string;
      };

      if (!to || !subject || !body) {
        throw new Error("Missing required fields: to, subject, body");
      }

      const emailData: any = {
        from,
        to,
        subject,
        html: html || body,
        text: html ? body : undefined,
      };

      if (reply_to) emailData.reply_to = reply_to;
      if (cc && cc.length > 0) emailData.cc = cc;
      if (bcc && bcc.length > 0) emailData.bcc = bcc;

      const result = await resend.emails.send(emailData);

      if (result.error) {
        return {
          content: [
            {
              type: "text",
              text: `Error sending email: ${JSON.stringify(result.error)}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Email sent successfully! Message ID: ${result.data?.id || "unknown"}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message || String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Resend MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

