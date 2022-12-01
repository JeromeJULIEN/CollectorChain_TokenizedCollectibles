import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setValue } from '../../store/actions/app';
import { useState } from 'react';




const Main = () => {

    
    const value = useSelector(state => state.app.value);
    const contract = useSelector(state => state.web3.contract);
    const accounts = useSelector(state => state.web3.accounts)
    const [newValue,setNewValue] = useState("");
    
    const dispatch = useDispatch();

    const handleValueChange = (event) =>{
        setNewValue(event.target.value)
    }

    const write = async (event) => {
        if(newValue === "") {
            alert("please enter a value")
        }
        const valueToSet = newValue;
        await contract.methods.write(valueToSet).send({from : accounts[0]})

    };

    const read = async() => {
        const value = await contract.methods.read().call({from : accounts[0]})
        dispatch(setValue(value));
    }
    
    

    return (
        <div>
            <div className="Main">
                <p>Welcome to the test app</p>
                <p>The stored value is currently : {value}</p>
            </div>
            <div>
                <p>Change the value :</p>
                <input type="text" placeholder='number ?' value={newValue} onChange={handleValueChange}/>
                <button onClick={write}>send</button>
            </div>
            <div>
                <button onClick={read}>update the text</button>
            </div>
        </div>
    )
}

export default Main