import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-api-p7xy.onrender.com/",
});

export default instance;
 
