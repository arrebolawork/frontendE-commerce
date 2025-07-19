import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

import './ProductWidget.scss';

const ProductList = ({ product }) => {
  const { addProductToCart } = useContext(UserContext);

  const addToCart = () => {
    addProductToCart(product.id);
  };

  return (
    <div className="__product">
      <button className="addCart" onClick={addToCart}></button>
      <Link to={`/product/${product.id}`} key={product.id}>
        <img src="./movil.png" alt="" />
        <div className="__productInfo">
          <p>{product.name}</p>
          <div className="__price">
            <span>{product.price.toFixed(2)}€</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductList;
