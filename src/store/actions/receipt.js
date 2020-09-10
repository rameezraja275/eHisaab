import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import { customerGet } from "../actions/customer";

export function receiptCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const store = getState();
    const token = store.user.token;
    const customers = getState().customer.customers;
    const language = store.common.language;
    const data = {
      token,
      receipt_id: body.id,
      date: `${body.date.getFullYear()}-${
        body.date.getMonth() + 1
        }-${body.date.getDate()}`,
      customer_id: body.customer_id,
      narration: body.narration,
      dr: "0",
      cr: body.cr,
    };

    const receipts = [...store.receipt.receipts];

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    let previousBalance = null;
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id == body.customer_id) {
        previousBalance = customers[i].current_balance;
      }
    }

    axios
      .post(`${API.BASE_URL}${API.RECEIPT_CREATE_URL}`, data, { headers })
      .then((res) => {
        receipts.unshift(res.data.data[0]);

        dispatch(customerGet(data.customer_id));

        dispatch({
          payload: receipts,
          type: ACTION.RECEIPT_GET_SUCCESS,
        });

        dispatch({
          payload: {
            date: body.date,
            customer_id: data.customer_id,
            paid_amount: data.cr,
            previousBalance,
            receipt_id: res.data.data[0].id,
            receipt_counter: res.data.data[0].receipt_counter

          },
          type: ACTION.RECEIPT_GET,
        });

        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
        ShowFlash("ADD_SUCCESS", "success", language);
        setTimeout(() => {
          navigate("receiptPDF", { duplicate: false });
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

export function receiptModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const receipts = [...store.receipt.receipts];
    const language = store.common.language;
    const data = {
      token,
      receipt_id: body.id,
      receipt_counter: body.receipt_counter,
      date: `${body.date.getFullYear()}-${
        body.date.getMonth() + 1
        }-${body.date.getDate()}`,
      customer_id: body.customer_id,
      narration: body.narration,
      dr: "0",
      cr: body.cr,
    };

    dispatch({
      payload: {
        status: true,
        type: "modify",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.RECEIPT_MODIFY_URL}`, data, { headers })
      .then((res) => {
        for (let i = 0; i < receipts.length; i++) {
          if (receipts[i].id == body.id) {
            receipts[i] = res.data.data[0];
          }
        }

        dispatch({
          payload: {
            date: body.date,
            customer_id: data.customer_id,
            paid_amount: data.cr,
            receipt_id: res.data.data[0].id,
            receipt_counter: res.data.data[0].receipt_counter
          },
          type: ACTION.RECEIPT_GET,
        });

        dispatch(customerGet(body.customer_id));

        dispatch({
          payload: receipts,
          type: ACTION.RECEIPT_GET_SUCCESS,
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
          navigate("receiptPDF", { duplicate: true });
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

export function receiptDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const receipts = store.receipt.receipts;
    const language = store.common.language;
    const data = {
      token,
      receipt_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.RECEIPT_DELETE_URL}`, data, { headers })
      .then((res) => {
        let customer_id = null;
        const updatedReceipts = receipts.filter((item) => {
          if (item.id == id) {
            customer_id = item.customer_id;
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedReceipts,
          type: ACTION.RECEIPT_GET_SUCCESS,
        });

        // dispatch(receiptGet(0))
        dispatch(customerGet(customer_id));
        dispatch({
          payload: {
            status: false,
            type: "del",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("Receipt Deleted Successfully", "success", language);

        setTimeout(() => {
          navigate("ReceiptCustomer");
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

export function setReceiptData(body) {
  return (dispatch) => {
    dispatch({
      payload: {
        date: body.date,
        customer_id: body.customer_id,
        paid_amount: body.cr,
        receipt_id: body.id,
        receipt_counter: body.receipt_counter,
      },
      type: ACTION.RECEIPT_GET,
    });
    navigate("receiptPDF", { duplicate: true });
  };
}

export function receiptGet(
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

    let url = `${API.BASE_URL}${API.RECEIPT_GET_URL}?token=${token}&receipt_id=${id}&only_receipt=1&trans_date=${date}&filter_type=${filter.filter_type}`;
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
          type: ACTION.RECEIPT_GET_SUCCESS,
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
