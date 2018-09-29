const BetterMarket = artifacts.require("./BetterMarket.sol");

module.exports = function(deployer) {
  deployer.deploy(BetterMarket);
};
