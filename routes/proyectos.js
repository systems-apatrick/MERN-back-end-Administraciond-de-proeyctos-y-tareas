import express from "express";
import crearProyecto from "../controllers/proyectoController.js";

const router = express.Router();

// crear proyectos
// api/proyectos
router.post("/", crearProyecto);

export default router;
