#!/bin/bash
# Deploy all Therapair products

echo "🚀 Deploying all Therapair products..."

# Landing Page
echo "📄 Deploying landing page..."
cd products/landing-page
if [ -f "package.json" ] && grep -q '"deploy"' package.json; then
    npm run deploy
fi
cd ../..

# Sandbox
echo "🎨 Deploying sandbox..."
cd products/sandbox
if [ -f "package.json" ] && grep -q '"deploy"' package.json; then
    npm run deploy
fi
cd ../..

# Widget
echo "🔧 Deploying widget..."
cd products/widget
if [ -f "package.json" ] && grep -q '"deploy"' package.json; then
    npm run deploy
fi
cd ../..

echo "✅ All products deployed!"
