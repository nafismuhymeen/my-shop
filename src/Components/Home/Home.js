import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import commerce from '../../commerce';
import Spinner from '../../Spinner';
import './Home.css';

const Home = () => {
// Variables and States
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

// Function for Getting Product
    const gettingProducts = async ()=>{
        const { data } = await commerce.products.list();
        setProducts(data)
    }
// Function for Stoping the Spinner
    const stopSpinner = indexNumber =>{
        if(indexNumber === (products.length - 1)){
            setLoading(false)
        }
    }
// Calling gettingProducts
    useEffect(()=>{
        gettingProducts()
    },[])

    return (
        <>
            <Spinner loading={loading} />
            <section className="products">
                {
                    products.map( (product, index) => {
                        return (
                            <div className="product" key={product.id}>
                                <img onLoad={()=>stopSpinner(index)} src={product.media.source} alt=""/>
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