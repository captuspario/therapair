#!/bin/bash

# Deploy Recent Changes: Feedback Widget, Survey Updates, Sandbox Demo
# This script deploys all the recent changes to production

# Configuration
HOST="45.87.81.159"
USER="u549396201"
PORT="65002"
REMOTE_BASE="domains/therapair.com.au/public_html"

echo "🚀 Deploying Recent Changes..."
echo ""

# 0. Build landing page (including analytics dashboard)
echo "🏗️  Building landing page and analytics bundle..."
cd "products/landing-page" || {
  echo "   ❌ Could not change directory to products/landing-page"
  exit 1
}
npm run build || {
  echo "   ❌ Build failed. Aborting deployment."
  exit 1
}
cd - >/dev/null 2>&1 || exit 1

# 1. Survey Page with Feedback Widget
echo "📄 Deploying survey page..."
scp -P $PORT "products/landing-page/research/survey/index.html" "$USER@$HOST:$REMOTE_BASE/research/survey/"
if [ $? -eq 0 ]; then
    echo "   ✅ Survey page deployed"
else
    echo "   ❌ Survey page deployment failed"
fi

# 2. Survey Feedback Endpoint
echo "📡 Deploying survey feedback endpoint..."
scp -P $PORT "products/landing-page/api/research/feedback.php" "$USER@$HOST:$REMOTE_BASE/api/research/"
if [ $? -eq 0 ]; then
    echo "   ✅ Survey feedback endpoint deployed"
else
    echo "   ❌ Survey feedback endpoint deployment failed"
fi

# 3. Sandbox Feedback Widget (click-outside-to-close)
echo "💬 Deploying sandbox feedback widget..."
scp -P $PORT "products/sandbox/public/unison-style-feedback.js" "$USER@$HOST:$REMOTE_BASE/sandbox/public/"
if [ $? -eq 0 ]; then
    echo "   ✅ Feedback widget deployed"
else
    echo "   ❌ Feedback widget deployment failed"
fi

# 4. Sandbox Demo (disabled states, dummy data notice)
echo "🎨 Deploying sandbox demo..."
scp -P $PORT "products/sandbox/sandbox-demo.html" "$USER@$HOST:$REMOTE_BASE/sandbox/"
if [ $? -eq 0 ]; then
    echo "   ✅ Sandbox demo deployed"
else
    echo "   ❌ Sandbox demo deployment failed"
fi

# 5. Sandbox Feedback API (VIC therapists integration)
echo "🔧 Deploying sandbox feedback API..."
scp -P $PORT "products/sandbox/api/feedback.php" "$USER@$HOST:$REMOTE_BASE/sandbox/api/"
if [ $? -eq 0 ]; then
    echo "   ✅ Sandbox feedback API deployed"
else
    echo "   ❌ Sandbox feedback API deployment failed"
fi

# 6. Analytics dashboard (static, lives at /analytics/)
echo "📁 Ensuring /analytics directory exists on server..."
ssh -p $PORT "$USER@$HOST" "mkdir -p \"$REMOTE_BASE/analytics\"" >/dev/null 2>&1

echo "📊 Deploying analytics dashboard..."
scp -P $PORT "products/landing-page/build/analytics/index.html" "$USER@$HOST:$REMOTE_BASE/analytics/index.html"
if [ $? -eq 0 ]; then
  echo "   ✅ Analytics index.html deployed"
else
  echo "   ❌ Analytics index.html deployment failed"
fi

echo "📦 Deploying analytics assets (shared /assets)..."
ssh -p $PORT "$USER@$HOST" "mkdir -p \"$REMOTE_BASE/assets\"" >/dev/null 2>&1
scp -P $PORT products/landing-page/build/assets/* "$USER@$HOST:$REMOTE_BASE/assets/" 
if [ $? -eq 0 ]; then
  echo "   ✅ Analytics assets deployed"
else
  echo "   ❌ Analytics assets deployment failed"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🧪 Test URLs:"
echo "   - Survey: https://therapair.com.au/research/survey/index.html"
echo "   - Sandbox: https://therapair.com.au/sandbox/sandbox-demo.html"
echo "   - Analytics: https://therapair.com.au/analytics/"
echo ""
echo "📋 Changes deployed:"
echo "   ✅ Feedback widget closes on outside click"
echo "   ✅ Survey page has feedback widget"
echo "   ✅ Survey feedback saves to user research database"
echo "   ✅ Sandbox booking form disabled with dummy data notice"
echo "   ✅ Sandbox feedback saves to VIC therapists directory"

