import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-72 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.nombre}</p>
      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block text-center mt-5 rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
