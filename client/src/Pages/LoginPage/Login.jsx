// Importa los hooks y componentes necesarios de React y React Router.
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importa el contexto de autenticación y el servicio de autenticación.
import { AuthContext } from '../../Context/AuthContext/auth.context';
import authService from '../../Service/AuthService/auth.service';

// Define el componente de la página de inicio de sesión.
function LoginPage() {
    // Estados locales para gestionar el correo electrónico, la contraseña y mensajes de error.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    // Obtiene la función de navegación desde React Router.
    const navigate = useNavigate();

    // Obtiene funciones y datos relacionados con la autenticación desde el contexto.
    const { storeToken, authenticateUser } = useContext(AuthContext);

    // Handlers para actualizar los estados de correo electrónico y contraseña.
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    // Handler para el envío del formulario de inicio de sesión.
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Crea un objeto con el cuerpo de la solicitud.
        const requestBody = { email, password };

        // Realiza una solicitud de inicio de sesión al servicio de autenticación.
        authService
            .login(requestBody)
            .then((response) => {
                // Almacena el token de autenticación en el almacenamiento local.
                storeToken(response.data.authToken);

                // Autentica al usuario y redirige a la página principal.
                authenticateUser();
                navigate("/");
            })
            .catch((error) => {
                // Captura y muestra un mensaje de error en caso de fallo en la solicitud.
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };


    return (
        <>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmail}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePassword}/>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Login</button>
            <p>
                joder chaval, no teneis una cuenta aun? gillip*llas haz click aqui <Link to="/signup">Signup</Link>
            </p>
        </form>
        </>
    );
}
// Exportación
export default LoginPage;