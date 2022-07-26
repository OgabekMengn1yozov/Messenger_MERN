const Path = require("path")
const Fs = require("fs")
const Express = require("express")
const { PORT } = require("../config")

const app = Express()

app.use(Express.urlencoded({ extended: true }))


const path = Path.join(__dirname, "src", "routes")
Fs.readdir(path, (err, files) => {
    if(!err) {
        files.forEach((file) => {
            const RoutePath = Path.join(__dirname, "routes", file)
            const Route = require(RoutePath)

            if(Route.path && Route.router) app.use(Route.path && Route.router)
        })
    }
})


app.listen(PORT, _=> console.log(`SERVER READY AT PORT ${PORT}`))