import axios from 'axios';

const API_URL = 'http://localhost:5173/api/users';

// Obtener todos los usuarios
export const getUsersRequest = async () => {
    return axios.get(API_URL);
};

// Crear un nuevo usuario
export const createUserRequest = async (user) => {
    return axios.post(API_URL, user);
};

// Eliminar un usuario
export const deleteUserRequest = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

// Actualizar un usuario
export const updateUserRequest = async (id, user) => {
    return axios.put(`${API_URL}/${id}`, user);
};
