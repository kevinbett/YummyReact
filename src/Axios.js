import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://yummyrecipesapi.herokuapp.com/api/',
  headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token')},
});

axiosInstance.interceptors.request.use((config) => {
    if (localStorage.getItem('token') && config.headers['x-access-token'] === 'null') {
        config.headers['x-access-token'] = localStorage.getItem('token');
  }
  return config;
});

export default axiosInstance;