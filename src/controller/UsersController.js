const { v4 } = require("uuid")
const users = require("../model/UserModel")
const { generateHash, compareHash } = require("../modules/bcrypt")
const { generateToken } = require("../modules/jwt")

module.exports = class UsersController {
    static async SignUpPOST(req, res) {
        try {
            const { username, email, password } = req.body

            let user = await users.findOne({
                username,
            })

            if(user) throw new Error("username already exists")

            user = await users.findOne({
                email,
            })

            if(user) throw new Error("email already exists")

            const hash = await generateHash(password)

            user = await users.create({
                user_id: v4(),
                username,
                email,
                password: hash,
            })

            const token = generateToken({
                ...user._doc,
                password: undefined,
            })

            res.cookie("token", token).status(201).json({
                ok: true,
                message: "registered",
                token,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async LoginPOST(req, res) {
        try {
            const { username, password } = req.body

            let user = await users.findOne({
                username,
            })

            if(!user) throw new Error("username not registered")

            const isPasswordTrue = await compareHash(password, user.password)

            if(!isPasswordTrue) throw new Error("invalid password")

            let token = await generateToken({
                ...user._doc, 
                password: undefined,
            })

            res.cookie("token", token).status(200).json({
                ok: true,
                message: "Login",
                token: token,
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