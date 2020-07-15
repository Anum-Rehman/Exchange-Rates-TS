import { RATES_GET_ALL, RATES_SET_ALL, GET_ERROR } from "../types";

export const getAllRates = () => {
    return { type: RATES_GET_ALL }
}

export const setAllRates = (rates) => {
    return {
        type: RATES_SET_ALL,
        payload: rates
    }
}
export const getError = (error) => {
    return {
        type: GET_ERROR,
        payload: error
    }
}