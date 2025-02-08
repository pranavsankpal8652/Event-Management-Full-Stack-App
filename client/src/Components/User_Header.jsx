import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router'
import { Menu, X } from "lucide-react";
import { io } from 'socket.io-client';



export default function User_Header() {
    const navigate = useNavigate()
    const { loggedIn, setLoggedIn } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);


    const logOut = () => {
        localStorage.removeItem('Auth')
        setLoggedIn(false)
        navigate('/login')
    }
    return (
        <>
            <header className='max-w-[100%] border border-green-300 shadow-2xl md:py-5 px-4 '>
                {
                    loggedIn
                    &&
                    <>
                        <div>
                            <nav className='md:flex gap-3.5 justify-end hidden'>
                                <Link to="/dashboard" className='bg-gray-500 p-[10px_20px] cursor-pointer rounded-xl'>Dashboard</Link>
                                <Link to="/create" className='bg-green-500 p-[10px_20px] cursor-pointer rounded-xl'>Create An Event</Link>
                                <Link to="/manage" className='bg-amber-600 p-[10px_20px] cursor-pointer rounded-xl'>Manage Events</Link>
                                <button onClick={logOut} className='bg-blue-500 p-[10px_20px] cursor-pointer rounded-xl'>Log Out</button>
                            </nav>
                            <button className="md:hidden " onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>

                        </div>
                        {isOpen && (
                            <div className="md:hidden flex flex-col items-center t py-4 space-y-2">
                                <Link to="/dashboard" className="w-full py-2   border-b-2">Dashboard</Link>
                                <Link to="/create" className="w-full py-2   border-b-2">Create Event</Link>
                                <Link to="/manage" className="w-full py-2   border-b-2">Manage Events</Link>
                                <button onClick={logOut} className="w-full py-2 bg-blue-500">Logout</button>
                            </div>
                        )}
                    </>


                }

            </header >
        </>
    )
}
