export const LOGIN = 'LOGIN';
export const SET_ADMIN = 'SET_ADMIN';

export const setAdmin = (payload) => ({
  type: SET_ADMIN,
  payload
});

export const login = (payload) => ({
  type: LOGIN,
  payload
});