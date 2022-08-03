const { v4 } = require("uuid")
const messages = require("../model/MessageModel")
const users = require("../model/UserModel")
const user_list = require("../model/.UserListModel")

module.exports = class MessageController {
    static async MessagePost(req, res) {
        try {
            const { text } = req.body
            const { to_id } = req.params
            const { user_id } = req.user

            const message = await messages.create({
                message_id: v4(),
                text, 
                from_id: user_id,
                to_id,
            })

            res.status(201).json({
                ok: true,
                message,
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
            const { to_id } = req.params

            const you = await users.findOne({
                user_id: to_id,
            })

            const user = await users.findOne({
                user_id,
            })

            const userList = await user_list.find()

            const messageList = await messages.find({
                $or: [
                    {
                        'from_id': user_id,
                        'to_id': to_id,
                    },
                    {
                        'from_id': to_id,
                        'to_id': user_id,
                    },
                ]
            })
    
            res.render("index", {
                ok: true,
                messages: messageList,
                user,
                data: userList,
                you,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async UsersGET(req, res) {
        try {
            const { user_id } = req.user
            const userList = await user_list.find()
            
            const user = await users.findOne({
                user_id,
            })

            res.render("index", {
                data: userList,
                user,
            })
            
            // json({
            //     ok: true,
            //     user_list: userList,
            // })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }
}