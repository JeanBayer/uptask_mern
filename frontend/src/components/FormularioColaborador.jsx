import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import InputFormulario from "./InputFormulario";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { alerta, mostrarAlerta, submitColaborador } = useProyectos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      mostrarAlerta({
        msg: "El campo email es obligatorio",
        error: true,
      });
      return;
    }
    await submitColaborador(email);
    setEmail("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <InputFormulario
          estado={email}
          cambiarEstado={setEmail}
          type="email"
          titulo="Email Colaborador"
          id="email"
          placeholder="Email del usuario"
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 p-3 uppercase w-full cursor-pointer transition-colors  duration-500 text-white text-sm font-bold text-center rounded"
        value="Buscar Colaborador"
      />
    </form>
  );
};

export default FormularioColaborador;
