import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://yummyrecipesapi.herokuapp.com/api/',
  headers: {'x-access-token': `${localStorage.getItem('token')}` },
});

axiosInstance.interceptors.request.use((config) => {
    if (localStorage.getItem('token') && config.headers.Authorization === 'null') {
        config.headers.Authorization = `${localStorage.getItem('token')}`;
  }
  return config;
});

export default axiosInstance;