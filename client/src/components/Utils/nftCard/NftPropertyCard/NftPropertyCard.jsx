import React, { useState } from 'react'
import './nftPropertyCard.scss'
import {Modal} from 'rsuite';
import { useSearch } from 'rsuite/esm/Picker';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyCollection } from '../../../../store/actions/collections';

const NftPropertyCard = ({
  collectionId,
  nftId,
  name, 
  balance,
  isApproved,
  marketplaceContract,
  updater,
  handleUpdater,
  image}) => {
  //! LOCAL STATE
  const dispatch = useDispatch()
  const [openSell, setOpenSell] = useState(false);
  const handleOpenSell = () => setOpenSell(true);
  const handleCloseSell = () => {
    setOpenSell(false)
    setSimulate(false)
    setPrice(0)
    setQuantity(0)
  };

  const [quantity, setQuantity] = useState("");
  const handleSetQuantity = (event) => setQuantity(event.target.value);
  const [price, setPrice] = useState("");
  const handleSetPrice = (event) => setPrice(event.target.value);

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
      setPrice(0)
      setQuantity(0)
    }

  }

  const handleModify = () => {
    setSimulate(false)
      setPrice(0)
      setQuantity(0)
  }

  //! STORE
  const propertyContractAddress = useSelector(state => state.collections.collections[collectionId].propertyContractAddress)
  const accounts = useSelector(state => state.web3.accounts)
  const web3 = useSelector(state => state.web3.web3)

  //! EVENTS

  //! FUNCTIONS
  const approveForSell = async() => {
    // instanciation du bon contrat pour lancer l'approval
    var artifact = require("../../../../contracts/NftProperty.json");
    const abiProperty = artifact.abi;  
    try {
      let propertyContract = new web3.eth.Contract(abiProperty, propertyContractAddress);
      dispatch(setPropertyCollection(propertyContract));
      await propertyContract.methods.setApprovalForAll(marketplaceContract._address,true).call({from:accounts[0]})
      await propertyContract.methods.setApprovalForAll(marketplaceContract._address,true).send({from:accounts[0]})
      handleUpdater()
      handleCloseSell()
    } catch (err) {
      console.error(err);
    }
  }

  const sellPropertyNft =async() =>{
    const priceInWei=web3.utils.toBN(web3.utils.toWei(price))
    try{
      await marketplaceContract.methods.putPropertyForSell(propertyContractAddress,nftId,name,priceInWei,quantity,image).call({from:accounts[0]});
      await marketplaceContract.methods.putPropertyForSell(propertyContractAddress,nftId,name,priceInWei,quantity,image).send({from:accounts[0]});
    } catch(error){
      console.log(error);
    }
  }
  


  


  return (
    <>
    <div className='nftPropertyCard'>
        <div className="nftPropertyCard__category">Physical ownership</div>
        <img className="nftPropertyCard__image" src={image} alt="object_image" />
        <div className="nftPropertyCard__title">{name}</div>
        <div className="nftPropertyCard__shares">Shares : {balance}/100</div>
        <div className="nftPropertyCard__actions">
          {isApproved ? 
          <button className="nftPropertyCard__actions__button" onClick={handleOpenSell}>Sell</button>
          :
          <button className="nftPropertyCard__actions__button" onClick={approveForSell}>Approve for sell</button>
          }
          <button className={`nftPropertyCard__actions__button${balance == 100?"":"--inactive"}`}>Redeem</button>
        </div>
    </div>

    {/* :::: MODAL SELL :::: */}
    <Modal open={openSell} onClose={handleCloseSell} className="modal">
    <Modal.Header>
      <Modal.Title className='modal__title'>Sell your physical ownership</Modal.Title>
    </Modal.Header>
    <Modal.Body className='modal__body'>
      <div>Choose the quantity to sell and the selling price per share </div>
      <div className="modal__body__input">
        <p>Quantity to sell</p>
        <input type="text" value={quantity} onChange={handleSetQuantity} placeholder="set quantity"/>
        <p>Price per share</p>
        <input type="text" value={price} onChange={handleSetPrice} placeholder="set price per share"/>
      </div>
      {simulate === false && 
        <div className="modal__body__btn">
          <button onClick={handleSetSimulate}>Simulate sell</button>
          <button onClick={handleCloseSell} className='grey'>Cancel</button>
        </div>
      }
      {simulate === true && 
      <>
        <p>Selling all the share at the selected price will make you earn {(quantity*price).toFixed(2)} eth</p>
        <p>note that buyers have not to buy all the share you're putting to sell</p>
        <div className="modal__body__btn">
          <button onClick={sellPropertyNft} appearance="primary">
            Confirm selling
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

export default NftPropertyCard