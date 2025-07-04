const { ethers } = require("hardhat")

async function main() {
  console.log("📝 Creating first DAO proposal...")

  const MAINNET_ADDRESSES = {
    GXOT: "0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb",
    DAO: "0x8CDa18d8A834D6A42951375C75789d3380CB10f8",
  }

  const [deployer] = await ethers.getSigners()
  console.log("Creating proposal with account:", deployer.address)

  // Get contract instances
  const gxot = await ethers.getContractAt("GXOT", MAINNET_ADDRESSES.GXOT)
  const dao = await ethers.getContractAt("GXOTDAO", MAINNET_ADDRESSES.DAO)

  // Check if user has enough tokens
  const userBalance = await gxot.balanceOf(deployer.address)
  const minThreshold = await dao.MIN_PROPOSAL_THRESHOLD()

  console.log("Your GXOT balance:", ethers.formatEther(userBalance))
  console.log("Required for proposal:", ethers.formatEther(minThreshold))

  if (userBalance < minThreshold) {
    console.log("❌ Insufficient GXOT tokens for proposal creation")
    console.log("💡 You need", ethers.formatEther(minThreshold), "GXOT tokens")
    console.log("💡 Team wallet has the tokens, transfer some first")
    return
  }

  try {
    const proposalDescription =
      "Welcome to GXOT DAO! This is our first governance proposal to officially launch the community-driven meme token with DAO governance on World Chain. Let's build the future of decentralized meme tokens together! 🚀🌙"

    console.log("🚀 Creating proposal...")
    const createProposalTx = await dao.createProposal(proposalDescription, {
      gasLimit: 200000,
      gasPrice: ethers.parseUnits("0.01", "gwei"), // Super cheap gas
    })

    console.log("⏳ Waiting for transaction confirmation...")
    await createProposalTx.wait()

    const proposalCount = await dao.proposalCount()
    console.log("✅ Proposal created successfully!")
    console.log("📊 Proposal ID:", proposalCount.toString())
    console.log("📝 Description:", proposalDescription)

    // Get proposal details
    const proposal = await dao.getProposal(proposalCount)
    console.log("\n📋 Proposal Details:")
    console.log("ID:", proposal.id.toString())
    console.log("Proposer:", proposal.proposer)
    console.log("Start Time:", new Date(Number(proposal.startTime) * 1000).toLocaleString())
    console.log("End Time:", new Date(Number(proposal.endTime) * 1000).toLocaleString())
    console.log("For Votes:", ethers.formatEther(proposal.forVotes))
    console.log("Against Votes:", ethers.formatEther(proposal.againstVotes))

    console.log("\n🗳️ Voting is now open for 7 days!")
    console.log("Community members can vote with their GXOT tokens")
  } catch (error) {
    console.error("❌ Failed to create proposal:", error.message)
  }
}

main()
  .then(() => {
    console.log("\n✅ Proposal creation completed!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Error:", error)
    process.exit(1)
  })
