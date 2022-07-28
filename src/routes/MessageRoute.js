const { MessagePost } = require("../controller/MessageController")
const Auth = require("../middlewares/Auth")

const router = require("express").Router()

router.post("/", Auth, MessagePost)

module.exports = {
    path: "/",
    router,
}