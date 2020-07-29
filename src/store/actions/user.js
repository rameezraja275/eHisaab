import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export const changePasswordwithCode = (data) => {
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

    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    const body = {
      token,
      verify_code: data.code,
      new_password: data.new_password,
    };
    axios
      .post(`${API.BASE_URL}${API.CHANGE_PASSWORD_VIA_CODE}`, body, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("PASSWORD_CHANGE_SUCCESS", "success", language);
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
};

export const changePassword = (data) => {
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

    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    const body = {
      token,
      current_password: data.current_password,
      new_password: data.new_password,
    };
    axios
      .post(`${API.BASE_URL}${API.CHANGE_PASSWORD}`, body, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("PASSWORD_CHANGE_SUCCESS", "success", language);
        setTimeout(() => navigate("SettingsList"), 1000);
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

export const userGet = () => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });
    let url = `${API.BASE_URL}${API.GET_USERS}?token=${token}`;
    axios
      .get(url, { headers })
      .then(async (res) => {
        const response = res.data.data;
        dispatch({
          payload: response,
          type: ACTION.USERS_GET,
        });
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
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

export const userCreate = (data) => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    const body = {
      token,
      username: data.user_name,
      password: data.password,
      full_name: data.full_name,
    };

    axios
      .post(`${API.BASE_URL}${API.ADD_USERS}`, body, { headers })
      .then(async (res) => {
        const response = res.data.data;
        ShowFlash("ADD_SUCCESS", "success", language);
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
        dispatch(userGet());
        navigate("ListUsers");
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

export const userModify = (data) => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    const body = {
      token,
      password: data.password,
      full_name: data.full_name,
      salesman_id: data.id,
    };

    axios
      .post(`${API.BASE_URL}${API.MODIFY_USERS}`, body, { headers })
      .then(async (res) => {
        ShowFlash("UPDATE_SUCCESS", "success", language);
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
        dispatch(userGet(0));
        navigate("ListUsers");
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

export const getOwnerProfile = () => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    let url = `${API.BASE_URL}${API.GET_OWNER}?token=${token}`;
    axios
      .get(url, { headers })
      .then(async (res) => {
        const response = res.data.data;
        dispatch({
          payload: response,
          type: ACTION.OWNER,
        });
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
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

export const profileModify = (data) => {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    // const token = await AsyncStorage.getItem('token');
    const token = getState().user.token;
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    const body = {
      token,
      full_name: data.full_name,
      phone_no: data.phone_no,
    };

    axios
      .post(`${API.BASE_URL}${API.MODIFY_OWNER}`, body, { headers })
      .then(async (res) => {
        // let user = JSON.parse( await AsyncStorage.getItem('user') )

        let owner = { ...getState().user.owner };
        owner = {
          ...owner,
          full_name: data.full_name,
          phone_no: data.phone_no,
        };
        // await AsyncStorage.setItem('user', JSON.stringify(user))
        owner &&
          dispatch({
            type: ACTION.OWNER,
            payload: owner,
          });

        owner &&
          dispatch({
            type: ACTION.USER_GET,
            payload: owner,
          });

        ShowFlash("UPDATE_SUCCESS", "success", language);
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
        navigate("SettingsList");
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

export const removeNewUserStatus = () => {
  return async (dispatch, getState) => {
    dispatch({
      payload: false,
      type: ACTION.NEW_USER,
    });
  };
};
