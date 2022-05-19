const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const axios = require("axios");
const { ethers } = require("ethers");
const Moralis = require('moralis/node');

require("dotenv").config();

const CounterAbi =
    require("../artifacts/contracts/Counter.sol/Counter.json").abi;

const WSS = process.env.MATIC_TESTNET_RPC_URL_WSS;
const RPC_URL = process.env.MATIC_TESTNET_RPC_URL;
let iface = new ethers.utils.Interface(CounterAbi);

async function main() {

    console.log('start tx monitoring...');
    const web3 = createAlchemyWeb3(WSS);

    // // The wallet address / token we want to query for:
    const ownerAddr = "0x45B88cE0844F7BF2F6D466CF921a98F1Fb487f7D";
    // const balances = await web3.alchemy.getTokenBalances(ownerAddr, [
    //     "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F", // DAI
    //     "0xfFf0b24cd88D6B5C94c0252AEa65119dF1e00453", // ARCH
    // ])

    // console.log("ERC20 BALANCES->");
    // console.log(balances);

    // var nativeBal = await web3.eth.getBalance(ownerAddr);

    // console.log("NATIVE BALANCES->");
    // console.log(nativeBal);

    // let data = {
    //     "jsonrpc": "2.0",
    //     "method": "eth_getBalance",
    //     "params": [
    //         ownerAddr,
    //         "pending" // TAG - integer block number, or the string "latest", "earliest" or "pending"
    //     ],
    //     "id": 0
    // }

    // const response = await axios({
    //     url: RPC_URL,
    //     method: 'POST',
    //     data: data,
    //     headers: { 'Content-Type': 'application/json' }
    // })

    // console.log(JSON.stringify(response.data, null, 2));
    // console.log(response.data.result.toString());

    // verify address conrect or account
    // let result = await web3.eth.getCode("0x45b88ce0844f7bf2f6d466cf921a98f1fb487f7d")
    // console.log('result 0: ', result)

    // 0x7518987e25ab340f8c6c746896a08af18a716aa6dd78373f939d5eef570417df

    // result = await web3.eth.getCode("0x3e4a33546bed4207f030f0183734ecce2df07cad")
    // console.log('result 1: ', result)

    // 0x11eacf0a61137ab558670568f2516232fab926c8bce6594ee1f09a911ccbbee0
    // 0xe44fa9a5f6778e3f126711c1781dae3f7a66d1220e704f0ff2a6dbc58210b95a
    // let tx = await web3.eth.getTransaction('0x11eacf0a61137ab558670568f2516232fab926c8bce6594ee1f09a911ccbbee0')
    // console.log('tx: ', tx)
    // let input = '0xa9059cbb000000000000000000000000d3282040fa7edd4a54d2bdf1aa69e5b045f5de5b00000000000000000000000000000000000000000000000000d529ae9e860000';
    // // let data = await web3.eth.abi.decodeParameters([{
    // //     type: 'address',
    // //     name: 'recipient'
    // // }, {
    // //     type: 'uint256',
    // //     name: 'amount'
    // // }], `0x${input.substring(10)}`)

    // let data = await web3.eth.abi.decodeParameters(['address', 'uint256'], `0x${input.substring(10)}`)

    // let data = await web3.eth.abi.decodeParameters(
    //     // ERC20 transfer method args
    //     [
    //         { name: 'recipient', type: 'address' },
    //         { name: 'amount', type: 'uint256' },
    //     ],
    //     `0x${input.substring(10)}`
    // );
    // console.log('recipient: ', data)
    // console.log('recipient: ', data.recipient, ' amount: ',data.amount)


    /* Moralis init code */
    const serverUrl = "https://rztidw1fvphm.usemoralis.com:2053/server";
    const appId = "TJ6GCIATyv0Zyfa1LSQceB3b5BNonFDkgZ2iehyp";
    const moralisSecret = "PwmxhBclCV7K2aECItYppOS3cYaHsrRdwzPXrBMsnW2nUojsvDhOLWecJ56iRxC4";

    await Moralis.start({ serverUrl, appId, moralisSecret });

    const options = {
        chain: "mumbai",
        address: ownerAddr,
        // to_block: "10253391",
    };
    const balances = await Moralis.Web3API.account.getTokenBalances(options);

    console.log("ERC20 BALANCES->");
    console.log(balances);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const ERC20_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_totalSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
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
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "c__0x5f39f408",
                "type": "bytes32"
            }
        ],
        "name": "c_0x5f39f408",
        "outputs": [],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

//     wscat -c wss://polygon-mumbai.g.alchemy.com/v2/pppmw5Gbc2cJS5BLPKnIYsSJd_8Y7cUF
// {"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x4d41c33628b579F2156dDD7D25f352FaC7aB1FaC", "topics": ["0xdf50c7bb3b25f812aedef81bc334454040e7b27e27de95a79451d663013b7e17"]}]}
