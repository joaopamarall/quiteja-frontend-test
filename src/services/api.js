import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'app-id': process.env.VUE_APP_ID,
  },
});

export const getDataUser = () => {
  return api.get('user')
  }

  export const getUserDetail = (id) => {
    return api.get(`user/${id}`)
    }

export default api;