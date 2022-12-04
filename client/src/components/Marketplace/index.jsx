import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setValue } from '../../store/actions/app';
import { useState } from 'react';
import { addCollection, deleteAllCollections, setCollection  } from '../../store/actions/collections';
import {Link} from 'react-router-dom';


import Web3 from 'web3';
import "./styles.scss"


const Marketplace = () => {

    const factoryContract = useSelector(state => state.factory.contract);
    const accounts = useSelector(state => state.marketplace.accounts)
    const collectionsList = useSelector(state => state.collections.collections)
    const [newValue,setNewValue] = useState("");
    const [collectionCount, setCollectionCount] = useState(0);
    
    const dispatch = useDispatch();

    const handleValueChange = (event) =>{
        setNewValue(event.target.value)
    }

    const createCollection = async (event) => {
        if(newValue === "") {
            alert("please enter a value")
        }
        const valueToSet = newValue;
        await factoryContract.methods.createCollection(valueToSet, "__", "TOKEN").send({from : accounts[0]})
        setCollectionCount(collectionCount+1);

    };

    const [collectionCreationEvents, setCollectionCreationEvents] = useState([]);

    //! :::: GESTION EVENT COLLECTION CREATED :::::
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
                setCollectionCreationEvents(oldCollectionCreationEvent);
                dispatch(deleteAllCollections());
                oldCollectionCreationEvent.forEach(collection => {
                    console.log(collection);
                    dispatch(addCollection(collection.collectionName, collection.propertyCollectionAddress, collection.digitalCollectionAddress))});
                

                // console.log("event CCreated =>", collectionCreationEvents);
            })()
        };

    }, 
    [collectionCount, factoryContract]
    )

    // const setCurrentCollection = async(event) => {
    //     var artifact = require("../../contracts/NftProperty.json");
    //     if (artifact) {
    //         const propertyContractAddress = collectionsList[event.target.value].propertyContractAddress;
    //         const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    //         const { abi } = artifact;
    //         let contract;
    //         try {
    //         // address = daoArtifact.networks[networkID].address;
    //         contract = new web3.eth.Contract(abi, propertyContractAddress);
    //         // owner = await contract.methods.owner().call()
    //         // console.log("owner =>",owner);
    //         console.log("contract =>", contract)
    //         } catch (err) {
    //         console.error(err);
    //         }
    //         dispatch(setCollection(contract));
    
    //     }
    // }

    
    
    
    

    return (
        <div>
            <div className='collectionList'>
                our collections -
                {collectionsList.map((collection, index)=> 
                    <button className='collectionList__collection' value={index} key={index}>
                        <Link className='collectionList__collection--navLink' to={`/collection/${index}`}>{collection.name}</Link>
                    </button> )}
        
            </div>
            
            <div>
                <p>create collection :</p>
                <input type="text" placeholder='number ?' value={newValue} onChange={handleValueChange}/>
                <button onClick={createCollection}>send</button>
            </div>
            
        </div>
    )
}

export default Marketplace