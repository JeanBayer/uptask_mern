import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useProyectos from "../hooks/useProyectos";

const Proyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);
  return <div>Proyecto</div>;
};

export default Proyecto;
