const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// import axios from "axios";
const { ethers } = require("hardhat");
const Web3 = require('web3');
var cron = require('node-cron');
const isOnline = require('is-online');

require("dotenv").config();

const CounterAbi =
    require("../artifacts/contracts/Counter.sol/Counter.json").abi;

const RPC = process.env.LOCAL_RPC_URL;
// const WSS = process.env.MATIC_TESTNET_RPC_URL_WSS;
const WSS = process.env.LOCAL_RPC_URL_WSS;
let iface = new ethers.utils.Interface(CounterAbi);

// const CONTRACT_ADDRESS = '0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa';
// local 
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

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

async function main() {
    try {
        start();

        console.log('start tx monitoring...', WSS);
        const web3 = createAlchemyWeb3(WSS);

        // let web3 = new Web3(WSS);


        // cron.schedule("*/10 * * * * *", async function () {

        //     let online = await isOnline();

        //     if (!online) {
        //         console.log('running a task every sec... to check connection... ' + new Date());
        //         console.log("no internet connection..... XXXXXXXXXXXXXXXXXXXXXX0000000000000XXXXXXXXXXXXXXXXXXXX ");
        //     }
        // });

        const myContract = new web3.eth.Contract(CounterAbi, CONTRACT_ADDRESS);

        // works
        myContract.events.MyEvent()
            .on('data', (event) => {
                // console.log('\n event: ====> ', JSON.stringify(event), ' ' + new Date());

                console.log('\n event: ====> ', event.returnValues.index, ' ' + new Date());
                end()
            })
            .on("error", (error) => {
                console.log('\n on error: ====> ', error, ' ' + new Date());
            });



        // works
        // web3.eth.subscribe(
        //     "logs",
        //     {
        //         address: CONTRACT_ADDRESS,
        //     },
        //     (error, result) => {
        //         if (!error) {
        //             console.log("results", result);
        //             // let eventData = iface.decodeEventLog(
        //             //     "MyEvent",
        //             //     result.data,
        //             //     result.topics
        //             // );
        //             // let {
        //             //     sender,
        //             //     index
        //             // } = eventData;
        //             // console.log("MyEvent details ---> " + new Date());

        //             // console.log(
        //             //     sender.toString() + "\n",
        //             //     index.toString() + "\n",
        //             // );
        //         }

        //         console.log("error: ", error);
        //     }
        // )
        //     .on("connected", function (subscriptionId) {
        //         console.log('\n on connected subscriptionId: ====> ', subscriptionId);
        //     })
        //     // .on("data", function (blockHeader) {
        //     //     console.log('\n on data: ====> ', blockHeader);
        //     // })
        //     .on("error", (error) => {
        //         console.log('\n on error: ====> ', error);
        //     });

        // unsubscribes the subscription
        // subscription.unsubscribe(function(error, success){
        //     if (success) {
        //         console.log('Successfully unsubscribed!');
        //     }
        // });

    } catch (error) {
        console.log('\n error: ====> ', error);
    }

}

main()
    .catch((error) => {
        console.error('all error: ', error);
        process.exit(1);
    });


    // 2  Sat May 14 2022 04:37:47
//  event: ====>  7743  Sat May 14 2022 12:13:26 GMT+0530 (India Standard Time)

// running a task every sec... Sat May 14 2022 12:13:38 GMT+0530 (India Standard Time)
// no internet connection..... XXXXXXXXXXXXXXXXXXXXXX0000000000000XXXXXXXXXXXXXXXXXXXX

// --- failed - (as per doc mention more than 120 blocks)



// event: ====>  7791  Sat May 14 2022 12:52:40 GMT+0530 (India Standard Time)
// running a task every sec... Sat May 14 2022 12:52:50 GMT+0530 (India Standard Time)
// no internet connection..... XXXXXXXXXXXXXXXXXXXXXX0000000000000XXXXXXXXXXXXXXXXXXXX

// case 2 : 1+ min
// setIndex...
// currentIndex new :  7793  Sat May 14 2022 12:54:06 GMT+0530 (India Standard Time)


// event: ====>  7792  Sat May 14 2022 12:54:10 GMT+0530 (India Standard Time)

// event: ====>  7793  Sat May 14 2022 12:54:10 GMT+0530 (India Standard Time)



// local
// event: ====>  1  Sat May 14 2022 19:04:38 GMT+0530 (India Standard Time)

// event: ====>  3197  Sat May 14 2022 19:09:29 GMT+0530 (India Standard Time)
// -  stopped with no error (scroll issue)


// event: ====>  1  Sat May 14 2022 19:13:15 GMT+0530 (India Standard Time)
// 12875

// event: ====> 1  Sat May 14 2022 20: 19: 45 GMT + 0530(India Standard Time)
// event: ====>  8231  Sat May 14 2022 20:24:32 GMT+0530 (India Standard Time)


// event: ====>  1  Sat May 14 2022 20:33:43 GMT+0530 (India Standard Time)
// event: ====>  8479  Sat May 14 2022 20:38:29 GMT+0530 (India Standard Time)

// event: ====>  1  Sat May 14 2022 20:46:11 GMT+0530 (India Standard Time)
// event: ====>  8656  Sat May 14 2022 20:50:27 GMT+0530 (India Standard Time)


// event: ====>  1  Sat May 14 2022 20:57:46 GMT+0530 (India Standard Time)
// event: ====>  9135  Sat May 14 2022 21:02:25 GMT+0530 (India Standard Time)

// ...///event: ====>  1  Sun May 15 2022 05:04:20 GMT+0530 (India Standard Time)