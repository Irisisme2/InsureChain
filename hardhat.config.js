require('@nomiclabs/hardhat-ethers');
require('dotenv').config(); // To manage environment variables

const { MNEMONIC } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.base.org",
      accounts: { mnemonic: MNEMONIC }
    }
  }
};
