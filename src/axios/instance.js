import axios from "axios";

export const apiInstance = axios.create({
  // baseURL: "https://be-service.vercel.app",
  baseURL: "http://localhost:9000",

  // withCredentials: true,
});
