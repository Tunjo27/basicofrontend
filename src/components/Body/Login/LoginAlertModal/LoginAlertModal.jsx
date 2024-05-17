import React from 'react';
import Modal from 'react-modal';
import './LoginAlertModal.css';

// Configura el elemento raíz de la aplicación para accesibilidad con el modal
Modal.setAppElement('#root');

/**
 * Componente LoginAlertModal
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onRequestClose - Función para cerrar el modal.
 * 
 * @returns {JSX.Element} El componente LoginAlertModal.
 */
const LoginAlertModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="login-alert-modal-content"
      overlayClassName="login-alert-modal-overlay"
      contentLabel="Login Required Modal"
    >
      <h2>Acceso Restringido</h2>
      <p>Debes iniciar sesión para ver el contenido de esta página.</p>
      <button onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
};

export default LoginAlertModal;
