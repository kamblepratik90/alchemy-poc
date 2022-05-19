const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // 16/03
  // Counter deployed to: 0x4d41c33628b579F2156dDD7D25f352FaC7aB1FaC
  // 17/03
  // 0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa