import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';

const UserMenu = () => {
  const navigate = useNavigate();
  let { user, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    navigate('/home');
  };
  return (
    <div id="user-menu">
      {user ? (
        <>
          <p>Bienvenido {user.name}</p>
          {user.role === 'admin' && <Link to="/admin">Administración</Link>}
          <Link to="/profile">Mi perfil</Link>
          <Link to="/profile/orders">Mis pedidos</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarme</Link>
        </>
      )}
    </div>
  );
};

export default UserMenu;
