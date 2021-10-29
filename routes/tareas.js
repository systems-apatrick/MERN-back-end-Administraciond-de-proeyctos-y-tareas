import express from "express";
import { check } from "express-validator";
import { crearTarea } from "../controllers/tareaController.js";
import authMiddleware from "../moddelware/authMiddleware.js";

const router = express.Router();

// crear tareas
// api/tareas
router.post(
  "/",
  authMiddleware,
  [
    check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty(),
    check("proyecto", "El nombre de la proyecto es obligatorio")
      .not()
      .isEmpty(),
  ],
  crearTarea
);
export default router;
