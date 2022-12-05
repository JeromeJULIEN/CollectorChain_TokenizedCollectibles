import { LOGIN, SET_ADMIN } from "../actions/app";

export const initialState = {
    isLogged : false,
    isAdmin : false,
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
        default:
            return state;
        }
    }
    
export default appReducer;