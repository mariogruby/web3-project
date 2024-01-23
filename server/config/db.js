// const mongoose = require("mongoose");
// try {
//   mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     createIndexes: true
//   });
//   console.log("Database Connected Successfully!");
// } catch (err) {
//   console.log("Database Not Connected");
// }

const mongoose = require("mongoose"); // requerimos mongoose

// constante que se iguala a la variable de entorno MONGODB_URI donde está la direccion de la base de datos 
const MONGO_URI = process.env.DATABASE 

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