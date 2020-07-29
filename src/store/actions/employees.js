import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function getEmployees(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getState().user.token;
    const employees = [...getState().employee.employees];
    const language = getState().common.language;

    dispatch({
      payload: {
        status: true,
        type: null,
      },
      type: ACTION.LOADING,
    });

    let url = `${API.BASE_URL}${API.EMPLOYEE_GET_URL}?token=${token}&employee_id=${id}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (id > 0) {
          for (let i = 0; i < employees.length; i++) {
            if (employees[i].id == id) {
              employees[i] = res.data.data[0];
            }
          }
          dispatch({
            payload: employees,
            type: ACTION.EMPLOYEES_GET,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.EMPLOYEES_GET,
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

export function getTransactions(
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

    axios
      .get(
        `${API.BASE_URL}${API.EMPLOYEE_GET_LEDGER_URL}?token=${token}&employee_id=${id}&trans_date=${date}&filter_type=${filter.filter_type}`,
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

        if (id > 0) {
          dispatch({
            payload: res.data.data,
            type: ACTION.EMPLOYEE_TRANSACTION_GET,
          });
        } else {
          dispatch({
            payload: res.data.data,
            type: ACTION.TRANSACTIONS_GET,
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

        setTimeout(() => {
          navigate("List");
        }, 1000);
      });
  };
}

export function employeeCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const data = {
      token,
      name: body.employee_name,
      phone: body.employee_phone,
      address: body.employee_address,
      opening_balance: body.opening_balance,
      salary: body.salary,
      opening_balance_type: body.opening_balance_type,
    };

    const employees = [...store.employee.employees];

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_CREATE_URL}`, data, { headers })
      .then((res) => {
        employees.unshift(res.data.data[0]);

        dispatch({
          payload: employees,
          type: ACTION.EMPLOYEES_GET,
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

export function employeeModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const employees = store.employee.employees;
    const language = store.common.language;
    const data = {
      token,
      name: body.employee_name,
      phone: body.employee_phone,
      address: body.employee_address,
      opening_balance: body.opening_balance,
      salary: body.salary,
      employee_id: body.id,
      opening_balance_type: body.opening_balance_type,
    };

    dispatch({
      payload: {
        status: true,
        type: "modify",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_MODIFY_URL}`, data, { headers })
      .then((res) => {
        const updatedEmployees = employees.filter((item) => {
          if (item.id == body.id) {
            return false;
          }
          return true;
        });

        updatedEmployees.unshift(res.data.data[0]);

        dispatch({
          payload: updatedEmployees,
          type: ACTION.EMPLOYEES_GET,
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

export function employeeDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const employees = store.employee.employees;
    const language = store.common.language;
    const data = {
      token,
      employee_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_DELETE_URL}`, data, { headers })
      .then((res) => {
        const updatedEmployees = employees.filter((item) => {
          if (item.id == id) {
            return false;
          }
          return true;
        });

        dispatch({
          payload: updatedEmployees,
          type: ACTION.EMPLOYEES_GET,
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

export function employeeTransactionCreate(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const { transaction_date } = body;

    const data = {
      token,
      employee_id: body.employee_id,
      date: `${transaction_date.getFullYear()}-${
        transaction_date.getMonth() + 1
      }-${transaction_date.getDate()}`,
      amount: body.amount,
      narration: body.narration,
      transaction_type: body.transaction_type,
    };

    const transactions = [...store.employee.transactions];

    dispatch({
      payload: {
        status: true,
        type: "",
      },
      type: ACTION.LOADING,
    });
    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_CREATE_LEDGER_URL}`, data, {
        headers,
      })
      .then((res) => {
        ShowFlash("ADD_SUCCESS", "success", language);

        transactions.unshift(res.data.data[0]);

        dispatch({
          payload: transactions,
          type: ACTION.TRANSACTIONS_GET,
        });

        body.employee_id && dispatch(getEmployees(body.employee_id));

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

export function employeeTransactionModify(body) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const transactions = store.employee.transactions;
    const language = store.common.language;
    const { transaction_date } = body;

    const data = {
      token,
      ledger_id: body.id,
      employee_id: body.employee_id,
      date: `${transaction_date.getFullYear()}-${
        transaction_date.getMonth() + 1
      }-${transaction_date.getDate()}`,
      amount: body.amount,
      narration: body.narration,
      transaction_type: body.transaction_type,
    };

    dispatch({
      payload: {
        status: true,
        type: "modify",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_MODIFY_LEDGER_URL}`, data, {
        headers,
      })
      .then((res) => {
        const updatedTransactions = transactions.filter((item) => {
          if (item.id == body.id) {
            return false;
          }
          return true;
        });

        updatedTransactions.unshift(res.data.data[0]);

        dispatch({
          payload: updatedTransactions,
          type: ACTION.TRANSACTIONS_GET,
        });

        body.employee_id && dispatch(getEmployees(body.employee_id));

        dispatch({
          payload: {
            status: false,
            type: "modify",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("UPDATE_SUCCESS", "success", language);

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

export function processSalaries(salaries, date) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const store = getState();
    const token = store.user.token;
    const language = store.common.language;
    const data = {
      token,
      salary_month: date.getMonth() + 1,
      salary_year: date.getFullYear(),
      process_date: `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`,
      salaries,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_SALARIES_PROCESS}`, data, {
        headers,
      })
      .then((res) => {
        dispatch({
          payload: {
            status: false,
            type: "del",
          },
          type: ACTION.LOADING,
        });

        dispatch(getTransactions(0));
        dispatch(getEmployees(0));

        ShowFlash("SALARIES_PROCESSED", "success", language);

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

export function emloyeeTransactionDelete(id) {
  return (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const store = getState();
    const token = store.user.token;
    const transactions = store.employee.transactions;
    const language = store.common.language;
    const data = {
      token,
      ledger_id: id,
    };

    dispatch({
      payload: {
        status: true,
        type: "del",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.EMPLOYEE_DELETE_LEDGER_URL}`, data, {
        headers,
      })
      .then((res) => {
        let employee_id = null;
        const updatedTransactions = transactions.filter((item) => {
          if (item.id == id) {
            employee_id = item.employee_id;
            return false;
          }
          return true;
        });

        employee_id && dispatch(getEmployees(employee_id));

        dispatch({
          payload: updatedTransactions,
          type: ACTION.TRANSACTIONS_GET,
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
