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
                    {collectionId:action.collectionId, nftId: action.nftId, name:action.nftName,value:action.value,minter:action.minter,balance:action.balance, isApproved:action.approval,image:action.image}
                ]
            }
        }
        case SET_USER_DIGITAL_NFTS:{
            return{
                ...state,
                digitalNfts:[
                    ...state.digitalNfts,
                    {collectionId:action.collectionId, nftId: action.nftId,name:action.name,image:action.image}
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