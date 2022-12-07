import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { updateDigitalMintStatus, updatePropertyMintStatus, updateProposal } from '../../store/actions/dao';
import Web3 from 'web3';
import './daoProposal.scss';
import { addCollection, deleteAllCollections, setDigitalCollection, setPropertyCollection } from '../../store/actions/collections';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

const DaoProposal = () => {
    const {id} = useParams();
    
    const dispatch = useDispatch();
    
    const web3 = useSelector(state => state.web3.web3);
    const accounts = useSelector(state => state.web3.accounts);
    const daoContract = useSelector(state => state.dao.contract);
    const owner = useSelector(state => state.dao.owner);
    const proposal = useSelector(state=> state.dao.proposalList[id]);
    const daoList = useSelector(state => state.dao.daoList);
    const collectionsList = useSelector(state => state.collections.collections);
    const propertyContract = useSelector(state => state.collections.currentCollection.propertyContract);
    const digitalContract = useSelector(state => state.collections.currentCollection.digitalContract);
    const factoryContract = useSelector(state => state.factory.contract);
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
        var BN = web3.utils.BN;
        await propertyContract.methods.mintPropertyNft(id,proposal.name,proposal.value,new BN(100),accounts[0]).call({from:accounts[0]})
        await propertyContract.methods.mintPropertyNft(id,proposal.name,proposal.value,web3.utils.toBN(100),accounts[0]).send({from:accounts[0]})
    }

    const mintDigital = async() => {
        await digitalContract.methods.mintDigitalNft(id,proposal.name,"__").call({from:accounts[0]})
        await digitalContract.methods.mintDigitalNft(id,proposal.name,'__').send({from:accounts[0]})
            .on('receipt', function(receipt) {
                console.log(receipt);
            })
    }

    const getProposalStatus = async() => {
        await daoContract.methods.getProposalStatus(id).send({from:accounts[0]})
            .on('receipt', function(receipt) {
                console.log(receipt);
            })
    }

     //! :::: GESTION EVENT  :::::
     useEffect(()=> {
        if(factoryContract !== null){
            (async () => {
                // VOTER REGISTRATION INFORMATION
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
                oldCollectionCreationEvent.forEach(collection => {
                    dispatch(addCollection(collection.collectionName, collection.propertyCollectionAddress, collection.digitalCollectionAddress))});
                // PROPERTY MINT EVENT
                let propertyMintEvents = await daoContract.getPastEvents('propertyMinted',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldPropertyMintEvents=[];
                propertyMintEvents.forEach(event => {
                    oldPropertyMintEvents.push(
                        {
                            proposalId : event.returnValues.proposalId,
                            propertyMintStatus : event.returnValues.propertyMinted, 
                        });
                });
                oldPropertyMintEvents.forEach(mint =>{
                    dispatch(updatePropertyMintStatus(mint.proposalId,mint.propertyMintStatus))
                })
                // DIGITAL MINT EVENT
                let digitalMintEvents = await daoContract.getPastEvents('digitalMinted',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldDigitalMintEvents=[];
                digitalMintEvents.forEach(event => {
                    oldDigitalMintEvents.push(
                        {
                            proposalId : event.returnValues.proposalId,
                            digitalMintStatus : event.returnValues.digitalMinted, 
                        });
                });
                oldDigitalMintEvents.forEach(mint =>{
                    dispatch(updateDigitalMintStatus(mint.proposalId,mint.digitalMintStatus))
                })

                // console.log("event CCreated =>", collectionCreationEvents);
            })()
        };

    }, [/*collectionCount,*/ factoryContract]
    )

    useEffect(()=>{
        const artifactProperty = require("../../contracts/NftProperty.json");
        const artifactDigital = require("../../contracts/NftDigital.json");
        if (collectionsList[proposal.daoId] !== null) {
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
    
        } 
        else {
            console.log('entrée dans le else');
        }
            
        
    }, [propertyContractAddress, digitalContractAddress])
    console.log('proposal=>',proposal.digitalNftMinted);

    return (
        <div className='daoProposal'>
            <p className="daoProposal__title">Object {proposal.name} from {daoList[proposal.daoId].name} collection</p>
            <p className="daoProposal__owner">Minter: {proposal.owner}</p>
            <div className="daoProposal__panel">
                <div className="panelLeft">
                    <div className="panelLeft__picture">panelLeft__picture</div>
                    <div className="panelLeft__vote">
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
                            {proposal.propertyNftMinted ? <div className='panelLeft__vote__message'>Proof of ownership already minted <CheckRoundIcon className='panelLeft__vote__message--green'/></div>
                             :<button className='panelLeft__vote__btn' onClick={mintProperty}>Mint your Proof of ownership</button> 
                             }
                            {proposal.digitalNftMinted ? <div className='panelLeft__vote__message'>Digital collectible already minted <CheckRoundIcon className='panelLeft__vote__message--green'/></div>
                             :<button className='panelLeft__vote__btn' onClick={mintDigital}>Mint your Digital collectible</button> 
                             } 
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