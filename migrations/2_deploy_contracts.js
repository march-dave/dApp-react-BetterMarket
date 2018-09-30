const BetterMarket = artifacts.require("./BetterMarket.sol");
// const SmartPay = artifacts.require("./SmartPay.sol");

module.exports = function(deployer) {
  deployer.deploy(BetterMarket);
  // deployer.deploy(SmartPay);
};

