import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../context/ProductContext';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { product, getProductById } = useContext(ProductContext);

    const params = useParams();
    useEffect(() => {
        getProductById(params.productId)
    }, [])

    return (
        <>
            <div>
                <img src="../movil.png" alt="" />
                <h1>{product.name}</h1>
                <p>{product.price}</p>
            </div>
        </>
    )
}

export default ProductDetails