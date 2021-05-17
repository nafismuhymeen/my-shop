import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import commerce from '../../commerce';
import Spinner from '../../Spinner';
import Category from './Category';
import './Home.css';

const Home = () => {
// Variables and States
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    

// Function for Getting Product
    const gettingProducts = async ()=>{
        const { data } = await commerce.products.list();
        setProducts(data)
    }
// Function for Stoping the Spinner
    const stopSpinner = indexNumber =>{
        if(indexNumber === (products.length - 1)){
            setLoading(false)
            setShowCategory(true)
        }
    }
// Function for Getting Categories
    const getCategories = async()=>{
        const { data } = await commerce.categories.list()
        setCategories(data)
    }
//Function for Get Products by Category
    const selectedProducts = async (slug)=>{
         await commerce.products.list({
            category_slug: [slug],
          }).then(response => setProducts(response.data));
    }
// Calling gettingProducts
    useEffect(()=>{
        gettingProducts()
        getCategories()
    },[])
    console.log(products);
    return (
        <>
            <Spinner loading={loading} />
            {showCategory === true && <Category categories={categories} selectedProducts={selectedProducts} />}
            <section className="products">
                {
                    products.map( (product, index) => {
                        return (
                            <div className="product" key={product.id}>
                                <img onLoad={()=>stopSpinner(index)} src={product.media.source} alt=""/>
                                <div className="product-info">
                                    <h5 className='product-name'>{product.name}</h5>
                                    <div className='price-view-product'>
                                        <h6>Price: {product.price.formatted_with_symbol}</h6>
                                        <div className="view-product">
                                            <h5 onClick={()=>history.push(`/product/${product.name}/${product.id}`)}>View Product</h5>
                                        </div>
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