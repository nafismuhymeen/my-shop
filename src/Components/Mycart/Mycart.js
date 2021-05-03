import React from 'react';
import { useHistory } from 'react-router';
import Spinner from '../../Spinner';
import './Mycart.css';

const Mycart = ({ cart, emptyCart, removeFromCart }) => {
// Variables and States
 const history = useHistory();




 // Component Function
  const unoccupiedCart = ()=>(
    <div className="empty-cart"><h1>Your Cart is Empty :(</h1></div>
  )
if (!cart.line_items) return <Spinner/>;
  const busyCart = ()=>(
                <>
                    <h2>Total Amount: {cart.subtotal.formatted_with_symbol}</h2>
                    <section className="busy-cart">
                        {cart.line_items.map(item=>{return(
                            <div className="cart-item" key={item.id} >
                                <img src={item.media.source} alt=""/>
                                <div className="item-info">
                                    <h5>{item.name}</h5>
                                    <h6><span>Price: {item.price.formatted_with_symbol}</span><span>Total: {item.line_total.formatted_with_symbol}</span></h6>
                                    <div>{item.selected_options.map(option=>{return <p key={option.group_id}>{option.group_name}: {option.option_name}</p>})}</div>
                                    <p>Quantity: {item.quantity}</p>
                                    <p onClick={()=>removeFromCart(item.id)} className="remove-btn">Remove</p>
                                </div>
                            </div>
                        )})}
                    </section>
                    <div className="checkout-empty-cart">
                        <h3 onClick={()=>history.push('/checkout')} style={{marginLeft:"3.2%"}}>Checkout</h3>
                        <h3 onClick={()=>emptyCart()} style={{marginRight:"3.2%"}}>Empty Cart</h3>
                    </div>
                </>
  )
    return (
            <>
                {cart.total_items === 0 && unoccupiedCart()}
                {cart.total_items !== 0 && busyCart()}
            </>
    );
};

export default Mycart;