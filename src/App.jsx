import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Details from './components/Details'
import Login from './components/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/setup'
import Sell from './components/Sell'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

  

  
  return (
    <div>
      <ToastContainer theme='light'/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/sell" element={<Sell/>} />
      </Routes>
    </div>
  )
}

export default App
