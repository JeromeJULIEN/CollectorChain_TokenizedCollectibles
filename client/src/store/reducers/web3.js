import { INIT_WEB3 } from "../actions/web3";

const initialState = {
    artifact: null,
    web3: null,
    accounts: null,
    networkID: null,
    contract: null
  };

const web3Reducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_WEB3 :{
            return {
                ...state,
                artifact: action.artifact,
                web3:action.web3,
                accounts: action.accounts,
                networkID: action.networkID,
                contract:action.contract
            }
        }
        default :
        return state;
    }
};

export default web3Reducer;