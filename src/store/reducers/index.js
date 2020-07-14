import { combineReducers } from "redux";
import { rateReducer } from "./rates";

const appReducer = combineReducers({
    rate: rateReducer
});

export default appReducer;