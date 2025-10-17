#!/bin/bash
# Run tests for all Therapair products

echo "🧪 Running tests for all Therapair products..."

# Landing Page
echo "📄 Testing landing page..."
cd products/landing-page
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    npm test
fi
cd ../..

# Sandbox
echo "🎨 Testing sandbox..."
cd products/sandbox
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    npm test
fi
cd ../..

# Widget
echo "🔧 Testing widget..."
cd products/widget
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    npm test
fi
cd ../..

echo "✅ All tests completed!"
