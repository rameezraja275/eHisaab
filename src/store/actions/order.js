import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function getOrders(
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

        let url = `${API.BASE_URL}${API.ORDER_GET}?token=${token}&order_id=${id}`;
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