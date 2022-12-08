import React, { useState } from 'react'
import './propertyForSellCard.scss'
import {Modal} from 'rsuite';
import { useSearch } from 'rsuite/esm/Picker';
import { setPropertyCollection } from '../../../../store/actions/collections';
import { useDispatch, useSelector } from 'react-redux';

const PropertyForSellCard = ({
  collectionId,
  nftId,
  name, 
  seller,
  marketplaceContract,
  updater,
  handleUpdater,
  image}) => {
  //! LOCAL STATE
  const dispatch = useDispatch()
  const [openBuy, setOpenBuy] = useState(false);
  const handleOpenBuy = () => setOpenBuy(true);
  const handleCloseBuy = () => {
    setOpenBuy(false)
    setSimulate(false)
    setQuantity(0)
  };

  const [quantity, setQuantity] = useState("");
  const handleSetQuantity = (event) => setQuantity(event.target.value);

  const [simulate,setSimulate] = useState(false)
  const handleSetSimulate = () => {
    // console.log('qty=>',quantity,'blc=>',balance);
    // if(quantity>balance) {
    //   alert ("you don't have enough shares to sell")
    // }else 
    if(simulate ===false) {
      setSimulate(true)
    } else {
      setSimulate(false)
      setQuantity(0)
    }

  }

  const handleModify = () => {
    setSimulate(false)
      setQuantity(0)
  }

  let floorPrice = 0
  seller.map(seller => {
    if(seller.price > floorPrice) {
      floorPrice = seller.price
    };
  })

  let totalQuantity = 0
  seller.map(seller => {
    totalQuantity = parseInt(totalQuantity) + parseInt(seller.quantity)
  })

  //! STORE
  const propertyContractAddress = useSelector(state => state.collections.collections[collectionId].propertyContractAddress)
  const accounts = useSelector(state => state.web3.accounts)
  const web3 = useSelector(state => state.web3.web3)

  //! EVENTS

  //! FUNCTIONS
  const buyPropertyNft =async() =>{
    // const valueToSend = quantity*sellerPrice;
    const valueToSend = web3.utils.toWei(web3.utils.toBN((quantity*sellerPrice),'ether'));
    console.log('valuetosend=>',valueToSend);
    // console.log('toWei=>',web3.utils.toWei(web3.utils.toBN(valueToSend) ,'ether' ));
    console.log('toWei=>',valueToSend);
    try{
      await marketplaceContract.methods.buyPropertyItem(propertyContractAddress,nftId,quantity,sellerAddress)
      .call({from:accounts[0],value:valueToSend });
      await marketplaceContract.methods.buyPropertyItem(propertyContractAddress,nftId,quantity,sellerAddress)
      .send({from:accounts[0],value:valueToSend });
    } catch(error){
      console.log(error);
    }
  }
  
  const formatETHAddress = (s, size) =>{;
    var first = s.slice(0, size + 1);
    var last = s.slice(-size);
    return first + "..." + last;
  }

  const [sellerAddress,setSellerAddress] = useState()
  const [sellerPrice,setSellerPrice] = useState()
  const handleSetSellerAddress = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    setSellerAddress(event.target.value)
    setSellerPrice(event.target.id)
  }

  


  return (
    <>
    <div className='nftPropertyCard'>
        <div className="nftPropertyCard__category">Physical ownership</div>
        <img className="nftPropertyCard__image" src={image} alt="object_image" />
        <div className="nftPropertyCard__title">{name}</div>
        <div className="nftPropertyCard__shares">Share floor price : {floorPrice}</div>
        <div className="nftPropertyCard__shares">Share to sell : {totalQuantity}</div>
        <div className="nftPropertyCard__actions">
        <button className="nftPropertyCard__actions__button" onClick={handleOpenBuy}>Buy</button>

          

        </div>
    </div>

    {/* :::: MODAL SELL :::: */}
    <Modal open={openBuy} onClose={handleCloseBuy} className="modal">
    <Modal.Header>
      <Modal.Title className='modal__title'>Buy physical ownership</Modal.Title>
    </Modal.Header>
    <Modal.Body className='modal__body'>
      <div>Choose the quantity to buy</div>
      <div className="modal__body__input">
        <p>Quantity to buy</p>
        <input type="text" value={quantity} onChange={handleSetQuantity} placeholder="set quantity"/>
        <p>Select the seller</p>
        {seller.map(seller => (
          <button onClick={handleSetSellerAddress} value={seller.seller} id={seller.price}>{formatETHAddress(seller.seller,2)} / Price: {seller.price} eth</button>
        ) )}
      </div>

      {simulate === false && 
        <div className="modal__body__btn">
          <button onClick={handleSetSimulate}>Simulate purchase</button>
          <button onClick={handleCloseBuy} className='grey'>Cancel</button>
        </div>
      }
      {simulate === true && 
      <>
        <p>Buying will cost you {quantity*floorPrice} eth for {quantity} shares</p>
        <div className="modal__body__btn">
          <button onClick={buyPropertyNft} appearance="primary">
            Confirm purchase
          </button>
          <button onClick={handleModify} appearance="subtle" className='grey'>
            Modify
          </button>

        </div>
      </>
      }

    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </Modal>
    </>
  )
}

export default PropertyForSellCard