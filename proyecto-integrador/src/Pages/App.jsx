import React from 'react';
import '../Styles/app.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Home from '../Pages/Home';
import Detalles from '../Pages/Detalles';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import User from './Users';
import Productos from '../Pages/Productos';

const App = () => {
  return (
    <AuthProvider>
      <div className='App'>
        <Header />
        <div className='ContentContainer'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/detalles/:id' element={<Detalles />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/users' element={<User />} />
            <Route path='/productos' element={<Productos />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
