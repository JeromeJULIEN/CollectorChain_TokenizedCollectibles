import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Nav } from 'rsuite';
import "./styles.scss"
import ConnectBtn from '../Utils/ConnectBtn/ConnectBtn';
import { useSelector } from 'react-redux';


const Navbar = ({ active, onSelect, ...props }) => {

  const isAdmin = useSelector(state => state.app.isAdmin)

    return (
      <Nav {...props} activeKey={active} onSelect={onSelect}>
        <Nav.Item  eventKey="howItWork"><Link to='/howitworks' className='menu__navBar--item'>How it works</Link></Nav.Item>
        <Nav.Item  eventKey="marketplace"><Link to='/marketplace' className='menu__navBar--item'>Marketplace</Link></Nav.Item>
        <Nav.Item  eventKey="portfolio"><Link to='/portfolio' className='menu__navBar--item'>My portfolio</Link></Nav.Item>
        <Nav.Item  eventKey="dao"><Link to='/dao' className='menu__navBar--item'>DAO</Link></Nav.Item>
        <Nav.Item  eventKey="mint"><Link to='/mint' className='menu__navBar--item'>Create your collectible</Link></Nav.Item>
        {isAdmin? <Nav.Item className='menu__navBar--item' eventKey="admin"><Link to='/admin' className='menu__navBar--item'>Admin</Link></Nav.Item>:<></>}
      </Nav>
    );
  };

const MenuMain = () => {
    const [active, setActive] = useState('home');

    return (
      <div className='menu'>
        <div className="logo"><Link to="/" className='menu__navBar--item'>Collector Chain</Link></div>
        <Navbar /*appearance="subtle"*/className='menu__navBar' active={active} onSelect={setActive} />
        <ConnectBtn/>
      </div >
    );
    
}

export default MenuMain