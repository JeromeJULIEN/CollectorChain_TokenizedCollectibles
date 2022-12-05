import { ADD_COLLECTION, DELETE_ALL_COLLECTIONS, SET_DIGITAL_COLLECTION, SET_PROPERTY_COLLECTION } from "../actions/collections";

const initialState = {
    collections:[],
    currentCollection:{
        propertyContract: null,
        digitalContract: null
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
        case SET_PROPERTY_COLLECTION:{
            return{
                ...state,
                currentCollection:{
                    ...state.currentCollection,
                    propertyContract:action.contract
                }
            }
        }
        case SET_DIGITAL_COLLECTION:{
            return{
                ...state,
                currentCollection:{
                    ...state.currentCollection,
                    digitalContract:action.contract
                }
            }
        }
        default:
            return state;
    }
}

export default collectionsReducer