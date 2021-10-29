// rutas para crear usuarios
import express from "express";
import { check } from "express-validator";
import crearUsuario from "../controllers/usuarioController.js";
const router = express.Router();

// crear un usuario
// /api/usuario
router.post(
  "/",
  [
    check("nombre", "El nombre es oblitagario").not().isEmpty(),
    check("email", "El email es oblitagario").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  crearUsuario
);

export default router;
