import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const read_mangas = createAsyncThunk(
    'read_mangas',async (title) => {
        console.log(title)
        try {
            let {data} = await axios.get("http://localhost:8000/api/mangas/?title="+ title)
            console.log(data)
            return data.mangas
        } catch (error) {
            console.log(error)
            return null;
        }
    }
)
const delete_mangas = createAsyncThunk(
    'delete_mangas',async ({id, newMangas}) => {
        try {
            await axios.delete("http://localhost:8000/api/mangas/"+ id)
            return newMangas
            console.log(newMangas);
        } catch (error) {
            console.log(error)
            return null;
        }
    }
)

const mangaActions = { read_mangas, delete_mangas }
export default mangaActions