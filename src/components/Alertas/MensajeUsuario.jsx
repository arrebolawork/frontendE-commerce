import './mensajeUsuario.css';

export default function MensajeUsuario({ mensaje, tipo }) {
  return (
    <div className={tipo}>
      <p className="mensaje">{mensaje}</p>
    </div>
  );
}
