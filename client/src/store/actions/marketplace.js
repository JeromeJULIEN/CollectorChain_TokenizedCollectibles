export const INIT_MARKETPLACE = 'INIT_MARKETPLACE';
export const DELETE_ALL_NFTS_TO_SELL = 'DELETE_ALL_NFTS_TO_SELL';
export const SET_PROPERTY_NFTS_TO_SELL = 'SET_PROPERTY_NFTS_TO_SELL';
export const ADD_SELLER = 'ADD_SELLER';

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