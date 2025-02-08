const express=require('express')
const { AuthRoutes } = require('./AuthRoutes')

const { OwnerEventRoutes } = require('./UserEventsRoutes')
const { EventRoutes } = require('./eventRoutes')



const mainRoutes=express.Router()

mainRoutes.use('/user',AuthRoutes)

mainRoutes.use('/ownerEvents',OwnerEventRoutes)

mainRoutes.use('/events',EventRoutes)





module.exports={mainRoutes}