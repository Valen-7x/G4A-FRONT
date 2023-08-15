import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
import NotAllowed from "../src/componentes/NotAllowed";
import Games from "../src/componentes/Games";
import Details from "../src/componentes/Details";
import Register from "../src/componentes/Register";
import SignIn from "../src/pages/SignIn";
import VerifyCode from "../src/componentes/VerifyCode";
import ProtectedRouteUser from "../router/protectedUser";
import ProtectedRouteNotUser from "../router/protectedNotUser";
import PostComments from "../src/componentes/PostComments";
import GamePage from "../src/pages/Comments";
import ViewComments from "../src/componentes/ViewComments";
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
        element: <Games />,
      },
      {
        path: "/details/:id",
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
        path: "/detalles/:id",
        element: <GamePage />,
      },
      {
        path: "/viewComments",
        element: <ViewComments />,
      },
    ],
  },
]);
export default router;
