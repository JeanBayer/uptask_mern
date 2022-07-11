import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});

  const navigate = useNavigate();

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
    obtenerProyectos();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProyecto = async (proyectoParametro) => {
    if (proyectoParametro.id) {
      await editarProyecto(proyectoParametro);
    } else {
      await nuevoProyecto(proyectoParametro);
    }
  };

  const editarProyecto = async (proyectoParametro) => {
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
      const { data } = await clienteAxios.put(
        `/proyectos/${proyectoParametro.id}`,
        proyectoParametro,
        config
      );
      const proyectosActualizados = proyectos.map((p) =>
        p._id === data._id ? data : p
      );
      setProyectos(proyectosActualizados);
      setAlerta({ msg: "Proyecto actualizado", error: false });
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const nuevoProyecto = async (proyectoParametro) => {
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
      const { data } = await clienteAxios.post(
        "/proyectos",
        proyectoParametro,
        config
      );
      setAlerta({ msg: "Proyecto creado", error: false });
      setProyectos([...proyectos, data]);
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const eliminarProyecto = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return setAlerta({ msg: "Token no valido", error: true });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);
      setAlerta({ msg: data.msg, error: false });
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const obtenerProyecto = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      //TODO: agregar alerta
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setCargando(true);
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
    } catch (error) {
      console.error(data);
    } finally {
      setCargando(false);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const editarTarea = async (tarea) => {
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
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => {
          if (tareaState._id === data._id) {
            return data;
          }
          return tareaState;
        }
      );
      setProyecto(proyectoActualizado);
      setAlerta({ msg: "Tarea actualizada", error: false });
      setTimeout(() => {
        setAlerta({});
        setModalFormularioTarea(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const crearTarea = async (tarea) => {
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
      const { data } = await clienteAxios.post("/tareas", tarea, config);
      setProyecto({ ...proyecto, tareas: [...proyecto.tareas, data] });
      setAlerta({ msg: "Tarea creada", error: false });
      setTimeout(() => {
        setAlerta({});
        setModalFormularioTarea(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        alerta,
        mostrarAlerta,
        submitProyecto,
        eliminarProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export default ProyectosContext;
export { ProyectosProvider };
