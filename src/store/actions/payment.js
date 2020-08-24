import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import { supplierGet } from "../actions/supplier";

export function paymentCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const store = getState();
    const token = store.user.token;
    const language = store.common.language;

    const data = {
      token,
      id: body.id,
      date: `${body.date.getFullYear()}-${
        body.date.getMonth() + 1
        }-${body.date.getDate()}`,
      supplier_id: body.supplier_id,
      narration: body.narration,
      dr: body.dr,
      cr: "0",
    };

    const payments = [...store.payment.payments];
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PAYMENT_CREATE_URL}`, data, { headers })
      .then((res) => {
        payments.unshift(res.data.data[0]);
        // dispatch(supplierGet(body.supplier_id));
        dispatch({
          payload: payments,
          type: ACTION.PAYMENT_GET_SUCCESS,
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

export function paymentModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const payments = [...store.payment.payments];
    const language = store.common.language;
    const data = {
      token,
      payment_id: body.id,
      date: `${body.date.getFullYear()}-${
        body.date.getMonth() + 1
        }-${body.date.getDate()}`,
      supplier_id: body.supplier_id,
      dr: body.dr,
      cr: "0",
      narration: body.narration,
    };

    dispatch({
      payload: {
        status: true,
        type: "modify",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PAYMENT_MODIFY_URL}`, data, { headers })
      .then((res) => {
        for (let i = 0; i < payments.length; i++) {
          if (payments[i].id == body.id) {
            payments[i] = res.data.data[0];
          }
        }

        // body.supplier_id && dispatch(supplierGet(body.supplier_id));

        dispatch({
          payload: payments,
          type: ACTION.PAYMENT_GET_SUCCESS,
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
          navigate("PaymentSupplier");
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

export function paymentDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const payments = store.payment.payments;
    const language = store.common.language;
    const data = {
      token,
      payment_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PAYMENT_DELETE_URL}`, data, { headers })
      .then((res) => {
        let supplier_id = null;
        const updatedPayments = payments.filter((item) => {
          if (item.id == id) {
            supplier_id = item.supplier_id;
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedPayments,
          type: ACTION.PAYMENT_GET_SUCCESS,
        });

        // dispatch(supplierGet(supplier_id));
        dispatch({
          payload: {
            status: false,
            type: "del",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("DELETE_SUCCESS", "success", language);

        setTimeout(() => {
          navigate("PaymentSupplier");
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

export function paymentGet(
  id,
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

    let url = `${API.BASE_URL}${API.PAYMENT_GET_URL}?token=${token}&payment_id=${id}&only_payment=1&trans_date=${date}&filter_type=${filter.filter_type}`;
    axios
      .get(url, { headers })
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
          type: ACTION.PAYMENT_GET_SUCCESS,
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
