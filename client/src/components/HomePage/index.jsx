import React from 'react'
import './styles.scss';
import RunningRoundIcon from '@rsuite/icons/RunningRound';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import rolex from '../Utils/image/rolex.jpg';
import piece from '../Utils/image/piece.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <div className='headLine'>
        <p>Bring your <strong>collectibles</strong> on our platform and get <strong>NFT</strong> ownership certification, collectible tokenisation, metaverse integration and <strong>earn passive incomes</strong>.</p>
        <button className='headLine__btn'><Link className='headLine__btn--link' to='/mint'>Mint your collectible <RunningRoundIcon className='headLine__btn--icon'/></Link>  </button>
      </div>
      <div className='nft'>
        <div className='nft__digital'>
          <img className='nft__digital--image' src={rolex} alt="" />
          <div className='nft__digital--title'>NFT of your digital object</div>
          <p><ArrowRightLineIcon/>From an <strong>unique and authenticated collectible</strong> secured in our ‘vault’</p>
          <p><ArrowRightLineIcon/><strong>Weekly Rewards</strong> for the NFT owner (from Royalties)</p>
          <p><ArrowRightLineIcon/>Integrable in <strong>metaverse</strong></p>
          <p><ArrowRightLineIcon/><strong>Tradable</strong> (buy/sell/rent) on all platforms</p>
        </div>
        <div className='nft__property'>
          <img className='nft__property--image' src={piece} alt="" />
          <div className='nft__property--title'>NFT as ownership certificate</div>
          <div className="nft__property__text">
            <p><ArrowRightLineIcon/><strong>Tokenized collectible</strong> with an ownership fractionized in 100 shares</p>
            <p><ArrowRightLineIcon/><strong>Weekly Rewards</strong> for the NFT owner (from Royalties)</p>
            <p><ArrowRightLineIcon/>Physiccal collectible stored in our <strong>secured ‘vault’</strong></p>
            <p><ArrowRightLineIcon/>Secured <strong>cold storage solution</strong></p>
            <p><ArrowRightLineIcon/><strong>Shares tradable</strong> (buy/sell) on all platforms</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home