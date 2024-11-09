import { useBitacoras } from "../context/BitacorasContext"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

const BitacoraCard = ({ bitacora }) => {


    const { deleteBitacora } = useBitacoras()


    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{bitacora.titulo}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            deleteBitacora(bitacora._id);
                        }}>Eliminar</button>
                    <Link
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        to={`/bitacoras/${bitacora._id}`}>Editar</Link>
                </div>
            </header>
            <p className="text-slate-300">{bitacora.localizacion_geografica}</p>
            <p>{bitacora.condiciones_climaticas_durante_muestreo}</p>
            <p>{bitacora.descripcion_habitat}</p>
            <p>{bitacora.fotografias}</p>
            <p>{bitacora.detalles_especies_recolectadas}</p>
            <p>{bitacora.observaciones_adicionales}</p>
            <p>
                {dayjs(bitacora.date).utc().format("DD/MM/YYYY")}
            </p>
        </div>
    )
}

export default BitacoraCard
