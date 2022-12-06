import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllUserNfts, setUserDigitalNfts } from '../../store/actions/app';
import './portfolio.scss';

const Portfolio = () => {

    const [toggle,setToggle] = useState("ownership");

    const handleToggle = () => {
        if(toggle === "ownership"){
            setToggle("digital")
        } else {
            setToggle("ownership")
        }
    }

    //! :::: GESTION EVENT ::::
    const collectionList = useSelector(state => state.collections.collections)
    const propertyContract = useSelector(state => state.collections.currentCollection.propertyContract);
    const digitalContract = useSelector(state => state.collections.currentCollection.digitalContract);
    const accounts = useSelector(state => state.web3.accounts);
    const web3 = useSelector(state =>state.web3.web3)
    const dispatch = useDispatch();

    useEffect(()=> {
        const artifactProperty = require("../../contracts/NftProperty.json");
        const artifactDigital = require("../../contracts/NftDigital.json");
        const abiProperty = artifactProperty.abi;
        const abiDigital = artifactDigital.abi;
        dispatch(deleteAllUserNfts())
        collectionList.forEach(async(collection) => {
            let propertyContractAddress = collection.propertyContractAddress;
            let digitalContractAddress = collection.digitalContractAddress;
            let digitalContract = new web3.eth.Contract(abiDigital, digitalContractAddress);
            let propertyContract = new web3.eth.Contract(abiDigital, propertyContractAddress);
            const nbOfDigitalMint = await digitalContract.methods._id().call({from:accounts[0]})
            console.log('nb mint digital =>', nbOfDigitalMint);
            let idArray =[]
            for (let index = 0; index < nbOfDigitalMint; index++) {
                idArray.push(index)
            }
            console.log('idArray=>',idArray);
            let userNftOwned=[]
            for await (let i of idArray ) {
                const owner = await digitalContract.methods.ownerOf(i).call({from:accounts[0]})
                console.log('owner for forAwait loop=>', owner);
                if(owner === accounts[0]){
                    // userNftOwned.push(i)
                    const nft = await digitalContract.methods.digitalNfts(0).call({from:accounts[0]})
                    dispatch(setUserDigitalNfts(nft.nftName))
                    // userNftOwned.push(nft.nftName)
                }
            }
            // userNftOwned.forEach(nft=> {
            // })
            // const nft = await digitalContract.methods.digitalNfts(0).call({from:accounts[0]})
            // console.log('nft 0=>', nft);


        });

    })
  
    return (
    <div className='portfolio'>
        <div className='title'>My portfolio</div>
        <div className="selector">
            <button className={`selector__item${toggle === "ownership"? "--active":""}`} onClick={handleToggle}>Ownership certificate</button>
            <button className={`selector__item${toggle === "digital"? "--active":""}`} onClick={handleToggle}>Digital collectible</button>
        </div>
       
    </div>
  )
}

export default Portfolio 