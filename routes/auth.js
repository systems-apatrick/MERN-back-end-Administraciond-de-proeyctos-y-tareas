// rutas para autenticar usuario
import express from "express";
import { check } from "express-validator";
import {
  autenticarUser,
  usuarioAutenticado,
} from "../controllers/authController.js";
import crearUsuario from "../controllers/usuarioController.js";
import authMiddleware from "../moddelware/authMiddleware.js";
const router = express.Router();

// iniciar sessión
// /api/auth
router.post("/", [
  check("email", "El email es oblitagario").isEmail(),
  check("password", "El password debe ser minimo de 6 caracteres").isLength({
    min: 6,
  }),
  autenticarUser,
]);

// obtiene el usuario autenticado
router.get("/", authMiddleware, usuarioAutenticado);

export default router;
