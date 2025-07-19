import { UserContext } from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import UserMenu from './UserMenu.jsx';

const Header = () => {
  const { cart } = useContext(UserContext);
  const [cartEmpty, setCartEmpty] = useState(!cart || cart.size == 0);
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    setCartEmpty(!cart || cart.size == 0);
  }, [cart]);

  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    const text = event.target.search.value;
    navigate(`/search?name=${text}`);
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
