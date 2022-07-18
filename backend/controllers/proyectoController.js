import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    $or: [
      { colaboradores: { $in: req.usuario } },
      { creador: { $in: req.usuario } },
    ],
  }).select("-tareas");
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
  const proyecto = await Proyecto.findById(req.params.id)
    .populate("tareas")
    .populate("colaboradores", "nombre email");

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  if (
    proyecto.creador.toString() !== req.usuario._id.toString() &&
    !proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("No tienes permisos para ver este proyecto");
    return res.status(401).send({ msg: error.message });
  }

  res.send(proyecto);
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

const buscarColaborador = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v"
  );
  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(usuario);
};

const agregarColaborador = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  // solo el creador del proyecto puede agregar colaboradores
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).send({ msg: error.message });
  }

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v"
  );

  // verificar que el usuario exista
  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  // verificar que el usuario no sea el creador del proyecto
  if (usuario._id.toString() === proyecto.creador.toString()) {
    const error = new Error("No puedes agregarte a ti mismo");
    return res.status(401).send({ msg: error.message });
  }

  // verificar que el usuario no este ya en el proyecto
  if (proyecto.colaboradores.includes(usuario._id)) {
    const error = new Error("El usuario ya esta en el proyecto");
    return res.status(401).send({ msg: error.message });
  }

  proyecto.colaboradores.push(usuario._id);
  try {
    await proyecto.save();
    res.json({ msg: "Usuario agregado" });
  } catch (error) {
    console.log(error);
  }
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.body;
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).send({ msg: error.message });
  }

  // solo el creador del proyecto puede eliminar colaboradores
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no valida");
    return res.status(401).send({ msg: error.message });
  }

  proyecto.colaboradores.pull(id);

  await proyecto.save();

  res.json({ msg: "Colaborador eliminado del proyecto" });
};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador,
};
