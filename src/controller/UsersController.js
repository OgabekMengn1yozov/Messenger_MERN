const { v4 } = require("uuid")
const users = require("../model/UserModel")
const { generateHash, compareHash } = require("../modules/bcrypt")
const { generateToken } = require("../modules/jwt")
const user_list = require("../model/UserListModel")

module.exports = class UsersController {
    static async SignUpGET(req, res) {
        try {
            res.render("sign-up")
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })
        }
    }

    // static async LoginGET(req, res) {
    //     try {
    //         res.render("login")
    //     } catch(e) {
    //         console.log(e)
    //         res.status(400).json({
    //             ok: false,
    //         })
    //     }
    // }

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

            await user_list.create({
                ...user._doc,
                password: undefined,
                is_verify: undefined,
                email: undefined,
            })

            const token = generateToken({
                ...user._doc,
                password: undefined,
            })

            res.cookie("token", token).redirect("/")
        } catch(e) {
            console.log(e)
            // res.render("sign-up", {
            //     ok: false,
            //     message: e + "",
            // })
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

            res.cookie("token", token).redirect("/")
        } catch(e) {
            // console.log(e)
            // res.render("login", {
            //     ok: false,
            //     message: e + "",
            // })
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    
}