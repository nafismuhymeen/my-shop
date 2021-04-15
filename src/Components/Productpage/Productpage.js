import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import commerce from '../../commerce';
import parse from 'html-react-parser';
import './Productpage.css';

const Productpage = () => {
    const [product, setProduct] = useState();
    const { id } = useParams();


    const retrieveProduct = (Id)=>{
        commerce.products.retrieve(Id)
        .then(data => setProduct(data))
    }
    useEffect(()=>{
        retrieveProduct(id);
    },[id])
    console.log(product);
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
                                <div key={variant.name}>
                                    <label htmlFor={variant.name} key={variant.id+variant.created}>Select {variant.name}: </label>
                                <select id={variant.name} key={variant.id}>
                                        {variant.options.map(option=>{return <option value={option.id} key={option.id}>{option.name}</option>})}
                                </select>
                                </div>                
                            )})}
                        <label htmlFor="product-quantity">Quantity: </label>
                            <input id="product-quantity" type="number" min="1" max="100" />
                            <h4>Add To Cart</h4>
                    </div>
                </section>
            }
        </>
    );
};

export default Productpage;