import { combineReducers } from "redux";
import { ratesReducer } from "./rates";

const appReducer = combineReducers({
    rates: ratesReducer
});

export default appReducer;
export type RootState = ReturnType<typeof appReducer>