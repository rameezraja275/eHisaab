import ACTION from "../types";

const initialState = {
  products: [],
  product_stock: [],
};

const productReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.PRODUCT_GET_SUCCESS:
      return {
        ...state,
        products: payload,
      };
    case ACTION.PRODUCT_STOCK:
      return {
        ...state,
        product_stock: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
