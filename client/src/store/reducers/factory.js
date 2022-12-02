import { INIT_FACTORY } from "../actions/factory";

const initialState = {
    artifact: null,
    web3: null,
    accounts: null,
    networkID: null,
    contract: null
  };

const factoryReducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_FACTORY :{
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

export default factoryReducer;