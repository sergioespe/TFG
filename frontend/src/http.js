import axios from "axios";

const http = axios.create({
  baseURL: "/api/",
});

http.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem("token");
  if (token) config.headers.authorization = token;
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    alert(error.message);
    return Promise.reject(error);
  }
);

export default http;
