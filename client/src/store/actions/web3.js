export const INIT_WEB3 = 'INIT_WEB3';
export const CONNECT_ACCOUNTS = 'CONNECT_ACCOUNTS';

export const connectAccounts = (payload) => ({
  type: CONNECT_ACCOUNTS,
  payload
});

// Initialization of all the web3 constants
export const initWeb3 = (web3, networkID) => ({
  type: INIT_WEB3,
  web3,
  networkID,
});
