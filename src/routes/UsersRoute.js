const { SignUpPOST, LoginPOST } = require("../controller/UsersController")

const router = require("express").Router()

router.post("/signup", SignUpPOST)
router.post("/login", LoginPOST)

module.exports = {
    path: "/users",
    router,
}