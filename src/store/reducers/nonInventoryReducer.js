import ACTION from "../types";

const initialState = {
  nonInventoryItems: [],
};

const nonInventoryReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.NON_INVENTORY_PRODUCT:
      return {
        ...state,
        nonInventoryItems: payload,
      };

    default:
      return state;
  }
};

export default nonInventoryReducer;
