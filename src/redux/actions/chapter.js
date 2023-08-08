import { createAction } from "@reduxjs/toolkit";
const chapters_manga = createAction(
    'chapters_manga', //nombre de la accion
    (objeto) => { //funcion que va a enviar datos al reductor 
                   
    return {
     payload: {
        chapters:objeto.chapters,
            prev: objeto.prev,
            next: objeto.next,
            currentPage:objeto.currentPage
     } 
    }
    }
    )
    const chapterActions = { chapters_manga }
    export default chapterActions