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
    },
    read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const messages = mongoose.model("messages", MessageSchema)
module.exports = messages