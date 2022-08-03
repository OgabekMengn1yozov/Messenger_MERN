const { SignUpPOST, LoginPOST, SignUpGET, LoginGET } = require("../controller/UsersController")

const router = require("express").Router()

router.get("/signup", SignUpGET)
router.get("/login", LoginGET)
router.post("/signup", SignUpPOST)
router.post("/login", LoginPOST)

module.exports = {    
    path: "/users",
    router,
}