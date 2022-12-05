import { INIT_FACTORY } from "../actions/factory";

const initialState = {
    artifact: null,
    contract: null,
    owner: null,
  };

const factoryReducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_FACTORY :{
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

export default factoryReducer;