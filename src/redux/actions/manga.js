import { createAction } from "@reduxjs/toolkit"
const datos_manga = createAction(
'datos_manga', //nombre de la accion
(objeto) => { //funcion que va a enviar datos al reductor 
               //el objeto debe tener todas las propiedades a guardarse en el estado global
               console.log(objeto)
return {
 payload: objeto 
}
}
)

// el objetivo de la accion es enviar informacion al reductor. 
// AQUI se realiza TODA la logica necesaria para modificar/reducir los estados globales.

const mangaActions = { datos_manga}
export default mangaActions