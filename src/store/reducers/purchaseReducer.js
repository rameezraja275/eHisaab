import ACTION from "../types";

const initialState = {
  Transactions: [],
  purchaseCart: [],
  discount: null,
  purchaseData: {
    date: new Date(),
    paid_amount: null,
    supplier_id: null,
    narration: null,
    purchase_id: null,
  },
  cartStatus: {
    totalPrice: 0,
    totalItem: 0,
  },
};

const purchaseReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.PURCHASE_TRANSACTIONS:
      return {
        ...state,
        Transactions: payload,
      };
    case ACTION.ADD_ITEM_PURCHASE_CART:
      return {
        ...state,
        purchaseCart: payload,
      };
    case ACTION.PURCHASE_CART_STATUS:
      return {
        ...state,
        cartStatus: payload,
      };
    case ACTION.ADD_DISCOUNT_PURCHASE:
      return {
        ...state,
        discount: payload,
      };
    case ACTION.PURCHASE_DEATILS:
      return {
        ...state,
        purchaseData: payload,
      };
    case ACTION.RESET_PURCHASE_CART:
      return {
        ...state,
        purchaseCart: [],
        discount: null,
        purchaseData: {
          date: new Date(),
          paid_amount: null,
          supplier_id: null,
          narration: null,
        },
        cartStatus: {
          totalPrice: 0,
          totalItem: 0,
        },
      };
    default:
      return state;
  }
};

export default purchaseReducer;
