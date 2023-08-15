import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
    let user = false
    if(user) return <Navigate to={"/"}/>
    return children
}

export default ProtectedRoute