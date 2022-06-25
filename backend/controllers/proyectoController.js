import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = (req, res) => {};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;
  try {
    const proyectoAlmacenado = await proyecto.save();
    res.status(201).send(proyectoAlmacenado);
  } catch (error) {
    res.status(400).send(error);
  }
};

const obtenerProyecto = (req, res) => {};

const editarProyecto = (req, res) => {};

const eliminarProyecto = (req, res) => {};

const agregarColaborador = (req, res) => {};

const eliminarColaborador = (req, res) => {};

const obtenerTareas = (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
