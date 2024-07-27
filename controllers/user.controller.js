
const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const sendEmail = require("../utils/email")


exports.verifyUserEmail = asyncHandler(async (req, res) => {
    console.log(req.loggedInUser)
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: " You Are Not Logged In. Please" })
    }
    console.log(result)
    const otp = Math.floor(10000 + Math.random() * 900000)
    await User.findByIdAndUpdate(req.loggedInUser, { emailCode: otp })
    await sendEmail({ to: result.email, subject: "verify Email", message: `<h1>your Login OTP${otp}</h1>` })

    res.json({ message: "Verification send Success" })
})

exports.verifyEmailOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: " You Are Not Logged In. Please" })
    }
    if (otp != result.emailCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    await User.findByIdAndUpdate(req.loggedInUser, { emailVerified: true })
    res.json({ message: "Email Verify Success" })
})

exports.verifyMobileOTP = asyncHandler(async (req, res) => {
    const { otp } = res.body
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: " You Are Not Logged In. Please" })
    }
    if (otp != result.mobileCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    await User.findByIdAndUpdate(req.loggedInUser, { mobileVerified: true })
    res.json({ message: "Email Verify Success" })
})