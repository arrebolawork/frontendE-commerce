import { useContext } from 'react'
import './ProductList.scss'
import { ProductContext } from '../../context/ProductContext'

const ProductList = () => {
const {products} = useContext(ProductContext)



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