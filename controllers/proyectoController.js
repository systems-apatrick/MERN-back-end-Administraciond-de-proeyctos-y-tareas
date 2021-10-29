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

// actualizar un proyecto
const actualizarProyecto = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer la información

  const { nombre } = req.body;
  const nuevoProyecto = {};
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //   revisar el ID
    let proyecto = await Proyecto.findById(req.params.id);

    // si el proyecto existe o no
    if (!proyecto) {
      return res
        .status(404)
        .json({ msg: "Proyecto a actualizar no encontrado" });
    }

    // verificar el creado del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      res.status(401).json({ msg: "Usuario no autorizado" });
    }

    // actualizar el proyecto
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.send({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al actualizar el proyecto");
  }
};

// eliminar un proyecto por su ID
const eliminarProyecto = async (req, res) => {
  try {
    //   revisar el ID
    let proyecto = await Proyecto.findById(req.params.id);

    // si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto a eliminar no encontrado" });
    }

    // verificar el creado del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      res.status(401).json({ msg: "Usuario no autorizado" });
    }

    // eliminar el proyecto
    proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(404).send("Hubo un error al momento de eliminar un proyecto");
  }
};
export {
  crearProyecto,
  obtenerProyectos,
  actualizarProyecto,
  eliminarProyecto,
};
