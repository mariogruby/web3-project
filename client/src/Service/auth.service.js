// Importa la biblioteca Axios para hacer solicitudes HTTP.
import axios from "axios";

// Define la clase AuthService.
class AuthService {
    // Constructor de la clase.
    constructor() {
        // Crea una instancia de Axios con una base URL que proviene de una variable de entorno o usa una URL predeterminada si la variable de entorno no está definida.
        this.api = axios.create({
            baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
        });

        // Intercepta las solicitudes antes de ser enviadas y adjunta el token de autenticación (JWT) al encabezado de la solicitud si está disponible en el almacenamiento local.
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
                console.log("Token JWT adjuntado a la solicitud:", storedToken);
            }
            return config;
        });
    }

    // Método para realizar una solicitud de inicio de sesión.
    login = (requestBody) => {
        return this.api.post("/auth/login", requestBody);
    };

    // Método para realizar una solicitud de registro de usuario.
    signup = (requestBody) => {
        return this.api.post("/auth/signup", requestBody);
    };

    // Método para realizar una solicitud de verificación de autenticación.
    verify = () => {
        return this.api.get("/auth/verify");
    };
}

// Crea una instancia de la clase AuthService.
const authService = new AuthService();

// Exportacion
export default authService;