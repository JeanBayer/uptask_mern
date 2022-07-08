import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";
import LoaderSkeleton from "../components/LoaderSkeleton";
import useProyectos from "../hooks/useProyectos";

const EditarProyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyecto, cargando } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre } = proyecto;

  if (cargando) {
    return <LoaderSkeleton />;
  }
  return (
    <>
      <h1 className="font-black text-4xl">Editar Proyecto: {nombre}</h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
