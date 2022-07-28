const { MessagePost, MessagesGET } = require("../controller/MessageController")
const Auth = require("../middlewares/Auth")

const router = require("express").Router()

router.post("/", Auth, MessagePost)
router.get("/", Auth, MessagesGET)

module.exports = {
    path: "/",
    router,
}