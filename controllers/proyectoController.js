import { validationResult } from "express-validator";
import Proyecto from "../models/Proyecto.js";

const crearProyecto = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //   crear un nuevo    proyecto
    const proyecto = new Proyecto(req.body);

    //   guardar creado via JWT
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en crear un proyecto");
  }
};

// obtienes todos los proyectos del usuario actual
const obtenerProyectos = async (req, res) => {
  try {
    //   obtener los proyectos
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.send(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los proyectos del usuario");
  }
};

export { crearProyecto, obtenerProyectos };
