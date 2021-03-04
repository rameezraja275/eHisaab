import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function getOrders(
    id,
    limit = {
        start: 0,
        end: 20,
    },
    orderStatus,
    searchKey
) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };


        const token = getState().user.token;
        const language = getState().common.language;


        const { start, end } = limit;
        const orders = start == 0 ? [] : getState().orders.orders
        dispatch({
            payload: {
                status: true,
                type: null,
            },
            type: ACTION.LOADING,
        });

        let url = `${API.BASE_URL}${API.ORDER_GET}?token=${token}&order_id=${id}&limit=${end}&offset=${start}&orderStatus=${orderStatus}&searchKey=${searchKey}`;
        console.log(url)
        axios
            .get(url, { headers })
            .then((res) => {
                console.log(res.data)
                dispatch({
                    payload: {
                        status: false,
                        type: null,
                    },
                    type: ACTION.LOADING,
                });
                if (res.data.data.length == 0) {
                    dispatch({
                        type: ACTION.ORDER_LOAD_MORE,
                        payload: false
                    })
                } else {
                    dispatch({
                        type: ACTION.ORDER_LOAD_MORE,
                        payload: true
                    })
                }
                dispatch({
                    payload: [...orders, ...res.data.data],
                    type: ACTION.ORDER_GET,
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

export function getOrderDetails(
    id
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

        let url = `${API.BASE_URL}${API.ORDER_DETAILS_GET}?token=${token}&order_id=${id}`;
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
                    type: ACTION.ORDER_DETAILS_GET,
                });
                dispatch(changeOrderReadStatus(id))
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

export function orderModify(body) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const language = store.common.language;
        const data = {
            token,
            order_id: body.id,
            order_status: body.status
        };

        dispatch({
            payload: {
                status: true,
                type: "modify",
            },
            type: ACTION.LOADING,
        });

        axios
            .post(`${API.BASE_URL}${API.ORDER_MODIFY_URL}`, data, { headers })
            .then((res) => {

                dispatch({
                    payload: {
                        status: false,
                        type: "modify",
                    },
                    type: ACTION.LOADING,
                });
                dispatch(getOrders(0))

                ShowFlash("UPDATE_SUCCESS", "success", language);

                setTimeout(() => {
                    navigate("Orders");
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
// GET_UNREAD_ORDER_COUNT
// /var/www/html/ehisaab/api/order/get_unread_orders.php

export function getUnreadOrderCount() {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const token = getState().user.token;

        let url = `${API.BASE_URL}${API.GET_UNREAD_ORDER_COUNT}?token=${token}`;
        axios
            .get(url, { headers })
            .then((res) => {

                dispatch({
                    payload: res.data.data > 0 ? res.data.data : null,
                    type: ACTION.UNREAD_ORDERS_COUNT,
                });
            })
            .catch((err) => {
                if (err.response) {
                    ShowFlash(err.response.data.message, "danger", language);
                } else {
                    ShowFlash("SERVER_ERROR", "danger", language);
                }
            });
    };
}

export function changeOrderReadStatus(id) {
    return (dispatch, getState) => {
        const orders = getState().orders.orders
        const totalUnreadOrder = Number(getState().orders.totalUnreadOrder)
        const index = orders.findIndex(order => order.id == id)
        const order = orders[index]
        orders[index] = { ...order, read_status: 1 }
        dispatch({
            payload: [...orders],
            type: ACTION.ORDER_GET,
        });

        if (totalUnreadOrder) {
            if (totalUnreadOrder != 0) {
                const unread = totalUnreadOrder - 1
                dispatch({
                    payload: Number(unread) > 0 ? unread : null,
                    type: ACTION.UNREAD_ORDERS_COUNT,
                });
            }
        }

    };
}