import { useForm } from 'react-hook-form'
import { useBitacoras } from '../context/BitacorasContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import "./Styles/BitacoraFormPage.css"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const BitacorasFormPage = () => {
  const { register, handleSubmit, setValue } = useForm()
  const { createBitacora, getBitacora, updateBitacora } = useBitacoras()
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    async function loadBitacora() {
      if (params.id) {
        const bitacora = await getBitacora(params.id)
        setValue('titulo', bitacora.titulo)
        setValue('localizacion_geografica', bitacora.localizacion_geografica)
        setValue('condiciones_climaticas_durante_muestreo', bitacora.condiciones_climaticas_durante_muestreo)
        setValue('descripcion_habitat', bitacora.descripcion_habitat)
        setValue('fotografias', bitacora.fotografias)
        setValue('detalles_especies_recolectadas', bitacora.detalles_especies_recolectadas)
        setValue('observaciones_adicionales', bitacora.observaciones_adicionales)
        setValue("date", dayjs(bitacora.date).utc().format('YYYY-MM-DD'))
      }
    }
    loadBitacora();
  }, [])

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateBitacora(params.id, dataValid);
    } else {
      createBitacora(dataValid);
    }
    navigate('/bitacoras')
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md items-center'>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <h2 className="form-title">Registro de Bitácora</h2>
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="titulo" className="form-label">Título</label>
                <input
                  type="text"
                  id="titulo"
                  placeholder="Título"
                  {...register('titulo')}
                  className="form-input"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="localizacion_geografica" className="form-label">
                  Localización Geográfica
                </label>
                <input
                  type="text"
                  id="localizacion_geografica"
                  placeholder="Localización geográfica"
                  {...register('localizacion_geografica')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="condiciones_climaticas" className="form-label">
                  Condiciones Climáticas
                </label>
                <input
                  type="text"
                  id="condiciones_climaticas_durante_muestreo"
                  placeholder="Condiciones climáticas durante el muestreo"
                  {...register('condiciones_climaticas_durante_muestreo')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion_habitat" className="form-label">
                  Descripción del Hábitat
                </label>
                <input
                  type="text"
                  id="descripcion_habitat"
                  placeholder="Descripción del hábitat"
                  {...register('descripcion_habitat')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fotografias" className="form-label">
                  URL Fotografías
                </label>
                <input
                  type="text"
                  id="fotografias"
                  placeholder="Fotografías"
                  {...register('fotografias')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="detalles_especies" className="form-label">
                  Detalles de Especies
                </label>
                <input
                  type="text"
                  id="detalles_especies_recolectadas"
                  placeholder="Detalles especies recolectadas"
                  {...register('detalles_especies_recolectadas')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="observaciones" className="form-label">
                  Observaciones Adicionales
                </label>
                <input
                  type="text"
                  id="observaciones_adicionales"
                  placeholder="Observaciones adicionales"
                  {...register('observaciones_adicionales')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  {...register('date')}
                  className="form-input"
                />
              </div>
            </div>
            <button type="submit" className="form-button">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BitacorasFormPage