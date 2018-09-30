const BetterMarket = artifacts.require("./BetterMarket.sol");
// const AdPerformance = artifacts.require("./AdPerformance.sol");

module.exports = function(deployer) {
  deployer.deploy(BetterMarket);
  // deployer.deploy(AdPerformance);
};

