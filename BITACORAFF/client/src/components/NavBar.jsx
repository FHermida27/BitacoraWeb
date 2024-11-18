import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú si se hace clic fuera del botón o menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? "/bitacoras" : "/"} className="title">
        <h1>Administrar Bitácoras</h1>
      </Link>
      <ul className="menu">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile" className="btn-profile">
                Bienvenido, {user.username}
              </Link>
            </li>
            <li>
              <Link to="/add-bitacora" className="btn-primary">
                Añadir Bitácora
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <li ref={menuRef}>
            <button
              className="user-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaUserCircle size={24} />
            </button>
            {menuOpen && (
              <div className="dropdown">
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Registrarse
                </Link>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
