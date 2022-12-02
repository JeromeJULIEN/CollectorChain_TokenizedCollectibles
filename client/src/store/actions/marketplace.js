export const INIT_MARKETPLACE = 'INIT_MARKETPLACE';

// Initialization of all the web3 constants
export const initMarketplace = (artifact, web3, accounts, networkID, contract) => ({
  type: INIT_MARKETPLACE,
  artifact,
  web3,
  accounts,
  networkID,
  contract
});