const { ethers, network } = require("hardhat")

async function main() {
  console.log("🚀 ULTRA CHEAP DEPLOYMENT MODE")
  console.log("Network:", network.name)

  const [deployer] = await ethers.getSigners()
  console.log("Deploying with:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Balance:", ethers.formatEther(balance), "ETH")

  // ULTRA LOW minimum balance
  const minBalance = ethers.parseEther("0.0005") // Only 0.0005 ETH
  if (balance < minBalance) {
    throw new Error("Need at least 0.0005 ETH")
  }

  const TEAM_WALLET = process.env.TEAM_WALLET || deployer.address

  // ULTRA CHEAP GAS - 0.05 gwei!
  const ultraCheapGas = ethers.parseUnits("0.05", "gwei")
  console.log("⛽ ULTRA CHEAP GAS:", ethers.formatUnits(ultraCheapGas, "gwei"), "gwei")

  const ultraCheapSettings = {
    gasLimit: 2500000,
    gasPrice: ultraCheapGas,
  }

  console.log("📄 Deploying GXOT (ULTRA CHEAP)...")
  const GXOT = await ethers.getContractFactory("GXOT")
  const gxot = await GXOT.deploy(TEAM_WALLET, ultraCheapSettings)
  await gxot.waitForDeployment()
  const gxotAddress = await gxot.getAddress()
  console.log("✅ GXOT:", gxotAddress)

  console.log("🏛️ Deploying DAO (ULTRA CHEAP)...")
  const GXOTDAO = await ethers.getContractFactory("GXOTDAO")
  const dao = await GXOTDAO.deploy(gxotAddress, {
    gasLimit: 1800000,
    gasPrice: ultraCheapGas,
  })
  await dao.waitForDeployment()
  const daoAddress = await dao.getAddress()
  console.log("✅ DAO:", daoAddress)

  console.log("💧 Deploying Liquidity Manager (ULTRA CHEAP)...")
  const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
  const liquidityManager = await LiquidityManager.deploy(gxotAddress, {
    gasLimit: 1800000,
    gasPrice: ultraCheapGas,
  })
  await liquidityManager.waitForDeployment()
  const liquidityManagerAddress = await liquidityManager.getAddress()
  console.log("✅ Liquidity Manager:", liquidityManagerAddress)

  console.log("🔄 Activating DAO...")
  const activateDAOTx = await gxot.activateDAO(daoAddress, {
    gasLimit: 80000,
    gasPrice: ultraCheapGas,
  })
  await activateDAOTx.wait()
  console.log("✅ DAO activated!")

  const finalBalance = await ethers.provider.getBalance(deployer.address)
  const gasUsed = balance - finalBalance

  console.log("\n🎉 ULTRA CHEAP SUCCESS!")
  console.log("========================")
  console.log("GXOT Token:", gxotAddress)
  console.log("DAO:", daoAddress)
  console.log("Liquidity Manager:", liquidityManagerAddress)
  console.log("")
  console.log("💰 ULTRA CHEAP COST:")
  console.log("Gas Price: 0.05 gwei")
  console.log("Total Cost:", ethers.formatEther(gasUsed), "ETH")
  console.log("Cost USD: $" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(6))
  console.log("Remaining:", ethers.formatEther(finalBalance), "ETH")

  // Save minimal deployment info
  const deploymentInfo = {
    network: network.name,
    mode: "ULTRA_CHEAP",
    contracts: {
      GXOT: gxotAddress,
      DAO: daoAddress,
      LiquidityManager: liquidityManagerAddress,
    },
    cost: {
      gasPrice: "0.05 gwei",
      totalCost: ethers.formatEther(gasUsed) + " ETH",
      costUSD: "$" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(6),
    },
  }

  const fs = require("fs")
  fs.writeFileSync("deployment-ultra-cheap.json", JSON.stringify(deploymentInfo, null, 2))

  console.log("\n🎊 DEPLOYED FOR UNDER $1! 🎊")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message)
    process.exit(1)
  })
