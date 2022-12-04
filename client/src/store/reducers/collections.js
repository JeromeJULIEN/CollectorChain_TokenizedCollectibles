import { ADD_COLLECTION, DELETE_ALL_COLLECTIONS, SET_COLLECTION } from "../actions/collections";

const initialState = {
    collections:[],
    currentCollection:{
        artifact: null,
        web3: null,
        accounts: null,
        networkID: null,
        contract: null
    }
};

const collectionsReducer = (state = initialState, action={})=> {
    switch(action.type){
        case ADD_COLLECTION:{
            return{
                ...state,
                collections:[
                    ...state.collections,
                    {
                        name : action.name,
                        propertyContractAddress : action.propertyAddress,
                        digitalContractAddress : action.digitalAddress
                    }
                ]
            }
        }
        case DELETE_ALL_COLLECTIONS:{
            return{
                ...state,
                collections:[]
            }
        }
        case SET_COLLECTION:{
            return{
                ...state,
                currentCollection:{
                    contract:action.contract
                }
            }
        }
        default:
            return state;
    }
}

export default collectionsReducer