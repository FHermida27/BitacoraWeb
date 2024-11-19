import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BitacorasPage from './pages/BitacorasPage'
import BitacoraFormPage from './pages/BitacoraFormPage'
import ProfilePage from './pages/ProfilePage'
import BitacoraDetailPage from './pages/BitacoraDetailPage'

import ProtectedRoute from './ProtectedRoute'
import { BitacoraProvider } from './context/BitacorasContext'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <AuthProvider>
      <BitacoraProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/bitacoras' element={<BitacorasPage />} />
                <Route path='/add-bitacora' element={<BitacoraFormPage />} />
                <Route path='/bitacoras/:id' element={<BitacoraFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/bitacora/:id' element={<BitacoraDetailPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </BitacoraProvider>
    </AuthProvider>
  )
}

export default App


App