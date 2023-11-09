import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Components/Pagination";
import RoleChangeModal from "../Components/RoleChangeModal";
import '../Styles/users.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentRole, setCurrentRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = '/'; 
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios:', error);
        setLoading(false);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateUserRole = async (userId) => {
    try {
      const data = {
        id: userId,
        newRole: currentRole === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN"
      };
  
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}`, data);
  
      if (response.status === 200) {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            user.roles[0].name = data.newRole;
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error);
    }
  };
  

  const [isConfirming, setIsConfirming] = useState(false);

const handleShowModal = (userId, currentRole, newRole) => {
  setSelectedUserId(userId);
  setCurrentRole(currentRole);
  setNewRole(newRole);
  setIsConfirming(false); 
  setShowModal(true);
};

  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {currentUsers.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.surName}</td>
                    <td>{user.email}</td>
                    <td>{user.roles[0].name}</td>
                    <td>
                      <button
                        className="role-button"
                        onClick={() => handleShowModal(user.id, user.roles[0].name, 'NuevoRol')}
                      >
                        Cambiar Rol <FontAwesomeIcon icon={faUserCog} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay usuarios disponibles.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / usersPerPage)}
            onPageChange={paginate}
          />
          <RoleChangeModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              updateUserRole(selectedUserId);
              setShowModal(false);
            }}
            currentRole={currentRole}
            newRole={newRole}
          />
        </>
      )}
    </div>
  );
};

export default Users;
