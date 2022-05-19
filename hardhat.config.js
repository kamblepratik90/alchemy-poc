require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.8.4",
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
    },
  },
  networks: {
    hardhat: {
    },
    testnet_matic: {
      url: process.env.MATIC_TESTNET_RPC_URL,
      chainId: 80001,
      accounts: [process.env.MATIC_TESTNET_PRIVATE_KEY],
    },
  },
};