import React, { useState } from 'react'
import { useSelector } from 'react-redux'


const Mint = () => {
    const daoContract = useSelector(state => state.dao.contract)
    const accounts = useSelector(state => state.web3.accounts)
    const web3 = useSelector(state => state.web3.web3)
    const [mintCollection, setMintCollection] = useState(0);
    const [mintTitle, setMintTitle] = useState('');
    const [mintDesc, setMintDesc] = useState('');

    const handleChangeMintCollection = (event) => {
        setMintCollection(web3.utils.toBN(event.target.value))
    }
    const handleChangeMintTitle = (event) => {
        setMintTitle(event.target.value)
    }
    const handleChangeMintDesc = (event) => {
        setMintDesc(event.target.value)
    }
    
    const askMint = async() => {
        try{
            console.log(mintCollection);
            await daoContract.methods.createProposal(mintCollection, mintTitle, mintDesc).call({from:accounts[0]})
            await daoContract.methods.createProposal(mintCollection, mintTitle, mintDesc).send({from:accounts[0]})
                .on('receipt', function(receipt){
                    console.log(receipt.events.proposalCreated.returnValues)
                })
        } catch (error) {
            console.error(error)
        }


    }
  
    return (
    <>
        <div>
           <div>Mint an object</div> 
           <div>
                <p>Collection</p>
                <input type="text" id='collection' name='collection' required value={mintCollection} onChange={handleChangeMintCollection}/>

           </div>
           <div>
                <p>Mint title</p>
                <input type="text" id='name' name='name' required value={mintTitle} onChange={handleChangeMintTitle}/>

           </div>
           <div>
                <p>Object description</p>
                <input type="text" id='description' name='description' required value={mintDesc} onChange={handleChangeMintDesc}/>

           </div>
           <button onClick={askMint}>Ask for mint</button>
        </div>
    </>
  )
}

export default Mint