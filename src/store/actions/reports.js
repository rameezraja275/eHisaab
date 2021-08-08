import axios from "axios";
import ACTION from "../types";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function saleReport(filter) {
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

    let startDate = filter.startDate.toISOString().split("T")[0];
    let endDate = filter.endDate.toISOString().split("T")[0];

    let url = `${API.BASE_URL}${API.SALE_REPORT}?token=${token}&start_date=${startDate}&end_date=${endDate}`;

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
          type: ACTION.SALE_REPORT,
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

export function purchaseReport(filter) {
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

    let startDate = filter.startDate.toISOString().split("T")[0];
    let endDate = filter.endDate.toISOString().split("T")[0];

    let url = `${API.BASE_URL}${API.PURCHASE_REPORT}?token=${token}&start_date=${startDate}&end_date=${endDate}`;
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
          type: ACTION.PURCHASE_REPORT,
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

export function purchaseDetails(id) {
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

    let url = `${API.BASE_URL}${API.PURCHASE_DETAILS}?token=${token}&purchase_id=${id}`;
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
          type: ACTION.PURCHASE_DEATIL_REPORT,
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

export function saleDetail(id) {
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

    let url = `${API.BASE_URL}${API.SALE_DETAILS}?token=${token}&sale_id=${id}&new="new"`;
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
          type: ACTION.SALE_DEATIL_REPORT,
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

export function expenseReport(filter, id) {
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

    let startDate = filter.startDate.toISOString().split("T")[0];
    let endDate = filter.endDate.toISOString().split("T")[0];

    let url = `${API.BASE_URL}${API.EXPENSE_REPORT}?token=${token}&start_date=${startDate}&end_date=${endDate}&expense_id=${id}`;
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
          type: ACTION.EXPENSE_REPORT,
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

export function profitNlossStatement(filter) {
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

    let startDate = filter.startDate.toISOString().split("T")[0];
    let endDate = filter.endDate.toISOString().split("T")[0];

    let url = `${API.BASE_URL}${API.PROFIT_LOSS}?token=${token}&date_start=${startDate}&date_end=${endDate}`;

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
          type: ACTION.PROFIT_LOSS,
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

export function employeeReport(filter, id) {
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

    let startDate = filter.startDate.toISOString().split("T")[0];
    let endDate = filter.endDate.toISOString().split("T")[0];

    let url = `${API.BASE_URL}${API.EMPLOYEE_REPORT}?token=${token}&start_date=${startDate}&end_date=${endDate}&employee_id=${id}`;
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
          type: ACTION.EMPLOYEE_REPORT,
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

export function getCashBook(filter) {
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

    let url = `${API.BASE_URL}${API.CASHBOOK}?token=${token}&date=${date}`;
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
          type: ACTION.CASHBOOK,
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

export function getDayBook(filter) {
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

    let url = `${API.BASE_URL}${API.DAYBOOK}?token=${token}&date=${date}`;
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
          type: ACTION.DAYBOOK,
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
