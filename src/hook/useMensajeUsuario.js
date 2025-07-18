import { useEffect, useState } from 'react';

export default function useMensajeUsuario() {
  const [tipo, setTipo] = useState('error');
  const [mensaje, setMensaje] = useState('');
  const [visible, setVisible] = useState(false);

  const mostrarMensaje = (nuevoMensaje, nuevoTipo) => {
    setMensaje(nuevoMensaje);
    setTipo(nuevoTipo);
    setVisible(true);
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(
        () => {
          setVisible(false);
        },
        tipo === 'success' ? 2000 : 3000,
      );
      return () => clearTimeout(timer);
    }
  }, [visible, tipo]);

  return {
    tipo,
    mensaje,
    visible,
    mostrarMensaje,
  };
}
