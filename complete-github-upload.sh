#!/bin/bash

echo "🚀 Completing GXOT GitHub Upload"
echo "================================"

# Check if we're in the right directory
if [ ! -f "hardhat.config.js" ]; then
    echo "❌ Please run this from your GXOT project directory"
    exit 1
fi

# Add the correct remote (your actual repo)
echo "🔗 Setting up remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/vautx-digital/gxot-token.git

# Check git status
echo "📋 Current git status:"
git status

# Add all files
echo "📁 Adding all project files..."
git add .

# Create comprehensive commit
echo "💾 Creating comprehensive commit..."
git commit -m "🎉 Complete GXOT Token Project Upload

✅ Smart Contracts (Deployed & Verified):
- GXOT Token: 0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb
- DAO Contract: 0x8CDa18d8A834D6A42951375C75789d3380CB10f8  
- Liquidity Manager: 0xCD00672437454253861330bE1ED8FF4C630fbe2c

✅ Project Features:
- 3 Billion GXOT tokens (Fixed supply)
- DAO governance activated
- Fair tokenomics (10% team, 90% community)
- World Chain integration
- Ultra-cheap deployment ($0.11 USD)
- Full security implementation

✅ Documentation:
- Complete deployment guides
- API documentation
- Branding guidelines
- Token metadata
- Launch checklist

✅ Assets:
- GXOT goat mascot logo
- Branding materials
- Metadata for exchanges

🐐 The GOAT of meme tokens is ready for community! 🚀

#GXOT #MemeToken #DAO #WorldChain #DeFi"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully uploaded complete GXOT project!"
    echo "🔗 Repository: https://github.com/vautx-digital/gxot-token"
    echo ""
    echo "🎊 Next steps:"
    echo "1. ⭐ Star your repository"
    echo "2. 📝 Enable GitHub features (Issues, Discussions, Wiki)"
    echo "3. 🏷️ Add repository topics"
    echo "4. 📢 Share with community"
else
    echo "❌ Upload failed. Check your credentials and try again."
fi
