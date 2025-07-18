import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.scss';

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [cumple, setCumple] = useState('');
  const [haveCount, setHaveCount] = useState(true);
  const REGEX = /^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (haveCount) {
      if (email.trim() === '' || !REGEX.test(email.trim())) {
        console.log(email);
        return console.log('mostrar mensaje de que el mail no cumple los standars');
      }
      if (passwd.trim() === '') return console.log('mostrar mensaje de que el campo de la contraseña está vacio');
      login(email.trim(), passwd.trim());
      setEmail('');
      setPasswd('');
      navigate('/home');
    }
  };
  const handleHaveCount = () => {
    setHaveCount((prev) => !prev);
  };
  useEffect(() => {
    if (location.pathname === '/register') {
      setHaveCount(false);
    } else {
      setHaveCount(true);
    }
  }, [location]);
  return (
    <div className='loginPage'>
      <form onSubmit={handleSubmit} className="formularioContainer">
        {!haveCount && (
          <>
            <div className={`inputContainer estadoRegisto ${haveCount ? '' : 'visible'}`}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div className={`inputContainer estadoRegisto ${haveCount ? '' : 'visible'}`}>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Apellidos"
                required
              />
            </div>
            <div className={`inputContainer estadoRegisto ${haveCount ? '' : 'visible'}`}>
              <label htmlFor="cumpleaños">Cumpleaños</label>
              <input type="date" value={cumple} onChange={(e) => setCumple(e.target.value)} required />
            </div>
          </>
        )}
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="inputContainer">
          <label htmlFor="passwd">Password</label>
          <input
            type="password"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>

        <button type="submit" className="submitButton">
          {' '}
          {haveCount ? 'Inicia Sesión' : 'Registrate'}
        </button>
      </form>
      <button onClick={handleHaveCount} className="regiterButton">
        {haveCount ? 'Registrate' : 'Tengo cuenta'}
      </button>
    </div>
  );
}
