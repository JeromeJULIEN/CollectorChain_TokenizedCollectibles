export const INIT_WEB3 = 'INIT_WEB3';

// Initialization of all the web3 constants
export const initWeb3 = (web3, accounts, networkID) => ({
  type: INIT_WEB3,
  web3,
  accounts,
  networkID,
});