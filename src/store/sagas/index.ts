import { takeEvery, all } from "redux-saga/effects";

import { RATES_GET_ALL } from "../types";
import { getAllRatesSaga } from "./rates";

export function* watchRates() {
  yield all([takeEvery(RATES_GET_ALL, getAllRatesSaga)]);
}
