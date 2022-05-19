const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// import axios from "axios";
const { ethers } = require("ethers");
var cron = require('node-cron');
const isOnline = require('is-online');

require("dotenv").config();

const CounterAbi =
    require("../artifacts/contracts/Counter.sol/Counter.json").abi;

const WSS = process.env.MATIC_TESTNET_RPC_URL_WSS;
let iface = new ethers.utils.Interface(CounterAbi);

async function main() {

    console.log('start tx monitoring...');
    const web3 = createAlchemyWeb3(WSS);

    cron.schedule("*/10 * * * * *", async function () {

        let online = await isOnline();

        if (!online) {
            console.log('running a task every sec... to check connection... ' + new Date());
            console.log("no internet connection..... XXXXXXXXXXXXXXXXXXXXXX0000000000000XXXXXXXXXXXXXXXXXXXX ");
        }
    });

    // web3.eth.subscribe(
    //     "logs",
    //     {
    //         address: "0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa",
    //     },
    //     (error, result) => {
    //         if (!error) {
    //             console.log("results", result);
    //             let eventData = iface.decodeEventLog(
    //                 "MyEvent",
    //                 result.data,
    //                 result.topics
    //             );
    //             let {
    //                 sender,
    //                 index
    //             } = eventData;
    //             console.log("MyEvent details ---> " + new Date());

    //             console.log(
    //                 sender.toString() + "\n",
    //                 index.toString() + "\n",
    //             );
    //         }

    //         console.log("error", error);
    //     }
    // );

    // Many web3.js methods return promises.
    // await web3.eth.getBlock("latest").then((block) => {
    //     /* … */
    //     console.log('block: ', block);
    // });

    web3.eth.subscribe('newBlockHeaders', function (error, result) {
        if (!error) {

            // Update balance
            addresses.forEach(address => {

                web3.eth.getBalance(address, (err, bal) => {
                    if (err) {
                        console.log(`getBalance error: ${err}`);
                    } else {
                        balance = bal;
                        console.log(`Balance [${address}]: ${(balance)}`);
                    }
                });
            });
            // console.log('\n result ===> ', result);

            return;
        }

        console.error(error);
    })
        .on("connected", function (subscriptionId) {
            console.log('\n on connected subscriptionId: ====> ', subscriptionId);
        })
        .on("data", function (blockHeader) {
            // console.log('\n on data: ====> ', blockHeader);
        })
        .on("error", console.error);

    // unsubscribes the subscription
    // subscription.unsubscribe(function(error, success){
    //     if (success) {
    //         console.log('Successfully unsubscribed!');
    //     }
    // });

    const addresses = ["0x45B88cE0844F7BF2F6D466CF921a98F1Fb487f7D",
        "0x12C65BF8023b36D28c723A74fd6B4AfeFE697940"];

    // let balance = web3.eth.getBalance(address);

    // const filter = web3.eth.filter('latest');
    // filter.watch((err, res) => {
    //     if (err) {
    //         console.log(`Watch error: ${err}`);
    //     } else {
    //         // Update balance
    //         web3.eth.getBalance(address, (err, bal) => {
    //             if (err) {
    //                 console.log(`getBalance error: ${err}`);
    //             } else {
    //                 balance = bal;
    //                 console.log(`Balance [${address}]: ${web3.fromWei(balance, "ether")}`);
    //             }
    //         });
    //     }
    // });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

//     wscat -c wss://polygon-mumbai.g.alchemy.com/v2/pppmw5Gbc2cJS5BLPKnIYsSJd_8Y7cUF
// {"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x4d41c33628b579F2156dDD7D25f352FaC7aB1FaC", "topics": ["0xdf50c7bb3b25f812aedef81bc334454040e7b27e27de95a79451d663013b7e17"]}]}
