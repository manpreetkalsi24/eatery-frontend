import axios from "axios";

export const api = axios.create({
  baseURL: "https://restaurant-backend-fjsw.onrender.com/api",
});
