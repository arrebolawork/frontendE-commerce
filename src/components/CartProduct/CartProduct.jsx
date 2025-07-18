import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import './CartProduct.scss';

const CartProduct = ({ product }) => {
  const { cart, addProductToCart, removeProductFromCart, emptyCart } = useContext(UserContext);

  const removeFromCart = () => {
    removeProductFromCart(product.id);
  };

  const setProductQuantity = (event) => {
    addProductToCart(product.id, event.target.value - cart.get(product.id));
  };

  return (
    <div className="cartProduct">
      <img src="/movil.png"></img>
      <b className="name">{product.name}</b>
      <div>
        <p>{product.price.toFixed(2)}€</p>
        <input type="number" min="0" value={cart.get(product.id)} onChange={setProductQuantity} />
      </div>
      <button onClick={removeFromCart}></button>
    </div>
  );
};

export default CartProduct;
