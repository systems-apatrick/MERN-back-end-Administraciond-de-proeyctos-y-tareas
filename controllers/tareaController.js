import { validationResult } from "express-validator";
import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

// Crea un nueva tarea
const crearTarea = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto para tarea no encontrado" });
    }

    //   revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      res.status(401).json({ msg: "Usuario no autorizado" });
    }

    //   crear un nuevo    tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en crear una tarea");
  }
};

// obtiene las tareas por proyecto
const obtenerTareas = async (req, res) => {
  try {
    // extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto para tarea no encontrado" });
    }

    //   revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      res.status(401).json({ msg: "Usuario no autorizado" });
    }

    //   obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener las tareas de un proyecto");
  }
};
export { crearTarea, obtenerTareas };
