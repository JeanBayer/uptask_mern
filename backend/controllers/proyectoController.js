import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

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
  const proyecto = await Proyecto.findById(req.params.id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para ver este proyecto");
    return res.status(401).send({ msg: error.message });
  }

  const tareas = await Tarea.find().where("proyecto").equals(proyecto._id);

  res.send({ proyecto, tareas });
};

const editarProyecto = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para ver este proyecto");
    return res.status(401).send({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoActualizado = await proyecto.save();
    res.send(proyectoActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyecto = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para eliminar este proyecto");
    return res.status(401).send({ msg: error.message });
  }

  try {
    await proyecto.deleteOne();
    res.send({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const agregarColaborador = (req, res) => {};

const eliminarColaborador = (req, res) => {};


export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
};
