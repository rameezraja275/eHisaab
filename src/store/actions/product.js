import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import constants from "../../utils/constants";

export function productCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const data = {
      token,
      name: body.product_name,
      cost_price: body.product_cost_price,
      sale_price: body.product_sale_price,
      qty:
        body.is_service == constants.SERVICE
          ? "0"
          : body.opening_stock == null
            ? "0"
            : body.opening_stock,
      is_service: body.is_service,
      code: body.product_code
    };

    const products = [...store.product.products];

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PRODUCT_CREATE_URL}`, data, { headers })
      .then((res) => {
        products.unshift(res.data.data[0]);
        dispatch({
          payload: products,
          type: ACTION.PRODUCT_GET_SUCCESS,
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

export function productModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const products = [...store.product.products];
    const language = store.common.language;
    const data = {
      token,
      product_id: body.id,
      name: body.product_name,
      cost_price: body.product_cost_price,
      sale_price: body.product_sale_price,
      qty:
        body.is_service == constants.SERVICE
          ? "0"
          : body.opening_stock == null
            ? "0"
            : body.opening_stock,
      is_service: body.is_service,
      code: body.product_code
    };

    dispatch({
      payload: {
        status: true,
        type: "modify",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PRODUCT_MODIFY_URL}`, data, { headers })
      .then((res) => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id == res.data.data[0].id) {
            products[i] = res.data.data[0];
          }
        }

        dispatch({
          payload: products,
          type: ACTION.PRODUCT_GET_SUCCESS,
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

export function productDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const products = store.product.products;
    const language = store.common.language;
    const data = {
      token,
      product_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PRODUCT_DELETE_URL}`, data, { headers })
      .then((res) => {
        const updatedProduct = products.filter((item) => {
          if (item.id == id) {
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedProduct,
          type: ACTION.PRODUCT_GET_SUCCESS,
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

export function productGet(productId) {
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

    let url = `${API.BASE_URL}${API.PRODUCT_GET_URL}?token=${token}&product_id=${productId}`;

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
          type: ACTION.PRODUCT_GET_SUCCESS,
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

export function getProductStock(productId, limit) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getState().user.token;
    const { start, end } = limit;
    const stock = start == 0 ? [] : getState().product.product_stock;
    const language = getState().common.language;
    dispatch({
      payload: {
        status: true,
        type: null,
      },
      type: ACTION.LOADING,
    });

    axios
      .get(
        `${API.BASE_URL}${API.PRODUCT_STOCK_GET_URL}?token=${token}&product_id=${productId}&limit=${start},${end}`,
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
          payload: [...stock, ...res.data.data],
          type: ACTION.PRODUCT_STOCK,
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

export function getNonInventoryItems() {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getState().user.token;

    let url = `${API.BASE_URL}${API.GET_NONINVENTORYITEMS}?token=${token}`;
    axios
      .get(url, { headers })
      .then((res) => {
        dispatch({
          payload: res.data.data,
          type: ACTION.NON_INVENTORY_PRODUCT,
        });
      })
      .catch((err) => {
      });
  };
}
