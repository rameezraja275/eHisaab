import ACTION from "../types";

const initialState = {
  receipts: [],
  receipt: {},
};

const receiptReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.RECEIPT_GET_SUCCESS:
      return {
        ...state,
        receipts: payload,
      };
    case ACTION.RECEIPT_GET:
      return {
        ...state,
        receipt: payload,
      };
    default:
      return state;
  }
};

export default receiptReducer;
