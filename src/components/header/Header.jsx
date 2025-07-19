import { UserContext } from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';
import UserMenu from './UserMenu.jsx';
import { ProductContext } from '../../context/ProductContext.jsx';

const useQuery = () => new URLSearchParams(useLocation().search);
const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(UserContext);
  const [cartEmpty, setCartEmpty] = useState(!cart || cart.size == 0);
  const [showMenu, setShowMenu] = useState(false);
  const { getProductsByName, getAllProducts } = useContext(ProductContext);
  const query = useQuery();
  const name = query.get('name');
  useEffect(() => {
    setCartEmpty(!cart || cart.size == 0);
  }, [cart]);

  useEffect(() => {
    if (name) {
      getProductsByName(name);
    } else {
      getAllProducts(); // si no hay búsqueda, traer todos
    }
  }, [name]);

  const submitSearch = (event) => {
    event.preventDefault();
    const text = event.target.search.value;
    navigate(`/shop?name=${text}`);
  };

  return (
    <header className="header">
      <form className="search-form" onSubmit={submitSearch}>
        <input type="text" placeholder="Buscar" name="search" />
        <button className="search-button" type="submit"></button>
      </form>
      <Link to="/">Inicio</Link>
      <Link to="/shop">Tienda</Link>
      <Link to="/cart" className="header-button icon-cart">
        <span className={cartEmpty ? null : 'notification'}></span>
      </Link>
      <button
        className="header-button icon-user"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        {showMenu ? <UserMenu /> : null}
      </button>
    </header>
  );
};

export default Header;
