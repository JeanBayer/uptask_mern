import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu Cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `<h1>Hola ${nombre}</h1>
            <p>Comprueba tu cuenta en UpTask</p>
            <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace <a href="${process.env.FRONTEND_URL}/confirmar/${token}" >Comprobar Cuenta</a></p>
            <p>Si tú no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

export const emailRecuperar = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Restablece tu Contraseña",
    text: "Restablece tu Contraseña en UpTask",
    html: `<h1>Hola ${nombre}</h1>
            <p>Restablece tu Contraseña en UpTask</p>
            <p>Restablece tu contraseña en el siguiente enlace <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" >Restablecer Contraseña</a></p>
            <p>Si tú no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};
