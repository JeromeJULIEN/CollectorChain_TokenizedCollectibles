import {  SET_VALUE } from "../actions/app";

export const initialState = {
    value:666
};


const appReducer = (state = initialState,action={}) =>{
    switch(action.type){
        case SET_VALUE:{
            return {
                ...state,
                value:action.payload
            }
        }
        default:
            return state;
        }
    }
    
export default appReducer;