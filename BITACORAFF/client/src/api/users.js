import axios from './axios';

export const getUsersRequest = () => axios.get('/users');

export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user);

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);