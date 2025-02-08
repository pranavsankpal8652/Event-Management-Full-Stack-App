import axios from 'axios'; const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import LoginForm from './LoginForm';

function Login({Modal}) {
  const navigate = useNavigate()

  const { loggedIn,setLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard')
    }
  }, [loggedIn])
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${APIBaseUrl}user/login`, form)
      .then((res) => {
        toast.success(res.data.message)
        // console.log(res.data)
        localStorage.setItem("Auth", res.data.token);
        setLoggedIn(true)
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);

      })
      .catch(err => {
        console.log(err)
        toast.error(err.response?.data?.message || "Something Went Wrong!")

      })
  };


  return (
    <>
 {
        Modal
          ?
          <>
            <h1 className="text-4xl font-bold mb-6">Login to Access More!</h1>
            <LoginForm form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>
          </>

          :  
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-amber-200 via-transparent to-blue-400 p-4 md:p-0">
          <h1 className="text-4xl font-bold  mb-6">Login</h1>
            <LoginForm form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>
          <span>not the member!
            <Link to='/register' className=' underline text-blue-400 text-lg p-3'>register here</Link>
          </span>
        </div>
}  
    </>
   
  );
}

export default Login;
