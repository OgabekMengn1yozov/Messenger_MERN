const Path = require("path")
const Fs = require("fs")
const http = require("http")
const { Server } = require("socket.io")
// const Morgan = require("morgan")
const Express = require("express")
const CookieParser = require("cookie-parser")
const ExpressFileUpload = require("express-fileupload")
const { PORT } = require("../config")
const mongo = require("./modules/mongo")
const { verifyToken } = require("./modules/jwt")
const users = require("./model/UserModel")

const app = Express()   

const server = http.createServer(app)
const io = new Server(server)
  
io.on('connection', async (socket) => {
    console.log(socket.id ,'a user connected');

    let cookies = socket.handshake.headers.cookie.split("; ")
    let token
    cookies.forEach((cookie) => {
        if(cookie.split("=")[0] == "token") {
            token = cookie.split("=")[1]
        }
    })

    token = verifyToken(token)

    console.log(token)
    const user = await users.findOneAndUpdate(
        {
            user_id: token.user_id,
        },
        {
            socket_id: socket.id,
        }
    )
    console.log(user)
    socket.on("newMessage", (data) => {
        socket.to(data.user.socket_id).emit("newMessage", data);
    });
});

server.listen(PORT, _=> console.log(`SERVER READY AT PORT ${PORT}`))


mongo()       

app.use(Express.urlencoded({ extended: true }))
// app.use(Morgan("tiny"))
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
