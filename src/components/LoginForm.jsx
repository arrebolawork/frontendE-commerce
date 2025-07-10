import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, passwd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
      <input type='password' value={passwd} onChange={(e) => setPasswd(e.target.value)} placeholder='Contraseña' required />
      <button type='submit'>Iniciar sesión</button>
    </form>
  );
}
