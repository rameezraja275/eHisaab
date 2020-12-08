import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import { productGet } from "./product";
import { supplierGet } from "./supplier";

const calculateTotalPrice = (updatedCart) => {
  let totalPrice = 0;

  for (let i = 0; i < updatedCart.length; i++) {
    totalPrice =
      totalPrice +
      Number(updatedCart[i].product_cost_price) * Number(updatedCart[i].qty);
  }

  return totalPrice;
};

export function resetCart() {
  return (dispatch) => {
    dispatch({
      type: ACTION.RESET_PURCHASE_CART,
      payload: [],
    });
  };
}

export function deletePurchase(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const data = {
      token,
      purchase_id: id,
    };
    const language = store.common.language;
    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.PURCHASE_DELETE_URL}`, data, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "del",
          },
          type: ACTION.LOADING,
        });

        dispatch(productGet(0));
        dispatch(resetCart());
        dispatch({
          type: ACTION.RESET_PURCHASE_CART,
          payload: [],
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

export function addTotalPrice(totalPrice) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION.PURCHASE_CART_STATUS,
      payload: {
        totalPrice: totalPrice,
        totalItem: 0,
      },
    });
  }
}

export function getPurchaseTransactions(
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

    const url = `${API.BASE_URL}${API.PURCHASE_GET_URL}?token=${token}&purchase_id=${id}&trans_date=${date}&filter_type=${filter.filter_type}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (id > 0) {
          const {
            purchase_date,
            paid_amount,
            supplier_id,
            narration,
            id,
            purchase_amount,
          } = res.data.data[0];
          const { products } = res.data.data[1];
          dispatch({
            type: ACTION.ADD_ITEM_PURCHASE_CART,
            payload: res.data.data[1].products,
          });

          dispatch({
            type: ACTION.PURCHASE_CART_STATUS,
            payload: {
              totalPrice: purchase_amount,
              totalItem: products.length,
            },
          });

          dispatch({
            type: ACTION.PURCHASE_DEATILS,
            payload: {
              date: new Date(purchase_date),
              paid_amount,
              supplier_id,
              narration,
              purchase_id: id,
            },
          });

          dispatch({
            type: ACTION.ADD_DISCOUNT_PURCHASE,
            payload: res.data.data[0].purchase_discount,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.PURCHASE_TRANSACTIONS,
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

export function makePurchase(data) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const purchaseID = store.purchase.purchaseData.purchase_id;

    const { purchaseCart, discount, cartStatus } = store.purchase;
    const { date, paid_amount, supplier_id, narration } = data;

    const body = {
      token,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      paid_amount,
      supplier_id,
      narration,
      products: purchaseCart,
      discount,
      amount: cartStatus.totalPrice,
      purchase_id: purchaseID,
    };
    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    const url = purchaseID
      ? `${API.BASE_URL}${API.PURCHASE_MODIFY_URL}`
      : `${API.BASE_URL}${API.PURCHASE_CREATE_URL}`;
    // const page = purchaseID ? "ListTransactions" : "List"
    axios
      .post(url, body, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        dispatch({
          type: ACTION.RESET_PURCHASE_CART,
          payload: [],
        });
        dispatch(resetCart());
        ShowFlash("ADD_SUCCESS", "success", language);
        dispatch(productGet(0));
        supplier_id && dispatch(supplierGet(supplier_id));
        // dispatch( getPurchaseTransactions(0) )

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

export function addDiscountPurchase(amount) {
  return (dispatch) => {
    dispatch({
      type: ACTION.ADD_DISCOUNT_PURCHASE,
      payload: amount,
    });
  };
}

export function updateItemFromPurchase(item) {
  return (dispatch, getState) => {
    const store = getState();
    const purchaseCart = [...store.purchase.purchaseCart];

    let updatedCart = [];
    for (let i = 0; i < purchaseCart.length; i++) {
      if (purchaseCart[i].id == item.id) {
        let qty = item.qty;

        purchaseCart[i] = {
          ...purchaseCart[i],
          product_cost_price: item.price,
          qty,
        };
        // updatedCart.push({
        //   ...purchaseCart[i],
        //   product_cost_price : item.price,
        //   qty
        // })
      }
      // else{
      //   updatedCart.push(purchaseCart[i])
      // }
    }

    const totalPrice = calculateTotalPrice(purchaseCart);

    dispatch({
      type: ACTION.ADD_ITEM_PURCHASE_CART,
      payload: purchaseCart,
    });

    dispatch({
      type: ACTION.PURCHASE_CART_STATUS,
      payload: {
        totalPrice,
        totalItem: purchaseCart.length,
      },
    });
  };
}

export function delItemFromPurchase(item) {
  return (dispatch, getState) => {
    const store = getState();
    const { purchaseCart } = store.purchase;

    const updatedCart = purchaseCart.filter((cartItem) => {
      if (cartItem.id === item.id) {
        return false;
      }
      return true;
    });

    const totalPrice = calculateTotalPrice(updatedCart);

    dispatch({
      type: ACTION.ADD_ITEM_PURCHASE_CART,
      payload: updatedCart,
    });

    dispatch({
      type: ACTION.PURCHASE_CART_STATUS,
      payload: {
        totalPrice,
        totalItem: updatedCart.length,
      },
    });
  };
}

export function addItemToPurchase(item) {
  return (dispatch, getState) => {
    const store = getState();
    const { purchaseCart } = store.purchase;

    let newItem = null;

    const updatedCart = purchaseCart.filter((cartItem) => {
      if (cartItem.id === item.id) {
        newItem = cartItem;
        return false;
      }
      return true;
    });

    const cartitem = {
      ...item,
      qty: newItem ? newItem.qty + 1 : 1,
    };

    updatedCart.unshift(cartitem);

    const totalPrice = calculateTotalPrice(updatedCart);

    dispatch({
      type: ACTION.ADD_ITEM_PURCHASE_CART,
      payload: updatedCart,
    });

    dispatch({
      type: ACTION.PURCHASE_CART_STATUS,
      payload: {
        totalPrice,
        totalItem: updatedCart.length,
      },
    });
  };
}
