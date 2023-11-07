import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, credentials);

      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        throw new Error('Error de autenticación');
      }
    } catch (error) {
      console.error('AuthContext - Error login:', error.message);
      throw error;
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, userData);
      if (response.status !== 200) {
        throw new Error('Sign-up error');
      } 
    } catch (error) {
      console.error('Error sign-up:', error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
