import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:7000/api/v1",
  withCredentials: true, // important for sending cookies (auth)
});

export default axiosClient;
