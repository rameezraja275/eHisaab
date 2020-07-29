import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function customerCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;

    const data = {
      token,
      name: body.customer_name,
      phone: body.customer_phone,
      address: body.customer_address,
      opening_balance: body.opening_balance,
    };

    const customers = [...store.customer.customers];

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.CUSTOMER_CREATE_URL}`, data, { headers })
      .then((res) => {
        customers.unshift(res.data.data[0]);
        dispatch({
          payload: customers,
          type: ACTION.CUSTOMER_GET_SUCCESS,
        });

        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
        ShowFlash("ADD_SUCCESS", "success", language);
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

export function customerModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const customers = [...store.customer.customers];
    const language = store.common.language;

    const data = {
      token,
      customer_id: body.id,
      name: body.customer_name,
      phone: body.customer_phone,
      address: body.customer_address,
      opening_balance: body.opening_balance,
    };

    dispatch({
      payload: {
        status: true,
        type: "modify",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.CUSTOMER_MODIFY_URL}`, data, { headers })
      .then((res) => {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == res.data.data[0].id) {
            customers[i] = res.data.data[0];
          }
        }

        dispatch({
          payload: customers,
          type: ACTION.CUSTOMER_GET_SUCCESS,
        });

        dispatch({
          payload: {
            status: false,
            type: "modify",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("UPDATE_SUCCESS", "success", language);

        setTimeout(() => {
          navigate("List");
        }, 1000);
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

export function customerDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const customers = store.customer.customers;
    const language = store.common.language;

    const data = {
      token,
      customer_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.CUSTOMER_DELETE_URL}`, data, { headers })
      .then((res) => {
        const updatedCustomer = customers.filter((item) => {
          if (item.id == id) {
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedCustomer,
          type: ACTION.CUSTOMER_GET_SUCCESS,
        });

        dispatch({
          payload: {
            status: false,
            type: "del",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("DELETE_SUCCESS", "success", language);

        setTimeout(() => {
          navigate("List");
        }, 1000);
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

export function customerGet(customerId) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getState().user.token;
    const customers = [...getState().customer.customers];
    const language = getState().common.language;

    dispatch({
      payload: {
        status: true,
        type: null,
      },
      type: ACTION.LOADING,
    });

    let url = `${API.BASE_URL}${API.CUSTOMER_GET_URL}?token=${token}&customer_id=${customerId}`;

    axios
      .get(url, { headers })
      .then((res) => {
        if (customerId > 0) {
          for (let i = 0; i < customers.length; i++) {
            if (customers[i].id == res.data.data[0].id) {
              customers[i] = res.data.data[0];
            }
          }
          dispatch({
            payload: customers,
            type: ACTION.CUSTOMER_GET_SUCCESS,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.CUSTOMER_GET_SUCCESS,
          });
        }

        dispatch({
          payload: {
            status: false,
            type: null,
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
}

export function getCustomerTransactionHistory(
  customerId,
  filter = {
    date: new Date(),
    filter_type: "1",
  }
) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getState().user.token;
    const language = getState().common.language;

    dispatch({
      payload: {
        status: true,
        type: null,
      },
      type: ACTION.LOADING,
    });

    let date = filter.date.toISOString().split("T")[0];

    axios
      .get(
        `${API.BASE_URL}${API.RECEIPT_GET_URL}?token=${token}&customer_id=${customerId}&trans_date=${date}&filter_type=${filter.filter_type}`,
        { headers }
      )
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: null,
          },
          type: ACTION.LOADING,
        });

        dispatch({
          payload: res.data.data,
          type: ACTION.CUSTOMER_HISTORY,
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

        setTimeout(() => {
          navigate("List");
        }, 1000);
      });
  };
}
