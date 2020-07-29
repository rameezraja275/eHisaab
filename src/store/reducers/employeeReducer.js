import ACTION from "../types";

const initialState = {
  employees: [],
  transactions: [],
  employeeTransactions: [],
};

const employeeReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.EMPLOYEES_GET:
      return {
        ...state,
        employees: payload,
      };
    case ACTION.TRANSACTIONS_GET:
      return {
        ...state,
        transactions: payload,
      };
    case ACTION.EMPLOYEE_TRANSACTION_GET:
      return {
        ...state,
        employeeTransactions: payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
