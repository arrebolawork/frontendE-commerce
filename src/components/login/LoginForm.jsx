import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.scss';
import useMensajeUsuario from '../../hook/useMensajeUsuario';
import MensajeUsuario from '../Alertas/MensajeUsuario';

export default function LoginForm() {
  const { visible, mensaje, tipo, mostrarMensaje } = useMensajeUsuario();
  const { login, register } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [cumple, setCumple] = useState('');
  const [haveCount, setHaveCount] = useState(true);
  const REGEX = /^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || !REGEX.test(email.trim())) {
      return mostrarMensaje('Email vacío o no cumple con los estándares', 'error');
    }
    if (passwd.trim() === '') {
      return mostrarMensaje('La Contraseña está vacía', 'error');
    }

    if (haveCount) {
      await login(email.trim(), passwd.trim());
      const storageUser = localStorage.getItem('token');
      if (!storageUser) {
        mostrarMensaje('No estas autorizado', 'error');
      } else {
        navigate('/');
      }
    } else {
      if (nombre.trim() === '') return mostrarMensaje('Debes rellenar el nombre', 'error');
      if (apellidos.trim() === '') return mostrarMensaje('Deber rellenar los apellidos', 'error');

      const newUser = {
        name: nombre.trim(),
        lastName: apellidos.trim(),
        email: email.trim(),
        passwd: passwd.trim(),
        birthday: cumple ?? '',
      };
      register(newUser);
      mostrarMensaje('Usuario registrado con éxito', 'success');
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
    <div>
      {visible && <MensajeUsuario mensaje={mensaje} tipo={tipo} />}
      <form onSubmit={handleSubmit} className="formularioContainer">
        {!haveCount && (
          <>
            <div className={`inputContainer estadoRegisto ${haveCount ? '' : 'visible'}`}>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            </div>
            <div className={`inputContainer estadoRegisto ${haveCount ? '' : 'visible'}`}>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Apellidos"
              />
            </div>
            <div className={`inputContainer estadoRegisto ${haveCount ? '' : 'visible'}`}>
              <label htmlFor="cumpleaños">Cumpleaños</label>
              <input type="date" value={cumple} onChange={(e) => setCumple(e.target.value)} />
            </div>
          </>
        )}
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div className="inputContainer">
          <label htmlFor="passwd">Password</label>
          <input type="password" value={passwd} onChange={(e) => setPasswd(e.target.value)} placeholder="Contraseña" />
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
