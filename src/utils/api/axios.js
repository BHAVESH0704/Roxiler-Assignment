import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // change this to your backend API base URL
  withCredentials: true,
});
