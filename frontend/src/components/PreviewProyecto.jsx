import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import useAdmin from "../hooks/useAdmin";

const PreviewProyecto = ({ proyecto }) => {
  const admin = useAdmin(proyecto);
  const { nombre, _id, cliente } = proyecto;
  return (
    <div className="border-b p-5 flex justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
        </p>
        {!admin && (
          <p className="p-1 text-sm text-white font-bold bg-green-500 rounded-lg uppercase">
            colaborador
          </p>
        )}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

PreviewProyecto.propTypes = {
  proyecto: PropTypes.object.isRequired,
};

export default PreviewProyecto;
