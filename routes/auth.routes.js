
const router = require("express").Router()
const authController = require("../controllers/auth.controller")

router
    .post("/register-admin", authController.registerAdmin)

module.exports = router