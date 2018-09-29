require("dotenv").load();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.mnemonic;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
          return new HDWalletProvider(mnemonic, process.env.ropsten)
      },
      network_id: '3',  // 'ropsten'
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};
