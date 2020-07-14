import { reject } from "q";
import { put, takeLatest, fork } from 'redux-saga/effects';

import * as actions from '../actions';
import {getRates, setRates} from '../../utils/consts/api';

export function* getAllRatesSaga() {
    try {
        const resp = yield getRates()
        const data = yield resp
        yield put({type: "RATES_GET_ALL", payload: data});
        yield takeLatest('RATES_GET_ALL', getAllRatesSaga())
    } catch (error) {
        reject(error);
    }
}