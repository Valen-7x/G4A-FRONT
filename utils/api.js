import axios from "axios";
export const apiUrl = "http://localhost:8080/api/";
export const api = axios.create({ baseUrl: apiUrl });
export const endpoints = {
  comment: "comment",
  read_mangas: "mangas",
  read_categories: "categories",
  read_chapters: "chapters",
  signin: "auth/signin",
  signout: "auth/signout",
  create_mangas: "mangas/create/",
  read_categories: "categories/",
};
