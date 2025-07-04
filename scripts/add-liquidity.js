const { ethers } = require("hardhat")

async function main() {
  console.log("💧 Adding liquidity to DEX...")

  // Load deployment info
  let deploymentInfo
  try {
    deploymentInfo = JSON.parse(require("fs").readFileSync("deployment.json", "utf8"))
  } catch (error) {
    console.error("❌ deployment.json not found. Run deployment first!")
    process.exit(1)
  }

  const [deployer] = await ethers.getSigners()
  console.log("Adding liquidity with account:", deployer.address)

  // Get contract instance
  const gxot = await ethers.getContractAt("GXOT", deploymentInfo.contracts.GXOT)

  console.log("📊 Current Status:")
  const liquidityAdded = await gxot.liquidityAdded()
  const contractBalance = await gxot.balanceOf(deploymentInfo.contracts.GXOT)
  console.log("Liquidity already added:", liquidityAdded)
  console.log("Contract balance:", ethers.formatEther(contractBalance), "GXOT")

  if (liquidityAdded) {
    console.log("✅ Liquidity already added to DEX!")
    return
  }

  if (contractBalance === 0n) {
    console.log("❌ No tokens in contract for liquidity!")
    return
  }

  try {
    console.log("🚀 Adding liquidity to DEX...")
    const addLiquidityTx = await gxot.addLiquidityToDEX({
      gasLimit: 300000,
      gasPrice: ethers.parseUnits("1", "gwei"),
    })

    console.log("⏳ Waiting for transaction confirmation...")
    await addLiquidityTx.wait()
    console.log("✅ Liquidity added successfully!")

    // Verify
    const newLiquidityStatus = await gxot.liquidityAdded()
    const newContractBalance = await gxot.balanceOf(deploymentInfo.contracts.GXOT)
    console.log("New liquidity status:", newLiquidityStatus)
    console.log("New contract balance:", ethers.formatEther(newContractBalance), "GXOT")
  } catch (error) {
    console.error("❌ Failed to add liquidity:", error.message)
    console.log("💡 This might be because the Uniswap router doesn't exist on testnet")
    console.log("💡 You can add liquidity manually later when DEX is available")
  }
}

main()
  .then(() => {
    console.log("✅ Liquidity addition process completed!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Process failed:", error)
    process.exit(1)
  })
