import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { setDigitalCollection, setPropertyCollection } from '../../store/actions/collections';
import Web3 from 'web3';
import { useState } from 'react';

const Collection = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const collectionsList = useSelector(state => state.collections.collections)
    let propertyContractAddress = "";
    let digitalContractAddress= "";
    const [name, setName] = useState();
    
    
    useEffect(()=>{
        var artifact = require("../../contracts/NftProperty.json");
        if (typeof collectionsList[id] !== 'undefined') {
            propertyContractAddress = collectionsList[id].propertyContractAddress;
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            const abiProperty = artifact.abi;
            
            try {
            // address = daoArtifact.networks[networkID].address;
            let newContract = new web3.eth.Contract(abiProperty, propertyContractAddress);
            // owner = await contract.methods.owner().call()
            // console.log("owner =>",owner);
            dispatch(setPropertyCollection(newContract));
            
            } catch (err) {
                console.error(err);
            }
            digitalContractAddress = collectionsList[id].digitalContractAddress
            artifact = require('../../contracts/NftDigital.json');
            const abiDigital = artifact.abi;
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
        else {}
            
        
    }, [propertyContractAddress, digitalContractAddress])




    return (
        <>
            <div>Collection {id} {name}</div>
        </>
    )
}

export default Collection