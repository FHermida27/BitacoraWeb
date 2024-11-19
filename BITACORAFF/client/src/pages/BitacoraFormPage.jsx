import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBitacoras } from '../context/BitacorasContext';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './Styles/BitacoraFormPage.css';

dayjs.extend(utc);

const BitacorasFormPage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createBitacora, getBitacora, updateBitacora } = useBitacoras();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadBitacora() {
            if (params.id) {
                const bitacora = await getBitacora(params.id);
                setValue('titulo', bitacora.titulo);
                setValue('nombre_cientifico', bitacora.nombre_cientifico);
                setValue('nombre_comun', bitacora.nombre_comun);
                setValue('familia', bitacora.familia);
                setValue('cantidad_muestras', bitacora.cantidad_muestras);
                setValue('estado_planta', bitacora.estado_planta);
                setValue('localizacion_geografica', bitacora.localizacion_geografica);
                setValue('condiciones_climaticas_durante_muestreo', bitacora.condiciones_climaticas_durante_muestreo);
                setValue('descripcion_habitat', bitacora.descripcion_habitat);
                setValue('fotografias', bitacora.fotografias);
                setValue('detalles_especies_recolectadas', bitacora.detalles_especies_recolectadas);
                setValue('observaciones_adicionales', bitacora.observaciones_adicionales);
                setValue("date", dayjs(bitacora.date).utc().format('YYYY-MM-DD'));
            }
        }
        loadBitacora();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
            setError(null);

            const dataValid = {
                ...data,
                cantidad_muestras: Number(data.cantidad_muestras),
                date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
            };

            if (params.id) {
                await updateBitacora(params.id, dataValid);
            } else {
                await createBitacora(dataValid);
            }
            navigate('/bitacoras');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar la bitácora');
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className="flex">
            <div className="bg-zinc-800">
                <div className="form-header">
                    <h2>{params.id ? 'Editar Bitácora' : 'Nueva Bitácora'}</h2>
                </div>

                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={onSubmit}>
                    <div className="form-grid">
                        {/* Primera columna */}
                        <div className="form-group">
                            <label htmlFor="titulo">Título</label>
                            <input
                                type="text"
                                {...register('titulo', { required: "El título es requerido" })}
                                placeholder="Ingrese el título"
                                autoFocus
                            />
                            {errors.titulo && <p className="error-message">{errors.titulo.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre_cientifico">Nombre Científico</label>
                            <input
                                type="text"
                                {...register('nombre_cientifico')}
                                placeholder="Ingrese el nombre científico"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre_comun">Nombre Común</label>
                            <input
                                type="text"
                                {...register('nombre_comun', { required: true })}
                                placeholder="Ingrese el nombre común"
                            />
                            {errors.nombre_comun && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="familia">Familia</label>
                            <input
                                type="text"
                                {...register('familia')}
                                placeholder="Ingrese la familia"
                            />
                        </div>

                        {/* Segunda columna */}
                        <div className="form-group">
                            <label htmlFor="cantidad_muestras">Cantidad de Muestras</label>
                            <input
                                type="number"
                                {...register('cantidad_muestras', { required: true })}
                                placeholder="Ingrese la cantidad"
                            />
                            {errors.cantidad_muestras && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado_planta">Estado de la Planta</label>
                            <select {...register('estado_planta', { required: true })}>
                                <option value="">Seleccione un estado</option>
                                <option value="viva">Viva</option>
                                <option value="seca">Seca</option>
                                <option value="en proceso de secado">En proceso de secado</option>
                                <option value="otro">Otro</option>
                            </select>
                            {errors.estado_planta && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="localizacion_geografica">Localización Geográfica</label>
                            <input
                                type="text"
                                {...register('localizacion_geografica', { required: true })}
                                placeholder="Ingrese la localización"
                            />
                            {errors.localizacion_geografica && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Fecha</label>
                            <input
                                type="date"
                                {...register('date')}
                            />
                        </div>

                        {/* Campos de texto largo - ancho completo */}
                        <div className="form-group full-width">
                            <label htmlFor="condiciones_climaticas">Condiciones Climáticas</label>
                            <textarea
                                {...register('condiciones_climaticas_durante_muestreo', { required: true })}
                                placeholder="Describa las condiciones climáticas durante el muestreo"
                            />
                            {errors.condiciones_climaticas_durante_muestreo && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="descripcion_habitat">Descripción del Hábitat</label>
                            <textarea
                                {...register('descripcion_habitat', { required: true })}
                                placeholder="Describa el hábitat"
                            />
                            {errors.descripcion_habitat && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="detalles_especies">Detalles de Especies</label>
                            <textarea
                                {...register('detalles_especies_recolectadas', { required: true })}
                                placeholder="Ingrese los detalles de las especies recolectadas"
                            />
                            {errors.detalles_especies_recolectadas && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="observaciones">Observaciones Adicionales</label>
                            <textarea
                                {...register('observaciones_adicionales')}
                                placeholder="Ingrese observaciones adicionales"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="fotografias">URLs de Fotografías</label>
                            <textarea
                                {...register('fotografias', { required: true })}
                                placeholder="Ingrese las URLs de las fotografías"
                            />
                            {errors.fotografias && <p className="error-message">Este campo es requerido</p>}
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : params.id ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => navigate('/bitacoras')}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BitacorasFormPage;
