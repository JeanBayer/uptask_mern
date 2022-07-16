import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import LoaderSkeleton from "../components/LoaderSkeleton";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  const { id } = useParams();
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta
  } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  if (!proyecto._id) {
    return <Alerta alerta={alerta} />;
  }

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador al Proyecto: {proyecto.nombre}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      {cargando ? (
        <LoaderSkeleton />
      ) : (
        colaborador?._id && (
          <div className="mt-10 flex justify-center">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-center mb-10">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button
                  className="bg-slate-500 px-5 py-2 rounded-lg font-bold text-white text-sm"
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
