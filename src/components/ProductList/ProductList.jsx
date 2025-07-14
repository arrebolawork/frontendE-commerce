import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ProductList.scss'

const ProductList = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/product/sortedDesc");
            setProducts(res.data.products)
        } catch (error) {
        }
    }
    useEffect(() => {
        getAllProducts()

    }, [])



    return (
        <>
            <div className='productList'>

                {products && products.map((product, index) => (
                    <div className='__product' key={index}>
                        <img src='./movil.png' alt="" />
                        <div className='__productInfo'>
                            <p>{product.name}</p>
                            <span>{product.price}</span>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default ProductList