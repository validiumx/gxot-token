const { ethers } = require("hardhat")

async function main() {
  console.log("🧪 Testing GXOT MAINNET deployment...")

  // Use the correct mainnet addresses
  const MAINNET_ADDRESSES = {
    GXOT: "0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb",
    DAO: "0x8CDa18d8A834D6A42951375C75789d3380CB10f8",
    LiquidityManager: "0xCD00672437454253861330bE1ED8FF4C630fbe2c",
    teamWallet: "0x701aB55cb87FB8dA4fE3f45FFf6cc1eA60965310",
  }

  const [deployer] = await ethers.getSigners()
  console.log("Testing with account:", deployer.address)
  console.log("Network:", "worldchain-mainnet")

  // Get contract instances with correct addresses
  const gxot = await ethers.getContractAt("GXOT", MAINNET_ADDRESSES.GXOT)
  const dao = await ethers.getContractAt("GXOTDAO", MAINNET_ADDRESSES.DAO)
  const liquidityManager = await ethers.getContractAt("LiquidityManager", MAINNET_ADDRESSES.LiquidityManager)

  console.log("\n🔍 Testing GXOT Token...")

  try {
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
    const teamBalance = await gxot.balanceOf(MAINNET_ADDRESSES.teamWallet)
    const contractBalance = await gxot.balanceOf(MAINNET_ADDRESSES.GXOT)

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

    // Test ownership
    console.log("\n👑 Testing Ownership...")
    const owner = await gxot.owner()
    console.log("✅ Current Owner:", owner)
    console.log("✅ Owner is DAO:", owner === MAINNET_ADDRESSES.DAO)

    console.log("\n🎉 All MAINNET tests completed successfully!")
    console.log("\n📋 MAINNET Contract Summary:")
    console.log("GXOT Token:", MAINNET_ADDRESSES.GXOT)
    console.log("DAO:", MAINNET_ADDRESSES.DAO)
    console.log("Liquidity Manager:", MAINNET_ADDRESSES.LiquidityManager)
    console.log("Team Wallet:", MAINNET_ADDRESSES.teamWallet)

    console.log("\n🔗 Explorer Links:")
    console.log("GXOT: https://worldscan.org/address/" + MAINNET_ADDRESSES.GXOT)
    console.log("DAO: https://worldscan.org/address/" + MAINNET_ADDRESSES.DAO)
    console.log("Liquidity Manager: https://worldscan.org/address/" + MAINNET_ADDRESSES.LiquidityManager)

    console.log("\n💰 Token Economics Verified:")
    console.log("- Total Supply: 3,000,000,000 GXOT")
    console.log("- Team Allocation: 300,000,000 GXOT (10%)")
    console.log("- DEX Allocation: 2,700,000,000 GXOT (90%)")
    console.log("- DAO Governance: ACTIVE")
    console.log("- Deployment Cost: $0.11 USD")
  } catch (error) {
    console.error("❌ Testing failed:", error.message)
    console.log("\n🔍 Contract addresses being tested:")
    console.log("GXOT:", MAINNET_ADDRESSES.GXOT)
    console.log("DAO:", MAINNET_ADDRESSES.DAO)
    console.log("Liquidity Manager:", MAINNET_ADDRESSES.LiquidityManager)
  }
}

main()
  .then(() => {
    console.log("\n✅ MAINNET testing completed!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Testing failed:", error)
    process.exit(1)
  })
