export const ADD_COLLECTION = 'ADD_COLLECTION';
export const DELETE_ALL_COLLECTIONS = 'DELETE_ALL_COLLECTIONS';
export const SET_COLLECTION = 'SET_COLLECTION';

export const setCollection = (contract) => ({
  type: SET_COLLECTION,
  contract
});

export const deleteAllCollections = () => ({
  type: DELETE_ALL_COLLECTIONS
});

export const addCollection = (name, propertyAddress, digitalAddress) => ({
  type: ADD_COLLECTION,
  name,
  propertyAddress,
  digitalAddress
});