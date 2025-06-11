import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // important for sending cookies (auth)
});

export default axiosClient;
