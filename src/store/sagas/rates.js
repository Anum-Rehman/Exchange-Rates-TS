import { reject } from "q";
import { put } from "redux-saga/effects";
import * as actions from "../actions";
import { getRates } from "../../utils/consts/api";

export function* getRatesSaga() {
  try {
    const resp = yield getRates();
    yield put(actions.setRates(resp.data));
  } catch (error) {
    yield put(actions.getRates_Error(error));
    reject(error);
  }
}