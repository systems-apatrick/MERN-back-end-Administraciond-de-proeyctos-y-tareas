import Usuario from "../models/Usuario.js";
import bcryptjs from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const autenticarUser = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer email and password
  const { email, password } = req.body;

  try {
    //   revisar que el usuario sea registrado
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //    revisar el password sea correcto
    let passwordCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ msg: "El password es incorrecto" });
    }
    //   crear JWT  si todo es correcto

    //   crear  y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //   firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        // mensaje de confirmación
        return res.json({ token });
      }
    );
    // res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    // res.status(40).send("Hubo un error");
  }
};
export default autenticarUser;
