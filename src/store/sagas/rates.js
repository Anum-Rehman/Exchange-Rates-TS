import { reject } from "q";
import { put, takeLatest, fork } from "redux-saga/effects";

import * as actions from "../actions";
import { getRates, setRates } from "../../utils/consts/api";

export function* getAllRatesSaga() {
  try {
    const resp = yield getRates();
    yield put(actions.setAllRates(resp));
  } catch (error) {
    reject(error);
  }
}