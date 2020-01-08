const path = require("path");

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
      }
  }
};
