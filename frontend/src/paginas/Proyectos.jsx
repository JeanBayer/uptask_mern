import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import clienteAxios from "../config/clienteAxios";

const Proyectos = () => {
  const { proyectos, setProyectos, setAlerta } = useProyectos();
  useEffect(() => {
    const obtenerProyectos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAlerta({ msg: "Token no valido", error: true });
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/proyectos", config);
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (proyectos.length === 0) {
      obtenerProyectos();
    }
  }, []);
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
