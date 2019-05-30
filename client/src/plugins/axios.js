import axios from "axios";

export const URL = process.env.MY_APP_ENV === "development" ? "http://127.0.0.1:5000/" : "http://35.236.62.175:5000/";

export default axios.create({
  baseURL: URL,
  withCredentials: true,
});
