@echo off
echo 🚀 GXOT World Chain Deployment Script
echo ====================================

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found!
    echo Please create .env file with your PRIVATE_KEY and TEAM_WALLET
    pause
    exit /b 1
)

echo ✅ Environment file found

REM Compile contracts
echo 📝 Compiling contracts...
call npm run compile

if %errorlevel% neq 0 (
    echo ❌ Compilation failed!
    pause
    exit /b 1
)

echo ✅ Contracts compiled successfully

REM Ask user which network to deploy to
echo.
echo Select deployment network:
echo 1) World Chain Testnet (Recommended for testing)
echo 2) World Chain Mainnet (Production)
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    set NETWORK=testnet
    echo 🧪 Deploying to World Chain Testnet...
) else if "%choice%"=="2" (
    set NETWORK=mainnet
    echo 🌍 Deploying to World Chain Mainnet...
    set /p confirm="Are you sure you want to deploy to MAINNET? (yes/no): "
    if not "%confirm%"=="yes" (
        echo ❌ Deployment cancelled
        pause
        exit /b 1
    )
) else (
    echo ❌ Invalid choice
    pause
    exit /b 1
)

REM Deploy contracts
echo 🚀 Starting deployment...
if "%NETWORK%"=="testnet" (
    call npm run deploy-testnet
) else (
    call npm run deploy-mainnet
)

if %errorlevel% neq 0 (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo ✅ Deployment completed!

REM Test deployment
echo 🧪 Testing deployment...
if "%NETWORK%"=="testnet" (
    call npm run test-deployment-testnet
) else (
    call npm run test-deployment-mainnet
)

if %errorlevel% neq 0 (
    echo ⚠️ Deployment testing failed, but contracts are deployed
) else (
    echo ✅ Deployment testing passed!
)

REM Ask if user wants to verify contracts
set /p verify_choice="Do you want to verify contracts on explorer? (yes/no): "

if "%verify_choice%"=="yes" (
    echo 🔍 Verifying contracts...
    if "%NETWORK%"=="testnet" (
        call npm run verify-testnet
    ) else (
        call npm run verify-mainnet
    )
    
    if %errorlevel% equ 0 (
        echo ✅ Contract verification completed!
    ) else (
        echo ⚠️ Contract verification failed, but you can verify manually later
    )
)

echo.
echo 🎉 GXOT deployment process completed!
echo 📄 Check deployment.json for contract addresses
echo 🔗 Add GXOT token to your wallet using the contract address
echo.
echo Next steps:
echo 1. Add liquidity to DEX
echo 2. Create DAO proposals  
echo 3. Start community engagement
echo.
echo Happy meme-ing! 🚀🌙
pause
