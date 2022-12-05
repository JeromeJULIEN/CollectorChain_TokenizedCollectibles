import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { updateProposal } from '../../store/actions/dao';
import Web3 from 'web3';
import './daoProposal.scss';
import { setDigitalCollection, setPropertyCollection } from '../../store/actions/collections';

const DaoProposal = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const web3 = useSelector(state => state.web3.web3);
    const accounts = useSelector(state => state.web3.accounts);
    const daoContract = useSelector(state => state.dao.contract);
    const owner = useSelector(state => state.dao.owner);
    const proposal = useSelector(state=> state.dao.proposalList[id]);
    const daoList = useSelector(state => state.dao.daoList);
    const collectionsList = useSelector(state => state.collections.collections)
    let propertyContractAddress = "";
    let digitalContractAddress= "";

    const [value, setValue] = useState('');
    const handleChangeValue = (event) => {
        setValue(web3.utils.toBN(event.target.value))
    }

    const voteYes = async() => {
        await daoContract.methods.vote(id, value, 0).call({from :accounts[0] });
        await daoContract.methods.vote(id, value, 0).send({from :accounts[0] });
    }

    const voteNo = async() => {
        await daoContract.methods.vote(id, 0, 1).call({from :accounts[0] });
        await daoContract.methods.vote(id, 0, 1).send({from :accounts[0] });
    }

    const closeVote = async() => {
        await daoContract.methods.closeProposal(id).call({from :accounts[0] });
        await daoContract.methods.closeProposal(id).send({from :accounts[0] })
            .on('receipt', function(receipt){
                console.log(receipt.events.proposalClosed.returnValues);
                const proposalData = receipt.events.proposalClosed.returnValues;
                dispatch(updateProposal(proposalData.proposalId,proposalData.finalValue,proposalData.votingStatus))
            });
    }

    const mintProperty = async() => {
        await propertyContractAddress.methods.mint(id,proposal.name,proposal.value,100).call({from:accounts[0]})
        await propertyContractAddress.methods.mint(id,proposal.name,proposal.value,100).send({from:accounts[0]})
            .on('receipt', function(receipt) {
                console.log(receipt);
            })
    }

    useEffect(()=>{
        console.log('entrée dans useEffect daoProposal');
        const artifactProperty = require("../../contracts/NftProperty.json");
        const artifactDigital = require("../../contracts/NftDigital.json");
        if (typeof collectionsList[id] !== 'undefined') {
            propertyContractAddress = collectionsList[proposal.daoId].propertyContractAddress;
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            const abiProperty = artifactProperty.abi;
            
            try {
            // address = daoArtifact.networks[networkID].address;
            let newContract = new web3.eth.Contract(abiProperty, propertyContractAddress);
            // owner = await contract.methods.owner().call()
            // console.log("owner =>",owner);
            dispatch(setPropertyCollection(newContract));
            
            } catch (err) {
                console.error(err);
            }
            digitalContractAddress = collectionsList[proposal.daoId].digitalContractAddress
            const abiDigital = artifactDigital.abi;
            try {
                // address = daoArtifact.networks[networkID].address;
                let newContract = new web3.eth.Contract(abiDigital, digitalContractAddress);
                // owner = await contract.methods.owner().call()
                // console.log("owner =>",owner);
                dispatch(setDigitalCollection(newContract));
                
                } catch (err) {
                    console.error(err);
                }
            console.log('fin du if');
           
    
        } 
        else {
            console.log('entrée dans le else');
        }
            
        
    }, [propertyContractAddress, digitalContractAddress])


    return (
        <div className='daoProposal'>
            <p className="daoProposal__title">Object {proposal.name} from {daoList[proposal.daoId].name} collection</p>
            <p className="daoProposal__owner">owner: {proposal.owner}</p>
            <div className="daoProposal__panel">
                <div className="panelLeft">
                    <div className="panelLeft__picture">panelLeft__picture</div>
                    <div className="panelLeft__vote">
                        <p className="panelLeft__vote__title">Voting panel</p> 
                        {proposal.status !== "pending" ? 
                        <></>
                        :
                        <>
                        <div className="panelLeft__vote__value">
                            <p>Set a value for the object (owner estimated {proposal.value} ETH)</p>
                            <input type="text" placeholder='value in ETH' value={value} onChange={handleChangeValue}/>
                        </div>
                        <div className="panelLeft__vote__setVote">
                            <button className='panelLeft__vote__setVote--no' onClick={voteNo}>Vote no</button>
                            <button className='panelLeft__vote__setVote--yes' onClick={voteYes}>Vote yes</button>
                        </div>
                        </>
                        }
                        {accounts[0] === owner ? 
                        proposal.status === "pending" ?
                        <div className='panelLeft__vote__closeVote'>
                            <button  onClick={closeVote}>Close vote</button>
                        </div>
                        :<></>
                        :<></>
                        }
                        <div className="panelLeft__vote__result">
                            {proposal.status === "accepted" ? <div className='panelLeft__vote__result--accepted'>Proposal accepted. Valued at {proposal.value} ETH</div> 
                            : proposal.status === "refused" ? <div className='panelLeft__vote__result--refused'>Proposal refused</div> 
                            : <></>}
                        </div>
                        {accounts[0] === proposal.owner && proposal.status === "accepted" ? 
                        <div>
                            <button className='panelLeft__vote__btn' onClick={mintProperty}>Mint your Proof of ownership</button> 
                            <button className='panelLeft__vote__btn'>Mint your Digital collectible</button> 
                        </div>
                        : <></>}
                    </div>
                </div>
                <div className="panelRight">
                    <div className="panelRight__desc">
                        <p className="panelRight__desc--title">Object description</p>
                        <p>{proposal.desc}</p>
                    </div>
                    <div className="panelRight__doc">
                        <p className="panelRight__doc--title">Supporting documents</p> 
                        <ul>
                            <li>document 1</li>
                            <li>document 2</li>
                            <li>document 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaoProposal