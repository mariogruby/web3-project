require('dotenv').config(); // requerimos las variables de entorno (.env)
require('./db') // requerimos la configuracion de la base de datos 
const express = require('express'); // requerimos express
const cors = require('cors'); // requerimos los permisos de cors 
const app = express(); // constante app que llama a express
app.use(express.json()); // usamos la funcion .use() de express.json() dentro de app
app.use(cors()); // usamos los permisos de cors() dentro de la funcion .use() de app

// se crea la constante authRoutes que requiere las rutas de autentificación,
// usamos authRoutes dentro de app.use() y haciendo referencia a "/auth" para saber que son rutas de autentificación
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


module.exports = app; 