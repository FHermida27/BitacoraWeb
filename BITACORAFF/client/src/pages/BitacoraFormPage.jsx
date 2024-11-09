import { useForm } from 'react-hook-form'
import { useBitacoras } from '../context/BitacorasContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

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
        console.log(bitacora)
        setValue('titulo', bitacora.titulo)
        setValue('localizacion_geografica', bitacora.localizacion_geografica)
        setValue('condiciones_climaticas_durante_muestreo', bitacora.condiciones_climaticas_durante_muestreo)
        setValue('descripcion_habitat', bitacora.descripcion_habitat)
        setValue('fotografias', bitacora.fotografias)
        setValue('detalles_especies_recolectadas', bitacora.detalles_especies_recolectadas)
        setValue('observaciones_adicionales', bitacora.observaciones_adicionales)
        setValue("date", dayjs(bitacora.date).utc().format('YYYY/MM/DD'))
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

      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

        <form onSubmit={onSubmit}>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" placeholder="Título"
            {...register('titulo')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />
          <label htmlFor="localizacion_geografica">Localización Geográfica</label>
          <input type="text" placeholder="Localización geográfica"
            {...register('localizacion_geografica')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <label htmlFor="condiciones_climaticas_durante_muestreo">Condiciones climáticas durante el muestreo</label>
          <input type="text" placeholder="Condiciones climáticas durante el muestreo"
            {...register('condiciones_climaticas_durante_muestreo')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <label htmlFor="descripcion_habitat">Descripción del Hábitat</label>
          <input type="text" placeholder="Descripción del hábitat"
            {...register('descripcion_habitat')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <label htmlFor="Fotografías">URL Fotografías</label>
          <input type="text" placeholder="Fotografías"
            {...register('fotografias')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <label htmlFor="detalles_especies_recolectadas">Detalles de las especies recolectadas</label>
          <input type="text" placeholder="Detalles especies recolectadas"
            {...register('detalles_especies_recolectadas')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <label htmlFor="observaciones_adicionales">Observaciones adicionales</label>
          <input type="text" placeholder="Observaciones adicionales"
            {...register('observaciones_adicionales')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="date">Date</label>
          <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type="date" {...register('date')} />

          <button className=' bg-indigo-500 px-3 py-2 rounded-md' >Guardar</button>

        </form>

      </div>
    </div>
  )
}

export default BitacorasFormPage
