// Importa React y los hooks necesarios de React Router.
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importa el servicio de autenticación.
import authService from "../../Service/auth.service";

// Define el componente de la página de registro.
function SignupPage() {
    // Estados locales para gestionar el correo electrónico, la contraseña, el nombre y mensajes de error.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    // Obtiene la función de navegación desde React Router.
    const navigate = useNavigate();

    // Handlers para actualizar los estados de correo electrónico, contraseña y nombre.
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    // Handler para el envío del formulario de registro.
    const handleSignupSubmit = (e) => {
        e.preventDefault();

        // Crea un objeto con el cuerpo de la solicitud.
        const requestBody = { email, password, name };

        // Realiza una solicitud de registro al servicio de autenticación.
        authService
            .signup(requestBody)
            .then((response) => {
                // Si el registro es exitoso, redirige a la página de inicio de sesión.
                navigate("/login");
            })
            .catch((error) => {
                // En caso de error, captura y muestra un mensaje de error.
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <>
            <h2>Signup</h2>
            <form onSubmit={handleSignupSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmail} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleName} />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit">Signup</button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </>
    );
}

// Exportación
export default SignupPage;
