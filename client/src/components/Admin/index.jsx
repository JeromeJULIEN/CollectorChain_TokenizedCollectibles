import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Admin = () => {
    const factoryContract = useSelector(state => state.factory.contract);
    const accounts = useSelector(state => state.web3.accounts);
    const [newValue,setNewValue] = useState("");
   
    const handleValueChange = (event) =>{
        setNewValue(event.target.value)
    }

    const createCollection = async () => {
        if(newValue === "") {
            alert("please enter a value")
        }
        const valueToSet = newValue;
        await factoryContract.methods.createCollection(valueToSet, "__", "TOKEN").send({from : accounts[0]})
        // setCollectionCount(collectionCount+1);

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