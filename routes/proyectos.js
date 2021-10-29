import express from "express";
import crearProyecto from "../controllers/proyectoController.js";
import authMiddleware from "../moddelware/authMiddleware.js";

const router = express.Router();

// crear proyectos
// api/proyectos
router.post("/", authMiddleware, crearProyecto);
router.get("/", authMiddleware, crearProyecto);

export default router;
