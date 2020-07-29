import ACTION from "../types";

const initialState = {
  expenses: [],
  expensesCategories: [],
  categoryTransactions: [],
};

const expenseReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.EXPENSE_TRANSACTION_GET:
      return {
        ...state,
        expenses: payload,
      };
    case ACTION.EXPENSE_CATEGORIES_GET:
      return {
        ...state,
        expensesCategories: payload,
      };
    case ACTION.EXPENSE_CATEGORIES_TRANSACTION_GET:
      return {
        ...state,
        categoryTransactions: payload,
      };
    default:
      return state;
  }
};

export default expenseReducer;
