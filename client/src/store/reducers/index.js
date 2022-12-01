import { combineReducers } from "redux";


import appReducer from "./app";
import web3Reducer from "./web3";


const rootReducer = combineReducers({
    web3 : web3Reducer,
    app: appReducer
});

export default rootReducer;