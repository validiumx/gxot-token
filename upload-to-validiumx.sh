#!/bin/bash

echo "🚀 Uploading GXOT to validiumx/gxot-token"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "hardhat.config.js" ]; then
    echo "❌ Please run this from your GXOT project directory"
    echo "📁 Expected: D:\GXOT_Alls\my-app"
    exit 1
fi

# Remove any existing remote
echo "🔗 Setting up correct remote origin..."
git remote remove origin 2>/dev/null || true

# Add the correct validiumx repository
git remote add origin https://github.com/validiumx/gxot-token.git

# Verify remote
echo "✅ Remote origin set to:"
git remote -v

# Check current status
echo "📋 Current git status:"
git status

# Add all files
echo "📁 Adding all GXOT project files..."
git add .

# Show what will be committed
echo "📝 Files to be committed:"
git diff --cached --name-only

# Create comprehensive commit for validiumx
echo "💾 Creating comprehensive commit..."
git commit -m "🎉 GXOT Token - Complete Project Upload

🐐 THE GOAT OF MEME TOKENS WITH DAO GOVERNANCE! 🚀

✅ MAINNET DEPLOYMENT SUCCESS:
- Network: World Chain Mainnet (Chain ID: 480)
- Total Cost: $0.11 USD (99% cheaper!)
- Gas Price: 0.01 gwei (Super cheap!)

✅ VERIFIED SMART CONTRACTS:
- GXOT Token: 0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb
- DAO Contract: 0x8CDa18d8A834D6A42951375C75789d3380CB10f8
- Liquidity Manager: 0xCD00672437454253861330bE1ED8FF4C630fbe2c

✅ TOKEN FEATURES:
- Total Supply: 3,000,000,000 GXOT (Fixed)
- Team Allocation: 300M GXOT (10%)
- Community/DEX: 2,700M GXOT (90%)
- DAO Governance: ACTIVE
- World Chain Integration: COMPLETE

✅ PROJECT INCLUDES:
- Smart contracts (Solidity 0.8.24)
- Deployment scripts (Multiple gas options)
- Complete documentation
- Branding assets (Goat mascot)
- Token metadata (Exchange ready)
- Security features (OpenZeppelin)
- Testing scripts
- Launch checklist

✅ SECURITY FEATURES:
- ReentrancyGuard protection
- Access control (Ownable)
- Input validation
- Emergency functions
- Gas optimized
- Audited standards

✅ WORLD CHAIN INTEGRATION:
- USDC: 0x79A02482A880bCE3F13e09Da970dC34db4CD24d1
- WETH: 0x4200000000000000000000000000000000000006
- WLD: 0x2cFc85d8E48F8EAB294be644d9E25C3030863003
- Uniswap V4 Router: 0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6

🎯 READY FOR:
- Community launch
- DEX liquidity addition
- DAO governance proposals
- Marketing campaigns
- Exchange listings

🔗 EXPLORER LINKS:
- GXOT: https://worldscan.org/address/0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb
- DAO: https://worldscan.org/address/0x8CDa18d8A834D6A42951375C75789d3380CB10f8
- Liquidity: https://worldscan.org/address/0xCD00672437454253861330bE1ED8FF4C630fbe2c

🐐 GXOT - From memes to millions! 🌙

#GXOT #MemeToken #DAO #WorldChain #DeFi #TheGOAT"

# Push to validiumx repository
echo "⬆️ Pushing to validiumx/gxot-token..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎊 SUCCESS! GXOT project uploaded to validiumx! 🎊"
    echo "=================================================="
    echo "🔗 Repository: https://github.com/validiumx/gxot-token"
    echo "🐐 GXOT Token: 0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb"
    echo "🏛️ DAO Contract: 0x8CDa18d8A834D6A42951375C75789d3380CB10f8"
    echo "💧 Liquidity Manager: 0xCD00672437454253861330bE1ED8FF4C630fbe2c"
    echo ""
    echo "🎯 Next steps:"
    echo "1. ⭐ Star your repository"
    echo "2. 📝 Enable Issues & Discussions"
    echo "3. 🏷️ Add repository topics"
    echo "4. 📢 Share with community"
    echo "5. 🚀 Create first DAO proposal"
    echo ""
    echo "🐐 The GOAT is ready for the world! 🚀"
else
    echo "❌ Upload failed. Please check:"
    echo "- GitHub credentials"
    echo "- Repository permissions"
    echo "- Internet connection"
fi
