const express=require('express')
const { AuthRoutes } = require('./AuthRoutes')

const { OwnerEventRoutes } = require('./UserEventsRoutes')
const { EventRoutes } = require('./EventRoutes')



const mainRoutes=express.Router()

mainRoutes.use('/user',AuthRoutes)

mainRoutes.use('/ownerEvents',OwnerEventRoutes)

mainRoutes.use('/events',EventRoutes)


// mainRoutes.use('/events',eventRoutes)








module.exports={mainRoutes}