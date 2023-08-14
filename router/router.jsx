import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
import NotAllowed from "../src/componentes/NotAllowed";
import NotFound from "../src/componentes/NotFound";

import Games from "../src/componentes/Games";
import Details from "../src/componentes/Details";
import Market from "../src/componentes/Market";
import Register from "../src/componentes/Register";
import SignIn from "../src/pages/SignIn";
import VerifyCode from '../src/componentes/VerifyCode';
import ProtectedRouteUser from "../router/protectedUser";
import ProtectedRouteNotUser from "../router/protectedNotUser"

import AdminPanel from "../src/componentes/AdminPanel";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[            
            {
                path:'/',
                element: <App/>
            },
            {
                path: "*",
                element:  <NotFound/> ,
              },
            {
                path: "/NotAllow",
                element:  <NotAllowed/> ,
              },
              {
                path:'/games',
                element: 
                <ProtectedRouteNotUser>
                     <Games/>
                </ProtectedRouteNotUser>
            },
            {
                path:'/details/:id',
                element: <Details/>
            },
            {
                path:'/market',
                element: <Market/>
            },
            {
                path: "/register",
                element: 
                <ProtectedRouteUser>
                    <Register/>
                </ProtectedRouteUser>
                
            },
            {
                path:'/verifyAccount',
                element: 
                <ProtectedRouteUser>
                    <VerifyCode/>
                </ProtectedRouteUser>
            },
            {
                path: "/signin",
                element:
                <ProtectedRouteUser>
                    <SignIn/>
                </ProtectedRouteUser>
            },
            {
                path: "/adminPanel",
                element:
                <ProtectedRouteNotUser>
                    <AdminPanel/>
                </ProtectedRouteNotUser>
            },
        ]
    },
          
])
export default router