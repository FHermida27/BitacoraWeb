import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})

export const getBitacorasRequest = (token) => 
    axios.get('/api/bitacoras', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  

export default instance