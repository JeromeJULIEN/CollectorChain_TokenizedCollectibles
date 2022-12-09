import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import "./marketplace.scss"
import { addSeller, deleteAllNftsToSell, setPropertyNftsToSell } from '../../store/actions/marketplace';
import PropertyForSellCard from '../Utils/nftCard/PropertyForSellCard/PropertyForSellCard';


const Marketplace = () => {

    //! LOCAL STATE 
    const dispatch = useDispatch();

    const [toggle,setToggle] = useState("ownership");
    const handleToggle = () => {
        if(toggle === "ownership"){
            setToggle("digital")
        } else {
            setToggle("ownership")
        }
    }

    const [updater,setUpdater] = useState(0);
    const handleUpdater = () => {
        setUpdater(updater+1)
    }

    //! STORE
    const marketplaceContract = useSelector(state => state.marketplace.contract)
    const propertyNfts = useSelector(state => state.app.propertyNfts)
    const propertyForSell = useSelector(state =>state.marketplace.propertyToSell)

    //! EVENTS
    const collectionList = useSelector(state => state.collections.collections)
    const web3 = useSelector(state =>state.web3.web3)
    // GET ALL NFTS IN SELL
    useEffect(()=> {
        const artifactProperty = require("../../contracts/NftProperty.json");
        const artifactDigital = require("../../contracts/NftDigital.json");
        const abiProperty = artifactProperty.abi;
        const abiDigital = artifactDigital.abi;
        // set to zero
        dispatch(deleteAllNftsToSell())
        // loop on each collection
        // collectionList.forEach(async(collection) => {
        //     let propertyContractAddress = collection.propertyContractAddress;
        //     let digitalContractAddress = collection.digitalContractAddress;
        //     let digitalContract = new web3.eth.Contract(abiDigital, digitalContractAddress);
        //     let propertyContract = new web3.eth.Contract(abiProperty, propertyContractAddress);
            // loop on digital subcollection
            // const nbOfDigitalMint = await digitalContract.methods._id().call({from:accounts[0]})
            // let idDigitalArray =[]
            // for (let index = 0; index < nbOfDigitalMint; index++) {
            //     idDigitalArray.push(index)
            // }
            // for await (let i of idDigitalArray ) {
            //     const nft = await digitalContract.methods.digitalNfts(i).call({from:accounts[0]})
            //     console.log('digital nft=>', nft);
            //     dispatch(setUserDigitalNfts(nft.collectionId,i,nft.nftName))
            // }
            // LOOP ON MARKETPLACE EVENT
            const getEvent= async()=> {
                let propertyToSellEvents = await marketplaceContract.getPastEvents('propertyPutOnSell',{
                    fromBlock : 0,
                    toBlock:'latest'
                });
                let oldPropertyToSellEvents=[];
                propertyToSellEvents.forEach(event => {
                    oldPropertyToSellEvents.push(
                        {
                            collectionId : event.returnValues.collectionId,
                            nftId : event.returnValues.nftId, 
                            name: event.returnValues.name,
                            seller : event.returnValues.seller,
                            quantityOnSell: event.returnValues.quantityOnSell,
                            price: event.returnValues.price,
                            image: event.returnValues.image
                        });
                });
                oldPropertyToSellEvents.forEach(event => {
                    dispatch(setPropertyNftsToSell(event.collectionId,event.nftId, event.name, event.image))
                    dispatch(addSeller(event.collectionId,event.nftId,event.seller,event.quantityOnSell,event.price))
                // const nbOfPropertylMint = await propertyContract.methods._id().call({from:accounts[0]})
                // let idPropertyArray =[]
                // for (let index = 0; index < nbOfPropertylMint; index++) {
                //     idPropertyArray.push(index)
                // }
                // for await (let i of idPropertyArray ) {
                //     const nft = await propertyContract.methods.propertyNfts(i).call({from:accounts[0]})
                //     dispatch(setPropertyNftsToSell(nft.collectionId, nft.nftId, nft.name))
                // }
                
                });
            }
            getEvent()
        },[])
    // })

    //! FUNCTIONS
    

    return (
        <div>
             <div className='titleMarketplace'>NFTs for sell</div>
        <div className="selector">
            <button className={`selector__item${toggle === "ownership"? "--active":""}`} onClick={handleToggle}>Ownership certificate</button>
            <button className={`selector__item${toggle === "digital"? "--active":""}`} onClick={handleToggle}>Digital collectible</button>
        </div>
        {toggle==='ownership' &&
        <div className="nftList">
            {propertyForSell.map(nft => (
                <PropertyForSellCard 
                    collectionId={nft.collectionId} 
                    nftId={nft.nftId} 
                    name={nft.name} 
                    seller={nft.seller} 
                    marketplaceContract={marketplaceContract}
                    updater={updater}
                    handleUpdater={handleUpdater}
                    image={nft.image} />
            ))}
        </div>
        }
        {/* {toggle==='digital' &&
        <div className="nftList">
            {digitalNfts.map(nft => (
                <NftDigitalCard name={nft.name} marketplaceContract={marketplaceContract}/>
            ))}
        </div>
        } */}
            
            
            
        </div>
    )
}

export default Marketplace