import { combineReducers } from "redux";


import appReducer from "./app";
import collectionsReducer from "./collections";
import daoReducer from "./dao";
import factoryReducer from "./factory";
import marketplaceReducer from "./marketplace";


const rootReducer = combineReducers({
    marketplace : marketplaceReducer,
    dao : daoReducer,
    factory : factoryReducer,
    app: appReducer,
    collections : collectionsReducer
});

export default rootReducer;