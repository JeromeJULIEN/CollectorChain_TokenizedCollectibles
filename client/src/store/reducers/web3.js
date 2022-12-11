import { CONNECT_ACCOUNTS, INIT_WEB3 } from "../actions/web3";

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
                networkID: action.networkID,
            }
        }
        case CONNECT_ACCOUNTS:{
            return{
                ...state,
                accounts:action.payload
            }
        }
        default :
        return state;
    }
};

export default web3Reducer;