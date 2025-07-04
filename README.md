# GXOT Token 🐐

![GXOT Logo](https://beige-cautious-cardinal-391.mypinata.cloud/ipfs/bafybeih6z4whjvphmdqnzsylj3cydeyyus7pdzfvx3asgolrrlnxusyfd4)

A meme token with DAO governance on World Chain.

## Contracts (World Chain Mainnet)

- **GXOT Token**: `0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb`
- **DAO**: `0x8CDa18d8A834D6A42951375C75789d3380CB10f8`
- **Liquidity Manager**: `0xCD00672437454253861330bE1ED8FF4C630fbe2c`

## Features

- 🐐 3B GXOT tokens (fixed supply)
- 🏛️ DAO governance
- 💰 Fair tokenomics (10% team, 90% community)
- 🌍 World Chain integration

## Setup

\`\`\`bash
npm install
npm run compile
npm run deploy-mainnet
\`\`\`

## Add to MetaMask

- **Contract**: `0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb`
- **Symbol**: GXOT
- **Decimals**: 18
- **Logo**: `https://beige-cautious-cardinal-391.mypinata.cloud/ipfs/bafybeih6z4whjvphmdqnzsylj3cydeyyus7pdzfvx3asgolrrlnxusyfd4`

## Links

- [🔍 Explorer](https://worldscan.org/address/0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb)
- [🌍 World Chain](https://worldchain.org)
- [🐐 Logo](https://beige-cautious-cardinal-391.mypinata.cloud/ipfs/bafybeih6z4whjvphmdqnzsylj3cydeyyus7pdzfvx3asgolrrlnxusyfd4)

---

**The GOAT of meme tokens! 🚀**
\`\`\`

```powershell file="update-pinata-logo.ps1"
# Update GXOT token data with correct Pinata logo URL
Write-Host "🐐 Updating GXOT with correct Pinata logo URL" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

$logoCID = "bafybeih6z4whjvphmdqnzsylj3cydeyyus7pdzfvx3asgolrrlnxusyfd4"
$logoURL = "https://beige-cautious-cardinal-391.mypinata.cloud/ipfs/$logoCID"

Write-Host "📸 Logo CID: $logoCID" -ForegroundColor Cyan
Write-Host "🔗 Pinata URL: $logoURL" -ForegroundColor Cyan

# Replace metadata files with final versions
if (Test-Path "token-metadata.json") {
    Remove-Item "token-metadata.json" -Force
}
Move-Item "token-metadata-final.json" "token-metadata.json" -Force

if (Test-Path "coinmarketcap-metadata.json") {
    Remove-Item "coinmarketcap-metadata.json" -Force
}
Move-Item "coinmarketcap-metadata-final.json" "coinmarketcap-metadata.json" -Force

if (Test-Path "coingecko-metadata.json") {
    Remove-Item "coingecko-metadata.json" -Force
}
Move-Item "coingecko-metadata-final.json" "coingecko-metadata.json" -Force

# Update README with correct logo URL
if (Test-Path "README.md") {
    Remove-Item "README.md" -Force
}
Move-Item "README-FINAL.md" "README.md" -Force

Write-Host "✅ All files updated with Pinata logo URL!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Updated files:" -ForegroundColor Yellow
Write-Host "✅ token-metadata.json" -ForegroundColor Green
Write-Host "✅ coinmarketcap-metadata.json" -ForegroundColor Green
Write-Host "✅ coingecko-metadata.json" -ForegroundColor Green
Write-Host "✅ README.md (with Pinata logo)" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Final Logo URL: $logoURL" -ForegroundColor Cyan

# Commit changes
Write-Host "💾 Committing Pinata logo update..." -ForegroundColor Green
git add -A
git commit -m "🐐 Update GXOT logo with Pinata URL

✅ Logo URL: https://beige-cautious-cardinal-391.mypinata.cloud/ipfs/bafybeih6z4whjvphmdqnzsylj3cydeyyus7pdzfvx3asgolrrlnxusyfd4
✅ Updated all metadata files
✅ Ready for exchange listings
✅ MetaMask compatible logo

The GOAT logo is now live! 🚀"

git push

Write-Host "🎉 Pinata logo update completed and pushed!" -ForegroundColor Green
Write-Host "🐐 GXOT logo is now live on GitHub!" -ForegroundColor Cyan
