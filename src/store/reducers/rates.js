import { SET_RATES, GET_ERROR, GET_RATES } from "../types";

const initialState = {
    rates: null,
    loading: true,
    error: null
};

//reducer function for rates
export const rateReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_RATES:
            return { ...state, rates: action.payload, loading: false };
        case GET_RATES:
            return { ...state, rates: action.payload, loading: false };
        case GET_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}