import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';



const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

const socket = io(APIBaseUrl)

export default function EventRegistration({ eventId,type }) {
    const [attendeeCount, setAttendeeCount] = useState(0);
    const { loggedIn } = useContext(AuthContext)
    const [registered, setRegistered] = useState({})


    useEffect(() => {
        socket.on("connect", () => {
            console.log("WebSocket connected:", socket.id);
        });
        socket.emit("joinEvent", eventId);

        socket.on("updateAttendees", ({ eventId: updatedEventId, count }) => {
            if (!updatedEventId || count === undefined) return; // Avoid errors

            if (updatedEventId === eventId) {
                setAttendeeCount(count); // Set a fallback value if count is undefined
            }
           
        })
            return () => { 
                socket.off('updateAttendees') // Unsubscribe event listener
            }
        }, [eventId]);

        const registerAttendee = () => {
            let registerObj = {
                eventId
            }
            // console.log(registerObj)
            axios.post(`${APIBaseUrl}events/register`, registerObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Auth")}`
                }
            })
                .then(res => {
                    toast.success(res.data.message)
                    socket.emit("joinEvent", eventId);
                    setRegistered(true)
                })
                .catch(error => {
                    console.log(error)
                    toast.error(error.response?.data?.message || "something went wrong")
                })
        };
        return (
            <>
                {
                    loggedIn
                    &&
                    <div className="mt-4">
                        <p className="text-lg font-bold">Attendees: {attendeeCount}</p>
                        <div className='text-right'>
                            {
                                type=='upcoming'
                                &&
                                   <button
                                disabled={registered[eventId]}
                                onClick={registerAttendee}
                                className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg  ${registered[eventId] ? 'bg-gray-400 text-white cursor-not-allowed' : 'cursor-pointer'}`}
                            >{
                                    registered[eventId] ? 'Already registered' : ' Register for Event'
                                }

                            </button>
                            }
                         
                        </div>

                    </div>
                }

            </>
        )
    }
