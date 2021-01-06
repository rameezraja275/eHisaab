import ACTION from "../types";

const initialState = {
  Transactions: [],
  saleCart: [],
  discount: null,
  cartStatus: {
    totalPrice: 0,
    totalItem: 0,
  },
  saleData: {
    date: new Date(),
    paid_amount: null,
    customer_id: null,
    narration: null,
    sale_id: null,
  },
};

const saleReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.SALE_TRANSACTIONS:
      return {
        ...state,
        Transactions: payload,
      };
    case ACTION.ADD_ITEM_SALE_CART:
      return {
        ...state,
        saleCart: payload,
      };
    case ACTION.SALE_CART_STATUS:
      return {
        ...state,
        cartStatus: payload,
      };
    case ACTION.SALE_DEATILS:
      console.log("this si data", payload)
      return {
        ...state,
        saleData: payload,
      };
    case ACTION.ADD_DISCOUNT_SALE:
      return {
        ...state,
        discount: payload,
      };
    case ACTION.RESET_SALE_CART:
      return {
        ...state,
        saleCart: [],
        discount: null,
        cartStatus: {
          totalPrice: 0,
          totalItem: 0,
        },
        saleData: {
          date: new Date(),
          paid_amount: null,
          customer_id: null,
          narration: null,
        },
      };
    default:
      return state;
  }
};

export default saleReducer;
