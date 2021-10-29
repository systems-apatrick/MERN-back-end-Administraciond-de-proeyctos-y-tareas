import express from "express";
import cors from "cors";
import conectaDB from "./config/db.js";
import usuarios from "./routes/usuarios.js";
import auth from "./routes/auth.js";
import proyectos from "./routes/proyectos.js";
import tareas from "./routes/tareas.js";

// crear el servidor
const app = express();
// conectar la base datos
conectaDB();

// habilitar cors
app.use(cors());

// habilitar exppress.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;
// definir pagina principal
app.get("/", (req, res) => {
  res.send(`Servidor Corriendo`);
});

//importar rutas
app.use("/api/usuarios", usuarios);
app.use("/api/auth", auth);
app.use("/api/proyectos", proyectos);
app.use("/api/tareas", tareas);

// arrancar la app del servidor
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
