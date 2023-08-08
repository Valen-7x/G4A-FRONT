import { createReducer } from "@reduxjs/toolkit";
import chapterActions from "../actions/chapter";

const {chapters_manga } = chapterActions;
const initialState = {
chapters: [], // Array para almacenar los capítulos del manga
  prev: null,
  next: null,
  currentPage: 1,
};
const chapterReducer = createReducer(initialState, (builder) => {
    builder
.addCase(chapters_manga, //.addCase define la logica necesaria para modificar los estados
        (state, action)=>{
        let newState = {
        ...state,

        chapters:action.payload.chapters,
        prev: action.payload.prev,
        next: action.payload.next,
        currentPage:action.payload.currentPage
    };
    return newState
})
})


export default chapterReducer;

