import React from 'react'

export default function LoginForm({form,handleChange,handleSubmit}) {
  return (
   <>
     <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl" onSubmit={handleSubmit} autoComplete='off'>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300" type="submit">
          Login
        </button>
      </form>
   </>
  )
}
