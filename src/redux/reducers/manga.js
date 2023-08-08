import { createReducer } from "@reduxjs/toolkit";
import mangaActions from "../actions/manga";

const { datos_manga } = mangaActions;

const initialState = {
  manga:null,
};

const mangaReducer = createReducer(initialState, (builder) => {
  builder.addCase(datos_manga, (state, action) => {
    return {
      ...state,
      manga: action.payload,
    };
  });
});

export default mangaReducer;