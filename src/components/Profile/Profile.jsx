import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './profile.css';
export default function Profile() {
  const { fetchProfile, user } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState(null);
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user !== null) {
      setProfileUser(user);
    }
  }, [user]);
  if (!profileUser) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="perfilContainer">
      <div className="profileData">
        <label>
          Nombre : <strong>{profileUser.name}</strong>
        </label>
        <label>
          Apellidos : <strong>{profileUser.lastName}</strong>
        </label>
        {profileUser.birthday && (
          <>
            <label>
              Cumpleaños : <strong>{profileUser.birthday.split('T')[0]}</strong>
            </label>
          </>
        )}
        <label>
          Email : <strong>{profileUser.email}</strong>
        </label>
      </div>
    </div>
  );
}
