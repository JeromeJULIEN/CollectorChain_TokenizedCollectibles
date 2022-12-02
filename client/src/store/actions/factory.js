export const INIT_FACTORY = 'INIT_FACTORY';

// Initialization of all the web3 constants
export const initFactory = (artifact, web3, accounts, networkID, contract) => ({
  type: INIT_FACTORY,
  artifact,
  web3,
  accounts,
  networkID,
  contract
});