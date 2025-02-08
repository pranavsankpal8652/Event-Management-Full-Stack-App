const express=require('express')
const { verifyToken } = require('../Middleware/Auth')
const { createEvent, readEvents, deleteEvents } = require('../controller/USerEventController')
const { getEvents, registerForEvent } = require('../controller/EventsController')
const { checkRegistered } = require('../Middleware/eventRegistration')

const EventRoutes=express.Router()


EventRoutes.get('/get',getEvents)


EventRoutes.post('/register',verifyToken,checkRegistered,registerForEvent)



module.exports={EventRoutes}