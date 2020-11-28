import ACTION from "../types";

const initialState = {
  bussiness: {
    name: null,
    phone: null,
    logo: null,
    address: null,
    user_id: null,
    id: null,
  },
  categories: []
};

const businessReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.BUSINESS_GET_SUCCESS:
      return {
        ...state,
        bussiness: payload,
      };
    case ACTION.BUSINESS_GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    default:
      return state;
  }
};

export default businessReducer;
