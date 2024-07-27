const router = require("express").Router()
const { userProtected } = require("../middleware/protected")

router
    .post("/verify-user-email", userProtected, userController.verifyUserEmail)
    .post("/verify-user-email-otp", userProtected, userController.verifyUserEmailOTP)
    .post("/verify-user-mobile-otp", userProtected, userController.verifyUserMobileOTP)



module.exports = router