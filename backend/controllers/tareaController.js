import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;
  const existeProyecto = await Proyecto.findById(proyecto);
  if (!existeProyecto) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para agregar tareas");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    existeProyecto.tareas.push(tareaAlmacenada._id);
    await existeProyecto.save();
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("La tarea no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para ver esta tarea");
    return res.status(403).json({ msg: error.message });
  }

  res.json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("La tarea no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para ver esta tarea");
    return res.status(403).json({ msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;

  try {
    const tareaActualizada = await tarea.save();
    res.json(tareaActualizada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("La tarea no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para ver esta tarea");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const proyecto = await Proyecto.findById(tarea.proyecto);
    proyecto.tareas.pull(tarea._id);
    await Promise.allSettled([tarea.deleteOne(), proyecto.save()]);
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id)
    .populate("proyecto")
    .populate("completado");

  if (!tarea) {
    const error = new Error("La tarea no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (
    tarea.proyecto.creador.toString() !== req.usuario._id.toString() &&
    !tarea.proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("No tienes permiso para ver esta tarea");
    return res.status(403).json({ msg: error.message });
  }

  tarea.estado = !tarea.estado;
  tarea.completado = req.usuario._id;
  try {
    await tarea.save();
    const tareaActualizada = await Tarea.findById(id)
      .populate("proyecto")
      .populate("completado");
    res.json(tareaActualizada);
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
