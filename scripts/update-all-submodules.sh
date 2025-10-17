#!/bin/bash
# Update all Git submodules to latest

echo "🔄 Updating all submodules..."

git submodule update --remote --merge

echo "✅ All submodules updated!"
