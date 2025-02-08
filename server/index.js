// Importing required modules
const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')
require('dotenv').config();  // To load environment variables from .env file
const app = express(); // Creating an express application
app.use(cors()); // Use CORS to allow cross-origin requests (you can configure more specific options here)
app.use(express.json()) 
const http = require('http');
const server = http.createServer(app);


const { mainRoutes } = require('./app/routes/mainRoutes');
const { webSocket } = require('./app/Socket/WebSocket');

// Define a main route
app.use(mainRoutes)

webSocket(server)  //Call The Socket Connection
// Set the port from environment variables or default to 3000
const port = process.env.PORT || 8080;

// Start the server
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
.then(()=>{
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(err=>{
    console.log(err)
})

