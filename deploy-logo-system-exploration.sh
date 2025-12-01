#!/bin/bash

# 🚀 Deploy Therapair Logo System Exploration to Hostinger

# Configuration (matches existing production deploy)
HOST="45.87.81.159"
USER="u549396201"
PORT="65002"
REMOTE_BASE="domains/therapair.com.au/public_html"

LOCAL_BUILD_DIR="Logo System Exploration/build"
REMOTE_DIR="$REMOTE_BASE/sandbox/logo-system-exploration"

echo "🚀 Deploying Therapair Logo System Exploration..."
echo ""

# Ensure build directory exists
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
  echo "❌ Build directory '$LOCAL_BUILD_DIR' not found."
  echo "   Run the build first:"
  echo "   cd \"$(pwd)/Logo System Exploration\" && npm run build"
  exit 1
fi

echo "📁 Local build directory: $LOCAL_BUILD_DIR"
echo "🌐 Remote directory: $REMOTE_DIR"
echo ""

# Create remote directory if it doesn't exist
echo "📂 Ensuring remote directory exists..."
ssh -p "$PORT" "$USER@$HOST" "mkdir -p \"$REMOTE_DIR\"" || {
  echo "❌ Failed to create remote directory."
  exit 1
}

# Upload build output
echo "📤 Uploading build to Hostinger..."
scp -P "$PORT" -r "$LOCAL_BUILD_DIR/"* "$USER@$HOST:$REMOTE_DIR/" 

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Logo System Exploration deployed successfully!"
  echo "🌐 Expected URL:"
  echo "   https://therapair.com.au/sandbox/logo-system-exploration/index.html"
else
  echo ""
  echo "❌ Deployment failed."
  echo "🔍 Check SSH connectivity and credentials, then try again."
  exit 1
fi

echo ""
echo "🎉 Deployment complete."


