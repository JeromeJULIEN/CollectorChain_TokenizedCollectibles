import { DELETE_ALL_USER_NFTS, LOGIN, SET_ADMIN, SET_USER_DIGITAL_NFTS, SET_USER_PROPERTY_NFTS } from "../actions/app";

export const initialState = {
    isLogged : false,
    isAdmin : false,
    propertyNfts:[],
    digitalNfts:[]
};


const appReducer = (state = initialState,action={}) =>{
    switch(action.type){
        case LOGIN:{
            return {
                ...state,
                isLogged : action.payload
            }
        }
        case SET_ADMIN:{
            return {
                ...state,
                isAdmin : action.payload
            }
        }
        case SET_USER_PROPERTY_NFTS:{
            return{
                ...state,
                propertyNfts:[
                    ...state.propertyNfts,
                    {name:action.payload}
                ]
            }
        }
        case SET_USER_DIGITAL_NFTS:{
            return{
                ...state,
                digitalNfts:[
                    ...state.digitalNfts,
                    {name:action.payload}
                ]
            }
        }
        case DELETE_ALL_USER_NFTS:{
            return{
                ...state,
                propertyNfts:[],
                digitalNfts:[]
            }
        }
        default:
            return state;
        }
    }
    
export default appReducer;