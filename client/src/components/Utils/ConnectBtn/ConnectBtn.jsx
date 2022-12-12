import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setAdmin } from '../../../store/actions/app';
import './styles.scss'
import {OffRound} from '@rsuite/icons';


const ConnectBtn = ({connect,disconnect}) => {
    const[connectedAddress,setConnectedAddress] = useState("");
    const isLogged = useSelector(state => state.app.isLogged);
    const accounts = useSelector(state => state.web3.accounts);
    const owner = useSelector(state => state.factory.owner);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const formatETHAddress = (s, size) =>{;
        var first = s.slice(0, size + 1);
        var last = s.slice(-size);
        return first + "..." + last;
    }
    
    const connexion = async() => {
        
    }
    
    const disconnexion = () =>{
        setConnectedAddress("");
        dispatch(login(false));
        dispatch(setAdmin(false))


    }
    
    useEffect(()=> {
        if(accounts){
            setConnectedAddress(formatETHAddress(accounts[0],4));
            if(accounts == null){
                dispatch(login(false));
                dispatch(setAdmin(false))
            } else if( accounts[0] == owner){
                dispatch(login(true));
                dispatch(setAdmin(true))
            } else if(accounts[0] != owner && accounts[0] != null){
                dispatch(login(true));
                dispatch(setAdmin(false))
            }

        }
    },[accounts])

    return (
        <>
            {isLogged ? (
                <div className='connectBtn'>
                    <button className='connectBtn__btn' onClick={disconnect} ><OffRound className='connectBtn__logo'/>        {connectedAddress}</button>
                </div>
            ) :(
                <button className='connectBtn__btn' onClick={connect}>Connect</button>
            )}
            
        </>
    )
}

export default ConnectBtn