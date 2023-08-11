import { Navigate } from "react-router-dom";
const ProtectedRouteByRole = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to={"/NotAllow"} />;
  }
  // Si el usuario tiene el rol permitido, mostrar la ruta protegida
  if (allowedRoles.includes(2)) {
    return children;
  }
  return <Navigate to={"/home"} />;
};
export default ProtectedRouteByRole;