import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:7000/api/v1",
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // important for sending cookies (auth)
});

export default axiosClient;
