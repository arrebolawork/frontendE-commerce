import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import { API_URL } from '../../config';

import CartProduct from '../../components/CartProduct/CartProduct.jsx';
import './CartView.scss';

const CartView = () => {
  const { user, cart, emptyCart } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const processPayment = () => {
    const body = {
      userId: user.id,
      products: cart
        .entries()
        .map(([id, count]) => ({ id, count }))
        .toArray(),
    };
    console.log(body.products);
    axios.post(`${API_URL}/order`, body).then((res) => {
      if (res.status == 201) {
        emptyCart();
        navigate('/');
      }
    });
  };

  useEffect(() => {
    if (products.length == 0) {
      Promise.all(
        cart.keys().map((productId) => axios.get(`${API_URL}/product/${productId}`).then((res) => res.data.product)),
      ).then((products) => {
        setProducts(products);
      });
    }
  }, []);

  useEffect(() => {
    setPrice(products.reduce((price, product) => price + product.price * (cart.get(product.id) ?? 0), 0));
  }, [cart, products]);

  return (
    <div className="cartView">
      <div className="cartProducts">
        {cart.size > 0 ? (
          products.map((product) => cart.has(product.id) && <CartProduct product={product} key={product.id} />)
        ) : (
          <div className="emptyCart">
            <p>El carro está vacío</p>
            <Link to="/">Volver a la tienda</Link>
          </div>
        )}
      </div>
      {cart.size > 0 && (
        <div className="checkout">
          <b>Subtotal: {price.toFixed(2)} €</b>
          {user ? (
            <>
              <button className="button" onClick={processPayment}>
                Pagar
              </button>
            </>
          ) : (
            <>
              <p>Debe iniciar sesión para continuar el proceso de compra</p>
              <Link to="/login" className="button">
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartView;
