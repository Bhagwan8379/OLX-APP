const asyncHandler = require("express-async-handler")
const sendEmail = require("../utils/email")
const User = require("../models/User")
exports.verifyUserEmail = asyncHandler(async (req, res) => {
    console.log(req.loggedIdUser);
    const result = await User.findById(req.loggedIdUser)

    console.log(result);
    const otp = Math.floor(10000 + Math.random() * 900000)
    await User.findByIdAndUpdate(req.loggedIdUser, { emailCode: otp })
    sendEmail({ to: result.email, subject: "verify Email", message: `<p>Your Otp is  ${otp}</p>` })

    res.json({ message: "User Email Verify Success" })
})

exports.verifyUserEmail = asyncHandler(async (req, res) => {
    const { otp } = req.body
    const result = await User.findByIdAndUpdate(req.loggedIdUser)
    if (otp != result.emailCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    await User.findByIdAndUpdate(req.loggedIdUser, { emailVerified: true })
    return res.json({ message: "Email verify Success" })
})

exports.verifyMobileOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body
    const result = await User.findByIdAndUpdate(req.loggedIdUser)
    if (otp != result.mobileCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    await User.findByIdAndUpdate(req.loggedIdUser, { mobileVerified: true })
    return res.json({ message: "Mobile OTP verify Success" })
})
