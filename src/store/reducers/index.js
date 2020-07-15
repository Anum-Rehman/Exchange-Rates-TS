import { combineReducers } from "redux";
import { rateReducer } from "./rates";

//index for reducers
const appReducer = combineReducers({
    rate: rateReducer
});

export default appReducer;