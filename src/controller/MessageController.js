const { v4 } = require("uuid")
const messages = require("../model/MessageModel")

module.exports = class MessageController {
    static async MessagePost(req, res) {
        try {
            const { text, to_id } = req.body
            const { user_id } = req.user

            await messages.create({
                message_id: v4(),
                text, 
                from_id: user_id,
                to_id,
            })

            res.status(201).json({
                ok: true
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async MessagesGET(req, res) {
        try {
            const { user_id } = req.user

            const messageList = await messages.find({
                from_id: user_id,
            })

            res.status(200).json({
                ok: true,
                messages: messageList,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }
}