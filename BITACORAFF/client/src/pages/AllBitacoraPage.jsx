import { useEffect } from 'react';
import { useBitacoras } from '../context/BitacorasContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Styles/AllBitacorasPage.css';

const AllBitacoraPage = () => {
  const { getAllBitacoras, bitacoras, loading, error, deleteBitacora } = useBitacoras();
  const { user } = useAuth();

  useEffect(() => {
    getAllBitacoras();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (loading) return <p>Cargando bitácoras...</p>;

  return (
    <div className="all-bitacora-page">
      <h2>Lista de Bitácoras</h2>
      <div className="bitacoras-grid">
        {bitacoras.length > 0 ? (
          bitacoras.map((bitacora) => (
            <div key={bitacora._id} className="bitacora-card">
              {/* Título como botón que enlaza a BitacoraDetailPage */}
              <Link 
                to={`/bitacora/${bitacora._id}`} 
                className="bitacora-title-link"
              >
                <h3>{bitacora.titulo}</h3>
              </Link>
              <div className="bitacora-info">
                <p><strong>Localización:</strong> {bitacora.localizacion_geografica}</p>
                <p><strong>Fecha:</strong> {new Date(bitacora.date).toLocaleDateString()}</p>
                <div className="creator-info">
                  <p>
                    <strong>Creado por:</strong>{" "}
                    <span className="creator-name">
                      {bitacora.user?.username || "Usuario desconocido"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="card-actions">
                <Link 
                  to={`/bitacoras/${bitacora._id}`} 
                  className="edit-btn"
                >
                  Editar
                </Link>
                {user.role === "administrador" && (
                  <button 
                    onClick={() => {
                      const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta bitácora?");
                      if (confirmed) {
                        deleteBitacora(bitacora._id);
                      }
                    }}
                    className="delete-btn"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-bitacoras">No hay bitácoras registradas</p>
        )}
      </div>
    </div>
  );
};

export default AllBitacoraPage;