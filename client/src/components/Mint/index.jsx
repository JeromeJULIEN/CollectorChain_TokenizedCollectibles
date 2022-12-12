import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDao, addMainImage, addOwnershipImage, addProposal, deleteDao, deleteProposal, updatePropertyMintStatus, updateProposal } from '../../store/actions/dao';
import {Link} from 'react-router-dom';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import {InputPicker} from 'rsuite';
import axios from 'axios';
import './styles.scss'
import { addCollection, deleteAllCollections } from '../../store/actions/collections';
import FileUpload from '../Utils/FileUpload/FileUpload';
import CheckRoundIcon from '@rsuite/icons/CheckRound';



const Mint = ({connect}) => {
    //! STORE
    const daoContract = useSelector(state => state.dao.contract)
    const factoryContract = useSelector(state => state.factory.contract)
    const propertyContract = useSelector(state => state.collections.currentCollection.propertyContract)
    const digitalContract = useSelector(state => state.collections.currentCollection.digitalContract)
    const accounts = useSelector(state => state.web3.accounts)
    const web3 = useSelector(state => state.web3.web3)
    const daoList = useSelector(state => state.dao.daoList)
    const proposalList = useSelector(state => state.dao.proposalList)
    const proposalMainImage = useSelector(state => state.dao.proposalMainImage)
    const proposalOwnershipImage = useSelector(state=>state.dao.proposalOwnershipImage)
    const isLogged = useSelector(state=>state.app.isLogged)

    //! LOCAL STATE
    const [mintCollection, setMintCollection] = useState(0);
    const [mintTitle, setMintTitle] = useState('');
    const [mintDesc, setMintDesc] = useState('');
    const [mintValue, setMintValue] = useState('');
    const[mintCount,setMintCount] =useState(0);
    const[userMintProposal,setUserMintProposal]=useState([])
    // let userMintProposal = []

    const daoNameList = daoList.map(item => ({label:item.name, value:item.id}));

    const dispatch = useDispatch();

    const handleChangeMintCollection = (event) => {
        setMintCollection(event)
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
    const[mainImageOK,setMainImageOK] = useState(false);
    const[ownershipImageOK,setOwnershipImageOK] =useState(false)
    
    //! FUNCTIONS
    const askMint = async() => {
        const mintValueInWei = web3.utils.toBN(web3.utils.toWei(mintValue))
        if(mintTitle == '' || mintDesc == '' || mintValue ==''){
            alert("you have to fill all informations")
        }
        try{
            await daoContract.methods.createProposal(mintCollection, mintTitle, mintDesc,mintValueInWei,proposalOwnershipImage,proposalMainImage).call({from:accounts[0]})
            await daoContract.methods.createProposal(mintCollection, mintTitle, mintDesc,mintValueInWei,proposalOwnershipImage,proposalMainImage).send({from:accounts[0]})
            setMintCount(mintCount +1);
        } catch (error) {
            console.error(error)
        }
    }

    

    // Stockage des IPFSHash
    const changeMainImage = (value) =>{
        dispatch(addMainImage(value))
        setMainImageOK(true)
    }

    const changeOwnershipImage = (value) =>{
        dispatch(addOwnershipImage(value))
        setOwnershipImageOK(true)
    }

  
    //! EVENT
    useEffect(()=> {
        if(daoContract !== null && isLogged==true){
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
                oldCollectionCreationEvent.forEach(collection => {
                    dispatch(addCollection(collection.collectionName, collection.propertyCollectionAddress, collection.digitalCollectionAddress))});
                
                
            })()
        };

    }, [daoContract, mintCount,isLogged])

    useEffect(()=>{
    // récupération des demande de Mint de l'utilisateur connecté :
        if(isLogged === true){
            let array = []
            proposalList.map(proposal => {
                if(proposal.owner === accounts[0]) {
                    array.push(proposal)
                }
            })
            setUserMintProposal(array)

        }
    },[isLogged,accounts,proposalList])




    return (
    <div className='mint'>
        {!isLogged ? <button className='connect' onClick={connect}>connect your wallet</button> :
        <>
            <div className="titleMint">Create your collectible</div>
            <div className='mintForm'>
                <p>Whether a manufactured object, a work of Art, or an Antique, click on Mint your collectible to post your new DAO proposal for joining the verified collector chain community.</p>
                <p> Fill out the form, upload the requested documents, and submit your message to the community.</p>
            <p className='mintForm__title'>Ask for a mint</p> 
            <div className="mintForm__panel">
                    <div className="mintPanelLeft">
                        <div className="mintPanelLeft__item">
                            <p>Collection</p>
                            <InputPicker className='mintPanelLeft__item--inputPicker' data={daoNameList} id='collection' name='collection' required onChange={handleChangeMintCollection} require/>

                        </div>
                        <div className="mintPanelLeft__item">
                            <p>Mint title</p>
                            <input type="text" id='name' name='name' required value={mintTitle} onChange={handleChangeMintTitle} require/>

                        </div>
                        <div className="mintPanelLeft__item">
                            <p>Object description</p>
                            <input type="text" id='description' name='description' required value={mintDesc} onChange={handleChangeMintDesc} require/>
                        </div>
                        <div className="mintPanelLeft__item">
                            <p>Estimated value</p>
                            <input type="text" id='value' name='value' required value={mintValue} onChange={handleChangeMintValue} require/>
                        </div>
                    </div>
                    <div className="mintPanelRight">
                        <div className="mintPanelRight__doc">
                            <p>Upload the main picture of the object</p>
                            {mainImageOK ? <CheckRoundIcon className='icon'/> : <FileUpload changeMainImage={changeMainImage} />}
                            <p>Upload your proof of ownership</p>
                            {ownershipImageOK ? <CheckRoundIcon className='icon'/> : <FileUpload changeMainImage={changeOwnershipImage}/>}
                        </div>
                        {(mainImageOK==true && ownershipImageOK==true) ?
                        <button className='mintPanelRight__btn' onClick={askMint}>Send request</button>
                        : <p>Please provide the object and ownership proof picture before submit</p>}
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
                    <p className="proposalList__item__detail">{proposal.desc.substr(0, 20)}...</p>
                    <p className="proposalList__item__detail">{proposal.status}</p>
                    <button ><Link className="proposalList__item__detail--button" to={`/daoProposal/${proposal.proposalId}`}>Detail</Link></button>
                </div>
                ))}

            </div>
        </>
        }
    </div>
  )
}

export default Mint