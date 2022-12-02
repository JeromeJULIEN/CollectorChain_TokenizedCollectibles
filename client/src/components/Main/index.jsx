import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setValue } from '../../store/actions/app';
import { useState } from 'react';
import { addCollection, deleteAllCollections } from '../../store/actions/collections';
import "./styles.scss"




const Main = () => {

    
    const value = useSelector(state => state.app.value);
    const marketplace = useSelector(state => state.marketplace)
    const factoryContract = useSelector(state => state.factory.contract);
    const accounts = useSelector(state => state.marketplace.accounts)
    const collections = useSelector(state => state.collections.collections)
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
    [collectionCount, marketplace]
    )

    
    

    return (
        <div>
            
            <div>
                <p>create collection :</p>
                <input type="text" placeholder='number ?' value={newValue} onChange={handleValueChange}/>
                <button onClick={createCollection}>send</button>
            </div>
            <div className='collectionList'>
                {collections.map(collection=> <button>{collection.name}</button> )}
            </div>
            
        </div>
    )
}

export default Main