import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function supplierCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const data = {
      token,
      name: body.supplier_name,
      phone: body.supplier_phone,
      address: body.supplier_address,
      opening_balance: body.opening_balance,
    };

    const suppliers = store.supplier.suppliers;

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.SUPPLIER_CREATE_URL}`, data, { headers })
      .then((res) => {
        const updatedSupplier = [res.data.data[0], ...suppliers];
        dispatch({
          payload: updatedSupplier,
          type: ACTION.SUPPLIER_GET_SUCCESS,
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

export function supplierModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const suppliers = [...store.supplier.suppliers];
    const language = store.common.language;
    const data = {
      token,
      supplier_id: body.id,
      name: body.supplier_name,
      phone: body.supplier_phone,
      address: body.supplier_address,
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
      .post(`${API.BASE_URL}${API.SUPPLIER_MODIFY_URL}`, data, { headers })
      .then((res) => {
        for (let i = 0; i < suppliers.length; i++) {
          if (suppliers[i].id == res.data.data[0].id) {
            suppliers[i] = res.data.data[0];
          }
        }

        dispatch({
          payload: suppliers,
          type: ACTION.SUPPLIER_GET_SUCCESS,
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

export function supplierDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const suppliers = store.supplier.suppliers;
    const language = store.common.language;
    const data = {
      token,
      supplier_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.SUPPLIER_DELETE_URL}`, data, { headers })
      .then((res) => {
        const updatedSupplier = suppliers.filter((item) => {
          if (item.id == id) {
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedSupplier,
          type: ACTION.SUPPLIER_GET_SUCCESS,
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

export function supplierGet(supplierId) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getState().user.token;
    const suppliers = [...getState().supplier.suppliers];
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: null,
      },
      type: ACTION.LOADING,
    });

    let url = `${API.BASE_URL}${API.SUPPLIER_GET_URL}?token=${token}&supplier_id=${supplierId}`;

    axios
      .get(url, { headers })
      .then((res) => {
        if (supplierId > 0) {
          for (let i = 0; i < suppliers.length; i++) {
            if (suppliers[i].id == res.data.data[0].id) {
              suppliers[i] = res.data.data[0];
            }
          }
          dispatch({
            payload: suppliers,
            type: ACTION.SUPPLIER_GET_SUCCESS,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.SUPPLIER_GET_SUCCESS,
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

export function getSupplierTransactionHistory(
  supplierId,
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
        `${API.BASE_URL}${API.PAYMENT_GET_URL}?token=${token}&supplier_id=${supplierId}&trans_date=${date}&filter_type=${filter.filter_type}`,
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
          type: ACTION.SUPPLIER_HISTORY,
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
