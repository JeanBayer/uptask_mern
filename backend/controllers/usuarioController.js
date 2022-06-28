import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailRecuperar } from "../helpers/email.js";

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
    await usuario.save();

    res.json({
      msg: "Usuario registrado correctamente, Revisa tu Email para confirmar tu cuenta.",
    });

    emailRegistro({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token,
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error("El usuario no está confirmado");
    return res.status(403).json({ msg: error.message });
  }

  if (await usuario.comprobarPassword(password)) {
    return res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmado = await Usuario.findOne({ token });
  if (!usuarioConfirmado) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmado.confirmado = true;
    usuarioConfirmado.token = "";
    await usuarioConfirmado.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    //enviar email
    emailRecuperar({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    console.log("token No valido");
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  console.log("token valido");
  return res.status(200).json({ msg: "Token valido" });
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuario.password = password;
    usuario.token = "";
    await usuario.save();
    res.json({ msg: "Contraseña cambiada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
