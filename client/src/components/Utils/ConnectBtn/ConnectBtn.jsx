import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { login } from '../../store/actions/app';


const ConnectBtn = () => {
    const[connectedAddress,setConnectedAddress] = useState("");
    const isLogged = useSelector(state => state.app.isLogged);
    const accounts = useSelector(state => state.web3.accounts);
    const owner = useSelector(state => state.web3.owner);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const formatETHAddress = (s, size) =>{;
        var first = s.slice(0, size + 1);
        var last = s.slice(-size);
        return first + "..." + last;
    }
    
    const connexion = async() => {
        setConnectedAddress(formatETHAddress(accounts[0],4));
        dispatch(login(true));
        if(accounts[0] === owner){
            navigate("/admin");
        } else {
            navigate("/");
        }
    }
    
    const disconnexion = () =>{
        setConnectedAddress("");
        dispatch(login(false));

    }
    
    useEffect(()=> {
        disconnexion()
    },[accounts])

    return (
        <>
            {isLogged ? (
                <div className='connectBtn'>
                    <button onClick={disconnexion}>Disconnect</button>
                    <p>{connectedAddress}</p> 
                </div>
            ) :(
                <button onClick={connexion}>Connect wallet</button>
            )}
            
        </>
    )
}

export default ConnectBtn