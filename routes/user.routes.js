const router = require("express").Router()
const { verifyUserEmail } = require("../controllers/user.controller")

router
    .post("/verify-user-email", userProtected, userController.verifyUserEmail)



module.exports = router