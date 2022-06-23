import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({
    email,
  });

  if (existeUsuario) {
    const error = new Error("usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    res.status(404).json({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error("El usuario no está confirmado");
    res.status(403).json({ msg: error.message });
  }

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    res.status(403).json({ msg: error.message });
  }
};

export { registrar, autenticar };
