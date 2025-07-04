const { run } = require("hardhat")

async function main() {
  console.log("🔍 Starting contract verification...")

  // Load deployment info
  let deploymentInfo
  try {
    deploymentInfo = JSON.parse(require("fs").readFileSync("deployment.json", "utf8"))
  } catch (error) {
    console.error("❌ deployment.json not found. Run deployment first!")
    process.exit(1)
  }

  const { contracts, teamWallet } = deploymentInfo

  console.log("Network:", deploymentInfo.network)
  console.log("Chain ID:", deploymentInfo.chainId)

  try {
    // Verify GXOT Token
    console.log("\n📄 Verifying GXOT Token...")
    await run("verify:verify", {
      address: contracts.GXOT,
      constructorArguments: [teamWallet],
    })
    console.log("✅ GXOT Token verified!")

    // Wait a bit between verifications
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Verify DAO Contract
    console.log("\n🏛️ Verifying DAO Contract...")
    await run("verify:verify", {
      address: contracts.DAO,
      constructorArguments: [contracts.GXOT],
    })
    console.log("✅ DAO Contract verified!")

    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Verify Liquidity Manager
    console.log("\n💧 Verifying Liquidity Manager...")
    await run("verify:verify", {
      address: contracts.LiquidityManager,
      constructorArguments: [contracts.GXOT],
    })
    console.log("✅ Liquidity Manager verified!")

    console.log("\n🎉 All contracts verified successfully!")
  } catch (error) {
    console.error("❌ Verification failed:", error)
    console.log("\n💡 Manual verification commands:")
    console.log(`npx hardhat verify --network ${deploymentInfo.network} ${contracts.GXOT} ${teamWallet}`)
    console.log(`npx hardhat verify --network ${deploymentInfo.network} ${contracts.DAO} ${contracts.GXOT}`)
    console.log(
      `npx hardhat verify --network ${deploymentInfo.network} ${contracts.LiquidityManager} ${contracts.GXOT}`,
    )
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
