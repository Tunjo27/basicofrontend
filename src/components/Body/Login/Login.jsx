// Importaciones necesarias para el componente Login
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';
import { useNavigate } from 'react-router-dom';

// Establece el elemento de la aplicación para el modal de React
Modal.setAppElement('#root');

/**
 * Componente de inicio de sesión.
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Determina si el modal está abierto
 * @param {function} props.onRequestClose - Función para cerrar el modal
 * @param {function} props.onLogin - Función para manejar el inicio de sesión
 * @returns {JSX.Element} - JSX que representa el modal de inicio de sesión
 */
const Login = ({ isOpen, onRequestClose, onLogin }) => {
  // Estados para almacenar el nombre de usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Maneja el cambio en el campo de nombre de usuario
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Maneja el cambio en el campo de contraseña
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Maneja el evento de inicio de sesión
  const handleLogin = () => {
    // Verificar si las credenciales son válidas
    if (username === 'u' && password === 'p') {
      // Si las credenciales son válidas, llama a la función onRequestClose para cerrar el modal de inicio de sesión
      onLogin({ username }); // Aquí puedes pasar más información del usuario si lo deseas
      onRequestClose();
      navigate('/');
    } else {
      // Si las credenciales no son válidas, muestra un mensaje de error o toma la acción apropiada
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="login-modal-content"
      overlayClassName="login-modal-overlay"
      contentLabel="Login Modal"
    >
      <h2>Iniciar sesión</h2>
      <form>
        <label>
          Usuario:&nbsp;
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Contraseña:&nbsp;
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Iniciar sesión</button>
        <button type="button" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default Login;
