require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-verify")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: false,
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_RPC_URL || "",
        enabled: process.env.FORKING === "true",
      },
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    "worldchain-mainnet": {
      url: process.env.WORLD_CHAIN_MAINNET_URL || "https://worldchain-mainnet.g.alchemy.com/public",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 480,
      timeout: 60000,
      gasPrice: 1000000000,
    },
    "worldchain-testnet": {
      url: process.env.WORLD_CHAIN_TESTNET_URL || "https://worldchain-sepolia.g.alchemy.com/public",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 4801,
      timeout: 60000,
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "dummy",
      goerli: process.env.ETHERSCAN_API_KEY || "dummy",
      sepolia: process.env.ETHERSCAN_API_KEY || "dummy",
      "worldchain-mainnet": process.env.WORLDSCAN_API_KEY || "dummy",
      "worldchain-testnet": process.env.WORLDSCAN_API_KEY || "dummy",
    },
    customChains: [
      {
        network: "worldchain-mainnet",
        chainId: 480,
        urls: {
          apiURL: "https://api.worldscan.org/api",
          browserURL: "https://worldscan.org",
        },
      },
      {
        network: "worldchain-testnet",
        chainId: 4801,
        urls: {
          apiURL: "https://worldchain-sepolia.explorer.alchemy.com/api",
          browserURL: "https://worldchain-sepolia.explorer.alchemy.com",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  mocha: {
    timeout: 60000,
  },
}
