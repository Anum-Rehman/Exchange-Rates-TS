import { GET_RATES, SET_RATES, GET_ERROR } from "../types";

export const getRates = (rates) => {
    return {
        type: GET_RATES,
        payload: rates
    }
}

export const setRates = (rates) => {
    return {
        type: SET_RATES,
        payload: rates
    }
}
export const getRates_Error = (error) => {
    return {
        type: GET_ERROR,
        payload: error
    }
}
