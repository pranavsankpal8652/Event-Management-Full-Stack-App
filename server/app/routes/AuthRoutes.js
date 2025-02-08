const express=require('express')
const { registerUser, loginUser, userAccess } = require('../controller/AuthControlller')
const { checkUser, findUser, verifyToken } = require('../Middleware/Auth')
const AuthRoutes=express.Router()

AuthRoutes.post('/register',checkUser,registerUser)

AuthRoutes.post('/login',findUser,loginUser)

AuthRoutes.get('/access',verifyToken,userAccess)

AuthRoutes.get('/auth/me',verifyToken,(req,res)=>{
    res.json({userID:req.user.id})
})



module.exports={AuthRoutes}