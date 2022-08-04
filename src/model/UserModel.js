const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    firts_name: {
        type: String,
        max: 100,
    },
    last_name: {
        type: String,
        max: 100,
    },
    username: {
        type: String,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    // gender: {
    //     type: String,
    //     enum: "male" || "female",
    // },
    password: {
        type: String,
        required: true,
    },
    is_verify: {
        type: Boolean,
        default: false,
    },
    profile_picture: {
        type: String,
        default: "",
    },
    socket_id: {
        type: String,
    }
}, { timestamps: true })

const users = mongoose.model("users", UserSchema)
module.exports = users
