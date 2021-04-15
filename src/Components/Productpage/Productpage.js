import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import commerce from '../../commerce';
import parse from 'html-react-parser';
import './Productpage.css';

const Productpage = ({ setCart }) => {
// Variables and States
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    let variants = useMemo(()=>{return {}}, []);
    const { id } = useParams();

// Function for Retrieving Product
    const retrieveProduct = (Id)=>{
        commerce.products.retrieve(Id)
        .then(data => setProduct(data))
    }
// Function for adding Products into Cart
    const addToCart = ()=>{
        commerce.cart.add(id, quantity, variants)
        .then(res => setCart(res.cart.line_items))
    }
// Retrieving Product
    useEffect(()=>{
        retrieveProduct(id);
    },[id])
// Setting Product Variants
    useEffect(()=>{
        if(product){
            product.variant_groups.map(variant=>{return variants[variant.id] = variant.options[0].id})
        }
    },[product, variants])
    return (
        <>
            {product &&
                <section className="product-page">
                    <div className="product-img">
                        <img src={product.media.source} alt=""/>
                    </div>
                    <div className="product-details">
                        <h2>{product.name}</h2>
                        <h4>{parse(product.description)}</h4>
                        <h4>Price: {product.price.formatted_with_symbol}</h4>
                        {product.variant_groups.map(variant=>{return(
                                <div className="varients" key={variant.name}>
                                    <label htmlFor={variant.name} key={variant.id+variant.created}>Select {variant.name}: </label>
                                    <select onChange={(e)=>{variants[variant.id] = e.target.value}} id={variant.name} key={variant.id}>
                                            {variant.options.map(option=>{return <option value={option.id} key={option.id}>{option.name}</option>})}
                                    </select>
                                </div>                
                            )})}
                        <label htmlFor="product-quantity">Quantity: </label>
                        <input value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} id="product-quantity" type="number" min="1" max="100" />
                        <h5 onClick={()=>addToCart()} className="add-to-cart">Add To Cart</h5>
                    </div>
                </section>
            }
        </>
    );
};

export default Productpage;