import { ADD_DAO, ADD_PROPOSAL, DELETE_DAO, DELETE_PROPOSAL, INIT_DAO, UPDATE_DIGITAL_MINT_STATUS, UPDATE_PROPERTY_MINT_STATUS, UPDATE_PROPOSAL } from "../actions/dao";

const initialState = {
    artifact: null,
    contract: null,
    owner: null,
    daoList :[],
    proposalList:[]
  };

const daoReducer = (state = initialState,action={})=>{
    switch (action.type){
        case INIT_DAO :{
            return {
                ...state,
                artifact: action.artifact,
                contract:action.contract,
                owner: action.owner,
            }
        }
        case ADD_DAO:{
            return {
                ...state,
                daoList:[
                    ...state.daoList,
                    {id:action.daoId,name:action.daoName, proposalList:[]}
                ]
            }
        }
        case DELETE_DAO:{
            return {
                ...state,
                daoList:[]
            }
        }
        case ADD_PROPOSAL:{
            return{
                ...state,
                proposalList:[
                    ...state.proposalList,
                    {daoId:action.collectionId, 
                    proposalId:action.proposalId, 
                    owner:action.proposalOwner, 
                    name:action.proposalName,
                    desc:action.proposalDesc, 
                    value:action.proposalValue ,
                    status:"pending", 
                    propertyNftMinted:false,
                    digitalNftMinted:false,
                    docOwnership:action.docOwnership,
                    docEstimation:action.docEstimation
                    }
                ]    
            }
        }
        case DELETE_PROPOSAL:{
            return{
                ...state,
                proposalList:[]
            }
        }
        case UPDATE_PROPOSAL:{
            return{
                ...state,
                proposalList:
                    // ...state.proposalList,
                    state.proposalList.map(proposal => {
                        if (proposal.proposalId == action.proposalId) {
                            return {...proposal, value:action.finalValue, status:action.status}
                        }
                        return proposal;
                    })
                    
                
            }
        }
        case UPDATE_PROPERTY_MINT_STATUS:{
            return{
                ...state,
                proposalList:
                    state.proposalList.map(proposal => {
                        if (proposal.proposalId == action.proposalId) {
                            return {...proposal, propertyNftMinted:true}
                        }
                        return proposal;
                    })
            }
        }
        case UPDATE_DIGITAL_MINT_STATUS:{
            return{
                ...state,
                proposalList:
                    state.proposalList.map(proposal => {
                        if (proposal.proposalId == action.proposalId) {
                            return {...proposal, digitalNftMinted:true}
                        }
                        return proposal;
                    })
            }
        }
        default :
        return state;
    }
};

export default daoReducer;

// case ADD_PROPOSAL:{
//     return{
//         ...state,
//         daoList:[
//             ...state.daoList,
//             daoList[action.collectionId].proposalList:[
//                 ...state.daoList.ProposalList,
//                 {id:action.proposalId, name:action.proposalName,desc:action.proposalDesc}
//             ] 
//         ]             
//     }
// }


// case ADD_PROPOSAL:{
//     console.log("entré dans ADD PROPOSAL");
//     return{
//         ...state,
//         daoList: state.daoList.map(
//             dao => dao.id === action.collectionId ? {...dao, proposalList: dao.proposalList.push({id:action.proposalId, name:action.proposalName,desc:action.proposalDesc})} : dao
//         )       
//     }
// }

//! marche presque, mais l'écriture ne se fait pas au bon niveau
// case ADD_PROPOSAL:{
//     console.log("entrée dans add proposal", action);
//     const proposalArray = state.daoList[action.collectionId].proposalList
//     console.log('oldProposalArray=>', proposalArray);
//     proposalArray.push({id:action.proposalId, name:action.proposalName,desc:action.proposalDesc})  
//     console.log('newProposalArray=>', proposalArray);
//     return{
//         ...state,
//         daoList: [
//             ...state.daoList,
//             state.daoList.map(
//                 dao => dao.id == action.collectionId ? { proposalList:proposalArray} : {}
//             )        
//         ]       
//     }
// }