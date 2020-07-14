import { RATES_SET_ALL, RATES_ERROR } from "../types";

const initialState = {
    rates: null,
    loading: true
  };

export const rateReducer = (state = [], action) => {
    switch (action.type) {
        case RATES_SET_ALL:
            return { ...state, rates: action.payload, loading: false };
        case RATES_GET_ALL:
            return { ...state, rates: action.payload, loading: false};
        case RATES_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}