require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Localhost network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    // Sepolia Testnet
    // Uncomment và thêm INFURA_API_KEY và PRIVATE_KEY của bạn
    /*
    sepolia: {
      url: `https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY`,
      accounts: [`0xYOUR_PRIVATE_KEY`],
      chainId: 11155111
    }
    */
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
