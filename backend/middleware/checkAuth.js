import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
   try {
     token = req.headers.authorization.split(' ')[1]
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
     return next()
   } catch (error) {
      return res.status(401).json({ msg: "Token no valido" })
   }
  }

  if(!token) {
    return res.status(401).json({ msg: "No autorizado" })
  }

  next()
};

export default checkAuth;
