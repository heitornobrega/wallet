import { FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_FAIL, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

const filterCurrencies = (action) => {
  const allCurrencies = [Object.keys(action.currencies)][0];
  const ustdIndex = allCurrencies.indexOf('USDT');
  return [
    ...allCurrencies.slice(0, ustdIndex),
    ...allCurrencies.slice(ustdIndex + 1, allCurrencies.length),
  ];
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY_SUCCESS:
    return { ...state, currencies: filterCurrencies(action) };
  case FETCH_CURRENCY_FAIL:
    return { ...state, currencies: action.error };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
};

export default wallet;
