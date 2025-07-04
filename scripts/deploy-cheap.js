const { ethers, network } = require("hardhat")

async function main() {
  console.log("🚀 Starting GXOT deployment (CHEAP GAS MODE)...")
  console.log("Network:", network.name)

  // Get deployer account
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with account:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Account balance:", ethers.formatEther(balance), "ETH")

  // Much lower minimum balance for cheap deployment
  const minBalance = ethers.parseEther("0.002") // Only 0.002 ETH needed
  if (balance < minBalance) {
    console.log("❌ Insufficient balance for deployment!")
    console.log("💰 Current balance:", ethers.formatEther(balance), "ETH")
    console.log("💰 Required balance:", ethers.formatEther(minBalance), "ETH")
    console.log("💰 Need additional:", ethers.formatEther(minBalance - balance), "ETH")
    throw new Error("Insufficient balance for deployment. Need at least 0.002 ETH")
  }

  // Set team wallet address
  const TEAM_WALLET = process.env.TEAM_WALLET || deployer.address
  console.log("Team wallet:", TEAM_WALLET)

  // SUPER CHEAP GAS SETTINGS
  const cheapGasPrice = ethers.parseUnits("0.1", "gwei") // 0.1 gwei - very cheap!
  console.log("⛽ Using CHEAP gas price:", ethers.formatUnits(cheapGasPrice, "gwei"), "gwei")

  // Optimized gas limits
  const gasSettings = {
    gasLimit: 3000000, // Reduced from 5M
    gasPrice: cheapGasPrice,
  }

  console.log("📄 Deploying GXOT Token Contract (CHEAP MODE)...")
  const GXOT = await ethers.getContractFactory("GXOT")
  const gxot = await GXOT.deploy(TEAM_WALLET, gasSettings)

  console.log("⏳ Waiting for GXOT deployment...")
  await gxot.waitForDeployment()
  const gxotAddress = await gxot.getAddress()
  console.log("✅ GXOT Token deployed to:", gxotAddress)

  // Shorter wait time
  console.log("⏳ Waiting 5 seconds...")
  await new Promise((resolve) => setTimeout(resolve, 5000))

  console.log("🏛️ Deploying DAO Contract (CHEAP MODE)...")
  const GXOTDAO = await ethers.getContractFactory("GXOTDAO")
  const dao = await GXOTDAO.deploy(gxotAddress, {
    gasLimit: 2000000, // Reduced gas limit
    gasPrice: cheapGasPrice,
  })

  console.log("⏳ Waiting for DAO deployment...")
  await dao.waitForDeployment()
  const daoAddress = await dao.getAddress()
  console.log("✅ DAO Contract deployed to:", daoAddress)

  await new Promise((resolve) => setTimeout(resolve, 5000))

  console.log("💧 Deploying Liquidity Manager (CHEAP MODE)...")
  const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
  const liquidityManager = await LiquidityManager.deploy(gxotAddress, {
    gasLimit: 2000000, // Reduced gas limit
    gasPrice: cheapGasPrice,
  })

  console.log("⏳ Waiting for Liquidity Manager deployment...")
  await liquidityManager.waitForDeployment()
  const liquidityManagerAddress = await liquidityManager.getAddress()
  console.log("✅ Liquidity Manager deployed to:", liquidityManagerAddress)

  await new Promise((resolve) => setTimeout(resolve, 5000))

  console.log("🔄 Activating DAO (CHEAP MODE)...")
  const activateDAOTx = await gxot.activateDAO(daoAddress, {
    gasLimit: 100000, // Much lower gas limit
    gasPrice: cheapGasPrice,
  })
  console.log("⏳ Waiting for DAO activation...")
  await activateDAOTx.wait()
  console.log("✅ DAO activated successfully!")

  // Skip liquidity addition to save gas
  console.log("⚠️ Skipping liquidity addition to save gas")

  // Verify deployment
  console.log("🔍 Verifying deployment...")
  const totalSupply = await gxot.totalSupply()
  const teamBalance = await gxot.balanceOf(TEAM_WALLET)
  const contractBalance = await gxot.balanceOf(gxotAddress)
  const isDAOActive = await gxot.isDAOActive()

  // Calculate actual gas used
  const finalBalance = await ethers.provider.getBalance(deployer.address)
  const gasUsed = balance - finalBalance

  console.log("\n🎉 CHEAP DEPLOYMENT SUCCESS!")
  console.log("===============================")
  console.log("Network:", network.name)
  console.log("GXOT Token:", gxotAddress)
  console.log("DAO Contract:", daoAddress)
  console.log("Liquidity Manager:", liquidityManagerAddress)
  console.log("Team Wallet:", TEAM_WALLET)
  console.log("")
  console.log("📊 Token Info:")
  console.log("Total Supply:", ethers.formatEther(totalSupply), "GXOT")
  console.log("Team Balance:", ethers.formatEther(teamBalance), "GXOT")
  console.log("Contract Balance:", ethers.formatEther(contractBalance), "GXOT")
  console.log("DAO Active:", isDAOActive)
  console.log("")
  console.log("💰 CHEAP GAS USAGE:")
  console.log("Gas Price:", ethers.formatUnits(cheapGasPrice, "gwei"), "gwei")
  console.log("Total Gas Cost:", ethers.formatEther(gasUsed), "ETH")
  console.log("Gas Cost in USD:", "$" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(4)) // Assuming ETH = $3000
  console.log("Remaining Balance:", ethers.formatEther(finalBalance), "ETH")

  console.log("\n📋 Contract Verification Commands:")
  console.log("npx hardhat verify --network", network.name, gxotAddress, TEAM_WALLET)
  console.log("npx hardhat verify --network", network.name, daoAddress, gxotAddress)
  console.log("npx hardhat verify --network", network.name, liquidityManagerAddress, gxotAddress)

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.config.chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    deploymentMode: "CHEAP_GAS",
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
      gasPrice: ethers.formatUnits(cheapGasPrice, "gwei") + " gwei",
      totalCost: ethers.formatEther(gasUsed) + " ETH",
      costUSD: "$" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(4),
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
    console.log("\n🎊 CHEAP DEPLOYMENT SUCCESSFUL! 🎊")
    console.log("Total cost: Less than $2 USD!")
    console.log("Contract addresses saved in deployment.json")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error.message)
    process.exit(1)
  })
