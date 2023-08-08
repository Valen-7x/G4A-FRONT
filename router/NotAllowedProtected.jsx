import React, { Children } from 'react';
import { Navigate } from 'react-router';
import router from './router';

const NotAllowedProtected = ({children}) => {
    let user=JSON.parse(localStorage.getItem("user"))
  if(user.role==1 || user.role==2){
    return children
  }
  return <Navigate to={"/not-allow"}/>
}

export default NotAllowedProtected;