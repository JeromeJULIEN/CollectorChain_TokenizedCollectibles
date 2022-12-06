import React, { useState } from 'react'
import './nftPropertyCard.scss'
import {Modal} from 'rsuite';

const NftPropertyCard = ({name, balance}) => {
  const [openSell, setOpenSell] = useState(false);
  const handleOpenSell = () => setOpenSell(true);
  const handleCloseSell = () => {
    setOpenSell(false)
    setSimulate(false)
    setPrice(null)
    setQuantity(null)
  };

  const [quantity, setQuantity] = useState("");
  const handleSetQuantity = (event) => setQuantity(event.target.value);
  const [price, setPrice] = useState("");
  const handleSetPrice = (event) => setPrice(event.target.value);

  const [simulate,setSimulate] = useState(false)
  const handleSetSimulate = () => {
    if(quantity>balance) {
      alert ("you don't have enough shares to sell")
    }
    else if(simulate ===false) {
      setSimulate(true)
    } else {
      setSimulate(false)
      setPrice(null)
      setQuantity(null)
    }

  }


  return (
    <>
    <div className='nftPropertyCard'>
        <div className="nftPropertyCard__category">Physical ownership</div>
        <div className='nftPropertyCard__image'>image</div>
        <div className="nftPropertyCard__title">{name}</div>
        <div className="nftPropertyCard__shares">Shares : {balance}/100</div>
        <div className="nftPropertyCard__actions">
          <button className="nftPropertyCard__actions__button" onClick={handleOpenSell}>Sell</button>
          <button className={`nftPropertyCard__actions__button${balance == 100?"":"--inactive"}`}>Get the object</button>
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
        <p>Selling all the share at the selected price will make you earn {quantity*price} eth</p>
        <p>note that buyers have not to buy all the share you're putting to sell</p>
        <div className="modal__body__btn">
          <button onClick={handleCloseSell} appearance="primary">
            Confirm selling
          </button>
          <button onClick={handleSetSimulate} appearance="subtle" className='grey'>
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