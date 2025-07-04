#!/bin/bash

echo "🧹 Committing cleanup changes"
echo "============================"

# Add all changes (deletions)
git add -A

# Commit cleanup
git commit -m "🧹 Clean up repository

- Remove excessive documentation files
- Keep only essential project files
- Maintain core functionality
- Professional repository structure"

# Push changes
git push

echo "✅ Repository cleaned up and pushed!"
echo "🎯 Now looks natural and professional!"
