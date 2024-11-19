import { useEffect, useState } from 'react';
import { useBitacoras } from '../context/BitacorasContext';
import './Styles/AllBitacorasPage.css';

const AllBitacoraPage = () => {
  const { getBitacoras, bitacoras, loading, error } = useBitacoras(); // Obtiene los datos del contexto

  useEffect(() => {
    // Llama a la función de obtener las bitácoras al cargar el componente
    getBitacoras();
  }, [getBitacoras]);

  if (loading) return <p>Cargando bitácoras...</p>;  // Muestra mensaje mientras se carga
  if (error) return <p>{error}</p>;  // Muestra error si ocurrió uno
  if (bitacoras.length === 0) return <h1>No hay bitácoras</h1>;  // Si no hay bitácoras

  return (
    <div className="all-bitacora-page">
      <h2>Lista de Bitácoras</h2>
      <table className="bitacoras-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {bitacoras.map((bitacora) => (
            <tr key={bitacora._id}>
              <td>{bitacora.title}</td>
              <td>{new Date(bitacora.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBitacoraPage;
