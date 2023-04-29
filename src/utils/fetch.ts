import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  config.baseURL = 'https://www.pre-onboarding-selection-task.shop'
  config.headers.Authorization = `Bearer ${token}`;
  return config
})

export default axiosInstance