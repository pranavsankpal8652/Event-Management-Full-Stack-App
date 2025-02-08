const express=require('express')
const { verifyToken } = require('../Middleware/Auth')
const { createEvent, readEvents, deleteEvents } = require('../controller/USerEventController')

const OwnerEventRoutes=express.Router()

OwnerEventRoutes.post('/create',verifyToken,createEvent)

OwnerEventRoutes.get('/read/:editId?',verifyToken,readEvents)


OwnerEventRoutes.delete('/delete/:id',verifyToken,deleteEvents)



module.exports={OwnerEventRoutes}