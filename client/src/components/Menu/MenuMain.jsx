import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Nav } from 'rsuite';
import "./styles.scss"
import ConnectBtn from '../Utils/ConnectBtn/ConnectBtn';
import { useSelector } from 'react-redux';
import logo from '../Utils/image/Logo_Fond_Bleu.png';
import MenuIcon from '@rsuite/icons/Menu';
import { useEffect } from 'react';


 
const MenuMain = ({connect,disconnect}) => {
  const isAdmin = useSelector(state => state.app.isAdmin)

  const [menuVisibility,setMenuVisibility] = useState(false)

  let location = useLocation()

  const handleMenuVisibility =() =>{
    setMenuVisibility(!menuVisibility)
  }

  useEffect(()=>{
    setMenuVisibility(false)
  },[location])

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
        <div className='menu__navBarMobile'>
          <div><MenuIcon className='menu__navBarMobile__btn' onClick={handleMenuVisibility}/></div>
          <Link to='/howitworks' className={`menu__navBarMobile--item${menuVisibility ===true?"--visible":""} `}>How it works</Link>
          <Link to='/marketplace' className={`menu__navBarMobile--item${menuVisibility ===true?"--visible":""} `}>Marketplace</Link>
          <Link to='/portfolio' className={`menu__navBarMobile--item${menuVisibility ===true?"--visible":""} `}>My portfolio</Link>
          <Link to='/dao' className={`menu__navBarMobile--item${menuVisibility ===true?"--visible":""} `}>DAO</Link>
          <Link to='/mint' className={`menu__navBarMobile--item${menuVisibility ===true?"--visible":""} `}>Create your collectible</Link>
          {/* {isAdmin &&  */}
          <Link to='/admin' className={`menu__navBarMobile--item${menuVisibility ===true?"--visible":""} `}>Admin</Link>
          {/* } */}
        </div>
        <ConnectBtn connect={connect} disconnect={disconnect}/>
      </div >
    );
    
}

export default MenuMain