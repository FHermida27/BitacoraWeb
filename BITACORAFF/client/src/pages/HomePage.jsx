import { Link } from "react-router-dom";
import { useEffect } from "react";
import BitacoraCard from "../components/BitacoraCard";
import { useBitacoras } from "../context/BitacorasContext";
import "./Styles/HomePage.css";

const HomePage = () => {
  const { bitacoras, getBitacoras } = useBitacoras();

  useEffect(() => {
    getBitacoras();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a tu Bitácora de Plantas</h1>
        <p>
          Documenta el crecimiento, cuidados y observaciones de tus plantas en
          un solo lugar.
        </p>
      </header>
      <section className="home-actions">
        <Link to="/bitacoras" className="btn-primary">
          Ver Bitácoras
        </Link>
        <Link to="/add-bitacora" className="btn-secondary">
          Añadir Nueva Bitácora
        </Link>
      </section>
      <section className="home-info">
        <h2>¿Por qué usar la Bitácora de Plantas?</h2>
        <p>
          Registrar tus observaciones te ayudará a mantener un mejor cuidado de
          tus plantas. Puedes seguir su evolución, anotar detalles de riego,
          condiciones ambientales y cualquier observación importante.
        </p>
      </section>
      <div className="bitacora-grid">
        {bitacoras.length === 0 ? (
          <p>
            No hay bitácoras disponibles. Comienza añadiendo una nueva entrada.
          </p>
        ) : (
          bitacoras.map((bitacora) => (
            <BitacoraCard key={bitacora._id} bitacora={bitacora} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
