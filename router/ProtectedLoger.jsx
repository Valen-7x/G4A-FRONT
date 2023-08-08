import React, { Children } from 'react';
import { Navigate } from 'react-router';

const ProtectedLoger = ({children}) => {
    let user=JSON.parse(localStorage.getItem("user"))
  if(user){
    return children
  }
  return <Navigate to={"/not-allow"} replace/>
}

export default ProtectedLoger;