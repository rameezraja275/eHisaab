import ACTION from "../types";

const initialState = {
  customers: [],
  transaction: [],
};

const customerReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.CUSTOMER_GET_SUCCESS:
      return {
        ...state,
        customers: payload,
      };
    case ACTION.CUSTOMER_HISTORY:
      return {
        ...state,
        transaction: payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
