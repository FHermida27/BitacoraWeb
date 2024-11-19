import { useEffect } from "react";
import { useBitacoras } from "../context/BitacorasContext"
import BitacoraCard from "../components/BitacoraCard";
import "./Styles/BitacorasPage.css"

const BitacorasPage = () => {
  const { getUserBitacoras, bitacoras } = useBitacoras();

  useEffect(() => {
    getUserBitacoras();
  }, []);

  if (bitacoras.length === 0) return (<h1>No tienes bitácoras registradas</h1>)

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        bitacoras.map(bitacora => (
          <BitacoraCard bitacora={bitacora} key={bitacora._id}/>
        ))
      }
    </div>
  )
}

export default BitacorasPage;