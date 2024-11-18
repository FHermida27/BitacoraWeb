import { useAuth } from "../context/AuthContext";
import { useBitacoras } from "../context/BitacorasContext";
import { Link } from "react-router-dom"; 
import { useEffect } from 'react';
import "./Styles/ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const { getBitacoras, bitacoras } = useBitacoras();

  useEffect(() => {
    if (user) {
      getBitacoras(); // Llamada para obtener las bitácoras del usuario
    }
  }, [user, getBitacoras]);

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>

      <div className="profile-sections">
        {/* Información del usuario */}
        <div className="profile-info">
        <h3>Informacion del usuario</h3>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Fecha de registro:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          {/* <p><strong>Rol:</strong> {user.role ? user.role : 'No asignado'}</p>  */}
        </div>

        {/* Bitácoras creadas */}
        <div className="bitacoras-info">
          <h3>Bitácoras Creadas</h3>
          {bitacoras && bitacoras.length > 0 ? (
            <div className="bitacoras-list">
              {bitacoras.map((bitacora, index) => (
                <Link key={index} to={`/bitacora/${bitacora.id}`} className="bitacora-button">
                  <button>{bitacora.titulo}</button>
                </Link>
              ))}
            </div>
          ) : (
            <p>No tienes bitácoras creadas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
