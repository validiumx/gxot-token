const { ethers, network } = require("hardhat")

async function main() {
  console.log("🚀 Starting GXOT deployment...")
  console.log("Network:", network.name)

  // Get deployer account
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with account:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Account balance:", ethers.formatEther(balance), "ETH")

  // Check minimum balance for deployment
  const minBalance = ethers.parseEther("0.01") // 0.01 ETH minimum
  if (balance < minBalance) {
    console.log("❌ Insufficient balance for deployment!")
    console.log("💰 Current balance:", ethers.formatEther(balance), "ETH")
    console.log("💰 Required balance:", ethers.formatEther(minBalance), "ETH")
    console.log("💰 Need additional:", ethers.formatEther(minBalance - balance), "ETH")
    console.log("")
    console.log("🔗 Get ETH from:")
    if (network.name.includes("testnet")) {
      console.log("- World Chain Testnet Faucet")
      console.log("- Bridge from other testnets")
    } else {
      console.log("- Buy ETH on exchanges")
      console.log("- Bridge from other networks")
      console.log("- Transfer from other wallets")
    }
    throw new Error("Insufficient balance for deployment. Need at least 0.01 ETH")
  }

  // Set team wallet address
  const TEAM_WALLET = process.env.TEAM_WALLET || deployer.address
  console.log("Team wallet:", TEAM_WALLET)

  // Get current gas price from network
  let gasPrice
  try {
    const feeData = await ethers.provider.getFeeData()
    gasPrice = feeData.gasPrice || ethers.parseUnits("1", "gwei")
  } catch (error) {
    console.log("⚠️ Could not get network gas price, using default 1 gwei")
    gasPrice = ethers.parseUnits("1", "gwei")
  }

  console.log("⛽ Gas price:", ethers.formatUnits(gasPrice, "gwei"), "gwei")

  // Gas settings for World Chain
  const gasSettings = {
    gasLimit: 5000000,
    gasPrice: gasPrice,
  }

  console.log("📄 Deploying GXOT Token Contract...")
  const GXOT = await ethers.getContractFactory("GXOT")
  const gxot = await GXOT.deploy(TEAM_WALLET, gasSettings)

  console.log("⏳ Waiting for GXOT deployment...")
  await gxot.waitForDeployment()
  const gxotAddress = await gxot.getAddress()
  console.log("✅ GXOT Token deployed to:", gxotAddress)

  // Wait for a few blocks before next deployment
  console.log("⏳ Waiting for block confirmations...")
  await new Promise((resolve) => setTimeout(resolve, 15000))

  console.log("🏛️ Deploying DAO Contract...")
  const GXOTDAO = await ethers.getContractFactory("GXOTDAO")
  const dao = await GXOTDAO.deploy(gxotAddress, {
    gasLimit: 3000000,
    gasPrice: gasPrice,
  })

  console.log("⏳ Waiting for DAO deployment...")
  await dao.waitForDeployment()
  const daoAddress = await dao.getAddress()
  console.log("✅ DAO Contract deployed to:", daoAddress)

  await new Promise((resolve) => setTimeout(resolve, 15000))

  console.log("💧 Deploying Liquidity Manager...")
  const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
  const liquidityManager = await LiquidityManager.deploy(gxotAddress, {
    gasLimit: 3000000,
    gasPrice: gasPrice,
  })

  console.log("⏳ Waiting for Liquidity Manager deployment...")
  await liquidityManager.waitForDeployment()
  const liquidityManagerAddress = await liquidityManager.getAddress()
  console.log("✅ Liquidity Manager deployed to:", liquidityManagerAddress)

  await new Promise((resolve) => setTimeout(resolve, 15000))

  console.log("🔄 Activating DAO...")
  const activateDAOTx = await gxot.activateDAO(daoAddress, {
    gasLimit: 150000,
    gasPrice: gasPrice,
  })
  console.log("⏳ Waiting for DAO activation...")
  await activateDAOTx.wait()
  console.log("✅ DAO activated successfully!")

  // Skip automatic liquidity addition for now
  console.log("⚠️ Skipping automatic DEX liquidity addition (will be done manually)")
  console.log("💡 You can add liquidity later using the addLiquidityToDEX() function")

  // Verify deployment
  console.log("🔍 Verifying deployment...")
  const totalSupply = await gxot.totalSupply()
  const teamBalance = await gxot.balanceOf(TEAM_WALLET)
  const contractBalance = await gxot.balanceOf(gxotAddress)
  const isDAOActive = await gxot.isDAOActive()
  const liquidityAdded = await gxot.liquidityAdded()

  // Calculate actual gas used
  const finalBalance = await ethers.provider.getBalance(deployer.address)
  const gasUsed = balance - finalBalance

  console.log("\n🎉 Deployment Summary:")
  console.log("========================")
  console.log("Network:", network.name)
  console.log("GXOT Token:", gxotAddress)
  console.log("DAO Contract:", daoAddress)
  console.log("Liquidity Manager:", liquidityManagerAddress)
  console.log("Team Wallet:", TEAM_WALLET)
  console.log("Deployer:", deployer.address)
  console.log("")
  console.log("📊 Token Info:")
  console.log("Total Supply:", ethers.formatEther(totalSupply), "GXOT")
  console.log("Team Balance:", ethers.formatEther(teamBalance), "GXOT")
  console.log("Contract Balance:", ethers.formatEther(contractBalance), "GXOT")
  console.log("DAO Active:", isDAOActive)
  console.log("Liquidity Added:", liquidityAdded)
  console.log("")
  console.log("⛽ Gas Usage:")
  console.log("Gas Price:", ethers.formatUnits(gasPrice, "gwei"), "gwei")
  console.log("Total Gas Cost:", ethers.formatEther(gasUsed), "ETH")
  console.log("Remaining Balance:", ethers.formatEther(finalBalance), "ETH")

  console.log("\n📋 Contract Verification Commands:")
  console.log("npx hardhat verify --network", network.name, gxotAddress, TEAM_WALLET)
  console.log("npx hardhat verify --network", network.name, daoAddress, gxotAddress)
  console.log("npx hardhat verify --network", network.name, liquidityManagerAddress, gxotAddress)

  console.log("\n🔗 World Chain Integration:")
  console.log("USDC Address:", "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1")
  console.log("WETH Address:", "0x4200000000000000000000000000000000000006")
  console.log("WLD Address:", "0x2cFc85d8E48F8EAB294be644d9E25C3030863003")
  console.log("Swap Router:", "0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6")

  console.log("\n💡 Next Steps:")
  console.log("1. Verify contracts on explorer")
  console.log("2. Add liquidity to DEX manually when ready")
  console.log("3. Create first DAO proposal")
  console.log("4. Start community engagement")

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.config.chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      GXOT: gxotAddress,
      DAO: daoAddress,
      LiquidityManager: liquidityManagerAddress,
    },
    teamWallet: TEAM_WALLET,
    tokenomics: {
      totalSupply: ethers.formatEther(totalSupply),
      teamBalance: ethers.formatEther(teamBalance),
      contractBalance: ethers.formatEther(contractBalance),
    },
    gasUsed: {
      gasPrice: ethers.formatUnits(gasPrice, "gwei") + " gwei",
      totalCost: ethers.formatEther(gasUsed) + " ETH",
      remainingBalance: ethers.formatEther(finalBalance) + " ETH",
    },
  }

  console.log("\n💾 Deployment info saved to deployment.json")
  const fs = require("fs")
  fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2))

  return deploymentInfo
}

main()
  .then((info) => {
    console.log("\n🎊 DEPLOYMENT SUCCESSFUL! 🎊")
    console.log("Contract addresses saved in deployment.json")
    console.log("You can now add GXOT token to your wallet!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error.message)
    process.exit(1)
  })
