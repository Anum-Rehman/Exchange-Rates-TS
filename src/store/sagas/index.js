import { takeEvery, all } from 'redux-saga/effects';

import { GET_RATES } from '../types';
import { getRatesSaga } from './rates';

export function* watchRates() {
    yield all([
        takeEvery(GET_RATES, getRatesSaga)
    ]);
}