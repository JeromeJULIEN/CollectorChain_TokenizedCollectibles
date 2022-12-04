const Factory = artifacts.require("Factory");
const CollectorsDAO = artifacts.require("CollectorsDAO");
const MarketPlace = artifacts.require("MarketPlace")

module.exports = function (deployer) {
  deployer.deploy(CollectorsDAO).then(function() {
    return deployer.deploy(Factory, CollectorsDAO.address);
  });
  deployer.deploy(MarketPlace);
};
