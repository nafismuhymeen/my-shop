import React, { useEffect, useState } from 'react';
import commerce from '../../commerce';
import './Mycart.css';

const Mycart = ({ cart, setCart }) => {
// Variables and States
    const [cartLength, setCartLength] = useState(0);

// Function for Remove Item from Cart
    const removeItem = id=>{
        commerce.cart.remove(id)
        setCart(cart.filter(item=>{return item.id !== id}))
    }
// Function to Empty Cart
    const emptyCart = ()=>{
        commerce.cart.empty()
        .then(res => setCart(res.cart.line_items));
        setCartLength(cart.length)
    }
// Setting cartLength
    useEffect(()=>{
        setCartLength(cart.length)
    },[cart.length])
    return (
        <>
            {cartLength === 0 &&
                <div className="empty-cart"><h1>Your Cart is Empty :(</h1></div>
            }
            {cartLength !== 0 &&
                <>
                    <section className="busy-cart">
                        {cart.map(item=>{return(
                            <div className="cart-item" key={item.id} >
                                <img src={item.media.source} alt=""/>
                                <div className="item-info">
                                    <h5>{item.name}</h5>
                                    <h6><span>Price: {item.price.formatted_with_symbol}</span><span>Total: {item.line_total.formatted_with_symbol}</span></h6>
                                    <div>{item.selected_options.map(option=>{return <p key={option.group_id}>{option.group_name}: {option.option_name}</p>})}</div>
                                    <p>Quantity: {item.quantity}</p>
                                    <p onClick={()=>removeItem(item.id)} className="remove-btn">Remove</p>
                                </div>
                            </div>
                        )})}
                    </section>
                    <div className="checkout-empty-cart">
                        <h3 style={{marginLeft:"3.2%"}}>Checkout</h3>
                        <h3 onClick={()=>emptyCart()} style={{marginRight:"3.2%"}}>Empty Cart</h3>
                    </div>
                </>
            }
        </>
    );
};

export default Mycart;