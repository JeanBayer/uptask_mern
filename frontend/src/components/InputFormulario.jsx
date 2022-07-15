import { PropTypes } from "prop-types";

const InputFormulario = ({
  estado,
  cambiarEstado,
  type,
  titulo,
  id,
  placeholder,
  textArea = false,
}) => {
  return (
    <div className="mb-5">
      <label className="text-gray-700 uppercase font-bold text-sm" htmlFor={id}>
        {titulo}
      </label>
      {textArea ? (
        <textarea
          id={id}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder={placeholder}
          value={estado}
          onChange={(e) => cambiarEstado(e.target.value)}
        />
      ) : (
        <input
          type={type}
          id={id}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder={placeholder}
          value={estado}
          onChange={(e) => cambiarEstado(e.target.value)}
        />
      )}
    </div>
  );
};

InputFormulario.propTypes = {
  estado: PropTypes.string.isRequired,
  cambiarEstado: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  textArea: PropTypes.bool,
};

export default InputFormulario;
