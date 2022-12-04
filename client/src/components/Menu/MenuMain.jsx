import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Nav } from 'rsuite';
import "./styles.scss"


const Navbar = ({ active, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect}>
        <Nav.Item className='menu__navBar--item' eventKey="howItWork">How it works</Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="marketplace"><Link to='/marketplace'>Marketplace</Link></Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="portfolio">My portfolio</Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="dao">DAO</Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="mint">Mint your collectible</Nav.Item>
      </Nav>
    );
  };

const MenuMain = () => {
    const [active, setActive] = useState('home');

    return (
      <div className='menu'>
        <div className="logo"><Link to="/">Collector Chain</Link></div>
        <Navbar /*appearance="subtle"*/className='menu__navBar' active={active} onSelect={setActive} />
        <div className="connectBtn">Connect wallet</div>
      </div >
    );
    
}

export default MenuMain