import axios from "axios";

const API = axios.create({
  baseURL: "https://chat-bot-tiy2.onrender.com/api",
});

export default API;