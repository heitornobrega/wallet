import {
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAIL, ADD_EXPENSES, REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

const filterCurrencies = (action) => {
  delete action.currencies.USDT;
  return Object.keys(action.currencies);
};

const filterExchangeData = (action) => {
  delete action.expenses.exchangeRates.USDT;
  return action.expenses;
};

const removeExpense = (state, action) => {
  const { expenses } = state;
  const noItem = expenses.filter((expense) => expense.id !== Number(action.expenseId));
  return [...noItem];
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY_SUCCESS:
    return { ...state, currencies: filterCurrencies(action) };
  case FETCH_CURRENCY_FAIL:
    return { ...state, currencies: action.error };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, filterExchangeData(action)] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: removeExpense(state, action) };
  default:
    return state;
  }
};

export default wallet;
