const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// import axios from "axios";
const { ethers } = require("ethers");
var cron = require('node-cron');
const isOnline = require('is-online');

require("dotenv").config();

const ERC20Abi =
    require("../scripts/abi/erc20.json");

const WSS = process.env.MATIC_TESTNET_RPC_URL_WSS;
let iface = new ethers.utils.Interface(ERC20Abi.abi);

async function main() {

    console.log('start tx monitoring...');
    const web3 = createAlchemyWeb3(WSS);

    // cron.schedule("*/1 * * * * *", async function () {

    //     let online = await isOnline();

    //     if (!online) {
    //         console.log('running a task every sec... to check connection... ' + new Date());
    //         console.log("no internet connection..... XXXXXXXXXXXXXXXXXXXXXX0000000000000XXXXXXXXXXXXXXXXXXXX ");
    //     }
    // });

    web3.eth.subscribe(
        "logs",
        {
            // address: ["0xfff0b24cd88d6b5c94c0252aea65119df1e00453", //arch
            //     "0x833176cd872e301835f03e3b92035fefbe79bfa1"], // arch-dai
            address: "0x0000000000000000000000000000000000001010",
        },
        (error, result) => {
            if (!error) {
                console.log("results", result);
                // Transfer(address from, address to, uint256 value)
                // let eventData = iface.decodeEventLog(
                //     "Transfer",
                //     result.data,
                //     result.topics
                // );
                // let {
                //     from,
                //     to,
                //     value
                // } = eventData;
                // console.log("Transfer event details ---> " + new Date());

                // console.log(
                //     from.toString() + "\n",
                //     to.toString() + "\n",
                //     value.toString() + "\n",
                // );
            }

            console.log("error", error);
        }
    );

    // unsubscribes the subscription
    // subscription.unsubscribe(function(error, success){
    //     if (success) {
    //         console.log('Successfully unsubscribed!');
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
