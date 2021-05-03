import React, { useEffect, useState } from 'react';
import './Checkout.css';
import Shipping from './Components/Shipping';
import commerce from '../../commerce';
import Payments from './Components/Payments';
import Confirm from './Components/Confirm';




const Checkout = ({ handleCaptureCheckout }) => {
    const [checkOutId, setCheckOutId] = useState('');
    const [checkOut, setCheckOut] = useState([]);
    const [customerData, setCustomerData] = useState({});
    const [checkOutPage, setCheckOutPage] = useState(0);


    const gettingCheckOut = ()=>{
        commerce.checkout.generateTokenFrom('cart', commerce.cart.id())
        .then(res => {setCheckOutId(res.id);
        setCheckOut(res)});

    }
    const nextPage = ()=>{
        setCheckOutPage(prevCheckOutPage=>prevCheckOutPage+1)
    }
    useEffect(()=>{
            gettingCheckOut()
    },[])
    return (
        <>
            {checkOutPage === 0 && <Shipping nextPage={nextPage} setCustomerData={setCustomerData} checkOutId={checkOutId}/> }
            {checkOutPage === 1 && <Payments nextPage={nextPage} setCheckOutPage={setCheckOutPage} handleCaptureCheckout={handleCaptureCheckout} checkOut={checkOut} checkOutId={checkOutId} customerData={customerData} />}
            {checkOutPage === 2 && <Confirm customerData={customerData} />}
        </>
    );
};

export default Checkout;