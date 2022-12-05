export const ADD_COLLECTION = 'ADD_COLLECTION';
export const DELETE_ALL_COLLECTIONS = 'DELETE_ALL_COLLECTIONS';
export const SET_PROPERTY_COLLECTION = 'SET_PROPERTY_COLLECTION';
export const SET_DIGITAL_COLLECTION = 'SET_DIGITAL_COLLECTION';

export const setDigitalCollection = (contract) => ({
  type: SET_DIGITAL_COLLECTION,
  contract
});

export const setPropertyCollection = (contract) => ({
  type: SET_PROPERTY_COLLECTION,
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