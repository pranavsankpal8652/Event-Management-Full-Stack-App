import React from 'react';
import { useNavigate } from 'react-router';

function GuestLogin({ closeModal }) {
    const navigate=useNavigate()
  const handleGuestLogin = () => {
    // Add your guest login logic here
    navigate('/dashboard')
    closeModal();
  };

  return (
    <div>   
     <span className='absolute top-0 right-2 text-lg text-white cursor-pointer' onClick={closeModal}>X</span>
      <h1 className="text-2xl font-bold mb-6">Guest Login</h1>
      <button className=" cursor-pointer  w-full bg-gray-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300" onClick={handleGuestLogin}>
        Login as a Guest
      </button>
    </div>
  );
}

export default GuestLogin;
