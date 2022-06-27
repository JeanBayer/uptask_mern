const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>

        <input
          type="submit"
          value="Guardar Nuevo Password"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded text-center hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
