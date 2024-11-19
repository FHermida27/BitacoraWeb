import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Verificar token al cargar
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest();
                if (!res.data) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res && res.data) {
                setUser(res.data);
                setIsAuthenticated(true);
                setErrors([]);
            }
        } catch (error) {
            console.error("Error en signin:", error);
            if (error.response) {
                // El servidor respondió con un error
                setErrors(Array.isArray(error.response.data.message) 
                    ? error.response.data.message 
                    : [error.response.data.message]);
            } else if (error.request) {
                // No se pudo conectar con el servidor
                setErrors(["Error de conexión con el servidor"]);
            } else {
                // Error en la configuración de la solicitud
                setErrors(["Error al procesar la solicitud"]);
            }
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signin,
                signup,
                logout,
                isAuthenticated,
                errors,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};