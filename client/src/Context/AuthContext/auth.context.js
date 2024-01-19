import React, { useState, useEffect } from 'react';
import authService from '../../Service/AuthService/auth.service';

// Crea un contexto de autenticación.
const AuthContext = React.createContext();

// Define un componente proveedor de autenticación.
function AuthProvider(props)  {
    // Estados para gestionar la información de autenticación y carga.
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Función para almacenar el token de autenticación en el almacenamiento local.
    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    // Función para autenticar al usuario.
    const authenticateUser = () => {
        // Obtiene el token almacenado en el almacenamiento local.
        const storedToken = localStorage.getItem("authToken");

        if (storedToken) {
            // Si hay un token almacenado, realiza una solicitud para verificar la autenticación.
            authService
                .verify()
                .then((response) => {
                    const user = response.data;
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    // Si la verificación falla, establece el estado de autenticación en falso.
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            // Si no hay token almacenado, establece el estado de autenticación en falso.
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    // Función para remover el token de autenticación del almacenamiento local.
    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    // Función para cerrar sesión del usuario.
    const logOutUser = () => {
        // Elimina el token y vuelve a autenticar al usuario.
        removeToken();
        authenticateUser();
    };

    // Efecto secundario que se ejecuta al montar el componente para autenticar al usuario.
    useEffect(() => {
        authenticateUser();
    }, []);

    // Renderiza el proveedor de contexto con los valores y los componentes hijos.
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                setUser,
                storeToken,
                authenticateUser,
                logOutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

// Exportación
export { AuthProvider, AuthContext };
