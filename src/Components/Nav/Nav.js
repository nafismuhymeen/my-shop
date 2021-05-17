import React from 'react';
import { useHistory } from 'react-router';
import logo from './logo.png';
import './Nav.css';

const Nav = ({ cart }) => {
    const history = useHistory();

// Function to Navigate Pages
    const navigator = path=>{
        history.push(path);
    }
    return (
        <nav className="navigation">
            <div className="logo">
                <img onClick={()=>navigator('/')} src={logo} alt="" />
            </div>
            <div className="pages">
                <p className='nav-home' onClick={()=>navigator('/')}>Home</p>
                <p onClick={()=>navigator('/my-cart')}>My Cart{cart.total_items !== 0 && <span className="w3-badge">{cart.total_items}</span>}</p>
                
            </div>
        </nav>
    );
};

export default Nav;