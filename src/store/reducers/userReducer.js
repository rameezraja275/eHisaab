import ACTION from "../types";

const initialState = {
  userStatus: null,
  users: [],
  currentUser: {},
  owner: {},
  token: "",
  newUser: false,
  notifications: [],
  index: 0,
  token_expiry: ""
};

const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTION.USER_STATUS:
      return {
        ...state,
        userStatus: payload,
      };
    case ACTION.TOKEN_EXPIRY:
      return {
        ...state,
        token_expiry: payload,
      };
    case ACTION.TOKEN:
      return {
        ...state,
        token: payload,
      };
    case ACTION.OWNER:
      return {
        ...state,
        owner: payload,
      };
    case ACTION.NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
      };
    case ACTION.USERS_GET:
      return {
        ...state,
        users: payload,
      };
    case ACTION.USER_GET:
      return {
        ...state,
        currentUser: payload,
      };
    case ACTION.NEW_USER:
      return {
        ...state,
        newUser: payload,
      };
    case ACTION.SALE_LIST_INDEX:
      return {
        ...state,
        index: payload
      }
    case ACTION.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
