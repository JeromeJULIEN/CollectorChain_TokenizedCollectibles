import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDao, addProposal, deleteDao, deleteProposal } from '../../store/actions/dao';
import {Link} from 'react-router-dom';
import './styles.scss'

const Dao = () => {

    const daoContract = useSelector(state => state.dao.contract)
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
                            proposalName : event.returnValues.proposalName, 
                            proposalDesc : event.returnValues.proposalDesc
                        });
                });
                dispatch(deleteProposal())
                oldProposalCreatedEvents.forEach(proposal =>{
                    dispatch(addProposal(proposal.collectionId,proposal.proposalId,proposal.proposalName,proposal.proposalDesc))

                })
                
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
                    <p className="proposalList__item__detail">{proposal.desc}</p>
                    <p className="proposalList__item__detail">{proposal.status}</p>
                    <button className="proposalList__item__detail--button"><Link to={`/daoProposal/${proposal.proposalId}`}>Detail</Link></button>
                </div>
                ))}
            </div>
    </div>    
  )
}

export default Dao