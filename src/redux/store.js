import { configureStore } from "@reduxjs/toolkit";
import mangasReducer from "../redux/reducers/mangas.js"
import authReducer from "../redux/reducers/auth.js";
import mangaReducer from "../redux/reducers/manga.js";
import chapterReducer from "../redux/reducers/chapter.js"
import mangaReducerr from "./reducers/mangaReducer.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mangas: mangasReducer,
    manga: mangaReducer,
    chapters:chapterReducer,
    manga: mangaReducerr
  },
})
