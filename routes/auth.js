// rutas para autenticar usuario
import express from "express";
import { check } from "express-validator";
import autenticarUser from "../controllers/authController.js";
import crearUsuario from "../controllers/usuarioController.js";
const router = express.Router();

// crear un usuario
// /api/auth
router.post("/", [
  check("email", "El email es oblitagario").isEmail(),
  check("password", "El password debe ser minimo de 6 caracteres").isLength({
    min: 6,
  }),
  autenticarUser,
]);

export default router;
