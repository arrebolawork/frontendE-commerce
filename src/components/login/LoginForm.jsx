import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './LoginForm.scss';

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [cumple, setCumple] = useState('');
  const [haveCount, setHaveCount] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, passwd);
  };
  const handleHaveCount = () => {
    setHaveCount((prev) => !prev);
    console.log('ha cambiado');
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="formularioContainer">
        {!haveCount && (
          <>
            <div className={`inputContainer estadoRegisto ${!haveCount ? 'visible' : ''}`}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div className={`inputContainer estadoRegisto ${!haveCount ? 'visible' : ''}`}>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Apellidos"
                required
              />
            </div>
            <div className={`inputContainer estadoRegisto ${!haveCount ? 'visible' : ''}`}>
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
      <button onClick={handleHaveCount}>{haveCount ? 'Registrate' : 'Tengo cuenta'}</button>
    </div>
  );
}
