const { MessagePost, MessagesGET, UsersGET } = require("../controller/MessageController")
const Auth = require("../middlewares/Auth")

const router = require("express").Router()

router.get("/", Auth, UsersGET)
router.post("/:to_id", Auth, MessagePost)
router.get("/:to_id", Auth, MessagesGET)

module.exports = {
    path: "/",
    router,
}