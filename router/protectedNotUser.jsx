import { Navigate } from "react-router-dom";
const ProtectedRouteNotUser = ({ children }) => {
  let user = localStorage.getItem("token");
  if (!user) return <Navigate to={"/NotAllow"} />;
  return children;
};

export default ProtectedRouteNotUser;