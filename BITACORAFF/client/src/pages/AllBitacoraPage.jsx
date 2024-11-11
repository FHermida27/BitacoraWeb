import { useEffect, useState } from 'react';
import { useBitacoras } from '../context/BitacorasContext';
import './Styles/AllBitacorasPage.css';

const AllBitacoraPage = () => {
  const { getBitacoras } = useBitacoras();
  const [bitacoras, setBitacoras] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        const bitacorasData = await getBitacoras();
        if (Array.isArray(bitacorasData)) {
          setBitacoras(bitacorasData);  
        } else {
          throw new Error('Datos inválidos recibidos'); 
        }
      } catch (err) {
        setError('No se pudieron cargar las bitácoras.');  
      } finally {
        setLoading(false); 
      }
    };

    fetchBitacoras();
  }, [getBitacoras]);

  if (loading) return <p>Cargando bitácoras...</p>;  // Muestra un mensaje de carga
  if (error) return <p>{error}</p>;  // Muestra el error si ocurrió uno
  if (bitacoras.length === 0) return <h1>No hay Bitácoras</h1>;  // Si no hay bitácoras

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
