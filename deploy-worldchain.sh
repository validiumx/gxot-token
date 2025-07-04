echo "🚀 GXOT World Chain Deployment Script"
echo "===================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with your PRIVATE_KEY and TEAM_WALLET"
    exit 1
fi

echo "✅ Environment file found"

# Compile contracts
echo "📝 Compiling contracts..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

echo "✅ Contracts compiled successfully"

# Ask user which network to deploy to
echo ""
echo "Select deployment network:"
echo "1) World Chain Testnet (Recommended for testing)"
echo "2) World Chain Mainnet (Production)"
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        NETWORK="testnet"
        echo "🧪 Deploying to World Chain Testnet..."
        ;;
    2)
        NETWORK="mainnet"
        echo "🌍 Deploying to World Chain Mainnet..."
        read -p "Are you sure you want to deploy to MAINNET? (yes/no): " confirm
        if [ "$confirm" != "yes" ]; then
            echo "❌ Deployment cancelled"
            exit 1
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

# Deploy contracts
echo "🚀 Starting deployment..."
if [ "$NETWORK" = "testnet" ]; then
    npm run deploy-testnet
else
    npm run deploy-mainnet
fi

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    exit 1
fi

echo "✅ Deployment completed!"

# Test deployment
echo "🧪 Testing deployment..."
if [ "$NETWORK" = "testnet" ]; then
    npm run test-deployment-testnet
else
    npm run test-deployment-mainnet
fi

if [ $? -ne 0 ]; then
    echo "⚠️ Deployment testing failed, but contracts are deployed"
else
    echo "✅ Deployment testing passed!"
fi

# Ask if user wants to verify contracts
read -p "Do you want to verify contracts on explorer? (yes/no): " verify_choice

if [ "$verify_choice" = "yes" ]; then
    echo "🔍 Verifying contracts..."
    if [ "$NETWORK" = "testnet" ]; then
        npm run verify-testnet
    else
        npm run verify-mainnet
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Contract verification completed!"
    else
        echo "⚠️ Contract verification failed, but you can verify manually later"
    fi
fi

echo ""
echo "🎉 GXOT deployment process completed!"
echo "📄 Check deployment.json for contract addresses"
echo "🔗 Add GXOT token to your wallet using the contract address"
echo ""
echo "Next steps:"
echo "1. Add liquidity to DEX"
echo "2. Create DAO proposals"
echo "3. Start community engagement"
echo ""
echo "Happy meme-ing! 🚀🌙"
