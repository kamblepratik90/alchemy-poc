// import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// import axios from "axios";
// import { ethers } from "ethers";

// import "dotenv/config";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// import axios from "axios";
const { ethers } = require("ethers");

require("dotenv").config();

// let globalABI = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "tradeId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "traderAddress",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "token",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "ErrorInSquareOff",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "previousOwner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "OwnershipTransferred",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//     ],
//     name: "Paused",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "tradeId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "traderAddress",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "enum Position",
//         name: "position",
//         type: "uint8",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "fromToken",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "toToken",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "fromTokenAmount",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "toTokenAmount",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "equity",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "debt",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "enum Leverage",
//         name: "leverage",
//         type: "uint8",
//       },
//       {
//         indexed: false,
//         internalType: "enum Status",
//         name: "tradeStatus",
//         type: "uint8",
//       },
//     ],
//     name: "TradeEventParams",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//     ],
//     name: "Unpaused",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//     ],
//     name: "WhitelistedAddressAdded",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//     ],
//     name: "WhitelistedAddressRemoved",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_addr",
//         type: "address",
//       },
//     ],
//     name: "addAddressToWhitelist",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "_success",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address[]",
//         name: "_addrs",
//         type: "address[]",
//       },
//     ],
//     name: "addAddressesToWhitelist",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "_success",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_token",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "_spender",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_amount",
//         type: "uint256",
//       },
//     ],
//     name: "approveForAdmin",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "c__0x156bec4d",
//         type: "bytes32",
//       },
//     ],
//     name: "c_0x156bec4d",
//     outputs: [],
//     stateMutability: "pure",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "c__0x7ce431cc",
//         type: "bytes32",
//       },
//     ],
//     name: "c_0x7ce431cc",
//     outputs: [],
//     stateMutability: "pure",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         components: [
//           {
//             internalType: "uint256",
//             name: "tradeId",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "traderAddress",
//             type: "address",
//           },
//           {
//             internalType: "enum Position",
//             name: "position",
//             type: "uint8",
//           },
//           {
//             internalType: "address",
//             name: "fromToken",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "toToken",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "fromTokenAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "toTokenAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "equity",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "debt",
//             type: "uint256",
//           },
//           {
//             internalType: "enum Leverage",
//             name: "leverage",
//             type: "uint8",
//           },
//           {
//             internalType: "enum Status",
//             name: "tradeStatus",
//             type: "uint8",
//           },
//         ],
//         internalType: "struct Trade",
//         name: "_trade",
//         type: "tuple",
//       },
//     ],
//     name: "emitTrade",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_holdingAmount",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "_debt",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "_fees",
//         type: "uint256",
//       },
//     ],
//     name: "exactFees",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "pure",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_token",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_debt",
//         type: "uint256",
//       },
//     ],
//     name: "getLeverageFromPool",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_traderAddress",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_tradeId",
//         type: "uint256",
//       },
//     ],
//     name: "getTrade",
//     outputs: [
//       {
//         components: [
//           {
//             internalType: "uint256",
//             name: "tradeId",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "traderAddress",
//             type: "address",
//           },
//           {
//             internalType: "enum Position",
//             name: "position",
//             type: "uint8",
//           },
//           {
//             internalType: "address",
//             name: "fromToken",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "toToken",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "fromTokenAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "toTokenAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "equity",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "debt",
//             type: "uint256",
//           },
//           {
//             internalType: "enum Leverage",
//             name: "leverage",
//             type: "uint8",
//           },
//           {
//             internalType: "enum Status",
//             name: "tradeStatus",
//             type: "uint8",
//           },
//         ],
//         internalType: "struct Trade",
//         name: "",
//         type: "tuple",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_leveragePoolAddress",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "_router",
//         type: "address",
//       },
//     ],
//     name: "init",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "initialize",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         components: [
//           {
//             internalType: "uint256",
//             name: "tradeId",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "traderAddress",
//             type: "address",
//           },
//           {
//             internalType: "enum Status",
//             name: "tradeStatus",
//             type: "uint8",
//           },
//           {
//             internalType: "uint256",
//             name: "fees",
//             type: "uint256",
//           },
//           {
//             internalType: "bytes",
//             name: "encodedCallData",
//             type: "bytes",
//           },
//         ],
//         internalType: "struct LiquidateTrade[]",
//         name: "_liquidateTrades",
//         type: "tuple[]",
//       },
//     ],
//     name: "liquidate",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "pause",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "paused",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_addr",
//         type: "address",
//       },
//     ],
//     name: "removeAddressFromWhitelist",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "_success",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address[]",
//         name: "_addrs",
//         type: "address[]",
//       },
//     ],
//     name: "removeAddressesFromWhitelist",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "_success",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "renounceOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_token",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_debt",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "_fees",
//         type: "uint256",
//       },
//     ],
//     name: "repayToLeveragePool",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_tradeId",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "_fees",
//         type: "uint256",
//       },
//       {
//         internalType: "enum Status",
//         name: "_status",
//         type: "uint8",
//       },
//       {
//         internalType: "bytes",
//         name: "_callData",
//         type: "bytes",
//       },
//     ],
//     name: "squareOffTrade",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes",
//         name: "_callData",
//         type: "bytes",
//       },
//     ],
//     name: "swap",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "",
//         type: "uint256[]",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         components: [
//           {
//             internalType: "uint256",
//             name: "tradeId",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "traderAddress",
//             type: "address",
//           },
//           {
//             internalType: "enum Position",
//             name: "position",
//             type: "uint8",
//           },
//           {
//             internalType: "address",
//             name: "fromToken",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "toToken",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "fromTokenAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "toTokenAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "equity",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "debt",
//             type: "uint256",
//           },
//           {
//             internalType: "enum Leverage",
//             name: "leverage",
//             type: "uint8",
//           },
//           {
//             internalType: "enum Status",
//             name: "tradeStatus",
//             type: "uint8",
//           },
//         ],
//         internalType: "struct Trade",
//         name: "_trade",
//         type: "tuple",
//       },
//       {
//         internalType: "bytes",
//         name: "_callData",
//         type: "bytes",
//       },
//     ],
//     name: "trade",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "transferOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "unpause",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes",
//         name: "_encodedData",
//         type: "bytes",
//       },
//     ],
//     name: "validContractAddress",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "whitelist",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
let globalABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "MyEvent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setIndex",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const WSS = process.env.MATIC_TESTNET_RPC_URL_WSS;;
let iface = new ethers.utils.Interface(globalABI);

async function main() {
  const web3 = createAlchemyWeb3(WSS);
  // // const r = await  web3.eth.getBlockNumber()
  // // console.log('block number', r)

  // const ownerAddr = "0x39E44D2087337994FD841418E70A4CAdB9b00640";
  // const balances = await web3.alchemy.getTokenBalances(ownerAddr, [
  //   "0x43670aD6Ca03BEE64cb21A371EDC062214825dAa",
  // ]);
  // web3.eth.getChainId;
  // console.log("BALANCES->");
  // console.log(balances);

  web3.eth.subscribe(
    "logs",
    {
      address: "0x7F9Ed14A4D05de8A87257654135db1D9cE00FBBa"//"0xDbF96a30e67925B5c0A17FEb203C05bb8C985EfF",
    },
    (error, result) => {
      if (!error) {
        console.log("results", result);
        // let eventData = iface.decodeEventLog(
        //   "TradeEventParams",
        //   result.data,
        //   result.topics
        // );
        let eventData = iface.decodeEventLog(
          "MyEvent",
          result.data,
          result.topics
        );
        let {
          sender,
          index
        } = eventData;
        console.log("MyEvent details");

        console.log(
          sender.toString() + "\n",
          index.toString() + "\n",
        );
        // let {
        //   tradeId,
        //   traderAddress,
        //   position,
        //   fromToken,
        //   toToken,
        //   fromTokenAmount,
        //   toTokenAmount,
        //   equity,
        //   debt,
        //   leverage,
        //   tradeStatus,
        // } = eventData;
        // console.log("trade details");

        // console.log(
        //   tradeId.toString() + "\n",
        //   traderAddress.toString() + "\n",
        //   position + "\n",
        //   fromToken + "\n",
        //   toToken + "\n",
        //   fromTokenAmount.toString() + "\n",
        //   toTokenAmount.toString() + "\n",
        //   equity.toString() + "\n",
        //   debt.toString() + "\n",
        //   leverage,
        //   tradeStatus
        // );
      }

      console.log("error", error);
    }
  );

  //     var data = {
  //         "jsonrpc": "2.0",
  //         "id": 0,
  //         "method": "alchemy_getAssetTransfers",
  //         "params": [
  //           {

  //             "fromAddress": "0x39E44D2087337994FD841418E70A4CAdB9b00640",

  //             "category": [
  //                 "erc20",
  //                 "erc1155",

  //               "token"
  //             ]
  //           }
  //         ]
  //     };

  // const response = await axios({
  //     url: nodeURL,
  //     method: 'POST',
  //     data: data,
  //     headers:{'Content-Type': 'application/json'}
  // })

  //   console.log(JSON.stringify(response.data, null, 2));
}

main();
