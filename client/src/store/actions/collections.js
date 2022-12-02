export const ADD_COLLECTION = 'ADD_COLLECTION';
export const DELETE_ALL_COLLECTIONS = 'DELETE_ALL_COLLECTIONS';

export const deleteAllCollections = () => ({
  type: DELETE_ALL_COLLECTIONS
});

export const addCollection = (name, propertyAddress, digitalAddress) => ({
  type: ADD_COLLECTION,
  name,
  propertyAddress,
  digitalAddress
});