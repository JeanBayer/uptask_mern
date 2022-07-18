import useAuth from "./useAuth";
import useProyectos from "./useProyectos";

const useAdmin = (proyectoProp = {}) => {
  const { auth } = useAuth();
  const { proyecto } = useProyectos();
  const { creador } = proyectoProp;
  if (creador) {
    console.log("proyectoProp", proyectoProp);
    return auth._id === creador;
  }
  return auth._id === proyecto.creador;
};

export default useAdmin;
