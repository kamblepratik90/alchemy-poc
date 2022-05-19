const { ethers, web3 } = require("hardhat");
var cron = require('node-cron');
const isOnline = require('is-online');
// const ERC20Abi = require("../artifacts/contracts/mock/ERC20Mock.sol/ERC20Mock.json").abi;
const CounterAbi =
    require("../artifacts/contracts/Counter.sol/Counter.json").abi;


const ERC20Abi =
    require("../scripts/abi/erc20.json");
const nftAbi = require('../scripts/abi/nft1155.json').abi;

// ********************* Contract addreses *********************
// // matic
var counter_address = '0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa';
// local 
// const counter_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

// var ERC20_Address = '0x0000000000000000000000000000000000001010'
var ERC20_Address = '0x833176cd872e301835f03e3b92035fefbe79bfa1';

let counter_write;
let owner;

// const auctionPriceValue = '0.001';
// const auctionPrice = ethers.utils.parseUnits(auctionPriceValue, 'ether');


// matic
RPC_URL = process.env.MATIC_TESTNET_RPC_URL_2;
RPC_URL_WSS = process.env.MATIC_TESTNET_RPC_URL_WSS_2;
PK = process.env.MATIC_TESTNET_PRIVATE_KEY;
// local 
// RPC_URL_WSS = process.env.LOCAL_RPC_URL_WSS;
// PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'


const apiKey = process.env.ALCHEMY_API_KEY;
const network = process.env.ALCHEMY_PROVIDER_NETWORK;

var startTime, endTime;

function start() {
    startTime = new Date();
};

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
}

async function afterDeploy() {
    start();


    // ********************* Set Up Users from private keys *********************
    // local
    // const provider = new ethers.providers.JsonRpcProvider();
    // matic
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    // const provider = new ethers.providers.WebSocketProvider(RPC_URL_WSS);
    // const provider = new ethers.providers.AlchemyWebSocketProvider(network, apiKey);
    // const provider = new ethers.providers.AlchemyProvider(network, apiKey);
    // return requiredWss
    //     ? new ethers.providers.AlchemyWebSocketProvider(network, apiKey)
    //     : new ethers.providers.AlchemyProvider(network, apiKey);

    // 'wss://polygon-mumbai.g.alchemy.com/v2/pppmw5Gbc2cJS5BLPKnIYsSJd_8Y7cUF'

    let account_0_private_key_36 = PK;
    owner = new ethers.Wallet(account_0_private_key_36, provider);

    // provider._websocket.on('close', async (code) => {
    //     console.log('ws closed', code);
    //     wsProvider._websocket.terminate();
    // });

    // ********************* ERC20 TOKEN Smart Contract instance creation *********************
    // let token_write = new ethers.Contract(ERC20_Address, ERC20Abi, provider)    // Write only


    // // ********************* Smart Contract instance creation from ABI *********************
    counter_write = new ethers.Contract(counter_address, CounterAbi, owner)    // Write only

    try {
        counter_write.on("MyEvent", (sender, index, event) => {
            console.log("on MyEvent", `sender: ${sender} index: ${index}`, ' ' + new Date());
            // console.log('event: ', event);
            // output:
            //on MyEvent sender: 0x45B88cE0844F7BF2F6D466CF921a98F1Fb487f7D index: 12  Mon Mar 21 2022 18:02:12
            end()
        });

    } catch (error) {
        console.log('error: ', error);
    }

    // // // https://docs.ethers.io/v5/api/contract/example/#erc20-events

    // let filterFrom = counter_write.filters['MyEvent']();
    // // let filterFrom = counter_write.filters.MyEvent();
    // // // let filterFrom = counter_write.filters.MyEvent(indexed params caan be passed othrwaise null, null);
    // console.log('filterFrom:', filterFrom);
    // // // output: 
    // // // filterFrom: {
    // // //     address: '0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa',
    // // //     topics: [
    // // //       '0xdf50c7bb3b25f812aedef81bc334454040e7b27e27de95a79451d663013b7e17'
    // // //     ]
    // // //   }

    // // // Search for transfers *from* me in the last 10 blocks
    // let logsFrom = await counter_write.queryFilter(filterFrom, -10, "latest");
    // console.log('logsFrom: ', logsFrom);
    // // output: 
    // // logsFrom:  [
    // //   {
    // //     blockNumber: 25605122,
    // //     blockHash: '0xf2f9ccd46ccb3d18bbf1dc65ff1b374579f3d162e6c62f86d8c6213191327d48',
    // //     transactionIndex: 23,
    // //     removed: false,
    // //     address: '0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa',
    // //     data: '0x00000000000000000000000045b88ce0844f7bf2f6d466cf921a98f1fb487f7d000000000000000000000000000000000000000000000000000000000000000c',
    // //     topics: [
    // //       '0xdf50c7bb3b25f812aedef81bc334454040e7b27e27de95a79451d663013b7e17'
    // //     ],
    // //     transactionHash: '0x0196d6608c653c1cf4de324412743f10351c511b54d0a32ce3b7724d1194f66a',
    // //     logIndex: 70,
    // //     removeListener: [Function (anonymous)],
    // //     getBlock: [Function (anonymous)],
    // //     getTransaction: [Function (anonymous)],
    // //     getTransactionReceipt: [Function (anonymous)],
    // //     event: 'MyEvent',
    // //     eventSignature: 'MyEvent(address,uint256)',
    // //     decode: [Function (anonymous)],
    // //     args: [
    // //       '0x45B88cE0844F7BF2F6D466CF921a98F1Fb487f7D',
    // //       BigNumber { value: "12" },
    // //       sender: '0x45B88cE0844F7BF2F6D466CF921a98F1Fb487f7D',
    // //       index: BigNumber { value: "12" }
    // //     ]
    // //   }
    // // ]


    // ////////////////
    // // // try events on our erc20 
    // // // let filterFrom = token_write.filters.Transfer('0x12C65BF8023b36D28c723A74fd6B4AfeFE697940');
    // // let filterFrom = token_write.filters.Transfer();
    // // console.log('filterFrom:', filterFrom);
    // // let logsFrom = await token_write.queryFilter(filterFrom, -1000, "latest");
    // // console.log('logsFrom: ', logsFrom);

    // // Listen to all Transfer events:
    // // let t = token_write.on("Transfer", (from, to, amount, event) => {
    // //     console.log("on Transfer", `from: ${from} to: ${to}  amount: ${amount}`, ' ' + new Date());
    // //     console.log('event: ', event);
    // // });
    // // console.log('t = ', t)
    // // let t = token_write.on("Transfer", (...args) => {
    // //     console.log("on Transfer", `event: ${args}`, ' ' + new Date());
    // //     // console.log('event: ', event);
    // // });


}
const getBlockEvents = async () => {
    // const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const provider = new ethers.providers.WebSocketProvider(RPC_URL_WSS);
    const contract = new ethers.Contract(
        '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
        // nftAbi,
        ERC20Abi,
        provider
    ); // Write only
    start();
    // const filterFrom = contract.filters['CreateNFT']();
    const filterFrom = contract.filters['Transfer']();
    const logsFrom = await contract.queryFilter(filterFrom, 0, 'latest');
    end()
    console.log(('Transfer => logsFrom: ', logsFrom.length));
};
// -100 ----- 4sec ------ 2sec
// -1000 ----- 4sec ------ 2sec
// -5000 ----- 4sec ------ 2sec
// -50000 ----- 4sec ------ 2sec
// -500000 ----- 4sec ------ 2sec -----> 47
// 0 ----- 3sec ------ 2sec -----> 47

// Error: Log response size exceeded. You can make eth_getLogs requests with up to a 2K block range and no limit on the response size, or you can request any block range with a cap of 10K logs in the response. Based on your parameters and the response size limit, this block range should work: [0x0, 0xdfdc85]
//     at WebSocketProvider._this.websocket.onmessage (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/@ethersproject/providers/src.ts/websocket-provider.ts:128:33)
//     at WebSocket.onMessage (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/ws/lib/event-target.js:132:16)
//     at WebSocket.emit (node:events:394:28)
//     at Receiver.receiverOnMessage (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/ws/lib/websocket.js:834:20)
//     at Receiver.emit (node:events:394:28)
//     at Receiver.dataMessage (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/ws/lib/receiver.js:437:14)
//     at Receiver.getData (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/ws/lib/receiver.js:367:17)
//     at Receiver.startLoop (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/ws/lib/receiver.js:143:22)
//     at Receiver._write (/Users/pratikkamble/Documents/BlockChain_Research/Repo/NODE-RESEARCH/alchemy-poc/node_modules/ws/lib/receiver.js:78:10)
//     at writeOrBuffer (node:internal/streams/writable:389:12) {
//   code: -32602,
//   response: '{"jsonrpc":"2.0","id":2,"error":{"code":-32602,
// "message": "Log response size exceeded. You can make eth_getLogs requests with up to a 2K block range 
// and no limit on the response size, or you can request any block range with a cap of 10K logs in the response.
// Based on your parameters and the response size limit, this block range should work: [0x0, 0xdfdc85]"}}'


async function main() {

    await afterDeploy();
    // await getBlockEvents();
}


main()
    // .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


    // 19:33:51 start acchemy wss 
    // 20:11:05 - stopped (1000+)

    // index: 1  Thu May 12 2022 20:23:37
    // index: 466  Thu May 12 2022 20:43:13

    // index: 11  Thu May 12 2022 21:27:13
    // index: 3364  Thu May 12 2022 23:48:10

    // index: 7  Fri May 13 2022 00:44:14
    // index: 3527  Fri May 13 2022 03:24:54
