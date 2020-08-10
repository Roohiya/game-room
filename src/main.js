import Koa from 'koa'
// import send from 'koa-send'
// import serve from 'koa-static'
// import appRoot from 'app-root-path'
// import fs from 'fs'
// import path from 'path'
import http from 'http'
import socketIo from 'socket.io'
import router from './router'
import cors from 'koa2-cors'

const app = new Koa()
app
.use(router.routes())
.use(router.allowedMethods())

// app.use(serve(`${appRoot}/public`))

// const template = fs.readFileSync(`${appRoot}/public/index.html`)

// app.use(async (ctx) => {
//     ctx.type = 'html'
//     ctx.body = template
// })

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept']
// }))

const server = http.createServer(app)
const io = socketIo(server, { origins: '*:*'})

let interval

io.on('connection', socket => {
  // console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000)

  // socket.on("disconnect", () => {
  //   console.log("Client disconnected")
  //   clearInterval(interval)
  // })
})

const getApiAndEmit = socket => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response)
}

server.listen(4242, () => {
  console.log('Application is starting on port 4242')
})

// test, to remove
