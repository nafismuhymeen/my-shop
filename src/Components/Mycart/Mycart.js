import React from 'react';
import './Mycart.css';

const Mycart = ({ cart }) => {
    return (
        <>
            {cart.length === 0 &&
                <div className="empty-cart"><h1>Your Cart is Empty :(</h1></div>
            }
        </>
    );
};

export default Mycart;