import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";


export function getBank(bankId) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const token = getState().user.token;
        const banks = [...getState().bank.banks];
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
                `${API.BASE_URL}${API.GET_BANK}?token=${token}&bank_id=${bankId}`,
                { headers }
            )
            .then((res) => {

                if (bankId > 0) {
                    for (let i = 0; i < banks.length; i++) {
                        if (banks[i].id == res.data.data[0].id) {
                            banks[i] = res.data.data[0];
                        }
                    }
                    dispatch({
                        payload: banks,
                        type: ACTION.BANKS,
                    });
                } else {
                    dispatch({
                        payload: res.data.data,
                        type: ACTION.BANKS,
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

export function addBank(body) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const language = store.common.language;

        const data = {
            token,
            bank_name: body.bank_name,
            account_no: body.account_no,
            opening_balance: body.opening_balance,
        };

        const banks = [...store.bank.banks];

        dispatch({
            payload: {
                status: true,
                type: "",
            },
            type: ACTION.LOADING,
        });
        axios
            .post(`${API.BASE_URL}${API.ADD_BANK}`, data, { headers })
            .then((res) => {
                ShowFlash("ADD_SUCCESS", "success", language);
                banks.unshift(res.data.data[0]);

                dispatch({
                    payload: banks,
                    type: ACTION.BANKS,
                });

                dispatch({
                    payload: {
                        status: false,
                        type: "",
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

export function updateBank(body) {
    return (dispatch, getState) => {
        // console.log(body)
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const language = store.common.language;
        const data = {
            token,
            bank_id: body.id,
            bank_name: body.bank_name,
            account_no: body.account_no,
            opening_balance: body.opening_balance,
        };

        dispatch({
            payload: {
                status: true,
                type: "",
            },
            type: ACTION.LOADING,
        });

        const banks = [...store.bank.banks];

        axios
            .post(`${API.BASE_URL}${API.UPDATE_BANK}`, data, { headers })
            .then((res) => {

                for (let i = 0; i < banks.length; i++) {
                    if (banks[i].id == res.data.data[0].id) {
                        banks[i] = res.data.data[0];
                    }
                }

                dispatch({
                    payload: banks,
                    type: ACTION.BANKS,
                });

                ShowFlash("UPDATE_SUCCESS", "success", language);
                dispatch({
                    payload: {
                        status: false,
                        type: "",
                    },
                    type: ACTION.LOADING,
                });

                setTimeout(() => {
                    navigate("Banks");
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

export function deleteBank(bankId) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const banks = store.bank.banks
        const language = store.common.language;
        const data = {
            token,
            bank_id: bankId,
        };

        dispatch({
            payload: {
                status: true,
                type: "",
            },
            type: ACTION.LOADING,
        });

        axios
            .post(`${API.BASE_URL}${API.DELETE_BANK}`, data, { headers })
            .then((res) => {
                const updatedBanks = banks.filter((item) => {
                    if (item.id == bankId) {
                        return false;
                    }
                    return true;
                });

                dispatch({
                    payload: updatedBanks,
                    type: ACTION.BANKS,
                });

                dispatch({
                    payload: {
                        status: false,
                        type: "",
                    },
                    type: ACTION.LOADING,
                });
                ShowFlash("DELETE_SUCCESS", "success", language);
                setTimeout(() => {
                    navigate("Banks");
                }, 1000);
            })
            .catch((err) => {
                if (err.response) {
                    ShowFlash(err.response.data.message, "danger");
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

export function getBankLedger(
    bankId,
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
                `${API.BASE_URL}${API.GET_BANK_TRANSACTION}?token=${token}&bank_id=${bankId}&transaction_date=${date}&filter_type=${filter.filter_type}`,
                { headers }
            )
            .then((res) => {
                console.log(bankId)
                dispatch({
                    payload: {
                        status: false,
                        type: null,
                    },
                    type: ACTION.LOADING,
                });
                if (bankId > 0) {
                    dispatch({
                        payload: res.data.data,
                        type: ACTION.BANK_LEDGER,
                    });
                } else {
                    dispatch({
                        payload: res.data.data,
                        type: ACTION.BANK_TRANSACTIONS,
                    });
                }
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


export function bankTransactionCreate(body) {
    return (dispatch, getState) => {
        const { id, bank_id,
            transaction_date, amount,
            transaction_type, narration } = body
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const language = store.common.language;
        const data = {
            token,
            bank_id,
            transaction_date: `${transaction_date.getFullYear()}-${transaction_date.getMonth() + 1
                }-${transaction_date.getDate()}`,
            amount,
            transaction_type,
            narration,
        };

        const bankTransactions = [...store.bank.bankTransactions];

        dispatch({
            payload: {
                status: true,
                type: "",
            },
            type: ACTION.LOADING,
        });

        // console.log("kholay ", data)
        axios
            .post(`${API.BASE_URL}${API.ADD_BANK_TRANSACTION}`, data, {
                headers,
            })
            .then((res) => {
                dispatch(getBank(body.bank_id));
                ShowFlash("ADD_SUCCESS", "success", language);
                bankTransactions.unshift(res.data.data[0]);
                dispatch({
                    payload: bankTransactions,
                    type: ACTION.BANK_TRANSACTIONS,
                });

                dispatch({
                    payload: {
                        status: false,
                        type: "",
                    },
                    type: ACTION.LOADING,
                });
            })
            .catch((err) => {

                console.log(err)
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

export function bankTransactionModify(body) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const language = store.common.language;
        const { id, bank_id,
            transaction_date, amount,
            transaction_type, narration } = body
        const data = {
            transaction_id: id,
            token,
            bank_id,
            transaction_date: `${transaction_date.getFullYear()}-${transaction_date.getMonth() + 1
                }-${transaction_date.getDate()}`,
            amount,
            transaction_type,
            narration,
        };

        dispatch({
            payload: {
                status: true,
                type: "add",
            },
            type: ACTION.LOADING,
        });

        const banks = [...store.bank.banks];
        axios
            .post(`${API.BASE_URL}${API.UPDATE_BANK_TRANSACTION}`, data, {
                headers,
            })
            .then((res) => {
                dispatch(getBankLedger(0));

                for (let i = 0; i < banks.length; i++) {
                    if (banks[i].id == res.data.data[0].bank_id) {
                        banks[i] = res.data.data[0];
                    }
                }

                dispatch({
                    payload: banks,
                    type: ACTION.BANKS,
                });

                ShowFlash("UPDATE_SUCCESS", "success", language);
                dispatch({
                    payload: {
                        status: false,
                        type: "",
                    },
                    type: ACTION.LOADING,
                });

                setTimeout(() => {
                    navigate("ListTransactions");
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

export function bankTransactionDelete(id) {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const store = getState();
        const token = store.user.token;
        const bankTransactions = [...store.bank.bankTransactions];
        const language = store.common.language;

        const data = {
            token,
            transaction_id: id,
        };

        dispatch({
            payload: {
                status: true,
                type: "",
            },
            type: ACTION.LOADING,
        });
        axios
            .post(`${API.BASE_URL}${API.DELETE_BANK_TRANSACTION}`, data, {
                headers,
            })
            .then((res) => {
                let bank_transaction_id = null;
                const updatedTransaction = bankTransactions.filter((item) => {
                    if (item.id == id) {
                        bank_transaction_id = item.bank_transaction_id;
                        return false;
                    }
                    return true;
                });

                dispatch(getBank(0));

                dispatch({
                    payload: updatedTransaction,
                    type: ACTION.BANK_TRANSACTIONS,
                });

                dispatch({
                    payload: {
                        status: false,
                        type: "",
                    },
                    type: ACTION.LOADING,
                });
                ShowFlash("DELETE_SUCCESS", "success", language);
                setTimeout(() => {
                    navigate("ListTransactions");
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