import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Admin = () => {

    //! STORE
    const factoryContract = useSelector(state => state.factory.contract);
    const marketplaceContract = useSelector(state => state.marketplace.contract)
    const accounts = useSelector(state => state.web3.accounts);
    const web3 = useSelector(state => state.web3.web3);
    
    //! LOCAL STATE
    const [newValue,setNewValue] = useState("");
    const handleValueChange = (event) =>{
        setNewValue(event.target.value)
    }
    //! EVENTS
    const [ethReceived,setEthReceived] = useState(0)
    useEffect(() => {
        // ETH RECEIVED EVENT
        const getEvents = async() => {
            let ethReceivedEvent = await marketplaceContract.getPastEvents('etherReceived',{
                fromBlock : 0,
                toBlock:'latest'
            });
            let oldEthReceivedEvent=[];
            ethReceivedEvent.forEach(event => {
                oldEthReceivedEvent.push(
                    {
                        valueReceived : event.returnValues.valueReceived,
                    });
            });
            console.log('oldEthReceivedEvent',oldEthReceivedEvent);
            oldEthReceivedEvent.forEach(receipt => {
                setEthReceived(ethReceived+parseInt(receipt.valueReceived))
            })
        }
        getEvents()
    },[])

    console.log('eth received',web3.utils.fromWei(web3.utils.toBN(ethReceived)) );

    //! FUNCTIONS
    const createCollection = async () => {
        if(newValue === "") {
            alert("please enter a value")
        }
        const valueToSet = newValue;
        await factoryContract.methods.createCollection(valueToSet, "__", "TOKEN").send({from : accounts[0]})
        setNewValue("");

    };
  
    return (
    <>
        <div>
                    <p>create collection :</p>
                    <input type="text" placeholder='collection name' value={newValue} onChange={handleValueChange}/>
                    <button onClick={createCollection}>Create</button>
        </div>
    </>
  )
}

export default Admin