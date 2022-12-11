import { ADD_FEES, ADD_SELLER, DELETE_ALL_NFTS_TO_SELL, DELETE_FEES, DELETE_TRANSACTION_COUNT, INCREMENT_TRANSACTION_COUNT, INIT_MARKETPLACE, SET_PROPERTY_NFTS_TO_SELL, UPDATE_QUANTITY_TO_SELL, UPDATE_SELLER_BALANCE } from "../actions/marketplace";

const initialState = {
    artifact: null,
    contract: null,
    owner:null,
    transactionCount:0,
    fees:0,
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
        case UPDATE_QUANTITY_TO_SELL:{
            return{
                ...state,
                // propertyToSell:
                //     state.propertyToSell.map(nft =>{
                //         if((nft.collectionId === action.collectionId && nft.nftId === action.nftId)) {
                //             return{
                //                 ...nft,
                //                 seller:[
                //                     nft.seller.map(seller =>{
                //                         if(seller == action.seller) {
                //                             console.log('seller',seller)
                //                             return{
                //                                 ...seller,
                //                                 quantity:state.propertyToSell.seller.quantity - action.quantity
                //                             }
                //                         }
                //                         return seller
                //                     })
                //                 ]
                //             }
                //         }
                //         return nft
                //     })
            }
        }
        case DELETE_TRANSACTION_COUNT:{
            return{
                ...state,
                transactionCount:0
            }
        }
        case INCREMENT_TRANSACTION_COUNT:{
            return{
                ...state,
                transactionCount : state.transactionCount+1
            }
        }
        case DELETE_FEES:{
            return{
                ...state,
                fees:0
            }
        }
        case ADD_FEES:{
            console.log("value from reducer",action.payload,typeof(action.payload));
            return{
                ...state,
                fees:state.fees+action.payload
            }
        }
    
        default :
        return state;
    }
};

export default marketplaceReducer;