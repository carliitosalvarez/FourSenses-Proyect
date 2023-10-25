/* eslint-disable */

import { Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './components/Header';
import Home from "./Routes/Home";
import Detalles from "./Routes/Detalles"; // Importa el componente Detalles
import Alta from './Routes/Alta';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detalles/:id' element={<Detalles />} /> {/* Ruta para Detalles con parámetro ID */}
        <Route path='/alta' element={<Alta />} />
      </Routes>
    </div>
  )
}

export default App;
