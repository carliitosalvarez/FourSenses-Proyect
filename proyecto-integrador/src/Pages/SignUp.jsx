import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import '../Styles/signUp.css';

const SignUp = () => {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signUp({ name, surName, email, password });
      setSuccessMessage('Usuario registrado con éxito');
      setError('');
      setName('');
      setSurName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setSuccessMessage('');
      setError('Error al intentar registrarse. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={surName}
        onChange={(e) => setSurName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default SignUp;
