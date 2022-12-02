import { ADD_COLLECTION, DELETE_ALL_COLLECTIONS } from "../actions/collections";

const initialState = {
    collections:[],
    currentCollection:{
        id:"",
        name:"",
        propertyContractAddress:"",
        digitalContractAddress:""
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
        default:
            return state;
    }
}

export default collectionsReducer