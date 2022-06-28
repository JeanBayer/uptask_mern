import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/usuarios/olvide-password/${token}`;

      console.log(url);
      try {
        const { data } = await axios(url);
        setTokenValido(true);
      } catch (error) {
        setTokenValido(false);
        setAlerta({
          msg: "El token no es válido",
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        error: true,
        msg: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    setAlerta({});
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/usuarios/olvide-password/${token}`;

    try {
      const { data } = await axios.post(url, { password });
      setAlerta({ msg: data.msg, error: false });
      setPassword("");
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="text-gray-600 uppercase block text-xl font-bold"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              placeholder="Escribe tu Nuevo Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded text-center hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
