import createSagaMiddleware from "redux-saga";
import { watchRates } from "./sagas";
import appReducer from "./reducers";
import { compose, applyMiddleware, createStore } from 'redux';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    appReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

sagaMiddleware.run(watchRates);

export default store;