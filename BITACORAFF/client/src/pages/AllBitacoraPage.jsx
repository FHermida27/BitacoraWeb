import { useEffect } from 'react';
import { useBitacoras } from '../context/BitacorasContext';
import './Styles/AllBitacorasPage.css';

const AllBitacoraPage = () => {
  const { getAllBitacoras, bitacoras, loading, error } = useBitacoras();

  useEffect(() => {
    getAllBitacoras();
  }, []);

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };


  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="all-bitacora-page">
      <h2>Lista de Bitácoras</h2>
      <div className="bitacoras-grid">
        {bitacoras.length > 0 ? (
          bitacoras.map((bitacora) => (
            <div key={bitacora._id} className="bitacora-card">
              <h3 className="bitacora-title">{bitacora.titulo}</h3>
              <div className="bitacora-info">
                <p>
                  <span>Creador:</span> {bitacora.user?.username || 'Usuario desconocido'}
                </p>
                <p>
                  <span>Rol:</span> {capitalizeFirstLetter(bitacora.user?.role || 'No especificado')}
                </p>
                <p>
                  <span>Localización:</span> {bitacora.localizacion_geografica}
                </p>
                <p>
                  <span>Especies:</span> {bitacora.detalles_especies_recolectadas}
                </p>
                <p>
                  <span>Fecha:</span> {new Date(bitacora.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span>Condiciones Climáticas:</span> {bitacora.condiciones_climaticas_durante_muestreo}
                </p>
                <p>
                  <span>Descripción del Hábitat:</span> {bitacora.descripcion_habitat}
                </p>
                {bitacora.observaciones_adicionales && (
                  <p>
                    <span>Observaciones:</span> {bitacora.observaciones_adicionales}
                  </p>
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