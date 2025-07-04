const { ethers, network } = require("hardhat")

async function main() {
  console.log("🚀 SUPER ULTRA CHEAP DEPLOYMENT MODE")
  console.log("Network:", network.name)

  const [deployer] = await ethers.getSigners()
  console.log("Deploying with:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Balance:", ethers.formatEther(balance), "ETH")

  // SUPER LOW minimum balance - use 90% of available balance
  const minBalance = ethers.parseEther("0.0003") // Only 0.0003 ETH
  if (balance < minBalance) {
    throw new Error("Need at least 0.0003 ETH")
  }

  const TEAM_WALLET = process.env.TEAM_WALLET || deployer.address

  // SUPER ULTRA CHEAP GAS - 0.01 gwei!
  const superCheapGas = ethers.parseUnits("0.01", "gwei")
  console.log("⛽ SUPER CHEAP GAS:", ethers.formatUnits(superCheapGas, "gwei"), "gwei")

  const superCheapSettings = {
    gasLimit: 2000000, // Further reduced
    gasPrice: superCheapGas,
  }

  console.log("📄 Deploying GXOT (SUPER CHEAP)...")
  const GXOT = await ethers.getContractFactory("GXOT")
  const gxot = await GXOT.deploy(TEAM_WALLET, superCheapSettings)
  await gxot.waitForDeployment()
  const gxotAddress = await gxot.getAddress()
  console.log("✅ GXOT:", gxotAddress)

  console.log("🏛️ Deploying DAO (SUPER CHEAP)...")
  const GXOTDAO = await ethers.getContractFactory("GXOTDAO")
  const dao = await GXOTDAO.deploy(gxotAddress, {
    gasLimit: 1500000, // Much lower
    gasPrice: superCheapGas,
  })
  await dao.waitForDeployment()
  const daoAddress = await dao.getAddress()
  console.log("✅ DAO:", daoAddress)

  console.log("💧 Deploying Liquidity Manager (SUPER CHEAP)...")
  const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
  const liquidityManager = await LiquidityManager.deploy(gxotAddress, {
    gasLimit: 1500000, // Much lower
    gasPrice: superCheapGas,
  })
  await liquidityManager.waitForDeployment()
  const liquidityManagerAddress = await liquidityManager.getAddress()
  console.log("✅ Liquidity Manager:", liquidityManagerAddress)

  console.log("🔄 Activating DAO...")
  const activateDAOTx = await gxot.activateDAO(daoAddress, {
    gasLimit: 60000, // Very low
    gasPrice: superCheapGas,
  })
  await activateDAOTx.wait()
  console.log("✅ DAO activated!")

  const finalBalance = await ethers.provider.getBalance(deployer.address)
  const gasUsed = balance - finalBalance

  console.log("\n🎉 SUPER CHEAP SUCCESS!")
  console.log("========================")
  console.log("GXOT Token:", gxotAddress)
  console.log("DAO:", daoAddress)
  console.log("Liquidity Manager:", liquidityManagerAddress)
  console.log("")
  console.log("💰 SUPER CHEAP COST:")
  console.log("Gas Price: 0.01 gwei")
  console.log("Total Cost:", ethers.formatEther(gasUsed), "ETH")
  console.log("Cost USD: $" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(6))
  console.log("Remaining:", ethers.formatEther(finalBalance), "ETH")

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    mode: "SUPER_CHEAP",
    contracts: {
      GXOT: gxotAddress,
      DAO: daoAddress,
      LiquidityManager: liquidityManagerAddress,
    },
    cost: {
      gasPrice: "0.01 gwei",
      totalCost: ethers.formatEther(gasUsed) + " ETH",
      costUSD: "$" + (Number.parseFloat(ethers.formatEther(gasUsed)) * 3000).toFixed(6),
    },
  }

  const fs = require("fs")
  fs.writeFileSync("deployment-super-cheap.json", JSON.stringify(deploymentInfo, null, 2))

  console.log("\n🎊 DEPLOYED FOR UNDER $0.50! 🎊")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message)
    process.exit(1)
  })
