import ACTION from "../types";

const initialState = {
  payments: [],
};

const paymentReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.PAYMENT_GET_SUCCESS:
      return {
        ...state,
        payments: payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
