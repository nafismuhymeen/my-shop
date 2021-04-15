import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import logo from './logo.png';
import './Nav.css';

const Nav = ({ cart }) => {
    const [cartLength, setCartLength] = useState(0);
    const history = useHistory();

// Function to Navigate Pages
    const navigator = path=>{
        history.push(path);
    }

    useEffect(()=>{
        setCartLength(cart.length)
    },[cart.length])
    return (
        <nav className="navigation">
            <div className="logo">
                <img onClick={()=>navigator('/')} src={logo} alt="" />
            </div>
            <div className="pages">
                <p onClick={()=>navigator('/')}>Home</p>
                <p onClick={()=>navigator('/my-cart')}>My Cart-<span className="w3-badge">{cartLength}</span></p>
                
            </div>
        </nav>
    );
};

export default Nav;