import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDao, addProposal, deleteDao, deleteProposal, updatePropertyMintStatus, updateProposal } from '../../store/actions/dao';
import {Link} from 'react-router-dom';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import {InputPicker} from 'rsuite';
import './styles.scss'


const Mint = () => {
    const daoContract = useSelector(state => state.dao.contract)
    const propertyContract = useSelector(state => state.collections.currentCollection.propertyContract)
    const digitalContract = useSelector(state => state.collections.currentCollection.digitalContract)
    const accounts = useSelector(state => state.web3.accounts)
    const web3 = useSelector(state => state.web3.web3)
    const daoList = useSelector(state => state.dao.daoList)
    const proposalList = useSelector(state => state.dao.proposalList)

    const [mintCollection, setMintCollection] = useState(0);
    const [mintTitle, setMintTitle] = useState('');
    const [mintDesc, setMintDesc] = useState('');
    const [mintValue, setMintValue] = useState('');
    const[mintCount,setMintCount] =useState(0);

    const daoNameList = daoList.map(item => ({label:item.name, value:item.id}));

    const dispatch = useDispatch();

    const handleChangeMintCollection = (event) => {
        setMintCollection(web3.utils.toBN(event.target.value))
    }
    const handleChangeMintTitle = (event) => {
        setMintTitle(event.target.value)
    }
    const handleChangeMintDesc = (event) => {
        setMintDesc(event.target.value)
    }
    const handleChangeMintValue = (event) => {
        setMintValue(event.target.value)
    }
    
    const askMint = async() => {
        try{
            await daoContract.methods.createProposal(mintCollection, mintTitle, mintDesc,mintValue).call({from:accounts[0]})
            await daoContract.methods.createProposal(mintCollection, mintTitle, mintDesc,mintValue).send({from:accounts[0]})
            setMintCount(mintCount +1);
        } catch (error) {
            console.error(error)
        }
    }
  

    useEffect(()=> {
        if(daoContract !== null){
            (async () => {
                // DAO CREATION EVENT
                let daoCreatedEvents = await daoContract.getPastEvents('daoCreated',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldDaoCreatedEvents=[];
                daoCreatedEvents.forEach(event => {
                    oldDaoCreatedEvents.push(
                        {
                            daoId : event.returnValues.daoId,
                            daoName : event.returnValues.daoName,
                        });
                });
                dispatch(deleteDao())
                oldDaoCreatedEvents.forEach(dao => {
                    dispatch(addDao(dao.daoId,dao.daoName))
                })
                // MINT PROPOSAL REGISTRATION INFORMATION
                let proposalCreatedEvents = await daoContract.getPastEvents('proposalCreated',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldProposalCreatedEvents=[];
                proposalCreatedEvents.forEach(event => {
                    oldProposalCreatedEvents.push(
                        {
                            collectionId : event.returnValues.daoId,
                            proposalId : event.returnValues.proposalId,
                            proposalOwner : event.returnValues.owner,
                            proposalName : event.returnValues.proposalName, 
                            proposalDesc : event.returnValues.proposalDesc,
                            proposalValue : event.returnValues.value
                        });
                });
                dispatch(deleteProposal())
                oldProposalCreatedEvents.forEach(proposal =>{
                    dispatch(addProposal(proposal.collectionId,proposal.proposalId,proposal.proposalOwner,proposal.proposalName,proposal.proposalDesc, proposal.proposalValue))
                })
                // CLOSED PROPOSAL EVENT
                let closedProposalEvents = await daoContract.getPastEvents('proposalClosed',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldClosedProposalEvents=[];
                closedProposalEvents.forEach(event => {
                    oldClosedProposalEvents.push(
                        {
                            proposalId : event.returnValues.proposalId,
                            value : event.returnValues.finalValue, 
                            status : event.returnValues.votingStatus,
                        });
                });
                oldClosedProposalEvents.forEach(proposal =>{
                    dispatch(updateProposal(proposal.proposalId,proposal.value,proposal.status))
                })
                
                
            })()
        };

    }, [daoContract, mintCount])


    // récupération des demande de Mint de l'utilisateur connecté :
    let userMintProposal = []
    proposalList.map(proposal => {
        if(proposal.owner === accounts[0]) {
            userMintProposal.push(proposal)
        }
    })


    return (
    <div className='mint'>
        <div className='mintForm'>
           <p className='mintForm__title'>Ask for a mint</p> 
           <div className="mintForm__panel">
                <div className="panelLeft">
                    <div className="panelLeft__item">
                        <p>Collection</p>
                        <InputPicker className='panelLeft__item--inputPicker' data={daoNameList} id='collection' name='collection' required onChange={handleChangeMintCollection}/>

                    </div>
                    <div className="panelLeft__item">
                        <p>Mint title</p>
                        <input type="text" id='name' name='name' required value={mintTitle} onChange={handleChangeMintTitle}/>

                    </div>
                    <div className="panelLeft__item">
                        <p>Object description</p>
                        <input type="text" id='description' name='description' required value={mintDesc} onChange={handleChangeMintDesc}/>
                    </div>
                    <div className="panelLeft__item">
                        <p>Estimated value</p>
                        <input type="text" id='value' name='value' required value={mintValue} onChange={handleChangeMintValue}/>
                    </div>
                </div>
                <div className="panelRight">
                    <div className="panelRight__doc">
                        Provide supporting documents <PlusRoundIcon className='icon'/>
                    </div>
                    <button className='panelRight__btn' onClick={askMint}>Send request</button>
                </div>

           </div>
        </div>
        <div className="proposalList">
            <p className='proposalList__title'>Your minting demands</p>
            <div className="proposalList__legend">
                <p className="proposalList__legend__detail">Collection</p>
                <p className="proposalList__legend__detail">Object</p>
                <p className="proposalList__legend__detail">Description</p>
                <p className="proposalList__legend__detail">Status</p>
                <p className="proposalList__legend__detail">Action</p>
            </div>
            {userMintProposal.map(proposal => (
            <div className="proposalList__item">
                <p className="proposalList__item__detail">{daoList[proposal.daoId].name}</p>
                <p className="proposalList__item__detail">{proposal.name}</p>
                <p className="proposalList__item__detail">{proposal.desc.substr(0, 50)}...</p>
                <p className="proposalList__item__detail">{proposal.status}</p>
                <button ><Link className="proposalList__item__detail--button" to={`/daoProposal/${proposal.proposalId}`}>Detail</Link></button>
            </div>
            ))}

        </div>
    </div>
  )
}

export default Mint