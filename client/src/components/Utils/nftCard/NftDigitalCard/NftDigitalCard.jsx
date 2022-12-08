import React from 'react'
import './nftDigitalCard.scss'

const NftDigitalCard = ({name, image, marketplaceContract}) => {

  //! LOCAL STATE

  //! STORE

  //! EVENTS
  
  //! FUNCTION
  const sellDigitalNft = () => {
    
  }

  return (
    <div className='nftDigitalCard'>
        <div className="nftDigitalCard__category">Digital collectible</div>
        <img className="nftPropertyCard__image" src={image} alt="object_image" />
        <div className="nftDigitalCard__title">{name}</div>
        <div className="nftDigitalCard__actions">
          <button className="nftDigitalCard__actions__button--sell">Sell</button>
          <button className="nftDigitalCard__actions__button--loan">Loan</button>
        </div>
    </div>
  )
}

export default NftDigitalCard