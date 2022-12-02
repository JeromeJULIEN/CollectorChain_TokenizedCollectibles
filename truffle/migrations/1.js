const Factory = artifacts.require("Factory");
const CollectorsDAO = artifacts.require("CollectorsDAO");
const MarketPlace = artifacts.require("MarketPlace")

module.exports = function (deployer) {
  deployer.deploy(Factory);
  deployer.deploy(CollectorsDAO);
  deployer.deploy(MarketPlace);
};
