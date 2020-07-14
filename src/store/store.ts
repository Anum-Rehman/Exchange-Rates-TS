import createSagaMiddleware from "redux-saga";
import { watchRates } from "./sagas";
import appReducer from "./reducers";
import { compose, applyMiddleware, createStore } from "redux";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(watchRates);

export default store;
