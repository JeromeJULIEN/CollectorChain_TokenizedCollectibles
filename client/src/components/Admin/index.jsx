import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection, deleteAllCollections } from '../../store/actions/collections';
import { addMembers, deleteAllMembers } from '../../store/actions/dao';
import './admin.scss'
import JsonUpload from '../Utils/JsonUpload/JsonUpload';



const Admin = () => {

    //! STORE
    const factoryContract = useSelector(state => state.factory.contract);
    const daoContract = useSelector(state => state.dao.contract);
    const accounts = useSelector(state => state.web3.accounts);
    const web3 = useSelector(state => state.web3.web3);
    const collectionList = useSelector(state=> state.collections.collections)
    const membersList = useSelector(state=>state.dao.members)
    
    //! LOCAL STATE
    const dispatch = useDispatch();
    const [newValue,setNewValue] = useState("");
    const handleValueChange = (event) =>{
        setNewValue(event.target.value)
    }

    const [address,setAddress] = useState();
    const handleSetAddress = (event =>{
        setAddress(event.target.value)
    })

    const [updater,setUpdater] = useState(0);
    const handleUpdater = () => {
        setUpdater(updater+1)
    }

    const [file,setFile] =useState();
    const handleFile = (event) =>{
        setFile(event.target.file[0])
    }

    const test = 'coucou'

    //! EVENTS
    const [ethReceived,setEthReceived] = useState(0)
    const [transactionCount,setTransactionCount] = useState(0)
    useEffect(()=>{
        setEthReceived(0);
        setTransactionCount(0);
    },[])
    
    useEffect(() => {
        // ETH RECEIVED EVENT
        // console.log('event ETH');
        // console.log('eth should be 0',ethReceived);
        // console.log('transac should be 0',transactionCount);
        const getCollectionEvents = async() => {
        //     let ethReceivedEvent = await marketplaceContract.getPastEvents('etherReceived',{
        //         fromBlock : 0,
        //         toBlock:'latest'
        //     });
        //     console.log('ethReceivedEvent=>',ethReceivedEvent);
        //     let oldEthReceivedEvent=[];
        //     ethReceivedEvent.forEach(event => {
        //         oldEthReceivedEvent.push(
        //             {
        //                 valueReceived : web3.utils.fromWei(event.returnValues.valueReceived)
        //             });
        //     });
        //     console.log('oldReceivedEvent=>',oldEthReceivedEvent);
            
        //     let totalEthReceived = 0;
        //     oldEthReceivedEvent.forEach(receipt => {
        //         totalEthReceived = parseInt(totalEthReceived) + parseInt(receipt.valueReceived)
        //         console.log('result intermediaire',totalEthReceived);
        //     })
        //     setEthReceived(totalEthReceived)
            // setTransactionCount(oldEthReceivedEvent.length())
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
            
        }
        const getMemberEvent = async() =>{
            // MEMBER ADDED
            let memberAddedEvent = await daoContract.getPastEvents('memberAdded',{
                fromBlock : 0,
                toBlock:'latest'
             });
             let oldMemberAddedEvent=[];
             memberAddedEvent.forEach(event => {
                oldMemberAddedEvent.push(
                     {
                         newMember : event.returnValues.newMember,
                     });
             });
             console.log(oldMemberAddedEvent);
             dispatch(deleteAllMembers());
             oldMemberAddedEvent.forEach(member => {
                console.log('check');
                dispatch(addMembers(member.newMember))
            });

        }

        getCollectionEvents()
        getMemberEvent()

    },[updater])


    //! FUNCTIONS
    const createCollection = async () => {
        if(newValue === "") {
            alert("please enter a value")
        }
        const valueToSet = newValue;
        await factoryContract.methods.createCollection(valueToSet, "__", "TOKEN").call({from : accounts[0]})
        await factoryContract.methods.createCollection(valueToSet, "__", "TOKEN").send({from : accounts[0]})
        setNewValue("");
        handleUpdater();
    };

    const addMember= async() => {
        if(address === ""){
            alert("please enter an address")
        }
        await daoContract.methods.addDaoMember(address).call({from: accounts[0]})
        await daoContract.methods.addDaoMember(address).send({from: accounts[0]})
        setAddress("");
        handleUpdater();
    }

    const formatETHAddress = (s, size) =>{;
        var first = s.slice(0, size + 1);
        var last = s.slice(-size);
        return first + "..." + last;
    }
  
    return (
    <div className='admin'>
        <div className='createCollection'>
            <p>Create a new collection</p>
            <input type="text" placeholder='collection name' value={newValue} onChange={handleValueChange}/>
            <button onClick={createCollection}>Create</button>
            {collectionList.length > 0 && 
            <>
                <p>Existing collections</p>
                {collectionList.map(collection=>(<div>{collection.name}</div>))}
            </>
            }
        </div>
        <div className="daoMembers">
            <p>Add a member to the DAO</p>
            <input type="text" placeholder='user address' value={address} onChange={handleSetAddress}/>
            <button onClick={addMember}>Add</button>
            {membersList.length > 0 && 
            <>
                <p>Registered members</p>
                {membersList.map(member=>(<div>{formatETHAddress(member,4) }</div>))}
            </>
            }

        </div>
        <div className='fees'> 
            <p>collected fees : {ethReceived} eth</p> 
            <p>number of transactions : {transactionCount} </p> 

        </div>
    </div>
  )
}

export default Admin