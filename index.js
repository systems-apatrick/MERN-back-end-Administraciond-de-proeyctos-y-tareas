import express from "express";
import conectaDB from "./config/db.js";
import usuarios from "./routes/usuarios.js";
import auth from "./routes/auth.js";

// crear el servidor
const app = express();
// conectar la base datos
conectaDB();

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

// arrancar la app del servidor
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
