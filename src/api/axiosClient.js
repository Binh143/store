import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: {
    "content-type": "application/json",
  },
  timeout: 1000 * 5,
});

export default axiosClient;
