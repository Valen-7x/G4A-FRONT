import { createReducer } from "@reduxjs/toolkit";
import {
  setFilters,
  setCategories,
  setMangas,
  setPagination,
} from "../actions/mangas.js";

const initialState = {
  filters: {
    title: "",
    categoriesSelected: [],
    page: 1,
  },
  categories: [],
  mangas: [],
  pagination: {},
};

const mangasReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(setFilters, (state, action) => {    
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      console.log(action.payload);
    })
    .addCase(setCategories, (state, action) => {
      state.categories = action.payload;
    })
    .addCase(setMangas, (state, action) => {
      state.mangas = action.payload;
    })
    .addCase(setPagination, (state, action) => {
      state.pagination = action.payload;
    })
});

export default mangasReducer;
