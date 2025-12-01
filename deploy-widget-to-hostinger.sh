#!/bin/bash

# 🚀 Deploy Therapair Widget to Hostinger
# This script updates git and pushes to Hostinger

echo "🚀 Starting Therapair Widget Deployment to Hostinger..."

# Set working directory
cd /Users/tino/Projects/Therapair

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files to git
echo "📝 Adding files to git..."
git add .

# Check git status
echo "📊 Git status:"
git status

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update therapair-widget: $(date '+%Y-%m-%d %H:%M:%S')"

# Check if remote origin exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "🌐 Remote origin exists"
    echo "📍 Current remote URL: $(git remote get-url origin)"
else
    echo "⚠️  No remote origin found"
    echo "🔗 Please add your Hostinger git repository as origin:"
    echo "   git remote add origin https://your-hostinger-repo.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    exit 1
fi

# Push to Hostinger
echo "🚀 Pushing to Hostinger..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully deployed to Hostinger!"
    echo "🌐 Widget should be live at your Hostinger domain"
else
    echo "❌ Failed to push to Hostinger"
    echo "🔍 Check your git credentials and repository URL"
    exit 1
fi

echo "🎉 Deployment complete!"


