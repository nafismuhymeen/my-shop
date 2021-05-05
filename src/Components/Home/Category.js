import React from 'react';


const Category = ({ categories, selectedProducts }) => {
    return (
        <>
            <h2 style={{marginTop: '50px', textAlign: 'center'}}>Categories</h2>
            <section className="categories">
                {
                    categories.map(category=> {return(<h3 onClick={()=>selectedProducts(category.slug)} key={category.id} className="category">{category.name}</h3>)})
                }
            </section>
        </>
    );
};

export default Category;