const { userModel } = require("../model/UsersModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    let insUserObj = {
        "userName": username,
        "userEmail": email,
        "password": hashedPassword
    }
    try {
        const insUser = new userModel(insUserObj)
        const insUserObj_res = await insUser.save()
        var obj = {
            status: 1,
            message: 'Registration Success',
            insUserObj
        }
    }
    catch (err) {
        var obj = {
            status: 0,
            message: 'Something went wrong..try again later',
        }

    }
    res.send(obj)
}

const loginUser = (req, res) => {
    //Genarate JWT Token
    const userName = req.user.userName
    const id=req.user._id
    const token = jwt.sign({ userName,id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    res.json({ message: `Welcome ${userName} `, token })

}

const userAccess = (req, res) => {
    // The user data is already attached in req.user by the verifyToken middleware
    res.json({ message: `Welcome,${req.user.userName}!` });

}

module.exports = { registerUser, loginUser, userAccess }