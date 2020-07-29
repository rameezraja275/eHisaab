import ACTION from "../types";

const initialState = {
  loading: {
    state: false,
    type: null,
  },
  goback: false,
  language: "0",
};

const commonReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ACTION.LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
