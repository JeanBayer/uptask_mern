import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
  const { setAuth, setCargando, cargando } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/usuarios/perfil", config);
        setAuth(data);
        navigate("/proyectos");
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };

    autenticarUsuario();
  }, []);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
