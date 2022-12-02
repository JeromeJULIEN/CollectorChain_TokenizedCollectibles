import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Nav } from 'rsuite';
import "./styles.scss"


const Navbar = ({ active, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 50 }}>
        <Nav.Item eventKey="howItWork">How it works</Nav.Item>
        <Nav.Item eventKey="marketplace"><Link to='/marketplace'>Marketplace</Link></Nav.Item>
        <Nav.Item eventKey="portfolio">My portfolio</Nav.Item>
        <Nav.Item eventKey="dao">DAO</Nav.Item>
        <Nav.Item eventKey="mint">Mint your collectible</Nav.Item>
      </Nav>
    );
  };

const Menu = () => {
    const [active, setActive] = useState('home');

    return (
      <div className='menu'>
        <div className="logo"><Link to="/">Collector Chain</Link></div>
        <Navbar appearance="subtle" active={active} onSelect={setActive} />
        <div className="connectBtn">Connect wallet</div>
      </div >
    );
    
}

export default Menu