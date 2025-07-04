# GXOT Token

A meme token with DAO governance on World Chain.

## Contracts (World Chain Mainnet)

- **GXOT Token**: `0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb`
- **DAO**: `0x8CDa18d8A834D6A42951375C75789d3380CB10f8`
- **Liquidity Manager**: `0xCD00672437454253861330bE1ED8FF4C630fbe2c`

## Features

- 3B GXOT tokens (fixed supply)
- DAO governance
- Fair tokenomics (10% team, 90% community)

## Setup

\`\`\`bash
npm install
npm run compile
npm run deploy-mainnet
\`\`\`

## Add to MetaMask

- Contract: `0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb`
- Symbol: GXOT
- Decimals: 18

[View on Explorer](https://worldscan.org/address/0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb)
\`\`\`

```powershell file="commit-cleanup.ps1"
# Commit the cleanup changes
Write-Host "💾 Committing cleanup changes..." -ForegroundColor Green

# Replace README with clean version
if (Test-Path "README.md") {
    Move-Item "README.md" "README-comprehensive.md" -Force
}
Move-Item "README-CLEAN.md" "README.md" -Force

# Add all changes
git add -A

# Commit
git commit -m "🧹 Repository cleanup

- Remove excessive documentation
- Keep only essential files
- Simplify README
- Professional structure"

# Push to GitHub
git push

Write-Host "✅ Repository cleaned and pushed!" -ForegroundColor Green
Write-Host "🎯 Now looks natural and professional!" -ForegroundColor Cyan
