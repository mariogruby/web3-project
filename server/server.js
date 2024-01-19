const app = require("./app"); // creamos la constante app que requiere a "./app"
require('dotenv').config(); // requerimos las variables de entorno (.env)


// constante PORT que se iguala al PORT que se encuentra en el .env, si no la encuentra, usa el puerto 5005
const PORT = process.env.PORT || 5005; 

// se usa la funcion .listen() que llama al PORT 
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
