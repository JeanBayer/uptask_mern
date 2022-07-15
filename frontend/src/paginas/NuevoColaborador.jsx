import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import LoaderSkeleton from "../components/LoaderSkeleton";

const NuevoColaborador = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyecto, cargando } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  if (cargando) {
    return <LoaderSkeleton />;
  }

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador al Proyecto: {proyecto.nombre}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  );
};

export default NuevoColaborador;
