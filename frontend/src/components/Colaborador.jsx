import { PropTypes } from "prop-types";
import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
  const { nombre, email } = colaborador;
  const { handleModalEliminarColaborador } = useProyectos();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

Colaborador.propTypes = {
  colaborador: PropTypes.object.isRequired,
};

export default Colaborador;
