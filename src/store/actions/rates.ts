import { RATES_GET_ALL, RATES_SET_ALL } from "../types";

export const getAllRates = () => {
  return { type: RATES_GET_ALL };
};

export const setAllRates = (ratesData: any) => {
  return {
    type: RATES_SET_ALL,
    ratesData,
  };
};
