import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deberia estar dentro de un Provider")
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
    };

    // const signin = async (user) => {
    //     try {
    //         const res = await loginRequest(user)
    //         console.log(res)
    //         setIsAuthenticated(true)
    //         setUser(res.data)
    //     } catch (error) {
    //         if (Array.isArray(error.response.data)) {
    //             return setErrors(error.response.data)
    //         }
    //         setErrors([error.response.data.message])
    //     }
    // };

const signin = async (user) => {
  const navigate = useNavigate();
  try {
    const res = await loginRequest(user);
    setIsAuthenticated(true);
    console.log(res)
    setUser(res.data);
    navigate('/bitacoras');  // Redirigir a la página de bitácoras
  } catch (error) {
    if (Array.isArray(error.response.data)) {
      return setErrors(error.response.data);
    }
    setErrors([error.response.data.message]);
  }
};


    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 2000);
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false)
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}