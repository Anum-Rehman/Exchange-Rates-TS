import { reject } from "q";
import { put } from "redux-saga/effects";
import * as actions from "../actions";
import http from "../../utils/config/http";
import { API_URL } from "../../utils/consts/api";

export function* getAllRatesSaga() {
  try {
    const resp = yield http.get(API_URL);
    yield put(actions.setAllRates(resp.data));
  } catch (error) {
    reject(error);
  }
}
