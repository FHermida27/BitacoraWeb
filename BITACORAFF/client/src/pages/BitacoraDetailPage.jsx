import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBitacoras } from "../context/BitacorasContext";
import BitacoraCard from "../components/BitacoraCard";
import "./Styles/BitacoraDetailPage.css";

const BitacoraDetailPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { getBitacora } = useBitacoras(); 
  const [bitacora, setBitacora] = useState(null);

  useEffect(() => {
    const fetchBitacora = async () => {
      const data = await getBitacora(id); 
      setBitacora(data); 
    };
    fetchBitacora();
  }, [id, getBitacora]);

  if (!bitacora) return <h2>Cargando Bitácora...</h2>;

  return (
    <div className="bitacora-detail-container">
      {/* Botón de "Atrás" */}
      <button className="back-button" onClick={() => navigate('/profile')}>
        &#8592; Atrás
      </button>

      {/* Tarjeta de la bitácora */}
      <BitacoraCard bitacora={bitacora} />
    </div>
  );
};

export default BitacoraDetailPage;
