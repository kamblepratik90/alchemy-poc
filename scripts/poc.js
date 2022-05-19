const { ethers } = require('ethers');
const axios = require('axios').default;
require('dotenv').config();


const nodeURL = process.env.LOCAL_RPC_URL;
const ws = process.env.LOCAL_RPC_URL_WSS;



async function main() {
    // const provider =
    // new ethers.providers.JsonRpcProvider(https);

    // const response = await provider.getBlockNumber('latest');
    // console.log(response);
    console.log('url', nodeURL);
    const response = await axios({
        url: nodeURL,
        method: 'POST',
        // data: { "jsonrpc": "2.0", "method": "eth_gasPrice", "params": [], "id": 500 },
        data: { "method": "eth_chainId", "params": [], "id": 2, "jsonrpc": "2.0" },
        headers: { 'Content-Type': 'application/json' }
    })
    console.log(' response', response.data)

}

main()

