import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/login.css';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      setLoading(true); 
      await login({ email, password });
      navigate('/');
    } catch (error) {
      setError('Credenciales incorrectas. Intente nuevamente.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Cargando...' : 'Login'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
