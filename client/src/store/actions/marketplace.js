export const INIT_MARKETPLACE = 'INIT_MARKETPLACE';
export const DELETE_ALL_NFTS_TO_SELL = 'DELETE_ALL_NFTS_TO_SELL';
export const SET_PROPERTY_NFTS_TO_SELL = 'SET_PROPERTY_NFTS_TO_SELL';
export const ADD_SELLER = 'ADD_SELLER';
export const DELETE_TRANSACTION_COUNT = 'DELETE_TRANSACTION_COUNT';
export const INCREMENT_TRANSACTION_COUNT = 'INCREMENT_TRANSACTION_COUNT';
export const DELETE_FEES = 'DELETE_FEES';
export const ADD_FEES = 'ADD_FEES';
export const UPDATE_QUANTITY_TO_SELL = 'UPDATE_QUANTITY_TO_SELL';

export const updateQuantityToSell = (collectionId,nftId,seller,quantity) => ({
  type: UPDATE_QUANTITY_TO_SELL,
  collectionId,
  nftId,
  seller,
  quantity
});

export const addFees = (payload) => ({
  type: ADD_FEES,
  payload
});

export const deleteFees = () => ({
  type: DELETE_FEES
});

export const incrementTransactionCount = () => ({
  type: INCREMENT_TRANSACTION_COUNT
});

export const deleteTransactionCount = () => ({
  type: DELETE_TRANSACTION_COUNT
});

export const addSeller = (collectionId, nftId,seller,quantity,price) => ({
  type: ADD_SELLER,
  collectionId,
  nftId,
  seller,
  quantity,
  price
});

export const setPropertyNftsToSell = (collectionId, nftId, name,image) => ({
  type: SET_PROPERTY_NFTS_TO_SELL,
  collectionId,
  nftId,
  name,
  image
});

export const deleteAllNftsToSell = () => ({
  type: DELETE_ALL_NFTS_TO_SELL
});

// Initialization of all the web3 constants
export const initMarketplace = (artifact, contract, owner) => ({
  type: INIT_MARKETPLACE,
  artifact,
  contract,
  owner
});