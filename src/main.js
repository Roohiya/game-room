import Koa from 'koa'
import send from 'koa-send'
import serve from 'koa-static'
import appRoot from 'app-root-path'
import fs from 'fs'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'


const app = new Koa()

app.use(serve(`${appRoot}/public`))

const template = fs.readFileSync(`${appRoot}/public/index.html`)

app.use(async (ctx) => {
    ctx.type = 'html'
    ctx.body = template
})

// var server = http.Server(app)
// var io = socketIO(server)

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.emit('request', /* … */) // emit an event to the socket
  io.emit('broadcast', /* … */) // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }) // listen to the event
})

server.listen(4242, () => {
  console.log('Application is starting on port 4242')
})

// test, to remove
setInterval(function() {
  io.sockets.emit('message', 'hi!')
}, 1000)