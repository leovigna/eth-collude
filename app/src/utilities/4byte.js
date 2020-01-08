const request = require('request-promise-native');

//0x0ff4c916 getValue(uint256)
async function ethFuncSig(hexSignature) {
    const response = await request({
        url: 'https://www.4byte.directory/api/v1/signatures', 
        qs: {hex_signature: hexSignature},
        json: true})

    if (!response) { return null; }

    const { results } = response;

    return results[0]
}


async function main() {
    const data = await ethFuncSig("0x0ff4c916")
    console.log(data)
}

main()