# 🎉 Event Management App

An event management platform where users can create events, register attendees, and track attendance in real-time using **WebSockets**.

## 🚀 Features
- User Authentication (JWT-based)
- Create, Manage, and Delete Events
- Real-time Attendee Tracking (WebSockets)
- Event Registration System
- Responsive UI

## 📦 Tech Stack
- **Frontend:** React, Tailwind CSS, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Socket.io
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)


## Start the Application
### Start backend
cd server
npm start

### Start frontend
cd ../client
npm run dev

## 🔌 WebSocket Integration
### Client: Connects to the WebSocket server to receive real-time attendee updates.
### Server: Handles socket connections and updates attendee counts.


## 🛠️ To-Do Features
 Admin Dashboard for Event Management
 Registrations for Attendees
 Event Filterings

 