import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import InputFormulario from "./InputFormulario";

const FormularioProyecto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const { alerta, mostrarAlerta } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <InputFormulario
        estado={nombre}
        cambiarEstado={setNombre}
        type="text"
        titulo="Nombre Proyecto"
        id="nombre"
        placeholder="Nombre del Proyecto"
      />

      <InputFormulario
        estado={descripcion}
        cambiarEstado={setDescripcion}
        textArea={true}
        titulo="descripcion Proyecto"
        id="descripcion"
        placeholder="descripcion del Proyecto"
      />
      <InputFormulario
        estado={fechaEntrega}
        cambiarEstado={setFechaEntrega}
        type="date"
        titulo="Fecha de Entrega"
        id="fecha-entrega"
        placeholder="Fecha de Entrega"
      />

      <InputFormulario
        estado={cliente}
        cambiarEstado={setCliente}
        type="text"
        titulo="Cliente Proyecto"
        id="cliente"
        placeholder="Nombre del Cliente del Proyecto"
      />

      <input
        type="submit"
        value="crear proyecto"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
