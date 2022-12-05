import { INIT_MARKETPLACE } from "../actions/marketplace";

const initialState = {
    artifact: null,
    contract: null,
    owner:null,
  };

const marketplaceReducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_MARKETPLACE :{
            return {
                ...state,
                artifact: action.artifact,
                contract:action.contract,
                owner:action.owner,
            }
        }
        default :
        return state;
    }
};

export default marketplaceReducer;