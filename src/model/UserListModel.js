const mongoose = require("mongoose")

const UserListSchema = new mongoose.Schema({
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
    profile_picture: {
        type: String,
        default: "",
    }
}, { timestamps: true })

module.exports = mongoose.model("user_list", UserListSchema)
