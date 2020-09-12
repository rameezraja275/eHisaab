import ACTION from "../types";

const initialState = {
    bankTransactions: [],
    banks: [],
    bankLedger: [],
};

const expenseReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case ACTION.BANK_TRANSACTIONS:
            return {
                ...state,
                bankTransactions: payload,
            };
        case ACTION.BANKS:
            return {
                ...state,
                banks: payload,
            };
        case ACTION.BANK_LEDGER:
            return {
                ...state,
                bankLedger: payload,
            };
        default:
            return state;
    }
};

export default expenseReducer;
