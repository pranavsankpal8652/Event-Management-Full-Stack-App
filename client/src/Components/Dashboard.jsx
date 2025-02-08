import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Modal from 'react-modal';
import User_Header from './User_Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import Login from './Login';
import EventRegistration from './User_Pages/EventRegistration';


function EventDashboard() {

    const [events, setEvents] = useState([])

    const [categories, setCategories] = useState([])


    const APIBaseUrl = import.meta.env.VITE_API_BASE_URL
    const getevents = () => {
        axios.get(`${APIBaseUrl}events/get`)
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
                setEvents(formaattedEvents)
                const categories = finalres.events.map(event => event.category)
                const unique_categories = new Set(categories)
                //    console.log(unique_categories)
                setCategories(['All', ...unique_categories])

            })
            .catch(err => {
                console.log(err)
                toast.error(err.response?.data?.message)
            })
    }
    useEffect(() => {
        getevents()
    }, [])

    const { loggedIn } = useContext(AuthContext)
    const [filter, setFilter] = useState({ category: 'All', type: 'upcoming', search: '', startDate: '', endDate: '' });
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [showLogin, setshowLogin] = useState(false);

    useEffect(() => {
        const filtered = events.filter(event => {
            const categoryMatch = filter.category === 'All' || event.category === filter.category;
            const typeMatch = ((new Date(event.date) > Date.now()) && filter.type == 'upcoming') || ((new Date(event.date) < Date.now()) && filter.type == 'past')
            const searchMatch = event.eventName.toLowerCase().includes(filter.search.toLowerCase());
            const startDateMatch = !filter.startDate || new Date(event.date) >= new Date(filter.startDate);
            const endDateMatch = !filter.endDate || new Date(event.date) <= new Date(filter.endDate);
            return categoryMatch && typeMatch && searchMatch && startDateMatch && endDateMatch;
        });
        setFilteredEvents(filtered);
    }, [filter, events]);

    const handlefilterChange = (e) => {
        const { name, value } = e.target
        setFilter({ ...filter, [name]: value });
    };

    useEffect(() => {
        // console.log(loggedIn)
        if (!loggedIn) {
            setTimeout(() => {
                setshowLogin(true)
            }, 2000);
        }
        else {
            setshowLogin(false)
        }

    }, [loggedIn])



    return (
        <>
            {
                showLogin
                &&
                <Modal
                    isOpen={showLogin}
                    onRequestClose={showLogin == false}
                    className="fixed inset-0 flex items-center justify-center p-4"
                    overlayClassName="bg-[rgba(0,0,0,0.5)] fixed inset-0 flex items-center justify-center"
                >
                    <div className="bg-gray-400 text-white p-8 rounded-lg shadow-lg relative">
                        <span className='text-black absolute top-0 right-5 text-2xl cursor-pointer' onClick={() => setshowLogin(false)}>X</span>
                        <Login Modal={true} />
                    </div>
                </Modal>


            }

            <div className="min-h-screen bg-gradient-to-tr from-amber-200 via-transparent to-blue-400 ">
                <User_Header />
                <div className="container mx-auto p-6  shadow-lg rounded-lg">

                    <h1 className="text-5xl font-bold text-gray-900 mb-6 py-5">Dashboard</h1>
                    <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label htmlFor="search" className="block text-sm font-bold text-gray-700 mb-2">Search:</label>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                value={filter.search}
                                onChange={handlefilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Search events..."
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">Category:</label>
                            <select
                                id="category"
                                value={filter.category}
                                name="category"
                                onChange={handlefilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">Type:</label>
                            <select
                                id="type"
                                value={filter.type}
                                name='type'
                                onChange={handlefilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-bold text-gray-700 mb-2">Start Date:</label>
                            <input
                                type="date"
                                id="startDate"
                                name='startDate'
                                value={filter.startDate}
                                onChange={handlefilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-bold text-gray-700 mb-2">End Date:</label>
                            <input
                                type="date"
                                id="endDate"
                                name='endDate'
                                value={filter.endDate}
                                onChange={handlefilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
                        {
                            filteredEvents.length > 0
                                ?
                                // console.log(filteredEvents)
                                filteredEvents.map(event => (
                                    <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-101">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.eventName}</h2>
                                        <h2 className="text-lg font-bold text-gray-900 mb-2">{event.eventDesc}</h2>
                                        <p className="text-gray-600 mb-1">Date: {event.date}</p>
                                        <p className="text-gray-600 mb-1">Category: {event.category}</p>
                                       <EventRegistration eventId={event._id} type={filter.type} />
                                    </div>
                                ))
                                :
                                <p className='text-center text-lg'>No Events!</p>
                        }
                    </div>
                </div>
            </div>
        </>

    );
}

export default EventDashboard;
