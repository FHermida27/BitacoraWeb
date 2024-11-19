import axios from './axios';  // Asegúrate de que esta ruta sea correcta

export const getUsersRequest = () => axios.get("/users");

export const createUserRequest = (user) => axios.post("/users", user);

export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user);

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);
