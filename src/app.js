const Path = require("path")
const Fs = require("fs")
const Http = require("http")
const Morgan = require("morgan")
const Express = require("express")
const CookieParser = require("cookie-parser")
const ExpressFileUpload = require("express-fileupload")
const { PORT } = require("../config")
const mongo = require("./modules/mongo")

const app = Express()   

const server = Http.createServer(app)
const io = new Server(server)

mongo()       

app.use(Express.urlencoded({ extended: true }))
app.use(Morgan("tiny"))
app.use(Express.json())
app.use(CookieParser())
app.use(ExpressFileUpload())
app.use("/public", Express.static(Path.join(__dirname, "public")))

app.use("/socket", Express.static(Path.join(__dirname, "..", "node_modules", "socket.io", "client-dist")))

app.set("view engine", "ejs")
app.set("views", Path.join(__dirname, "views"))

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