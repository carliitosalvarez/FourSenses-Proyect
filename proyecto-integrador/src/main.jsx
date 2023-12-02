// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App.jsx'
import './Styles/index.css'
import Context from "./context/Context.jsx"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Context>
    <App />
  </Context>
  </BrowserRouter>
)
