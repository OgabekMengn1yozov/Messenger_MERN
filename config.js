require("dotenv").config()

const { env } = process

module.exports = {
    MONGO_URL: env.MONGO_URL,
    PORT: env.PORT,
}