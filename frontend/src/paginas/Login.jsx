import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-600 uppercase block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Email de Registro"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 uppercase block text-xl font-bold"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Password de Registro"
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded text-center hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
