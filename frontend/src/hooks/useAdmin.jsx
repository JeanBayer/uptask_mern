import useAuth from "./useAuth"
import useProyectos from "./useProyectos"

const useAdmin = () => {
  const { auth } = useAuth();
  const { proyecto } = useProyectos();
  return auth._id === proyecto.creador;
}

export default useAdmin