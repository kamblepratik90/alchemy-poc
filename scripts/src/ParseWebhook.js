const TYPE = "ADDRESS_ACTIVITY";
const NETWORK_MUMBAI = "MATIC_MUMBAI";
const WEBHOOK_ID = 'wh_8zyqu4zu9z0frm0n';

async function decodeAddressActivity(req, res, next) {
    const body = req.body;
    // if (body.webhookId == WEBHOOK_ID && body.type == TYPE) {
    if (body.type == TYPE) {

        console.log(body);
        console.log(body.event);
        if (body.event.activity) {
            body.event.activity.forEach(entry => {

                if (entry.category == 'erc1155') {

                    console.log(JSON.stringify(entry))
                    console.log('erc1155Metadata: ', JSON.stringify(entry.erc1155Metadata))
                    console.log('log: ', JSON.stringify(entry.log))
                    console.log('rawContract: ', entry.rawContract);

                } else if (entry.category === 'external') {
                    // let {
                    //     fromAddress,
                    //     toAddress,
                    //     blockNum,
                    //     hash,
                    //     value,
                    //     asset,
                    //     category
                    // } = entry;

                    // console.log('fromAddress: ', fromAddress);
                    // console.log('toAddress: ', toAddress);
                    // console.log('blockNum: ', blockNum);
                    // console.log('hash: ', hash);
                    // console.log('value: ', value);
                    // console.log('asset: ', asset);
                    // console.log('category: ', category);
                    console.log('rawContract: ', entry.rawContract);
                } else {
                    console.log(JSON.stringify(entry))
                }

            });
        } else {
            console.log('ignore webhook.. activity missing... may be test response...: ', JSON.stringify(req.body));
        }
    } else {
        console.log('ignore webhook..');
    }
    return res.send(req.body);
}

module.exports = {
    decodeAddressActivity
}