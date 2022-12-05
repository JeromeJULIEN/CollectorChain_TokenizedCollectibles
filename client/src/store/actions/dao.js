export const INIT_DAO = 'INIT_DAO';
export const DELETE_PROPOSAL = 'DELETE_PROPOSAL';
export const ADD_DAO = 'ADD_DAO';
export const ADD_PROPOSAL = 'ADD_PROPOSAL';
export const DELETE_DAO = 'DELETE_DAO';
export const UPDATE_PROPOSAL = 'UPDATE_PROPOSAL';

export const updateProposal = (proposalId, finalValue, status) => ({
  type: UPDATE_PROPOSAL,
  proposalId,
  finalValue,
  status
});

export const deleteDao = () => ({
  type: DELETE_DAO
});

export const addProposal = (collectionId, proposalId, proposalName, proposalDesc, proposalValue) => ({
  type: ADD_PROPOSAL,
  collectionId,
  proposalId,
  proposalName,
  proposalDesc,
  proposalValue
});

export const addDao = (daoId, daoName) => ({
  type: ADD_DAO,
  daoId,
  daoName
});

export const deleteProposal = () => ({
  type: DELETE_PROPOSAL
});

// Initialization of all the web3 constants
export const initDAO = (artifact, contract, owner) => ({
  type: INIT_DAO,
  artifact,
  contract,
  owner
});