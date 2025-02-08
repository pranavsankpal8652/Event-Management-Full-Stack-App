import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import User_Header from "../User_Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const UserEventManager = () => {
    const APIBaseUrl = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const [MyEvents, setMyEvents] = useState([])

    const getMyevents = () => {
        axios.get(`${APIBaseUrl}ownerEvents/read`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Auth')}`
            }
        })
            .then(res => res.data)
            .then(finalres => {
                // console.log(finalres.events)
                const formaattedEvents = finalres.events.map(event => ({
                    ...event,
                    date: new Date(event.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })
                })

                )
                setMyEvents(formaattedEvents)

            })
            .catch(err => {
                console.log(err)
                toast.error(err.response?.data?.message)
            })
    }
    useEffect(() => {
        getMyevents()
    }, [])

    useEffect(() => {
        axios.get(`${APIBaseUrl}user/access`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Auth')}`
            }
        })
            .then(res => {
                // toast.success(res.data.message)
            })
            .catch(error => {
                // console.log(err)
                if (!error.response?.config.__isHandled) {
                    error.response.config.__isHandled = true; // Mark as handled
                    toast.error(error.response?.data?.message);
                }
                navigate('/login')

                return Promise.reject(error);
            })
    }, [])

    // Handlers

    const handleDelete = (eventId) => {

        if (confirm('Are you sure to delete the event?')) {
            axios.delete(`${APIBaseUrl}ownerEvents/delete/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Auth')}`

                }
            })
                .then(res => {
                    toast.info(res.data.message)
                    getMyevents()
                })
                .catch(error => {
                    console.log(error)
                    if (!error.response?.config.__isHandled) {
                        error.response.config.__isHandled = true; // Mark as handled
                        toast.error(error.response?.data?.message);
                    }

                    return Promise.reject(error);
                })
        }


    };
    return (
        <div className="container mx-auto min-h-screen bg-gradient-to-tr from-amber-200 via-transparent to-blue-400 ">
            <User_Header />
            <h1 className="text-3xl font-bold text-gray-800 mb-5 p-3">Manage Your Events</h1>

            {/* Responsive Table for Desktop */}
            <div className="hidden md:block p-4">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left">Event Name</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            MyEvents.length>0
                            ?
                        MyEvents.map((event, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-4">{event.eventName}</td>
                                <td className="py-3 px-4">{event.category}</td>
                                <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <Link to={`/create/${event._id}`} className="text-blue-600 hover:text-blue-800">
                                        <Pencil size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td className="text-center" colSpan={4}>No Events Yet!</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>

            {/* Cards for Mobile View */}
            <div className="md:hidden space-y-4 p-2">
                {
                  MyEvents.length>0
                     ?
                MyEvents.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">{event.eventName}</h2>
                        <p className="text-sm text-gray-600">{event.category}</p>
                        <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
                        <div className="mt-2 flex gap-2">
                            <Link to={`/create/${event._id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                                <Pencil size={16} className="mr-1" /> Edit
                            </Link>
                            <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-red-800 flex items-center">
                                <Trash2 size={16} className="mr-1" /> Delete
                            </button>
                        </div>
                    </div>
                ))
                :
                <p className="text-black">No Events Yet!</p>
            }
            </div>
        </div>
    );
};


export default UserEventManager
