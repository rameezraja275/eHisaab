import ACTION from "../types";

const initialState = {
  suppliers: [],
  transaction: [],
};

const supplierReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.SUPPLIER_GET_SUCCESS:
      return {
        ...state,
        suppliers: payload,
      };
    case ACTION.SUPPLIER_HISTORY:
      return {
        ...state,
        transaction: payload,
      };
    default:
      return state;
  }
};

export default supplierReducer;
