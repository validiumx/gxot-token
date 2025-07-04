#!/bin/bash

echo "🧹 Cleaning up GXOT repository - Keep only ESSENTIAL files"
echo "========================================================"

# Navigate to project directory
cd D:\GXOT_Alls\my-app

echo "🗑️ Files to DELETE (too obvious AI-generated):"
echo "=============================================="

# Delete obvious AI-generated files
rm -f BRANDING-GUIDE.md
rm -f DEPLOYMENT-GUIDE.md
rm -f FINAL-SUCCESS-REPORT.md
rm -f GITHUB-COMMANDS.md
rm -f GITHUB-ENHANCEMENT-GUIDE.md
rm -f GITHUB-SETUP-GUIDE.md
rm -f LAUNCH-CHECKLIST.md
rm -f MAINNET-DEPLOYMENT-SUCCESS.md
rm -f PROJECT-SUMMARY.md
rm -f VALIDIUMX-REPOSITORY-SETUP.md

# Delete excessive deployment scripts
rm -f scripts/deploy-cheap.js
rm -f scripts/deploy-ultra-cheap.js
rm -f scripts/deploy-super-cheap.js
rm -f scripts/deploy-minimal.js
rm -f scripts/check-balance.js
rm -f scripts/create-first-proposal.js

# Delete excessive shell scripts
rm -f deploy.sh
rm -f deploy-worldchain.sh
rm -f deploy-worldchain.bat
rm -f git-setup.sh
rm -f github-push.sh
rm -f complete-github-upload.sh
rm -f upload-to-validiumx.sh
rm -f quick-commands.sh

# Delete metadata files (too comprehensive)
rm -f token-metadata.json
rm -f coinmarketcap-metadata.json
rm -f coingecko-metadata.json
rm -f github-repository-config.json
rm -f github-repository-stats.json
rm -f validiumx-repository-config.json

# Delete deployment info files
rm -f DEPLOYMENT-INFO.json
rm -f deployment-*.json

# Delete excessive config files
rm -f tsconfig.json
rm -f next.config.mjs
rm -f tailwind.config.ts

echo "✅ Cleanup completed!"
echo ""
echo "📁 KEEPING these ESSENTIAL files only:"
echo "======================================"
echo "✅ contracts/ (Smart contracts)"
echo "✅ scripts/deploy.js (Main deployment)"
echo "✅ scripts/test-mainnet-deployment.js (Testing)"
echo "✅ scripts/verify-mainnet.js (Verification)"
echo "✅ scripts/add-liquidity.js (Liquidity)"
echo "✅ hardhat.config.js (Hardhat config)"
echo "✅ package.json (Dependencies)"
echo "✅ README.md (Main documentation)"
echo "✅ .gitignore (Git ignore)"
echo "✅ .env.example (Environment example)"
echo ""
echo "🎯 Repository now looks NATURAL and PROFESSIONAL!"
