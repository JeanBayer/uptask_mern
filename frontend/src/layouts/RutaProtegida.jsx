import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <div>Cargando...</div>;

  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RutaProtegida;
