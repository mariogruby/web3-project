// Importaciones:
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage/Landing-page';
import SignupPage from './Pages/SignupPage/Signup';
import LoginPage from './Pages/LoginPage/Login';
import './App.css';

// Función principal que representa la aplicación.
function App() {
  return (
    // La aplicación está envuelta en un contenedor con la clase "App".
    <div className="App">
      {/* Se utiliza el componente <Routes> de React Router para definir las rutas. */}
      <Routes>
        {/* Define una ruta para la página de inicio ("/") y asigna el componente <LandingPage/> a esa ruta. */}
        <Route path='/' element={<LandingPage />} /> 
        {/* Define una ruta para la página de inicio de sesión ("/login") y asigna el componente <LoginPage/> a esa ruta. */}
        <Route path='/login' element={<LoginPage />} />
        {/* Define una ruta para la página de registro ("/signup") y asigna el componente <SignupPage/> a esa ruta. */}
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
