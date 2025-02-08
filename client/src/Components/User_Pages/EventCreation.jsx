import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import User_Header from '../User_Header';

function EventCreation() {
  const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

  const navigate = useNavigate()
  const { id } = useParams()
  const [event, setEvent] = useState({ name: '', description: '', date: '', category: '', _id: '' });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      axios.get(`${APIBaseUrl}ownerEvents/read/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Auth')}`
        }
      })
        .then(res => res.data)
        .then(finalres => finalres.event)
        .then(event => {
         const  date = event.date.split('T')[0] 
          setEvent({
            name: event.eventName,
            description: event.eventDesc,
            date: date,
            category: event.category,
            _id: event._id
          })
        })

        .catch(err => {
          console.log(err)
          toast.error(err.response?.data?.message)
        })
    }
    else{
      setEvent({ name: '', description: '', date: '', category: '', _id: '' })
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${APIBaseUrl}ownerEvents/create`, event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Auth')}`
      }
    })
      .then((res) => {
        toast.success(res.data.message)
        // console.log(res.data)
        navigate('/manage')
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response?.data?.message || "Something Went Wrong!")
      })
  };

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
        // console.log(error)
        if (!error.response?.config.__isHandled) {
          error.response.config.__isHandled = true; // Mark as handled
          toast.error(error.response?.data?.message);
        }
        navigate('/login')

        return Promise.reject(error);
      })
  }, [])

  return (
    <>
      <div className="bg-gradient-to-tr from-amber-200 via-transparent to-blue-400 min-h-screen  rounded-lg shadow-lg">
        <User_Header />
        <h2 className="text-3xl font-bold mb-6 p-3">Create An Event</h2>
        <form onSubmit={handleSubmit} autoComplete='off' className='p-4'>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Event Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={event.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer my-4">
            {
              id ? "Update Event" : "create Event"
            }
          </button>
        </form>
      </div>

    </>

  );
}

export default EventCreation;
