import { useContext } from 'react';
import './ProductList.scss';
import { ProductContext } from '../../context/ProductContext';

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="productList">
      {products &&
        products.map((product) => (
          <div className="__product" key={product.id}>
            <img src="./movil.png" alt="" />
            <div className="__productInfo">
              <p>{product.name}</p>
              <span>{product.price}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
