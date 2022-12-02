import { INIT_DAO } from "../actions/dao";

const initialState = {
    artifact: null,
    web3: null,
    accounts: null,
    networkID: null,
    contract: null
  };

const daoReducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_DAO :{
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

export default daoReducer;