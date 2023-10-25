/* eslint-disable */

import { useState } from 'react'
import {Route, Routes} from "react-router-dom"
import './App.css'
import React from 'react'
import Header from './components/Header'
import Menu from "./Routes/Home"
import Home from "./Routes/Home"
import Product from "./Routes/Product"
import Alta from './Routes/Alta'
function App() {

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/productos' element={<Product/>}/>
        <Route path='/alta' element={<Alta/>}/>
        </Routes>
    </div>

  )
}

export default App
