import React from 'react';
import ReactDOM from 'react-dom';
import '../Styles/modal.css'; 

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
