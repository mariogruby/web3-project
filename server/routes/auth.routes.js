const express = require('express'); // requerimos express 
const router = express.Router(); // requerimos el enrutador de express
const bcrypt = require('bcrypt'); // requerimos el bcrypt para encriptar contraseñas

const jwt = require('jsonwebtoken') // requerimos el jsonwebtoken
const User = require('../models/User.model'); // requerimos el modelo de User
const { isAuthenticated } = require("../middleware/jwt.middleware.js"); // requerimos el middleware de jwt

const saltRounds = 10;
// Ruta post de registro de usuario  requiere email, password y username(name)
router.post("/signup", (req, res, next) => {
    const { email, password, name } = req.body;
    // Comprobacion de que si los campos quedan vacios devuelve un status: "Provide email, password and name"
    if (email === "" || password === "" || name === "") {
        res.status(400).json({ message: "Provide email, password and name" })
        return;
    }
    // comprobacion de que ek email sea valido para usarse
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    // comprobacion regular de los caracteres minimos que requiere la contraseña 
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
    }
    // se usa la funcion findOne() en constante User previamente declarada requeriendo el modelo User
    User.findOne({ email })
        .then((foundUser) => {
            // comprobacion de que si el usuario existe en la base de datos devuelve un status de: "User already exists."
            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }
            // si el usuario no existe en la base de datos, se crea el usuario en la base de datos generando el 
            //encriptamiento de la contraseña con bcrypt
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({ email, password: hashedPassword, name, userRole: 1 }); // ! agregado userRole para pruebas
        })
        .then((createdUser) => {

            const { email, name, _id } = createdUser
            res.status(201).json({ email, name, _id });
        })
        .catch((err) => next(err));
});
// ruta post de login, donde hacemos req.body a la base de datos de email y password
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    // comprobacion de si los campos quedan vacios devuelve el status: Provide email and password
    if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email and password" });
        return;
    }
    //comprobacion con la funcion findOne() para ver si existe el usuario en la base de datos,
    // si no existe devuelve un status:"User not found."
    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {

                res.status(401).json({ message: "User not found." });
                return;
            }
            //comprobacion de si la contraseña es la misma registrada al usuario en la base de datos 
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
            //si la contraseña es correcta, se crea una constante que se iguala a foundUser con el _id, email y name 
            if (passwordCorrect) {
                const { _id, email, name } = foundUser;
                // se crea la constatnte payload que se iguala  con el _id, email y name 
                const payload = { _id, email, name };
                //se crea una constante authtoken que llama a jsonwebtoken previamente requerido y declarado como jwt,
                //usando la funcion .sign(), donde llama al payload y al TOKEN_SECRET que se encuentra en las variables de entorno, luego
                // esos datos se pasan a un algoritmo de jwt "HS256" que expira en 6 horas
                const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "6h",
                });
                //si esta todo bien, devuelve el status 200 con el authoken ya creado y transferido al middleware isAutheticated,
                // si no, devuelve el status 401 
                //con un mensaje:"Unable to authenticate the user"
                res.status(200).json({ authToken: authToken });
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch((err) => next(err));
});
//ruta post logout donde usamos el middleware isAuthenticated que contiene el token y el payload del usuario, 
//para destruirlo al hacer logout
router.get("/logout", isAuthenticated, (req, res, next) => {
    req.session.destroy((err) => {
        //manejo de errores
        if (err) {
            res.status(500).render("/logout", { message: err.message });
            return;
        }
        //una vez hecho el logout, nos redirige a la ruta "/"
        res.redirect("/")
    });
});
// ruta get de verify donde requerimos el paylod del isAutheticated
router.get("/verify", isAuthenticated, (req, res, next) => {

    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    res.status(200).json(req.payload);
    // Send back the token payload object containing the user data
});

module.exports = router;
