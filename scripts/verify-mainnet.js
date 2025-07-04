const { run } = require("hardhat")

async function main() {
  console.log("🔍 Verifying GXOT contracts on World Chain Mainnet...")

  // Load deployment info
  let deploymentInfo
  try {
    deploymentInfo = JSON.parse(require("fs").readFileSync("deployment-super-cheap.json", "utf8"))
  } catch (error) {
    console.error("❌ deployment-super-cheap.json not found!")
    console.log("Using manual addresses...")
    deploymentInfo = {
      contracts: {
        GXOT: "0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb",
        DAO: "0x8CDa18d8A834D6A42951375C75789d3380CB10f8",
        LiquidityManager: "0xCD00672437454253861330bE1ED8FF4C630fbe2c",
      },
    }
  }

  const teamWallet = process.env.TEAM_WALLET || "0x701aB55cb87FB8dA4fE3f45FFf6cc1eA60965310"
  const { contracts } = deploymentInfo

  console.log("Network: worldchain-mainnet")
  console.log("Chain ID: 480")

  try {
    // Verify GXOT Token
    console.log("\n📄 Verifying GXOT Token...")
    console.log("Address:", contracts.GXOT)
    await run("verify:verify", {
      address: contracts.GXOT,
      constructorArguments: [teamWallet],
    })
    console.log("✅ GXOT Token verified!")

    // Wait a bit between verifications
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Verify DAO Contract
    console.log("\n🏛️ Verifying DAO Contract...")
    console.log("Address:", contracts.DAO)
    await run("verify:verify", {
      address: contracts.DAO,
      constructorArguments: [contracts.GXOT],
    })
    console.log("✅ DAO Contract verified!")

    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Verify Liquidity Manager
    console.log("\n💧 Verifying Liquidity Manager...")
    console.log("Address:", contracts.LiquidityManager)
    await run("verify:verify", {
      address: contracts.LiquidityManager,
      constructorArguments: [contracts.GXOT],
    })
    console.log("✅ Liquidity Manager verified!")

    console.log("\n🎉 All contracts verified successfully!")
    console.log("\n🔗 Explorer Links:")
    console.log("GXOT Token: https://worldscan.org/address/" + contracts.GXOT)
    console.log("DAO: https://worldscan.org/address/" + contracts.DAO)
    console.log("Liquidity Manager: https://worldscan.org/address/" + contracts.LiquidityManager)
  } catch (error) {
    console.error("❌ Verification failed:", error.message)
    console.log("\n💡 Manual verification commands:")
    console.log(`npx hardhat verify --network worldchain-mainnet ${contracts.GXOT} ${teamWallet}`)
    console.log(`npx hardhat verify --network worldchain-mainnet ${contracts.DAO} ${contracts.GXOT}`)
    console.log(`npx hardhat verify --network worldchain-mainnet ${contracts.LiquidityManager} ${contracts.GXOT}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
