const Factory = artifacts.require("Factory");
const CollectorsDAO = artifacts.require("CollectorsDAO");
const MarketPlace = artifacts.require("MarketPlace")

module.exports = function (deployer) {
  deployer.deploy(CollectorsDAO).then(function() {
    console.log('dao contract deployed');
    return deployer.deploy(Factory, CollectorsDAO.address);
  });
  deployer.deploy(MarketPlace);
};
