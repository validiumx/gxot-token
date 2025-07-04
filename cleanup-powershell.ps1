# 🧹 GXOT Repository Cleanup - PowerShell Version
Write-Host "🧹 Cleaning up GXOT repository - PowerShell commands" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Delete excessive documentation files
Write-Host "🗑️ Deleting excessive documentation files..." -ForegroundColor Yellow
Remove-Item -Path "BRANDING-GUIDE.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "DEPLOYMENT-GUIDE.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "FINAL-SUCCESS-REPORT.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "GITHUB-COMMANDS.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "GITHUB-ENHANCEMENT-GUIDE.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "GITHUB-SETUP-GUIDE.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "LAUNCH-CHECKLIST.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "MAINNET-DEPLOYMENT-SUCCESS.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "PROJECT-SUMMARY.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "VALIDIUMX-REPOSITORY-SETUP.md" -Force -ErrorAction SilentlyContinue

# Delete excessive deployment scripts
Write-Host "🗑️ Deleting excessive deployment scripts..." -ForegroundColor Yellow
Remove-Item -Path "scripts/deploy-cheap.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/deploy-ultra-cheap.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/deploy-super-cheap.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/deploy-minimal.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/check-balance.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/create-first-proposal.js" -Force -ErrorAction SilentlyContinue

# Delete shell scripts
Write-Host "🗑️ Deleting shell scripts..." -ForegroundColor Yellow
Remove-Item -Path "deploy.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "deploy-worldchain.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "deploy-worldchain.bat" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "git-setup.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "github-push.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "complete-github-upload.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "upload-to-validiumx.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "quick-commands.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "cleanup-repository.sh" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "git-cleanup-commit.sh" -Force -ErrorAction SilentlyContinue

# Delete metadata files
Write-Host "🗑️ Deleting metadata files..." -ForegroundColor Yellow
Remove-Item -Path "token-metadata.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "coinmarketcap-metadata.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "coingecko-metadata.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "github-repository-config.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "github-repository-stats.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "validiumx-repository-config.json" -Force -ErrorAction SilentlyContinue

# Delete deployment info files
Write-Host "🗑️ Deleting deployment info files..." -ForegroundColor Yellow
Remove-Item -Path "DEPLOYMENT-INFO.json" -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path "deployment-*.json" | Remove-Item -Force -ErrorAction SilentlyContinue

# Delete excessive config files
Write-Host "🗑️ Deleting excessive config files..." -ForegroundColor Yellow
Remove-Item -Path "tsconfig.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "next.config.mjs" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "tailwind.config.ts" -Force -ErrorAction SilentlyContinue

Write-Host "✅ Cleanup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Files that will REMAIN (Essential only):" -ForegroundColor Cyan
Write-Host "✅ contracts/ - Smart contracts" -ForegroundColor Green
Write-Host "✅ scripts/deploy.js - Main deployment" -ForegroundColor Green
Write-Host "✅ scripts/test-mainnet-deployment.js - Testing" -ForegroundColor Green
Write-Host "✅ scripts/verify-mainnet.js - Verification" -ForegroundColor Green
Write-Host "✅ scripts/add-liquidity.js - Liquidity management" -ForegroundColor Green
Write-Host "✅ hardhat.config.js - Hardhat configuration" -ForegroundColor Green
Write-Host "✅ package.json - Dependencies" -ForegroundColor Green
Write-Host "✅ README.md - Simple documentation" -ForegroundColor Green
Write-Host "✅ .gitignore - Git ignore rules" -ForegroundColor Green
Write-Host "✅ .env.example - Environment example" -ForegroundColor Green
