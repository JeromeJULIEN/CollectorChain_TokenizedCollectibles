import React from 'react'
import './howItWork.scss';

const HowItWorks = () => {
  return (
    <div>
      <div className='work'>
        <div  className='work__title'>How it works ?</div>
        <div className="block">
          <div className="block__title"><strong>1.</strong> SUBMIT YOUR PROPOSAL TO THE DAO</div>
          <p className="block__text">Whether a manufactured object, a work of Art, or an Antique, click on Mint your collectible to post your new DAO proposal for joining the verified collector chain community. Fill out the form, upload the requested documents, and submit your message to the community.</p>
        </div>
        <div className="block">
          <div className="block__title"><strong>2.</strong> CONVERT YOUR COLLECTIBLE</div>
          <p className="block__text">Once authenticity and price are verified by Collector Chain DAO, you can convert your collectible into a connected UNIQUE or multiple FRACTIONALIZED digital asset after receiving the Ownership certificate:

          Connect your non-custodial wallet.

          Ship us the physical collectible which will be stored in a secured vault at BRINK quarters and get:
          a set of 3D 100 NFTs collection (fractionalization of your item into 100 shares), start selling the total 
                amont or a fraction of it (40% for instance) and get passive income from the trade thanks to Royalties.
          a unique 2D NFT to be exclusively used in the Metaverse or in Financial pools for passive incomes
          </p>

        </div>
        <div className="block">
          <div className="block__title"><strong>3.</strong> TRADE TO EARN PASSIVE INCOME ON YOUR 3D 100 FRACTIONALIZED NFTS</div>
          <p className="block__text">Click on Marketplace Set a price, let the bids roll in, or HODL. You have complete ownership of the Connected Collectible, which is immediately tradable on the blockchain. Each time your NFT fraction is sold on a marketplace after the initial sale, you will receive 2% of each future sale.</p>

        </div>
        <div className="block">
          <div className="block__title"><strong>4.</strong> RENT TO EARN PASSIVE INCOME ON YOUR UNIQUE 2D NFT DIGITAL ASSET</div>
          <p className="block__text">Click on Marketplace Set a rental price, let the bids roll in, or HODL. You have complete ownership of the NFT, which is immediately wearable or tradable on the blockchain. Each time your NFT is rented or used, you will receive 102% of each future deals</p>

        </div>
        <div className="block">
          <div className="block__title"><strong>5.</strong> REDEEM YOUR COLLECTIBLE</div>
          <p className="block__text">Your physical collectible is always reedemable by burning the 100 shares from your ownership certificate.</p>

        </div>
      </div>
      <div className='dao'>
        <div  className='dao__title'>Collector Chain DAO</div>
        <div className="block">
          <div className="block__title">What is that ?</div>
            <p className="block__text">DAO is a collectively-owned, blockchain-governed organization working towards a shared mission

            In general terms, DAOs are member-owned communities without centralized leadership
            </p>
        </div>
        <div className="block">
          <div className="block__title">How does the Collector Chain DAO work? </div>
          <p className="block__text">After the submission of  your KYC and KYO forms, a validation proposal will be sumbitted to the members of Collector Chain DAO for voting
          </p>
        </div>
        <div className="block">
          <div className="block__title">Who are the members of Collector Chain DAO ? </div>
          <p className="block__text">The DAO of Collector Chain is composed by professionals and non-professionals experts and collectors enthusiasts

          The members of our community are not liable for the results of the voting process</p>
        </div>
        <div className="block">
          <div className="block__title">Voting process</div>
          <p className="block__text"><strong>Minimum participation</strong> </p>

          <p>Collector Chain DAO demands the participation of at least X experts to vote</p>

          <p><strong>Pass rate</strong> </p>
          <p>Pass rate to set is 50%, meaning a simple majority is needed to validate the object</p>

          <p><strong>Voting period</strong> </p>
          <p>Once the proposal is submitted, DAO members will have 14 days to vote. </p>
        </div>
        <div className="block">
          <div className="block__title">What are the conditions to have my object validated? </div>
          <p className="block__text">To obtain the validation of our experts members, you will have to demonstrate that your object meets the standards of Collector Chain, which are: 
          <ul>
            <li>Good condition of the object </li>
            <li>Authencity</li>
            <li>Scarcity</li>
            <li>Reasonable initial minimum price </li>
            <li>Proof of purchase/Proof of authorisation of the author</li>
          </ul>
          </p>
        </div>
      </div>

      

    </div>
  )
}

export default HowItWorks