import ACTION from "../types";

const initialState = {
    products: [],
    isLoadMore: true
};

const productReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case ACTION.STORE_PRODUCT_GET_SUCCESS:
            return {
                ...state,
                products: payload,
            };
        case ACTION.IS_LOADMORE:
            return {
                ...state,
                isLoadMore: payload,
            };
        default:
            return state;
    }
};

export default productReducer;
