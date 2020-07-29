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
};

const businessReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.BUSINESS_GET_SUCCESS:
      return {
        ...state,
        bussiness: payload,
      };
    default:
      return state;
  }
};

export default businessReducer;
