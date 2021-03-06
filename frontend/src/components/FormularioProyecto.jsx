import { useState, useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import InputFormulario from "./InputFormulario";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await submitProyecto({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
    });

    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
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
        value={id ? "actualizar proyecto" : "crear proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
