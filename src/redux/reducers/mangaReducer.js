import { createReducer } from "@reduxjs/toolkit"
import mangaActions from "../actions/mangaActions";
let { read_mangas, delete_mangas } = mangaActions
let initialState = {
    mangas: []
}
const mangaReducerr = createReducer(initialState, (builder) => builder
    .addCase(read_mangas.fulfilled, (state, action)=>{
        let newState = {
            ...state,
            mangas: action.payload
        }
        return newState
    })
    .addCase(delete_mangas.fulfilled, (state, action)=>{
        let newState = {
            ...state,
            mangas: action.payload
        }
        return newState
    }))
export default mangaReducerr