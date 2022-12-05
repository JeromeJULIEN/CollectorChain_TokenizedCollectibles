import { combineReducers } from "redux";


import appReducer from "./app";
import collectionsReducer from "./collections";
import daoReducer from "./dao";
import factoryReducer from "./factory";
import marketplaceReducer from "./marketplace";
import web3Reducer from "./web3";


const rootReducer = combineReducers({
    web3: web3Reducer,
    marketplace : marketplaceReducer,
    dao : daoReducer,
    factory : factoryReducer,
    collections : collectionsReducer,
    app: appReducer,
});

export default rootReducer;