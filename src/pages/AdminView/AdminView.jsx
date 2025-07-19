import React, { useEffect, useContext } from 'react'
import { ProductContext } from '../../context/ProductContext';

const AdminView = () => {
    const { products, getAllProducts, deleteProduct } = useContext(ProductContext);

    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <>
            <div className="productList">
                {products &&
                    products.map((product) => (
                        <div className="__product" key={product.id}>
                            <img src="./movil.png" alt="" />
                            <div className="__productInfo">
                                <p>{product.name}</p>
                                <span>{product.price}</span>
                            </div>
                            <div className='__adminOptions'>
                                <button>update</button>
                                <button onClick={() => deleteProduct(product.id)}>delete</button>
                            </div>

                        </div>
                    ))}
            </div>
        </>
    )
}

export default AdminView