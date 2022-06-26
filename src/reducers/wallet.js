import {
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAIL, ADD_EXPENSES, REMOVE_EXPENSE, EDIT_EXPENSE,
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

const removeExpense = (action, state) => {
  const { expenses } = state;
  const noItem = expenses.filter((expense) => expense.id !== Number(action.expenseId));
  return [...noItem];
};

const updateExpense = (action, state) => {
  const arr = state.expenses.map((expense) => {
    if (expense.id === action.expenseId) {
      expense = action.editedExpense;
    }
    return expense;
  });
  return arr;
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
    return { ...state, expenses: removeExpense(action, state) };
  case EDIT_EXPENSE:
    return { ...state, expenses: updateExpense(action, state) };
  default:
    return state;
  }
};

export default wallet;
