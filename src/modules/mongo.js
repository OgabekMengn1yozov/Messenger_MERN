const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

// Models

module.exports = async function mongo() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("MONGO CONNECT")
    } catch(e) {
        console.log("MONGO CONNECT FAILED"+ e)
    }
}