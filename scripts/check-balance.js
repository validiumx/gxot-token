const { ethers, network } = require("hardhat")

async function main() {
  console.log("💰 Checking wallet balance...")
  console.log("Network:", network.name)

  const [deployer] = await ethers.getSigners()
  console.log("Wallet address:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Current balance:", ethers.formatEther(balance), "ETH")

  const minBalance = ethers.parseEther("0.01")
  const needed = minBalance - balance

  if (balance < minBalance) {
    console.log("❌ Insufficient balance for deployment!")
    console.log("💰 Required:", ethers.formatEther(minBalance), "ETH")
    console.log("💰 Need additional:", ethers.formatEther(needed), "ETH")
    console.log("")

    if (network.name.includes("testnet")) {
      console.log("🚰 Get testnet ETH from:")
      console.log("- World Chain Testnet Faucet")
      console.log("- Alchemy Faucet")
      console.log("- Bridge from other testnets")
    } else {
      console.log("💳 Get mainnet ETH from:")
      console.log("- Buy on exchanges (Binance, Coinbase, etc)")
      console.log("- Bridge from Ethereum mainnet")
      console.log("- Transfer from other wallets")
      console.log("")
      console.log("🌉 Bridge to World Chain:")
      console.log("- Use official World Chain bridge")
      console.log("- Bridge from Ethereum/Optimism")
    }
  } else {
    console.log("✅ Sufficient balance for deployment!")
    console.log("💰 Extra balance:", ethers.formatEther(balance - minBalance), "ETH")
  }

  // Get gas price estimate
  try {
    const feeData = await ethers.provider.getFeeData()
    const gasPrice = feeData.gasPrice || ethers.parseUnits("1", "gwei")
    console.log("⛽ Current gas price:", ethers.formatUnits(gasPrice, "gwei"), "gwei")

    // Estimate total deployment cost
    const estimatedGas = 11000000n // ~11M gas for all contracts
    const estimatedCost = gasPrice * estimatedGas
    console.log("📊 Estimated deployment cost:", ethers.formatEther(estimatedCost), "ETH")
  } catch (error) {
    console.log("⚠️ Could not get gas price estimate")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error)
    process.exit(1)
  })
