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
const bcrypt = require("bcryptjs")
const { checkEmpty } = require("../utils/checkEmpty")
const Admin = require("../models/Admin")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })

    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invali Email" })
    }
    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({ message: "Provide Strong Password" })
    // }

    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash })

    res.json({ message: "Admin Register Success" })
})
