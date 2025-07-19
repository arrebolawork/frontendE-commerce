import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../context/ProductContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.scss'

const ProductDetails = () => {
    const { product, getProductById } = useContext(ProductContext);

    const params = useParams();
    useEffect(() => {
        getProductById(params.productId)
        console.log(product)
    }, [])

    return (
        <>
            <div className='productData'>
                <img src="../movil.png" alt="" />
                <div className='__content'>
                    <h1>{product.name}</h1>
                    <p>{product.price}</p>
                </div>

            </div>
            <div>
                <h2>Reviews</h2>
                <p></p>
            </div>
        </>
    )
}

export default ProductDetails