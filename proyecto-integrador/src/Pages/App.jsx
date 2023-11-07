import React from 'react';
import '../Styles/app.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Home from '../Pages/Home';
import Detalles from '../Pages/Detalles';
import Alta from '../Pages/Alta';
import Administracion from '../Pages/Administracion';
import ListarProductos from '../Pages/ListarProductos';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';

const App = () => {
  return (
    <AuthProvider>
      <div className='App'>
        <Header />
        <div className='ContentContainer'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/detalles/:id' element={<Detalles />} />
            <Route path='/alta' element={<Alta />} />
            <Route path='/administracion' element={<Administracion />} />
            <Route path='/listar' element={<ListarProductos />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
