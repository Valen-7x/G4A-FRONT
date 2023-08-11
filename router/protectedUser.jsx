import { Navigate } from "react-router-dom";
const ProtectedRouteUser = ({ children }) => {
  let user = localStorage.getItem("token");
  if (user) return <Navigate to={"/NotAllow"} />;
  return children;
};

export default ProtectedRouteUser;