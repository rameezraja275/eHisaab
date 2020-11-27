import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";
import constants from "../../utils/constants";

export function getStoreProducts(productId) {
    return (dispatch, getState) => {

        console.log("aspi ")
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

        let url = `${API.BASE_URL}${API.STORE_PRODUCT_GET_URL}?token=${token}&product_id=${productId}`;

        axios
            .get(url, { headers })
            .then((res) => {
                console.log("res", res.data.data)
                dispatch({
                    payload: {
                        status: false,
                        type: null,
                    },
                    type: ACTION.LOADING,
                });

                dispatch({
                    payload: res.data.data,
                    type: ACTION.STORE_PRODUCT_GET_SUCCESS,
                });
            })
            .catch((err) => {
                console.log("err", err)
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

export function addProductsToStore(products) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const language = store.common.language;
        const data = {
            token,
            storeproducts: products
        };

        dispatch({
            payload: {
                status: true,
                type: "add",
            },
            type: ACTION.LOADING,
        });

        axios
            .post(`${API.BASE_URL}${API.STORE_ADD_PRODUCTS}`, data, { headers })
            .then((res) => {

                dispatch({
                    payload: {
                        status: false,
                        type: "add",
                    },
                    type: ACTION.LOADING,
                });

                dispatch(getStoreProducts())

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