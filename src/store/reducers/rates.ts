import { RATES_SET_ALL } from "../types";

export const ratesReducer = (state = [], action: any) => {
  switch (action.type) {
    case RATES_SET_ALL:
      return { ...state, all: action.rates };
    default:
      return state;
  }
};