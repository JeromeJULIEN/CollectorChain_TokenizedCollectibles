export const LOGIN = 'LOGIN';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_USER_PROPERTY_NFTS = 'SET_USER_PROPERTY_NFTS';
export const SET_USER_DIGITAL_NFTS = 'SET_USER_DIGITAL_NFTS';
export const DELETE_ALL_USER_NFTS = 'DELETE_ALL_USER_NFTS';

export const deleteAllUserNfts = () => ({
  type: DELETE_ALL_USER_NFTS
});

export const setUserDigitalNfts = (collectionId,nftId,name) => ({
  type: SET_USER_DIGITAL_NFTS,
  collectionId,
  nftId,
  name
});

export const setUserPropertyNfts = (collectionId, nftId, nftName, value,balance) => ({
  type: SET_USER_PROPERTY_NFTS,
  collectionId,
  nftId,
  nftName,
  value,
  balance
});

export const setAdmin = (payload) => ({
  type: SET_ADMIN,
  payload
});

export const login = (payload) => ({
  type: LOGIN,
  payload
});