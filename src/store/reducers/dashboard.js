import ACTION from "../types";

const initialState = {
    topProducts: {
        data: [],
        loading: false
    },
    totalBankBalance: {
        data: [],
        loading: false
    },
    totalPayable: {
        data: [],
        loading: false
    },
    totalReceiveable: {
        data: [],
        loading: false
    },
};

const dashboardReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case ACTION.TOP_PRODUCTS:
            return {
                ...state,
                topProducts: payload,
            };
        case ACTION.TOTAL_BANK_BALANCE:
            return {
                ...state,
                totalBankBalance: payload
            }
        case ACTION.TOTAL_PAYABLE:
            return {
                ...state,
                totalPayable: payload
            }
        case ACTION.TOTAL_RECEIVEABLE:
            return {
                ...state,
                totalReceiveable: payload
            }
        default:
            return state;
    }
};

export default dashboardReducer;
