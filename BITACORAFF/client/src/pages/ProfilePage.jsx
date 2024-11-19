import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useBitacoras } from "../context/BitacorasContext";
import { Link } from "react-router-dom";
import "./Styles/ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const { getUserBitacoras, bitacoras } = useBitacoras();

  useEffect(() => {
    getUserBitacoras();
  }, []);

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  return (
    <div className="profile-container">
      <div className="profile-sections">
        {/* Sección de información del usuario */}
        <div className="profile-info">
          <h3>Información del Usuario</h3>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {capitalizeFirstLetter(user.role)}</p>
        </div>

        {/* Sección de bitácoras */}
        <div className="bitacoras-info">
          <h3>Mis Bitácoras</h3>
          {bitacoras.length === 0 ? (
            <p>No has creado ninguna bitácora aún.</p>
          ) : (
            <div className="bitacoras-list">
              {bitacoras.map((bitacora) => (
                <Link 
                  to={`/bitacora/${bitacora._id}`} 
                  key={bitacora._id} 
                  className="bitacora-button"
                >
                  <button>
                    {bitacora.titulo}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;