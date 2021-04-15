import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import commerce from '../../commerce';
import './Home.css';

const Home = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);


    const gettingProducts = async ()=>{
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    useEffect(()=>{
        gettingProducts()
    },[])

    return (
        <>
            <section className="products">
                {
                    products.map( product => {
                        return (
                            <div className="product" key={product.id}>
                                <img src={product.media.source} alt=""/>
                                <div className="product-info">
                                    <div className="product-name-price">
                                        <h4>{product.name}</h4>
                                        <h5>Price: {product.price.formatted_with_symbol}</h5>
                                    </div>
                                    <div className="view-product">
                                        <h5 onClick={()=>history.push(`/product/${product.name}/${product.id}`)}>View Product</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </>
    );
};

export default Home;