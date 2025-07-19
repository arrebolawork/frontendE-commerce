import { useContext, useEffect } from 'react';
import './ProductList.scss';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { products, getAllProducts } = useContext(ProductContext);
  useEffect(() => {
    getAllProducts()
  }, [])



  return (
    <div className="productList">
      {products &&
        products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="__product"  >
              <button className='addCart'>
              </button>
              <img src="./movil.png" alt="" />
              <div className="__productInfo">
                <p>{product.name}</p>
                <div className='__price'>
                  <span>{product.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProductList;
