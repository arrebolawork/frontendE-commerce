import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li>
            <Link to="/shop">Inicio</Link>
          </li>
          <li>
            <Link to="/">Política de Privacidad</Link>
          </li>
          <li>
            <Link to="/">Terminos del Servicio</Link>
          </li>
          <li>
            <Link to="/">Política de Cookies</Link>
          </li>
          <li>
            <Link to="/">Soporte</Link>
          </li>
          <li>
            <Link to="/">Contacto</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
