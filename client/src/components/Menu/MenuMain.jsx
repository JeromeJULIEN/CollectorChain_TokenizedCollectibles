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
        <Nav.Item className='menu__navBar--item' eventKey="howItWork"><Link to='/howitworks'>How it works</Link></Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="marketplace"><Link to='/marketplace'>Marketplace</Link></Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="portfolio"><Link to='/portfolio'>My portfolio</Link></Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="dao"><Link to='/dao'>DAO</Link></Nav.Item>
        <Nav.Item className='menu__navBar--item' eventKey="mint"><Link to='/mint'>Create your collectible</Link></Nav.Item>
        {isAdmin? <Nav.Item className='menu__navBar--item' eventKey="admin"><Link to='/admin'>Admin</Link></Nav.Item>:<></>}
      </Nav>
    );
  };

const MenuMain = () => {
    const [active, setActive] = useState('home');

    return (
      <div className='menu'>
        <div className="logo"><Link to="/">Collector Chain</Link></div>
        <Navbar /*appearance="subtle"*/className='menu__navBar' active={active} onSelect={setActive} />
        <ConnectBtn/>
      </div >
    );
    
}

export default MenuMain