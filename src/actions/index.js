export const LOGIN = 'LOGIN';

export const loginCreator = (userData) => ({
  type: LOGIN,
  userData,
});
