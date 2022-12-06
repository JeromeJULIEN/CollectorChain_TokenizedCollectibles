import React from 'react'
import './nftDigitalCard.scss'

const NftDigitalCard = ({name}) => {

  return (
    <div className='nftDigitalCard'>
        <div className="nftDigitalCard__category">Digital collectible</div>
        <div className='nftDigitalCard__image'>image</div>
        <div className="nftDigitalCard__title">{name}</div>
        <div className="nftDigitalCard__actions">
          <button className="nftDigitalCard__actions__button--sell">Sell</button>
          <button className="nftDigitalCard__actions__button--loan">Loan</button>
        </div>
    </div>
  )
}

export default NftDigitalCard