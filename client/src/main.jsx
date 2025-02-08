import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import EventDashboard from './Components/Dashboard.jsx'
import AuthProvider from './context/AuthContext.jsx'
import EventCreation from './Components/User_Pages/EventCreation.jsx'
import { ToastContainer } from 'react-toastify'
import UserEventManager from './Components/User_Pages/ManageEvents.jsx'

createRoot(document.getElementById('root')).render(


    <BrowserRouter>
    <ToastContainer/>
     <AuthProvider>
     <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Dashboard' element={<EventDashboard />}></Route>
          <Route path='/create/:id?' element={<EventCreation />}></Route>
          <Route path='/manage' element={<UserEventManager />}></Route>
        </Routes>
     </AuthProvider>
       
      

    </BrowserRouter>

)
