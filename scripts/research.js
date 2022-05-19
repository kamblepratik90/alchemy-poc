const { getImplementationAddress } = require('@openzeppelin/upgrades-core');


const { ethers, upgrades } = require("hardhat");

const proxyAddress = '0x0715A7794a1dc8e42615F059dD6e406A6594651A';



async function main() {


    // matic
    RPC_URL = process.env.MATIC_TESTNET_RPC_URL_MORALIS; // MATIC_TESTNET_RPC_URL;
    PK = process.env.MATIC_TESTNET_PRIVATE_KEY;
    // local
    // PK = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";


    // ********************* Set Up Users from private keys *********************
    // local
    // const provider = new ethers.providers.JsonRpcProvider();
    // const provider = new ethers.providers.WebSocketProvider(process.env.LOCAL_RPC_URL_WSS)
    // matic
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    // const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_API_KEY_2);


    // const currentImplAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

    const currentImplAddress = await getImplementationAddress(provider, proxyAddress);

    console.log('currentImplAddress', currentImplAddress);
}

main();