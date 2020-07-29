import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import { productGet } from "../actions/product";
import constants from "../../utils/constants";

const navigation = (user_status, dispatch) => {
  const { UNVERIFED_USER, PAYMENT_DUE_USER, ACTIVE_USER } = constants;

  if (user_status == UNVERIFED_USER) {
    navigate("Verfication");
  } else if (user_status == PAYMENT_DUE_USER) {
    navigate("ChangePassword");
  } else if (user_status == ACTIVE_USER) {
    dispatch(productGet(0));
    navigate("Drawer");
  }
};

export const requestVerificationCode = (email) => {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    const body = {
      email,
    };
    const language = getState().common.language;

    axios
      .post(`${API.BASE_URL}${API.FORGET_PASSWORD}`, body, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("VERFICATION_CODE_SENT", "success", language);
        setTimeout(() => navigate("ChangePassword"), 1000);
      })
      .catch((err) => {
        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
};

export function signup(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.SIGNUP_URL}`, body, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("SIGNUP_SUCCESS", "success", language);
        setTimeout(() => navigate("Signin"), 1000);
      })
      .catch((err) => {
        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
}

export function signin(body) {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });
    const language = getState().common.language;

    axios
      .post(`${API.BASE_URL}${API.LOGIN_URL}`, body, { headers })
      .then(async (res) => {
        // await AsyncStorage.setItem('token',res.data.data.token)
        // const token = await AsyncStorage.getItem('token');
        const token = res.data.data.token;
        const userStatus = res.data.data.user.status;
        const bussiness = res.data.data.business;
        const user = res.data.data.user;

        const business = {
          ...bussiness,
          logo: bussiness.logo == "" ? null : bussiness.logo,
        };

        // await AsyncStorage.setItem('user', JSON.stringify(user))
        // await AsyncStorage.setItem('bussiness', JSON.stringify(data))
        // const business = JSON.parse( await AsyncStorage.getItem('bussiness') )

        token &&
          dispatch({
            type: ACTION.TOKEN,
            payload: token,
          });

        business &&
          dispatch({
            type: ACTION.BUSINESS_GET_SUCCESS,
            payload: business,
          });

        user &&
          dispatch({
            type: ACTION.USER_GET,
            payload: user,
          });

        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        navigation(userStatus, dispatch);
      })
      .catch((err) => {
        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
}

export function logout() {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    const body = {
      token,
    };

    // dispatch({
    //   payload: {
    //     status: true,
    //     type: "add",
    //   },
    //   type: ACTION.LOADING,
    // });

    dispatch({
      payload: null,
      type: ACTION.RESET_STATE,
    });

    ShowFlash("LOGOUT_SUCCESS", "success", language);
    setTimeout(() => {
      navigate("Signin");
    }, 1000);

    axios
      .post(`${API.BASE_URL}${API.LOGOUT}`, body, { headers })
      .then(async (res) => {
        // dispatch({
        //   payload: {
        //     status: false,
        //     type: "add",
        //   },
        //   type: ACTION.LOADING,
        // });
      })
      .catch((err) => {
        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
}

export const verifyUser = (code) => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;

    const store = getState();
    const user = store.user.currentUser;
    const language = getState().common.language;
    const body = {
      token,
      verify_code: code,
      email: user.email,
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.VERIFY_USER}`, body, { headers })
      .then(async (res) => {
        const response = res.data.data;
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        dispatch({
          type: ACTION.USER_STATUS,
          payload: constants.ACTIVE_USER,
        });

        dispatch({
          payload: true,
          type: ACTION.NEW_USER,
        });

        navigation(constants.ACTIVE_USER, dispatch);
      })
      .catch((err) => {
        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
};

export const resendCode = () => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const store = getState();
    const token = store.user.token;
    const user = store.user.currentUser;
    const language = getState().common.language;
    const body = {
      token,
      user_id: user.id,
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.RESEND_CODE}`, body, { headers })
      .then(async (res) => {
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
        ShowFlash("VERFICATION_CODE_SENT", "success", language);
      })
      .catch((err) => {
        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
};

export const ValidateToken = () => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const store = getState();
    const token = store.user.token;

    const body = {
      token,
    };

    axios
      .post(`${API.BASE_URL}${API.VALIDATE_TOKEN}`, body, { headers })
      .then(async (res) => {
        const response = res.data.data;
        token &&
          dispatch({
            type: ACTION.TOKEN,
            payload: token,
          });

        dispatch({
          type: ACTION.USER_STATUS,
          payload: response[3],
        });

        dispatch({
          type: ACTION.NOTIFICATIONS,
          payload: response.notifications,
        });

        navigation(response[3], dispatch);
      })
      .catch((err) => {
        // dispatch({
        //   type: ACTION.TOKEN_STATUS,
        //   payload: false,
        // });
        // dispatch({
        //   payload: null,
        //   type: ACTION.RESET_STATE,
        // });
        navigate("Auth");
      });
  };
};
