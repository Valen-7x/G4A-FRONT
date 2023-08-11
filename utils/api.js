import axios from "axios";
export const apiUrl = "http://localhost:8080/api/";
export const api = axios.create({ baseUrl: apiUrl });
export const endpoints = {
  comments: "comments",
};
