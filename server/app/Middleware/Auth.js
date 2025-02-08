const { userModel } = require("../model/UsersModel")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


let checkUser = async (req, res, next) => {
    const { username, email, password } = req.body
    // console.log(req.body)
    if((username|| email|| password)=='')  return res.status(400).json({ message: "All Fields Are Mandatory!" });
    try {
        const userEmailExist = await userModel.findOne({ userEmail: email })
        const userNameExist = await userModel.findOne({ userName: username })
        if (userEmailExist || userNameExist) return res.status(400).json({ message: "User already exists" });


    }
    catch (err) {
        console.log(err)
    }
    next()


}

let findUser = async (req, res, next) => {
    const { email, password } = req.body
    if((email|| password)=='')  return res.status(400).json({ message: "All Fields Are Mandatory!" });

    try {
        const user = await userModel.findOne({ userEmail: email })
        if (!user) return res.status(405).json({ message: "User Not found!" });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        req.user = user


    }
    catch (err) {
        console.log(err)
    }
    next()

}


const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified; // Attach user data to request
        // console.log(req.user)
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token.Try Login Again" });
    }
};



module.exports = { checkUser, findUser,verifyToken }