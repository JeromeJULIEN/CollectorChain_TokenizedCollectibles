import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import { addCollection, deleteAllCollections, setCollection  } from '../../store/actions/collections';
import {Link} from 'react-router-dom';
import "./styles.scss"


const Marketplace = () => {

    const factoryContract = useSelector(state => state.factory.contract);
    const collectionsList = useSelector(state => state.collections.collections)
    // const [collectionCount, setCollectionCount] = useState(0);
    
    const dispatch = useDispatch();

    

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
    [/*collectionCount,*/ factoryContract]
    )

    
    
    
    

    return (
        <div>
            <div className='collectionList'>
                our collections -
                {collectionsList.map((collection, index)=> 
                    <button className='collectionList__collection' value={index} key={index}>
                        <Link className='collectionList__collection--navLink' to={`/collection/${index}`}>{collection.name}</Link>
                    </button> )}
        
            </div>
            
            
            
        </div>
    )
}

export default Marketplace