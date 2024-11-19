import { useBitacoras } from "../context/BitacorasContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "./BitacoraCard.css";
dayjs.extend(utc);

const BitacoraCard = ({ bitacora }) => {
    const { deleteBitacora } = useBitacoras();

    return (
        <div className="card-container">
            <header className="card-header">
                <h1 className="card-title">{bitacora.titulo}</h1>
                <div className="card-actions">
                    <button
                        className="btn-delete"
                        onClick={() => {
                            deleteBitacora(bitacora._id);
                        }}>
                        Eliminar
                    </button>
                    <Link
                        className="btn-edit"
                        to={`/bitacoras/${bitacora._id}`}>
                        Editar
                    </Link>
                </div>
            </header>

            <div className="card-info">
                <div className="card-info-column">
                    <div className="info-row">
                        <label><font color="red"><strong>Localización Geográfica:</strong></font></label>
                        <p>{bitacora.localizacion_geografica}</p>
                    </div>
                    <div className="info-row">
                        <label><strong>Nombre Científico:</strong></label>
                        <p>{bitacora.nombre_cientifico || 'No especificado'}</p>
                    </div>
                    <div className="info-row">
                        <label><strong>Nombre Común:</strong></label>
                        <p>{bitacora.nombre_comun || 'No especificado'}</p>
                    </div>
                    <div className="info-row">
                        <label><strong>Familia:</strong></label>
                        <p>{bitacora.familia || 'No especificado'}</p>
                    </div>
                    <div className="info-row">
                        <label><strong>Cantidad de Muestras:</strong></label>
                        <p>{bitacora.cantidad_muestras || 'No especificado'}</p>
                    </div>
                    <div className="info-row">
                        <label><strong>Estado de la Planta:</strong></label>
                        <p>{bitacora.estado_planta || 'No especificado'}</p>
                    </div>
                    
                    <div className="info-row">
                        <label><font color="red"><strong>Condiciones Climáticas:</strong></font></label>
                        <p>{bitacora.condiciones_climaticas_durante_muestreo}</p>
                    </div>
                    <div className="info-row">
                        <label><font color="red"><strong>Descripción del Hábitat:</strong></font></label>
                        <p>{bitacora.descripcion_habitat}</p>
                    </div>
                    <div className="info-row">
                        <label><font color="red"><strong>Observaciones Adicionales:</strong></font></label>
                        <p>{bitacora.observaciones_adicionales}</p>
                    </div>
                </div>

                <div className="card-info-column">
                    <div className="info-row">
                        <label><font color="red"><strong>Fotografías:</strong></font></label>
                        <p className="photo-link" onClick={() => window.open(bitacora.fotografias, "_blank")}>
                            {bitacora.fotografias}
                        </p>
                    </div>
                    <div className="info-row">
                        <label><font color="red"><strong>Detalles Especies Recolectadas:</strong></font></label>
                        <p>{bitacora.detalles_especies_recolectadas}</p>
                    </div>
                    <div className="info-row">
                        <label><font color="red"><strong>Fecha:</strong></font></label>
                        <p>{dayjs(bitacora.date).utc().format("DD/MM/YYYY")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BitacoraCard;
