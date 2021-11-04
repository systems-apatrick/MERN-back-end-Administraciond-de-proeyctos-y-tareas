// rutas para autenticar usuario
import express from "express";
import {
  autenticarUser,
  usuarioAutenticado,
} from "../controllers/authController.js";
import authMiddleware from "../moddelware/authMiddleware.js";
const router = express.Router();

// iniciar sessión
// /api/auth
router.post("/", autenticarUser);

// obtiene el usuario autenticado
router.get("/", authMiddleware, usuarioAutenticado);

export default router;
