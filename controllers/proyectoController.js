import Proyecto from "../models/Proyecto.js";

const crearProyecto = async (req, res) => {
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

export default crearProyecto;
