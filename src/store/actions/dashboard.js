import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";

export function getTopProducts(month) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const token = getState().user.token;
        const language = getState().common.language;

        dispatch({
            payload: {
                data: [],
                loading: true,
            },
            type: ACTION.TOP_PRODUCTS,
        });

        let url = `${API.BASE_URL}${API.TOP_PRODUCTS}?token=${token}&month=${month}&limit=11`;
        axios
            .get(url, { headers })
            .then((res) => {
                dispatch({
                    payload: {
                        data: res.data.data,
                        loading: false,
                    },
                    type: ACTION.TOP_PRODUCTS,
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
                        data: [],
                        loading: false,
                    },
                    type: ACTION.TOP_PRODUCTS,
                });
            });
    };
}

export function getTotalBankBalance() {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const token = getState().user.token;
        const language = getState().common.language;

        dispatch({
            payload: {
                data: 0,
                loading: true,
            },
            type: ACTION.TOTAL_BANK_BALANCE,
        });

        let url = `${API.BASE_URL}${API.TOTAL_BANK_BALANCE}?token=${token}`;
        axios
            .get(url, { headers })
            .then((res) => {
                dispatch({
                    payload: {
                        data: res.data.data,
                        loading: false,
                    },
                    type: ACTION.TOTAL_BANK_BALANCE,
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
                        data: 0,
                        loading: false,
                    },
                    type: ACTION.TOTAL_BANK_BALANCE,
                });
            });
    };
}

export function getTotalPayable() {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const token = getState().user.token;
        const language = getState().common.language;

        dispatch({
            payload: {
                data: 0,
                loading: true,
            },
            type: ACTION.TOTAL_PAYABLE,
        });

        let url = `${API.BASE_URL}${API.TOTAL_PAYABLE}?token=${token}`;
        axios
            .get(url, { headers })
            .then((res) => {
                dispatch({
                    payload: {
                        data: res.data.data,
                        loading: false,
                    },
                    type: ACTION.TOTAL_PAYABLE,
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
                        data: 0,
                        loading: false,
                    },
                    type: ACTION.TOTAL_PAYABLE,
                });
            });
    };
}

export function getTotalReceiveable() {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const token = getState().user.token;
        const language = getState().common.language;

        dispatch({
            payload: {
                data: 0,
                loading: true,
            },
            type: ACTION.TOTAL_RECEIVEABLE,
        });

        let url = `${API.BASE_URL}${API.TOTAL_RECEIVEABLE}?token=${token}`;
        axios
            .get(url, { headers })
            .then((res) => {
                dispatch({
                    payload: {
                        data: res.data.data,
                        loading: false,
                    },
                    type: ACTION.TOTAL_RECEIVEABLE,
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
                        data: 0,
                        loading: false,
                    },
                    type: ACTION.TOTAL_RECEIVEABLE,
                });
            });
    };
}