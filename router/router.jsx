import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
import NotAllowed from "../src/componentes/NotAllowed";
import NotAllowedProtected from "./NotAllowedProtected";
import ProtectedLoger from "./ProtectedLoger";
import Games from "../src/componentes/Games";
import ProtectedLogin from "./ProtectedLogin";
import Details from "../src/componentes/Details";

import Register from "../src/componentes/Register";
import SignIn from "../src/pages/SignIn";
import VerifyCode from "../src/componentes/VerifyCode";
import ProtectedRouteUser from "../router/protectedUser";
import ProtectedRouteNotUser from "../router/protectedNotUser";
import PostComments from "../src/componentes/PostComments";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/not-allow",
        element: <NotAllowed />,
      },
      {
        path: "/games",
        element: (
          <ProtectedRouteNotUser>
            <Games />
          </ProtectedRouteNotUser>
        ),
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verifyAccount",
        element: (
          <ProtectedRouteUser>
            <VerifyCode />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/comment",
        element: <PostComments />,
      },
    ],
  },
]);
export default router;
