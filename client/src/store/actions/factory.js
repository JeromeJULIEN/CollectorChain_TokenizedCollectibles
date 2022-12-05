export const INIT_FACTORY = 'INIT_FACTORY';

// Initialization of all the web3 constants
export const initFactory = (artifact, contract, owner) => ({
  type: INIT_FACTORY,
  artifact,
  contract,
  owner
});