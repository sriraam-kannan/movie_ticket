import axios from "axios";

const neoAxios = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
});

export default neoAxios;
