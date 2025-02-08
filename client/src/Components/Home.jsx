import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import GuestLogin from './GuestLogin';

Modal.setAppElement('#root');

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-tr from-amber-200 via-transparent to-blue-400">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center px-2">Welcome to Events</h1>
      <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8 lg:space-x-24 flex flex-col sm:flex-row items-center">
        <Link to="/Register">
          <button className="w-full sm:w-auto px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer">
            Register
          </button>
        </Link>
        <Link to="/Login">
          <button className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer">
            Login
          </button>
        </Link>
        <button className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer" onClick={openModal}>
          Guest Login
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="bg-[rgba(0,0,0,0.5)] fixed inset-0 flex items-center justify-center"
      >
        <div className="bg-gray-400 text-white p-8 rounded-lg shadow-lg relative">
          <GuestLogin closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
