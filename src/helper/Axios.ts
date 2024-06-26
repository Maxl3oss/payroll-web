import axios from "axios";

export const BASE_URL = process.env.BASE_URL_API as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;

export const useAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    // "Authorization": `Bearer ${getToken()}`,
    "Content-Type": ["application/json;multipart/form-data;"],
    "Access-Control-Allow-Origin": "*",
  },
});

useAxios.interceptors.request.use(config => {
  const accessToken = getToken();

  //checking if accessToken exists
  if (accessToken || accessToken !== "") {
    config.headers["Authorization"] =`Bearer ${accessToken}`;
  }

  return config;
});

function getToken(): string {
  const dataLocal = localStorage.getItem("auth-store") || null;
  const dataToken = dataLocal ? JSON.parse(dataLocal)?.state?.accessToken ?? "" : "";
  return dataToken;
}