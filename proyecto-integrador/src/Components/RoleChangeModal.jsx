import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import '../Styles/roleChangeModal.css'; 

const RoleChangeModal = ({ show, onClose, onConfirm, currentRole, newRole, isLoading }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const changeMessage = `¿Desea cambiar el rol de ${currentRole === "ROLE_ADMIN" ? "ROLE_ADMIN" : "ROLE_USER"} a ${currentRole === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN"}?`;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{changeMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={async () => {
            setIsUpdating(true);
            await onConfirm();
            setIsUpdating(false);
            onClose();
          }}
          disabled={isLoading || isUpdating}
        >
          {isLoading ? "Confirmando..." : "Confirmar"}
          {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
        </Button>
        <Button variant="secondary" onClick={onClose} disabled={isLoading || isUpdating}>
          <FontAwesomeIcon icon={faTimes} /> Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoleChangeModal;
