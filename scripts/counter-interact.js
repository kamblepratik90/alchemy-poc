const { ethers } = require("hardhat");
var cron = require('node-cron');
const isOnline = require('is-online');
// const ERC20Abi = require("../artifacts/contracts/mock/ERC20Mock.sol/ERC20Mock.json").abi;
const CounterAbi =
    require("../artifacts/contracts/Counter.sol/Counter.json").abi;


// ********************* Contract addreses *********************
// // matic
var counter_address = '0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa';
// local 
// const counter_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

let counter_write;
let owner;

// const auctionPriceValue = '0.001';

async function afterDeploy() {

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

    let account_0_private_key_36 = PK;
    owner = new ethers.Wallet(account_0_private_key_36, provider);


    // ********************* ERC20 TOKEN Smart Contract instance creation *********************
    // let token_write = new ethers.Contract(tokensMap[token], ERC20Abi, owner)    // Write only


    // ********************* Smart Contract instance creation from ABI *********************
    counter_write = new ethers.Contract(counter_address, CounterAbi, owner)    // Write only


    // let tx = await counter_write.connect(owner).resetIndex();
    // tx = await tx.wait();
    // console.log('setIndex... done...')

    // cron.schedule("*/1 * * * * *", async function () {

    console.log('running a task every sec... ' + new Date());

    let online = await isOnline();

    if (online) {
        let currentIndex = await counter_write.getIndex();
        console.log('currentIndex old : ', currentIndex.toString());

        console.log('setIndex...')
        let tx = await counter_write.connect(owner).setIndex();
        tx = await tx.wait();
        console.log('setIndex... done...')

        // for (let index = 0; index < 100; index++) {
        // tx = await counter_write.connect(owner).setIndex();
        // tx = await tx.wait();
        // }

        currentIndex = await counter_write.getIndex();
        console.log('currentIndex new : ', currentIndex.toString(), ' ' + new Date());
    } else {
        console.log("no internet connection..... XXXXXXXXXXXXXXXXXXXXXX0000000000000XXXXXXXXXXXXXXXXXXXX ");
    }
    // });
}


async function main() {

    await afterDeploy();
}

main()
    // .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


    // event: ====>  1  Sun May 15 2022 03:29:56 GMT+0530 (India Standard Time)