import { ADD_SELLER, DELETE_ALL_NFTS_TO_SELL, INIT_MARKETPLACE, SET_PROPERTY_NFTS_TO_SELL, UPDATE_SELLER_BALANCE } from "../actions/marketplace";

const initialState = {
    artifact: null,
    contract: null,
    owner:null,
    propertyToSell:[],
    digitalToSell:[]
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
        case DELETE_ALL_NFTS_TO_SELL:{
            return {
                ...state,
                propertyToSell:[],
                digitalToSell:[]
            }
        }
        case SET_PROPERTY_NFTS_TO_SELL:{
            return{
                ...state,
                propertyToSell:[
                    ...state.propertyToSell,
                    {collectionId:action.collectionId,nftId:action.nftId,name:action.name,image:action.image,seller:[]}
                ]
            }
        }
        case ADD_SELLER:{
            return{
                ...state,
                propertyToSell:
                    state.propertyToSell.map(nft =>{
                        if((nft.collectionId === action.collectionId && nft.nftId === action.nftId)) {
                            return{...nft,
                            seller :[
                                ...nft.seller,
                                {seller:action.seller,quantity:action.quantity,price:action.price}
                            ]
                            }
                        }
                        return nft
                    })
                
            }
        }
    
        default :
        return state;
    }
};

export default marketplaceReducer;