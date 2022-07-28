const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    message_id: {
        type: String,
        unique: true,
        required: true,
    },
    text: {
        type: String,
    },
    date: {
        type: String,
    },
    from_id: {
        type: String,
        required: true,
    },
    to_id: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("messages", MessageSchema)