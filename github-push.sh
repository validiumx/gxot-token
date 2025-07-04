#!/bin/bash

echo "🚀 GXOT GitHub Push Script"
echo "========================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Run git-setup.sh first!"
    exit 1
fi

# Get GitHub repository URL from user
echo "📝 Enter your GitHub repository URL:"
echo "Example: https://github.com/yourusername/gxot-token.git"
read -p "GitHub URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ GitHub URL is required!"
    exit 1
fi

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin "$GITHUB_URL"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Repository: $GITHUB_URL"
    echo ""
    echo "🎉 GXOT project is now on GitHub!"
    echo "Share the link with your community! 🐐🚀"
else
    echo "❌ Failed to push to GitHub"
    echo "💡 Make sure:"
    echo "- GitHub repository exists"
    echo "- You have push permissions"
    echo "- GitHub credentials are configured"
fi
