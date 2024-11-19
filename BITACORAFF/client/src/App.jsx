import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BitacoraProvider } from './context/BitacorasContext'; // Importa el proveedor del contexto de las bitácoras
import { UserProvider } from './context/UserContext';  // Importa el UserProvider

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BitacorasPage from './pages/BitacorasPage';
import BitacoraFormPage from './pages/BitacoraFormPage';
import ProfilePage from './pages/ProfilePage';
import BitacoraDetailPage from './pages/BitacoraDetailPage';
import AllBitacoraPage from './pages/AllBitacoraPage';
import AllUserPage from './pages/AllUserPage';

// Componente de ruta protegida
import ProtectedRoute from './ProtectedRoute';

// Navbar
import NavBar from './components/NavBar';

const App = () => {
  return (
    <AuthProvider>
      <BitacoraProvider>
        <UserProvider>  {/* Aquí envuelves el contenido con UserProvider */}
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <NavBar />
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/bitacoras" element={<BitacorasPage />} />
                  <Route path="/add-bitacora" element={<BitacoraFormPage />} />
                  <Route path="/bitacoras/:id" element={<BitacoraFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/bitacora/:id" element={<BitacoraDetailPage />} />
                  <Route path="/all-bitacoras" element={<AllBitacoraPage />} />
                  <Route path="/all-users" element={<AllUserPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </UserProvider>  {/* Cierre del UserProvider */}
      </BitacoraProvider>
    </AuthProvider>
  );
};

export default App;
