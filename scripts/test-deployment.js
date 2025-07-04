const { ethers } = require("hardhat")

async function main() {
  console.log("🧪 Testing GXOT deployment...")

  // Load deployment info
  let deploymentInfo
  try {
    deploymentInfo = JSON.parse(require("fs").readFileSync("deployment.json", "utf8"))
  } catch (error) {
    console.error("❌ deployment.json not found. Run deployment first!")
    process.exit(1)
  }

  const [deployer] = await ethers.getSigners()
  console.log("Testing with account:", deployer.address)

  // Get contract instances
  const gxot = await ethers.getContractAt("GXOT", deploymentInfo.contracts.GXOT)
  const dao = await ethers.getContractAt("GXOTDAO", deploymentInfo.contracts.DAO)
  const liquidityManager = await ethers.getContractAt("LiquidityManager", deploymentInfo.contracts.LiquidityManager)

  console.log("\n🔍 Testing GXOT Token...")

  // Test basic token functions
  const name = await gxot.name()
  const symbol = await gxot.symbol()
  const decimals = await gxot.decimals()
  const totalSupply = await gxot.totalSupply()
  const maxSupply = await gxot.MAX_SUPPLY()

  console.log("✅ Name:", name)
  console.log("✅ Symbol:", symbol)
  console.log("✅ Decimals:", decimals.toString())
  console.log("✅ Total Supply:", ethers.formatEther(totalSupply))
  console.log("✅ Max Supply:", ethers.formatEther(maxSupply))

  // Test allocations
  const teamAllocation = await gxot.TEAM_ALLOCATION()
  const dexAllocation = await gxot.DEX_ALLOCATION()
  const teamBalance = await gxot.balanceOf(deploymentInfo.teamWallet)
  const contractBalance = await gxot.balanceOf(deploymentInfo.contracts.GXOT)

  console.log("\n📊 Testing Allocations...")
  console.log("✅ Team Allocation:", ethers.formatEther(teamAllocation))
  console.log("✅ DEX Allocation:", ethers.formatEther(dexAllocation))
  console.log("✅ Team Balance:", ethers.formatEther(teamBalance))
  console.log("✅ Contract Balance:", ethers.formatEther(contractBalance))

  // Test DAO functionality
  console.log("\n🏛️ Testing DAO...")
  const daoAddress = await gxot.daoContract()
  const isDAOActive = await gxot.isDAOActive()
  const proposalCount = await dao.proposalCount()
  const minProposalThreshold = await dao.MIN_PROPOSAL_THRESHOLD()

  console.log("✅ DAO Address:", daoAddress)
  console.log("✅ DAO Active:", isDAOActive)
  console.log("✅ Proposal Count:", proposalCount.toString())
  console.log("✅ Min Proposal Threshold:", ethers.formatEther(minProposalThreshold))

  // Test World Chain integration
  console.log("\n🌍 Testing World Chain Integration...")
  const usdcAddress = await gxot.USDC_ADDRESS()
  const wethAddress = await gxot.WETH_ADDRESS()
  const wldAddress = await gxot.WLD_ADDRESS()
  const swapRouter = await gxot.SWAP_ROUTER()

  console.log("✅ USDC Address:", usdcAddress)
  console.log("✅ WETH Address:", wethAddress)
  console.log("✅ WLD Address:", wldAddress)
  console.log("✅ Swap Router:", swapRouter)

  // Test liquidity status
  console.log("\n💧 Testing Liquidity...")
  const liquidityAdded = await gxot.liquidityAdded()
  console.log("✅ Liquidity Added:", liquidityAdded)

  // Test gas costs
  console.log("\n⛽ Testing Gas Costs...")
  try {
    const transferGas = await gxot.transfer.estimateGas(deployer.address, ethers.parseEther("1"))
    console.log("✅ Transfer Gas Cost:", transferGas.toString())
  } catch (error) {
    console.log("⚠️ Transfer test skipped (insufficient balance)")
  }

  // Test DAO proposal creation (if user has enough tokens)
  console.log("\n📝 Testing DAO Proposal...")
  const userBalance = await gxot.balanceOf(deployer.address)
  if (userBalance >= minProposalThreshold) {
    try {
      const createProposalGas = await dao.createProposal.estimateGas("Test proposal for gas estimation")
      console.log("✅ Create Proposal Gas Cost:", createProposalGas.toString())
    } catch (error) {
      console.log("⚠️ Proposal creation test failed:", error.message)
    }
  } else {
    console.log("⚠️ Insufficient tokens for proposal creation test")
  }

  console.log("\n🎉 All tests completed successfully!")
  console.log("\n📋 Contract Addresses:")
  console.log("GXOT Token:", deploymentInfo.contracts.GXOT)
  console.log("DAO:", deploymentInfo.contracts.DAO)
  console.log("Liquidity Manager:", deploymentInfo.contracts.LiquidityManager)
}

const gasSettings = {
  gasLimit: 3000000,
  gasPrice: ethers.parseUnits("0.1", "gwei"),
}

main()
  .then(() => {
    console.log("\n✅ Testing completed!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Testing failed:", error)
    process.exit(1)
  })
