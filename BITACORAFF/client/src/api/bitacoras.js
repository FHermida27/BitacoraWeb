import axios from './axios';

export const getAllBitacorasRequest = () => axios.get('/bitacoras');
export const getUserBitacorasRequest = () => axios.get('/bitacoras/user');
export const getBitacoraRequest = (id) => axios.get(`/bitacoras/${id}`);
export const createBitacoraRequest = (bitacora) => axios.post('/bitacoras', bitacora);
export const updateBitacoraRequest = (id, bitacora) => axios.put(`/bitacoras/${id}`, bitacora);
export const deleteBitacoraRequest = (id) => axios.delete(`/bitacoras/${id}`);