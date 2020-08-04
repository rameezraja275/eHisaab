import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import { productGet } from "./product";
import { customerGet } from "./customer";
import constants from "../../utils/constants";

const calculateTotalPrice = (updatedCart) => {
  let totalPrice = 0;

  for (let i = 0; i < updatedCart.length; i++) {
    totalPrice =
      totalPrice +
      Number(updatedCart[i].product_sale_price) * Number(updatedCart[i].qty);
  }

  return totalPrice;
};

export function getSaleTransactions(
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

    const url = `${API.BASE_URL}${API.SALE_GET_URL}?token=${token}&sale_id=${id}&trans_date=${date}&filter_type=${filter.filter_type}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (id > 0) {
          console.log(res.data.data[0]);
          const {
            sale_date,
            paid_amount,
            customer_id,
            narration,
            id,
            sale_amount,
          } = res.data.data[0];
          const { products } = res.data.data[1];
          // console.log("paod", paid_amount);
          dispatch({
            type: ACTION.ADD_ITEM_SALE_CART,
            payload: products,
          });

          dispatch({
            type: ACTION.SALE_CART_STATUS,
            payload: {
              totalPrice: sale_amount,
              totalItem: products.length,
            },
          });

          dispatch({
            type: ACTION.SALE_DEATILS,
            payload: {
              date: new Date(sale_date),
              paid_amount,
              customer_id,
              narration,
              sale_id: id,
            },
          });

          dispatch({
            type: ACTION.ADD_DISCOUNT_SALE,
            payload: res.data.data[0].sale_discount,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.SALE_TRANSACTIONS,
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

export function addSaleData(data) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION.SALE_DEATILS,
      payload: data,
    });
  };
}

export function makeSale(data) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const saleID = store.sale.saleData.sale_id;
    const customers = getState().customer.customers;

    const { saleCart, discount, cartStatus } = store.sale;
    const { date, paid_amount, customer_id, narration } = data;

    const body = {
      sale_id: saleID,
      token,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      paid_amount,
      customer_id,
      narration,
      products: saleCart,
      discount,
      amount: cartStatus.totalPrice,
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    let previousBalance = null;
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id == customer_id) {
        previousBalance = customers[i].current_balance;
      }
    }

    const url = saleID
      ? `${API.BASE_URL}${API.SALE_MODIFY_URL}`
      : `${API.BASE_URL}${API.SALE_CREATE_URL}`;

    axios
      .post(url, body, { headers })
      .then((res) => {
        let details = {
          ...data,
          sale_id: saleID,
          previousBalance: previousBalance,
        };

        details = {
          ...details,
          sale_id: res.data.data,
        };
        dispatch({
          payload: details,
          type: ACTION.SALE_DEATILS,
        });

        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("ADD_SUCCESS", "success", language);
        customer_id && dispatch(customerGet(customer_id));
        dispatch(productGet(0));

        setTimeout(() => {
          navigate("Bill", { duplicate: saleID ? true : false });
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

export function delItemFromSale(item) {
  return (dispatch, getState) => {
    const store = getState();
    const { saleCart } = store.sale;

    const updatedCart = saleCart.filter((cartItem) => {
      if (cartItem.id === item.id) {
        return false;
      }
      return true;
    });

    const totalPrice = calculateTotalPrice(updatedCart);

    dispatch({
      type: ACTION.ADD_ITEM_SALE_CART,
      payload: updatedCart,
    });

    dispatch({
      type: ACTION.SALE_CART_STATUS,
      payload: {
        totalPrice,
        totalItem: updatedCart.length,
      },
    });
  };
}

export function updateItemFromSale(item) {
  return (dispatch, getState) => {
    const store = getState();
    const saleCart = [...store.sale.saleCart];

    for (let i = 0; i < saleCart.length; i++) {
      if (saleCart[i].id == item.id) {
        let qty = item.qty;

        if (Number(item.qty) > Number(saleCart[i].current_stock)) {
          ShowFlash("Stock is Not Avalible", "danger");
          qty = Number(saleCart[i].qty);
        }

        saleCart[i] = {
          ...saleCart[i],
          product_sale_price: item.price,
          qty,
        };
      }
    }

    const totalPrice = calculateTotalPrice(saleCart);

    dispatch({
      type: ACTION.ADD_ITEM_SALE_CART,
      payload: saleCart,
    });

    dispatch({
      type: ACTION.SALE_CART_STATUS,
      payload: {
        totalPrice,
        totalItem: saleCart.length,
      },
    });
  };
}

export function addDiscountSale(amount) {
  return (dispatch) => {
    dispatch({
      type: ACTION.ADD_DISCOUNT_SALE,
      payload: amount,
    });
  };
}

export function resetCart() {
  return (dispatch) => {
    dispatch({
      type: ACTION.RESET_SALE_CART,
      paylaod: [],
    });
  };
}

export function addItemToSale(item, is_noninventory = false) {
  return (dispatch, getState) => {
    const store = getState();
    const { saleCart } = store.sale;
    const language = store.common.language;
    let newItem = null;
    const updatedCart = saleCart.filter((cartItem) => {
      if (cartItem.id === item.id) {
        newItem = cartItem;
        return false;
      }
      return true;
    });

    const cartitem = {
      ...item,
      non_inventory_item: is_noninventory ? "1" : "0",
      qty: newItem ? newItem.qty + 1 : 1,
    };

    if (is_noninventory) {
      const non_inventory_item = store.nonInventoryItems.nonInventoryItems;
      const is_avalible = non_inventory_item.find((nonitem) => {
        nonitem.id == item.product_id;
      });
      if (!is_avalible) {
        non_inventory_item.push(item);
        dispatch({
          payload: non_inventory_item,
          type: ACTION.NON_INVENTORY_PRODUCT,
        });
      }
    }

    if (item.is_service == constants.SERVICE && cartitem.qty == 1) {
      updatedCart.unshift(cartitem);

      const totalPrice = calculateTotalPrice(updatedCart);

      dispatch({
        type: ACTION.ADD_ITEM_SALE_CART,
        payload: updatedCart,
      });

      dispatch({
        type: ACTION.SALE_CART_STATUS,
        payload: {
          totalPrice,
          totalItem: updatedCart.length,
        },
      });
    } else if (Number(cartitem.current_stock) >= Number(cartitem.qty)) {
      updatedCart.unshift(cartitem);

      const totalPrice = calculateTotalPrice(updatedCart);

      dispatch({
        type: ACTION.ADD_ITEM_SALE_CART,
        payload: updatedCart,
      });

      dispatch({
        type: ACTION.SALE_CART_STATUS,
        payload: {
          totalPrice,
          totalItem: updatedCart.length,
        },
      });
    } else {
      ShowFlash("STOCK_NOT_AVALIABLE", "danger", language);
    }
  };
}

export function saleDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const data = {
      token,
      sale_id: id,
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
      .post(`${API.BASE_URL}${API.SALE_DELETE_URL}`, data, { headers })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "del",
          },
          type: ACTION.LOADING,
        });
        dispatch(productGet(0));
        dispatch({
          type: ACTION.RESET_SALE_CART,
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

// export function saleGet(body) {
//   return dispatch => {
//     const headers = {
//       "Content-Type": "application/json"
//     };
//     const {token,saleId} = body;
//     dispatch({
//       payload: {
//         status: true,
//         type: "add"
//       },
//       type: ACTION.LOADING
//     })
//     axios
//       .get(`${API.BASE_URL}${API.SALE_GET_URL}?token=${token}&business_id=${saleId}`, { headers })
//       .then(res => {
//           dispatch({
//               payload: res.data,
//               type: ACTION.BUSINESS_GET_SUCCESS
//           })

//           dispatch({
//             payload: {
//               status: false,
//               type: "add"
//             },
//             type: ACTION.LOADING
//           })
//       })
//       .catch(err => {
//         if(err.response){
//           ShowFlash( err.response.data.message ,"danger");
//           }else{
//           ShowFlash( "Uh Oh, Something Went Wrong" ,"danger");
//          }
//          dispatch({
//           payload: {
//             status: false,
//             type: "add"
//           },
//           type: ACTION.LOADING
//         })
//       });
//   };
// }
