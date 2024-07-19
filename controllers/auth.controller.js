// admin register
//verify
//login
//logout
//

// user
//register
//verify email
//login
//logout



const asyncHandler = require("express-async-handler")
const validator = require("validator")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { checkEmpty } = require("../utils/checkEmpty")
const Admin = require("../models/Admin")
const { verify } = require("jsonwebtoken")
const sendEmail = require("../utils/email")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })

    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invali Email" })
    }
    const isFound = await Admin.findOne({ email })
    if (isFound) {
        return res.status(400).json({ message: "email already registered with us" })
    }

    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash })

    res.json({ message: "Admin Register Success" })
})


exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(401).json({ message: "All fields Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(401).json({ message: "Invalid Email" })
    }
    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "Email Not Found" })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({
            message: process.env.NODE_ENV === "developement" ?
                "Invalid Password" : "Invalid Credentials"
        })
    }



    /// SEND OTP  

    const otp = Math.floor(10000 + Math.random() * 900000)
    await Admin.findByIdAndUpdate(result._id, { otp: otp })

    await sendEmail({
        to: email, subject: `Login Otp`, message: `
        <h1>Do Not Share Your Account  Otp</h1>
        <p>Your Login Otp <b>${otp}</b> </p>`
    })
    res.json({ message: "Credentials Verify Success .Otp send to your Registered email" })
})

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { otp, email } = req.body
    const { isError, error } = checkEmpty({ otp, email })
    if (isError) {
        return res.status(401).json({ message: "All fields Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(401).json({ message: "Invalid Email" })
    }
    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(401).json({
            message: process.env.NODE_ENV === "developement" ?
                "Invalid Password" : "Invalid Credentials"
        })
    }
    if (otp !== result.otp) {
        return res.status(401).json({ message: "Invalid Otp" })
    }
    const token = JWT.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    //JWT
    res.cookie("admin", token,
        {
            maxAge: 86400000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"

        })
    //cookie

    res.json({
        message: "OTP Verify Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    })
})