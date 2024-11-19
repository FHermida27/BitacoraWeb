import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000 // Timeout después de 5 segundos
});

// Interceptor para manejar errores
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Error de conexión: Asegúrate de que el servidor esté corriendo');
        } else if (error.response) {
            console.error('Error de respuesta:', error.response.data);
        } else if (error.request) {
            console.error('Error de conexión:', error.message);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Interceptor para agregar el token de autenticación
instance.interceptors.request.use(
    config => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;