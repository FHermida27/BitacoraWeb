import axios from './axios'

export const getAllBitacorasRequest = () => axios.get('/all-bitacoras');

export const getUserBitacorasRequest = () => axios.get('/user-bitacoras');

export const getBitacoraRequest = (id) => axios.get(`/bitacoras/${id}`);

export const createBitacoraRequest = (bitacora) => axios.post('/bitacoras', bitacora);

export const updateBitacoraRequest = (id, bitacora) => axios.put(`/bitacoras/${id}`, bitacora);

export const deleteBitacoraRequest = (id) => axios.delete(`/bitacoras/${id}`);