import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';

Modal.setAppElement('#root');

const Login = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Verificar si las credenciales son válidas
    if (username === 'usuario' && password === 'contrasena') {
      // Si las credenciales son válidas, llama a la función onRequestClose para cerrar el modal de inicio de sesión
      onRequestClose();
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
        <br/>
        <button type="button" onClick={handleLogin}>Iniciar sesión</button>
        <button type="button" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default Login;