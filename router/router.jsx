import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
import NotAllowed from "../src/componentes/NotAllowed";
import NotAllowedProtected from "./NotAllowedProtected";
import ProtectedLoger from "./ProtectedLoger";
import Games from "../src/componentes/Games";
import ProtectedLogin from "./ProtectedLogin";
import Details from "../src/componentes/Details";
import Cart from "../src/pages/Cart";


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
                path: "/not-allow",
                element:  <NotAllowed/> ,
              },
              {
                path:'/games',
                element: <Games/>
            },
            {
                path:'/details/:id',
                element: <Details/>
            },
            {
                path:'/cart',
                element: <Cart/>
            },

        ]
    },
          
])
export default router