import ACTION from "../types";

const initialState = {
  saleReport: [],
  purchaseReport: [],
  purchaseDetails: [],
  saleDetail: [],
  expneseReport: [],
  employeeReport: [],
  profitNlossStatement: {},
  daybook: {},
  cashbook: {},
};

const reportReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.SALE_REPORT:
      return {
        ...state,
        saleReport: payload,
      };
    case ACTION.PURCHASE_REPORT:
      return {
        ...state,
        purchaseReport: payload,
      };
    case ACTION.PURCHASE_DEATIL_REPORT:
      return {
        ...state,
        purchaseDetails: payload,
      };
    case ACTION.SALE_DEATIL_REPORT:
      return {
        ...state,
        saleDetail: payload,
      };
    case ACTION.EXPENSE_REPORT:
      return {
        ...state,
        expneseReport: payload,
      };
    case ACTION.EMPLOYEE_REPORT:
      return {
        ...state,
        employeeReport: payload,
      };
    case ACTION.PROFIT_LOSS:
      return {
        ...state,
        profitNlossStatement: payload,
      };
    case ACTION.DAYBOOK:
      return {
        ...state,
        daybook: payload,
      };
    case ACTION.CASHBOOK:
      return {
        ...state,
        cashbook: payload,
      };
    default:
      return state;
  }
};

export default reportReducer;
