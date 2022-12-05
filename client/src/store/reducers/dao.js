import { ADD_DAO, ADD_PROPOSAL, DELETE_DAO, DELETE_PROPOSAL, INIT_DAO } from "../actions/dao";

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
                    {daoId:action.collectionId, proposalId:action.proposalId,name:action.proposalName,desc:action.proposalDesc, status:"pending"}
                ]    
            }
        }
        case DELETE_PROPOSAL:{
            return{
                ...state,
                proposalList:[]
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