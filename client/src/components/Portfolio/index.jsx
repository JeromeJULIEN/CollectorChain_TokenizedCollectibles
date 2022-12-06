import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllUserNfts, setUserDigitalNfts, setUserPropertyNfts } from '../../store/actions/app';
import NftDigitalCard from '../Utils/nftCard/NftDigitalCard';
import NftPropertyCard from '../Utils/nftCard/NftPropertyCard';
import './portfolio.scss';

const Portfolio = () => {
    //! STORE
    const propertyNfts = useSelector(state =>state.app.propertyNfts);
    const digitalNfts = useSelector(state =>state.app.digitalNfts);


    //! LOCAL STATE
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
    const accounts = useSelector(state => state.web3.accounts);
    const web3 = useSelector(state =>state.web3.web3)
    const dispatch = useDispatch();

    // GET ALL NFTS OF THE USER
    useEffect(()=> {
        const artifactProperty = require("../../contracts/NftProperty.json");
        const artifactDigital = require("../../contracts/NftDigital.json");
        const abiProperty = artifactProperty.abi;
        const abiDigital = artifactDigital.abi;
        // set to zero
        dispatch(deleteAllUserNfts())
        // loop on each collection
        collectionList.forEach(async(collection) => {
            let propertyContractAddress = collection.propertyContractAddress;
            let digitalContractAddress = collection.digitalContractAddress;
            let digitalContract = new web3.eth.Contract(abiDigital, digitalContractAddress);
            let propertyContract = new web3.eth.Contract(abiProperty, propertyContractAddress);
            // loop on digital subcollection
            const nbOfDigitalMint = await digitalContract.methods._id().call({from:accounts[0]})
            let idDigitalArray =[]
            for (let index = 0; index < nbOfDigitalMint; index++) {
                idDigitalArray.push(index)
            }
            for await (let i of idDigitalArray ) {
                const owner = await digitalContract.methods.ownerOf(i).call({from:accounts[0]})
                if(owner === accounts[0]){
                    const nft = await digitalContract.methods.digitalNfts(i).call({from:accounts[0]})
                    dispatch(setUserDigitalNfts(nft.nftName))
                }
            }
            // loop on property subcollection
            const nbOfPropertylMint = await propertyContract.methods._id().call({from:accounts[0]})
            let idPropertyArray =[]
            for (let index = 0; index < nbOfPropertylMint; index++) {
                idPropertyArray.push(index)
            }
            for await (let i of idPropertyArray ) {
                const balance = await propertyContract.methods.balanceOf(accounts[0],i).call({from:accounts[0]})
                if(balance > 0){
                    const nft = await propertyContract.methods.propertyNfts(i).call({from:accounts[0]})
                    dispatch(setUserPropertyNfts(nft.name, balance))
                }
            }
        });

    },[accounts[0]])
  
    return (
    <div className='portfolio'>
        <div className='title'>My portfolio</div>
        <div className="selector">
            <button className={`selector__item${toggle === "ownership"? "--active":""}`} onClick={handleToggle}>Ownership certificate</button>
            <button className={`selector__item${toggle === "digital"? "--active":""}`} onClick={handleToggle}>Digital collectible</button>
        </div>
        {toggle==='ownership' &&
        <div className="nftList">
            {propertyNfts.map(nft => (
                <NftPropertyCard name={nft.name} balance={nft.balance}/>
            ))}
        </div>
        }
        {toggle==='digital' &&
        <div className="nftList">
            {digitalNfts.map(nft => (
                <NftDigitalCard name={nft.name}/>
            ))}
        </div>
        }
       
    </div>
  )
}

export default Portfolio 