import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find()
    .where("creador")
    .equals(req.usuario._id);
  res.send(proyectos);
};

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

const obtenerProyecto = async (req, res) => {
  console.log(req.usuario._id);
  const proyecto = await Proyecto.findById(req.params.id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para ver este proyecto");
    return res.status(401).send({ msg: error.message });
  }
  res.send(proyecto);
};

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
