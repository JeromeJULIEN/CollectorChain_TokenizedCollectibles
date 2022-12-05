export const INIT_MARKETPLACE = 'INIT_MARKETPLACE';

// Initialization of all the web3 constants
export const initMarketplace = (artifact, contract, owner) => ({
  type: INIT_MARKETPLACE,
  artifact,
  contract,
  owner
});