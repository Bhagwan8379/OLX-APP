const router = require("express").Router()
const userController = require("./../controllers/user.controller")
const { userProtected } = require("../middleware/protected")

router
    .post("/verify-user-email", userProtected, userController.verifyUserEmail)
// .post("/verify-user-email-otp", userProtected, userController.verifye)
// .post("/verify-user-mobile-otp", userProtected, userController.verifyUserMobileOTP)



module.exports = router