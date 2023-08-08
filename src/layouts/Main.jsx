import React from 'react'
import NavBar from "../componentes/NavBar"
import Footer from "../componentes/Footer"
import { Outlet } from 'react-router-dom'

export default function Main(){
  return (
    <div className="h-screen w-screen bg-black p-0 overflow-x-hidden">
    <NavBar/>
    <Outlet/> 
    <Footer/>
    </div> 
 )
}
//El objetivo principal de un layout es proporcionar una estructura coherente
// y reutilizable para colocar los diferentes componentes y contenido de una página.