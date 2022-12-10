import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Nav } from 'rsuite';
import "./styles.scss"
import ConnectBtn from '../Utils/ConnectBtn/ConnectBtn';
import { useSelector } from 'react-redux';
import logo from '../Utils/image/Logo_Fond_Bleu.png';


 
const MenuMain = () => {
  const isAdmin = useSelector(state => state.app.isAdmin)

    return (
      <div className='menu'>
        <Link to="/" ><img src={logo} className="menu__logo" alt='collectorChain_Logo'/></Link>
        <div className='menu__navBar'>
          <Link to='/howitworks' className='menu__navBar--item'>How it works</Link>
          <Link to='/marketplace' className='menu__navBar--item'>Marketplace</Link>
          <Link to='/portfolio' className='menu__navBar--item'>My portfolio</Link>
          <Link to='/dao' className='menu__navBar--item'>DAO</Link>
          <Link to='/mint' className='menu__navBar--item'>Create your collectible</Link>
          {/* {isAdmin &&  */}
          <Link to='/admin' className='menu__navBar--item'>Admin</Link>
          {/* } */}
        </div>
        <ConnectBtn/>
      </div >
    );
    
}

export default MenuMain