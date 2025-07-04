#!/bin/bash

echo "🚀 GXOT Git Repository Setup"
echo "============================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository
echo "📁 Initializing Git repository..."
git init

# Add .gitignore first
echo "🔒 Adding .gitignore..."
git add .gitignore

# Add all files except sensitive ones
echo "📄 Adding project files..."
git add .
git status

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: GXOT Token deployed to World Chain Mainnet

✅ Smart contracts deployed and verified
✅ DAO governance activated  
✅ 3B GXOT tokens ready for community
✅ Deployment cost: $0.11 USD
✅ All security features implemented

Contract Addresses:
- GXOT Token: 0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb
- DAO: 0x8CDa18d8A834D6A42951375C75789d3380CB10f8
- Liquidity Manager: 0xCD00672437454253861330bE1ED8FF4C630fbe2c

🐐 The GOAT of meme tokens is ready! 🚀"

echo "✅ Git repository initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Create GitHub repository"
echo "2. Add remote origin"
echo "3. Push to GitHub"
echo ""
echo "Commands to run after creating GitHub repo:"
echo "git remote add origin https://github.com/YOUR_USERNAME/gxot-token.git"
echo "git branch -M main"
echo "git push -u origin main"
