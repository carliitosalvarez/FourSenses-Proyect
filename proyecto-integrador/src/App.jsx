/* eslint-disable */

import { Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './Components/Header';
import Home from "./Routes/Home";
import Detalles from "./Routes/Detalles";
import Alta from './Routes/Alta';

// Importa los componentes para las nuevas rutas
import Administracion from './Routes/Administracion'; // Asegúrate de crear este componente
import ListarProductos from './Routes/ListarProductos'


function App() {
  return (
    <div className='App'>
      <Header />
      <div className='ContentContainer'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detalles/:id' element={<Detalles />} />
          <Route path='/alta' element={<Alta />} />

          {/* Nuevas rutas */}
          <Route path='/admin' element={<Administracion />} />
          <Route path='/listar' element={<ListarProductos />} />

        </Routes>
      </div>
    </div>
  )
}

export default App;
