# 🚀 GXOT World Chain Deployment Guide

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Private key** with ETH for gas fees
4. **Team wallet** address

## 🔧 Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Configuration
\`\`\`bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your details:
# PRIVATE_KEY=your_private_key_without_0x
# TEAM_WALLET=0xYourTeamWalletAddress
\`\`\`

### 3. Compile Contracts
\`\`\`bash
npm run compile
\`\`\`

## 🌍 World Chain Networks

### Testnet (Sepolia)
- **Chain ID**: 4801
- **RPC URL**: https://worldchain-sepolia.g.alchemy.com/public
- **Explorer**: https://worldchain-sepolia.explorer.alchemy.com
- **Faucet**: Get testnet ETH from World Chain faucet

### Mainnet
- **Chain ID**: 480
- **RPC URL**: https://worldchain-mainnet.g.alchemy.com/public
- **Explorer**: https://worldscan.org

## 🚀 Deployment Commands

### Quick Deploy (Interactive)
\`\`\`bash
# Windows
deploy-worldchain.bat

# Linux/Mac
chmod +x deploy-worldchain.sh
./deploy-worldchain.sh
\`\`\`

### Manual Commands

#### Testnet Deployment
\`\`\`bash
# Deploy to testnet
npm run deploy-testnet

# Test deployment
npm run test-deployment-testnet

# Verify contracts
npm run verify-testnet
\`\`\`

#### Mainnet Deployment
\`\`\`bash
# Deploy to mainnet
npm run deploy-mainnet

# Test deployment
npm run test-deployment-mainnet

# Verify contracts
npm run verify-mainnet
\`\`\`

## 📊 Gas Costs (Estimated)

| Operation | Gas Limit | Cost (1 gwei) |
|-----------|-----------|---------------|
| GXOT Deploy | 5,000,000 | ~0.005 ETH |
| DAO Deploy | 3,000,000 | ~0.003 ETH |
| Liquidity Manager | 3,000,000 | ~0.003 ETH |
| **Total** | **~11M gas** | **~0.011 ETH** |

## 🔍 Post-Deployment

After successful deployment, you'll receive:

1. **deployment.json** - Contract addresses and deployment info
2. **Verified contracts** on World Chain explorer
3. **Test results** confirming functionality

### Contract Addresses Structure
\`\`\`json
{
  "network": "worldchain-testnet",
  "chainId": 4801,
  "contracts": {
    "GXOT": "0x...",
    "DAO": "0x...",
    "LiquidityManager": "0x..."
  },
  "teamWallet": "0x..."
}
\`\`\`

## 🛠️ Troubleshooting

### Common Issues

1. **"Insufficient funds"**
   - Ensure you have enough ETH for gas fees
   - Minimum 0.02 ETH recommended

2. **"Network connection failed"**
   - Check your internet connection
   - Try using custom RPC URL in .env

3. **"Contract verification failed"**
   - Wait a few minutes and try again
   - Use manual verification commands

4. **"Private key invalid"**
   - Ensure private key is without 0x prefix
   - Check for extra spaces or characters

### Manual Verification
\`\`\`bash
# If automatic verification fails
npx hardhat verify --network worldchain-testnet <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
\`\`\`

## 📱 Adding Token to Wallet

After deployment, add GXOT to your wallet:

1. **Contract Address**: From deployment.json
2. **Symbol**: GXOT
3. **Decimals**: 18

## 🎯 Next Steps

1. **Add Liquidity**: Create GXOT/ETH pool on DEX
2. **DAO Setup**: Create first governance proposal
3. **Community**: Share contract addresses with community
4. **Marketing**: Start meme token promotion

## 🔗 Useful Links

- [World Chain Docs](https://worldchain.org/docs)
- [World Chain Explorer](https://worldscan.org)
- [Uniswap V4 Docs](https://docs.uniswap.org/contracts/v4/overview)

## 🆘 Support

If you encounter issues:
1. Check this guide first
2. Review error messages carefully
3. Join our Discord for community support
4. Create GitHub issue for bugs

---

**Happy deploying! 🚀🌙**
