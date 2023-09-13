import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazonbckend.herokuapp.com/",
});

export default instance;
 