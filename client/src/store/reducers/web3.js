import { INIT_WEB3 } from "../actions/web3";

const initialState = {
    web3: null,
    accounts: null,
    networkID: null,
  };

const web3Reducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_WEB3 :{
            return {
                ...state,
                web3:action.web3,
                accounts: action.accounts,
                networkID: action.networkID,
            }
        }
        default :
        return state;
    }
};

export default web3Reducer;