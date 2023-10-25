/* eslint-disable */

import { Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './Components/Header';
import Home from "./Routes/Home";
import Detalles from "./Routes/Detalles"; // Importa el componente Detalles
import Alta from './Routes/Alta';
function App() {
  return (
    <div className='App'>
      <Header />
      <div className='ContentContainer'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detalles/:id' element={<Detalles />} />
          <Route path='/alta' element={<Alta />} />
        </Routes>
      </div>
    </div>
  )
}


export default App;
