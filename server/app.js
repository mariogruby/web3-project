require('dotenv').config(); // requerimos las variables de entorno (.env)
require('./db') // requerimos la configuracion de la base de datos 
const express = require('express'); // requerimos express
const cors = require('cors'); // requerimos los permisos de cors 
const app = express(); // constante app que llama a express
app.use(express.json()); // usamos la funcion .use() de express.json() dentro de app
app.use(cors()); // usamos los permisos de cors() dentro de la funcion .use() de app

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
// const profileRoutes = require("./routes/profile.routes");
// app.use("/profile", profileRoutes);


module.exports = app; 