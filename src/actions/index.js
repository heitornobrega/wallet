import getCurrencies from '../services/requestAPI';

export const LOGIN = 'LOGIN';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_FAIL = 'FETCH_CURRENCY_FAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const loginCreator = (userData) => ({
  type: LOGIN,
  userData,
});

export const fetchCurrencySuccess = (currencies) => ({
  type: FETCH_CURRENCY_SUCCESS,
  currencies,
});

export const fetchCurrencyFail = (err) => ({
  type: FETCH_CURRENCY_FAIL,
  error: err,
});

export const currencyCreator = async (dispatch) => {
  try {
    const resultOfRequest = await getCurrencies();
    return dispatch(fetchCurrencySuccess(resultOfRequest));
  } catch (error) {
    return dispatch(fetchCurrencyFail(error));
  }
};

export const expensesCreator = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

// export const expensesCreator2 = async (dispatch) => {
//   try {
//     const resultOfRequest = await getCurrencies();
//     return dispatch(expensesCreator(expenses))
//   } catch (error) {
//   }
// }
