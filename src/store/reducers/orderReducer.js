import ACTION from "../types";

const initialState = {
    orders: [],
    orderDetails: [],
    totalUnreadOrder: null
};

const ordersReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case ACTION.ORDER_GET:
            return {
                ...state,
                orders: payload,
            };
        case ACTION.ORDER_DETAILS_GET:
            return {
                ...state,
                orderDetails: payload
            }
        case ACTION.UNREAD_ORDERS_COUNT:
            return {
                ...state,
                totalUnreadOrder: payload
            }
        default:
            return state;
    }
};

export default ordersReducer;
