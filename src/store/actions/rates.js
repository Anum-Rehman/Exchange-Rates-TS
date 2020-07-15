import { GET_RATES, SET_RATES, GET_ERROR } from "../types";

//action for getting rates
export const getRates = (rates) => {
    return {
        type: GET_RATES,
        payload: rates
    }
}

//action for setting rates
export const setRates = (rates) => {
    return {
        type: SET_RATES,
        payload: rates
    }
}

//action for catching error 
export const getRates_Error = (error) => {
    return {
        type: GET_ERROR,
        payload: error
    }
}
