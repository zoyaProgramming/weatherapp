import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App></App>}></Route>
      </Routes>
    </BrowserRouter>
)
