import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './LoginForm.scss';

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, passwd);
  };

  return (
    <form onSubmit={handleSubmit} className="formularioContainer">
      <div className="inputContainer">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
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
        Iniciar sesión
      </button>
    </form>
  );
}
