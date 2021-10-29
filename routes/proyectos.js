import express from "express";
import { check } from "express-validator";
import {
  crearProyecto,
  obtenerProyectos,
} from "../controllers/proyectoController.js";
import authMiddleware from "../moddelware/authMiddleware.js";

const router = express.Router();

// crear proyectos
// api/proyectos
router.post(
  "/",
  authMiddleware,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  crearProyecto
);
router.get("/", authMiddleware, obtenerProyectos);

export default router;
