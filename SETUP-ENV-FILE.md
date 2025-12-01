# 🔧 Environment File Setup Instructions

## 📋 **Create .env File**

Create a file called `.env` in the root directory (`/Users/tino/Projects/Therapair/.env`) with the following content:

```bash
# Notion API Configuration
NOTION_TOKEN=[Your Notion API token here]

# Database IDs
THERAPIST_DATABASE_ID=28c5c259-44da-80a4-8d85-fd43119f4ec1
SUBMISSIONS_DATABASE_ID=2875c259-44da-80c0-b14a-fbbdf2510bb0

# Typebot Configuration
TYPEBOT_PUBLIC_ID=your_typebot_public_id_here
TYPEBOT_WEBHOOK_URL=your_webhook_url_here

# Email Configuration (if using)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Development Settings
NODE_ENV=development
DEBUG=true
```

## 🚀 **Quick Setup Commands**

Run these commands in your terminal:

```bash
# Navigate to project directory
cd /Users/tino/Projects/Therapair

# Create .env file
cat > .env << 'EOF'
NOTION_TOKEN=[Your Notion API token here]
THERAPIST_DATABASE_ID=28c5c259-44da-80a4-8d85-fd43119f4ec1
SUBMISSIONS_DATABASE_ID=2875c259-44da-80c0-b14a-fbbdf2510bb0
NODE_ENV=development
DEBUG=true
EOF

# Verify the file was created
cat .env
```

## ✅ **Verification**

After creating the .env file, test the connection:

```bash
# Test Notion connection
node -e "
require('dotenv').config();
console.log('NOTION_TOKEN:', process.env.NOTION_TOKEN ? '✅ Found' : '❌ Missing');
console.log('THERAPIST_DATABASE_ID:', process.env.THERAPIST_DATABASE_ID ? '✅ Found' : '❌ Missing');
"
```

## 🔒 **Security Notes**

- ✅ The `.env` file is already in `.gitignore` (won't be committed to git)
- ✅ Contains your actual Notion token (already provided)
- ✅ Database IDs are not sensitive (can be shared)
- ⚠️ Never commit the `.env` file to version control

## 🎯 **What This Enables**

With the .env file set up, I can:

1. **Read from both databases** (202 therapists + submissions)
2. **Create scripts** that work with your actual data
3. **Set up Typebot integration** with webhooks
4. **Configure email campaigns** for the 200+ therapists
5. **Build automated workflows** between systems

## 📞 **Next Steps**

Once you've created the .env file, let me know and I can:

1. **Test the connection** to verify everything works
2. **Create scripts** to work with your databases
3. **Set up the Typebot integration** for the survey
4. **Plan the email campaign** for the 200+ therapists

**Ready to proceed!** 🚀


