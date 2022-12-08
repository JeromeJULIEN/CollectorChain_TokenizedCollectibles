import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDao, addProposal, deleteDao, deleteProposal, updateProposal } from '../../store/actions/dao';
import {Link} from 'react-router-dom';
import './styles.scss'
import { addCollection, deleteAllCollections } from '../../store/actions/collections';

const Dao = () => {

    const daoContract = useSelector(state => state.dao.contract)
    const factoryContract = useSelector(state => state.factory.contract)
    const daoList = useSelector(state => state.dao.daoList)
    const proposalList = useSelector(state => state.dao.proposalList)

    const dispatch = useDispatch();

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
                            proposalValue : event.returnValues.value,
                            docOwnership:event.returnValues.docOwnership,
                            mainImage:event.returnValues.mainImage
                        });
                });
                dispatch(deleteProposal())
                oldProposalCreatedEvents.forEach(proposal =>{
                    dispatch(addProposal(
                        proposal.collectionId,
                        proposal.proposalId,
                        proposal.proposalOwner,
                        proposal.proposalName,
                        proposal.proposalDesc, 
                        proposal.proposalValue,
                        proposal.docOwnership,
                        proposal.mainImage))
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
                // COLLECTION ADDED
                let collectionCreationEvent = await factoryContract.getPastEvents('collectionCreated',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldCollectionCreationEvent=[];
                collectionCreationEvent.forEach(event => {
                    oldCollectionCreationEvent.push(
                        {
                            collectionName : event.returnValues.collectionName,
                            propertyCollectionAddress : event.returnValues.propertyCollectionAddress, 
                            digitalCollectionAddress : event.returnValues.digitalCollectionAddress
                        });
                });
                dispatch(deleteAllCollections());
                console.log('oldcollectionevent', collectionCreationEvent)
                oldCollectionCreationEvent.forEach(collection => {
                    dispatch(addCollection(collection.collectionName, collection.propertyCollectionAddress, collection.digitalCollectionAddress))});
                
            })()
        };

    }, [daoContract]
    )
    return (
    <div className='dao'>
            <p className='dao__title'>Mint proposals :</p> 
            <p className='dao__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto culpa corporis est sapiente autem qui vero eveniet, unde nobis, dicta ab repellat. Iste labore eum consequuntur itaque, totam tempore aliquam.
            Molestias dolor, aperiam atque laborum sapiente voluptates error itaque velit officia expedita illo modi, eligendi perspiciatis explicabo, maxime corrupti quisquam? Odio architecto, aspernatur earum optio error velit iure facilis quasi? </p>
            <div className='proposalList'>
                <div className="proposalList__legend">
                    <p className="proposalList__legend__detail">Collection</p>
                    <p className="proposalList__legend__detail">Object</p>
                    <p className="proposalList__legend__detail">Description</p>
                    <p className="proposalList__legend__detail">Status</p>
                    <p className="proposalList__legend__detail">Action</p>
                </div>
                {proposalList.map(proposal => (
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

export default Dao