export const INIT_DAO = 'INIT_DAO';

// Initialization of all the web3 constants
export const initDAO = (artifact, web3, accounts, networkID, contract) => ({
  type: INIT_DAO,
  artifact,
  web3,
  accounts,
  networkID,
  contract
});