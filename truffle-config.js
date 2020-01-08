if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require("path");
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "app/src/contracts"),
    networks: {
        development: {
            protocol: 'http',
            host: 'localhost',
            port: 7545,
            gas: 6721975,
            gasPrice: 0,
            networkId: '5777',
        },
        ropsten: {
            gas: 6721975,
            gasPrice: 5000000000,
            provider: function () {
                return new HDWalletProvider(process.env.ROPSTEN_HD_WALLET_MNEMONIC, "https://ropsten.infura.io/v3/44711775475648ad959d36b45e5452bf");
            },
            network_id: '3',
        },
        mainnet: {
            gas: 6721975,
            gasPrice: 5000000000,
            provider: function () {
                return new HDWalletProvider(process.env.MAINNET_HD_WALLET_MNEMONIC, "https://mainnet.infura.io/v3/44711775475648ad959d36b45e5452bf");
            },
            network_id: '*',
        }
    },
    compilers: {
        solc: {
            version: "0.5.15", // A version or constraint - Ex. "^0.5.0"
            parser: "solcjs",  // Leverages solc-js purely for speedy parsing
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200   // Optimize for how many times you intend to run the code
                },
                evmVersion: "petersburg"
            }
        }
    }
}

//VTJT2PIGAHIQ6HU4NV1PHF47P8VEYQSFX2