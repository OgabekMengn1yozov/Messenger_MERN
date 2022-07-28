const Path = require("path")
const Fs = require("fs")
const Morgan = require("morgan")
const Express = require("express")
const CookieParser = require("cookie-parser")
const { PORT } = require("../config")
const mongo = require("./modules/mongo")

const app = Express()
mongo()

app.use(Express.urlencoded({ extended: true }))
app.use(Morgan("tiny"))
app.use(Express.json())
app.use(CookieParser())

const path = Path.join(__dirname, "routes")
Fs.readdir(path, (err, files) => {
    if(!err) {
        files.forEach((file) => {
            const RoutePath = Path.join(__dirname, "routes", file)
            const Route = require(RoutePath)
            if(Route.path && Route.router) app.use(Route.path, Route.router)
        })
    }
})


app.listen(PORT, _=> console.log(`SERVER READY AT PORT ${PORT}`))