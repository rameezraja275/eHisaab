import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function expenseCategoryCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;

    const data = {
      token,
      name: body.expense_name,
    };

    const expenses = [...store.expense.expensesCategories];

    dispatch({
      payload: {
        status: true,
        type: "",
      },
      type: ACTION.LOADING,
    });
    axios
      .post(`${API.BASE_URL}${API.EXPENSE_CREATE_URL}`, data, { headers })
      .then((res) => {
        ShowFlash("ADD_SUCCESS", "success", language);
        expenses.unshift(res.data.data[0]);

        dispatch({
          payload: expenses,
          type: ACTION.EXPENSE_CATEGORIES_GET,
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

export function expenseTransactionCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const { expense_date } = body;
    const data = {
      token,
      expense_id: body.expense_id,
      date: `${expense_date.getFullYear()}-${
        expense_date.getMonth() + 1
      }-${expense_date.getDate()}`,
      dr: body.dr,
      narration: body.narration,
    };

    const expenses = [...store.expense.expenses];

    dispatch({
      payload: {
        status: true,
        type: "",
      },
      type: ACTION.LOADING,
    });
    axios
      .post(`${API.BASE_URL}${API.EXPENSE_CREATE_TRANSACTION}`, data, {
        headers,
      })
      .then((res) => {
        dispatch(expenseGetCategories(body.expense_id));
        ShowFlash("ADD_SUCCESS", "success", language);
        expenses.unshift(res.data.data[0]);
        dispatch({
          payload: expenses,
          type: ACTION.EXPENSE_TRANSACTION_GET,
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

export function expenseCategoriesModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const data = {
      token,
      expense_id: body.id,
      name: body.expense_name,
    };

    dispatch({
      payload: {
        status: true,
        type: "",
      },
      type: ACTION.LOADING,
    });

    const expenses = [...store.expense.expensesCategories];

    axios
      .post(`${API.BASE_URL}${API.EXPENSE_MODIFY_URL}`, data, { headers })
      .then((res) => {
        // let updatedexpense = []
        // for (let i = 0; i < expenses.length; i++) {
        //     if( expenses[i].id == res.data.data[0].id){
        //       updatedexpense.push(res.data.data[0])
        //     }else{
        //       updatedexpense.push(expenses[i])
        //     }
        // }

        for (let i = 0; i < expenses.length; i++) {
          if (expenses[i].id == res.data.data[0].id) {
            expenses[i] = res.data.data[0];
          }
        }

        dispatch({
          payload: expenses,
          type: ACTION.EXPENSE_CATEGORIES_GET,
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
          navigate("ListCategories");
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

export function expenseTransactionModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const { expense_date } = body;
    const data = {
      token,
      transaction_id: body.id,
      expense_id: body.expense_id,
      date: `${expense_date.getFullYear()}-${
        expense_date.getMonth() + 1
      }-${expense_date.getDate()} `,
      dr: body.dr,
      narration: body.narration,
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    const expenses = [...store.expense.expenses];

    axios
      .post(`${API.BASE_URL}${API.EXPENSE_MODIFY_TRANSACTION}`, data, {
        headers,
      })
      .then((res) => {
        dispatch(expenseGetCategories(body.expense_id));
        // let updatedexpense = []
        // for (let i = 0; i < expenses.length; i++) {
        //     if( expenses[i].id == res.data.data[0].id){
        //       updatedexpense.push(res.data.data[0])
        //     }else{
        //       updatedexpense.push(expenses[i])
        //     }
        // }

        for (let i = 0; i < expenses.length; i++) {
          if (expenses[i].id == res.data.data[0].id) {
            expenses[i] = res.data.data[0];
          }
        }

        dispatch({
          payload: expenses,
          type: ACTION.EXPENSE_TRANSACTION_GET,
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

export function expenseTransactionDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const expenses = store.expense.expenses;
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
      .post(`${API.BASE_URL}${API.EXPENSE_DELETE_TRANSACTION}`, data, {
        headers,
      })
      .then((res) => {
        let expense_id = null;
        const updatedExpense = expenses.filter((item) => {
          if (item.id == id) {
            expense_id = item.expense_id;
            return false;
          }
          return true;
        });

        dispatch(expenseGetCategories(expense_id));

        dispatch({
          payload: updatedExpense,
          type: ACTION.EXPENSE_TRANSACTION_GET,
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

export function expenseGetCategories(expenseId) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = getState().user.token;
    const expenses = [...getState().expense.expensesCategories];
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
        `${API.BASE_URL}${API.EXPENSE_GET_CATEGORIES_URL}?token=${token}&expense_id=${expenseId}`,
        { headers }
      )
      .then((res) => {
        if (expenseId > 0) {
          for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id == res.data.data[0].id) {
              expenses[i] = res.data.data[0];
            }
          }
          dispatch({
            payload: expenses,
            type: ACTION.EXPENSE_CATEGORIES_GET,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.EXPENSE_CATEGORIES_GET,
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

export function expenseTransactionGet(
  expenseId,
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
        `${API.BASE_URL}${API.EXPENSE_GET_TRANSACTION}?token=${token}&expense_id=${expenseId}&trans_date=${date}&filter_type=${filter.filter_type}`,
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
        if (expenseId > 0) {
          dispatch({
            payload: res.data.data,
            type: ACTION.EXPENSE_CATEGORIES_TRANSACTION_GET,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.EXPENSE_TRANSACTION_GET,
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

export function categoryDelete(expenseId) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const expenses = store.expense.expensesCategories;
    const language = store.common.language;
    const data = {
      token,
      expense_id: expenseId,
    };

    dispatch({
      payload: {
        status: true,
        type: "",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EXPENSE_DELETE_URL}`, data, { headers })
      .then((res) => {
        const updatedExpense = expenses.filter((item) => {
          if (item.id == expenseId) {
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedExpense,
          type: ACTION.EXPENSE_CATEGORIES_GET,
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
          navigate("ListCategories");
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
