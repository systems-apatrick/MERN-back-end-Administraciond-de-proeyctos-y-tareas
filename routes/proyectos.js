import express from "express";
import { check } from "express-validator";
import {
  actualizarProyecto,
  crearProyecto,
  eliminarProyecto,
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

// obtener todos los proyectos de un usuario
router.get("/", authMiddleware, obtenerProyectos);

// actualizar el proyecto via ID
router.put(
  "/:id",
  authMiddleware,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  actualizarProyecto
);

// Eliminar Proyecto
router.delete("/:id", authMiddleware, eliminarProyecto);

export default router;
