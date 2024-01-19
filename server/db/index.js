const mongoose = require("mongoose"); // requerimos mongoose

// constante que se iguala a la variable de entorno MONGODB_URI donde está la direccion de la base de datos 
const MONGO_URI = process.env.MONGODB_URI 

// configuración básica de mongoose 
mongoose
.connect(MONGO_URI)
.then((x) => {
    const dbName = x.connections[0].name;
    console.log(dbName);
    console.log(`Connecting to Mongo! db name: "${dbName}"`);
})
.catch((err) => {
    console.error("Error connecting to Mongo", err);
});