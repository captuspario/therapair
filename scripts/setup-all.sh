#!/bin/bash
# Setup all Therapair products

echo "🔧 Setting up all Therapair products..."

# Landing Page
echo "📄 Setting up landing page..."
cd products/landing-page
if [ -f "package.json" ]; then
    npm install
fi
cd ../..

# Sandbox
echo "🎨 Setting up sandbox..."
cd products/sandbox
if [ -f "package.json" ]; then
    npm install
fi
cd ../..

# Widget
echo "🔧 Setting up widget..."
cd products/widget
if [ -f "package.json" ]; then
    npm install
fi
cd ../..

echo "✅ All products set up!"
