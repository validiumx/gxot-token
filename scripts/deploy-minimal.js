const { ethers, network } = require("hardhat")

async function main() {
  console.log("🚀 MINIMAL DEPLOYMENT - USE YOUR EXACT BALANCE")
  console.log("Network:", network.name)

  const [deployer] = await ethers.getSigners()
  console.log("Deploying with:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Balance:", ethers.formatEther(balance), "ETH")

  // Use 95% of available balance, leave 5% buffer
  const availableForGas = (balance * 95n) / 100n
  console.log("Available for gas:", ethers.formatEther(availableForGas), "ETH")

  const TEAM_WALLET = process.env.TEAM_WALLET || deployer.address

  // Calculate gas price based on available balance
  // Estimate total gas needed: ~5M gas
  const estimatedTotalGas = 5000000n
  const calculatedGasPrice = availableForGas / estimatedTotalGas

  // Minimum gas price 0.001 gwei
  const minGasPrice = ethers.parseUnits("0.001", "gwei")
  const gasPrice = calculatedGasPrice > minGasPrice ? calculatedGasPrice : minGasPrice

  console.log("⛽ Calculated gas price:", ethers.formatUnits(gasPrice, "gwei"), "gwei")

  const minimalSettings = {
    gasLimit: 1800000, // Minimal gas limit
    gasPrice: gasPrice,
  }

  try {
    console.log("📄 Deploying GXOT (MINIMAL)...")
    const GXOT = await ethers.getContractFactory("GXOT")
    const gxot = await GXOT.deploy(TEAM_WALLET, minimalSettings)
    await gxot.waitForDeployment()
    const gxotAddress = await gxot.getAddress()
    console.log("✅ GXOT:", gxotAddress)

    console.log("🏛️ Deploying DAO (MINIMAL)...")
    const GXOTDAO = await ethers.getContractFactory("GXOTDAO")
    const dao = await GXOTDAO.deploy(gxotAddress, {
      gasLimit: 1200000,
      gasPrice: gasPrice,
    })
    await dao.waitForDeployment()
    const daoAddress = await dao.getAddress()
    console.log("✅ DAO:", daoAddress)

    console.log("💧 Deploying Liquidity Manager (MINIMAL)...")
    const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
    const liquidityManager = await LiquidityManager.deploy(gxotAddress, {
      gasLimit: 1200000,
      gasPrice: gasPrice,
    })
    await liquidityManager.waitForDeployment()
    const liquidityManagerAddress = await liquidityManager.getAddress()
    console.log("✅ Liquidity Manager:", liquidityManagerAddress)

    console.log("🔄 Activating DAO...")
    const activateDAOTx = await gxot.activateDAO(daoAddress, {
      gasLimit: 50000,
      gasPrice: gasPrice,
    })
    await activateDAOTx.wait()
    console.log("✅ DAO activated!")

    const finalBalance = await ethers.provider.getBalance(deployer.address)
    const gasUsed = balance - finalBalance

    console.log("\n🎉 MINIMAL DEPLOYMENT SUCCESS!")
    console.log("===============================")
    console.log("GXOT Token:", gxotAddress)
    console.log("DAO:", daoAddress)
    console.log("Liquidity Manager:", liquidityManagerAddress)
    console.log("")
    console.log("💰 MINIMAL COST:")
    console.log("Gas Price:", ethers.formatUnits(gasPrice, "gwei"), "gwei")
    console.log("Total Cost:", ethers.formatEther(gasUsed), "ETH")
    console.log("Cost USD: $" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(6))
    console.log("Remaining:", ethers.formatEther(finalBalance), "ETH")

    // Save deployment info
    const deploymentInfo = {
      network: network.name,
      mode: "MINIMAL",
      contracts: {
        GXOT: gxotAddress,
        DAO: daoAddress,
        LiquidityManager: liquidityManagerAddress,
      },
      cost: {
        gasPrice: ethers.formatUnits(gasPrice, "gwei") + " gwei",
        totalCost: ethers.formatEther(gasUsed) + " ETH",
        costUSD: "$" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(6),
      },
    }

    const fs = require("fs")
    fs.writeFileSync("deployment-minimal.json", JSON.stringify(deploymentInfo, null, 2))

    console.log("\n🎊 DEPLOYED WITH YOUR EXACT BALANCE! 🎊")
  } catch (error) {
    console.error("❌ Deployment failed:", error.message)

    // If still fails, try single contract deployment
    console.log("\n🔄 Trying single contract deployment...")
    try {
      const GXOT = await ethers.getContractFactory("GXOT")
      const gxot = await GXOT.deploy(TEAM_WALLET, {
        gasLimit: 1500000,
        gasPrice: ethers.parseUnits("0.001", "gwei"),
      })
      await gxot.waitForDeployment()
      const gxotAddress = await gxot.getAddress()
      console.log("✅ At least GXOT Token deployed:", gxotAddress)

      const finalBalance = await ethers.provider.getBalance(deployer.address)
      console.log("Remaining balance:", ethers.formatEther(finalBalance), "ETH")
    } catch (singleError) {
      console.error("❌ Even single contract failed:", singleError.message)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message)
    process.exit(1)
  })
